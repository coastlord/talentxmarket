import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const FREE_UNLOCKS = 2;
const ADMIN_EMAILS = ['soa.tidjani@gmail.com'];

// ── Blocked free / personal email domains ─────────────────────────────────────
const FREE_EMAIL_DOMAINS = new Set([
  // Google
  'gmail.com', 'googlemail.com',
  // Yahoo
  'yahoo.com', 'yahoo.co.uk', 'yahoo.fr', 'yahoo.de', 'yahoo.es',
  'yahoo.it', 'yahoo.ca', 'yahoo.com.au', 'yahoo.co.in', 'ymail.com',
  // Microsoft
  'hotmail.com', 'hotmail.co.uk', 'hotmail.fr', 'hotmail.de',
  'outlook.com', 'outlook.co.uk', 'live.com', 'live.co.uk', 'msn.com',
  // Apple
  'icloud.com', 'me.com', 'mac.com',
  // AOL
  'aol.com', 'aol.co.uk',
  // Privacy / encrypted
  'protonmail.com', 'proton.me', 'pm.me', 'tutanota.com', 'tuta.io', 'hushmail.com',
  // Generic free
  'mail.com', 'email.com', 'inbox.com',
  'gmx.com', 'gmx.net', 'gmx.de',
  'fastmail.com', 'fastmail.fm',
  'zoho.com', 'zohomail.com',
  // Regional
  'yandex.com', 'yandex.ru', 'qq.com', '163.com', '126.com',
  // Disposable / throwaway
  'mailinator.com', 'guerrillamail.com', 'temp-mail.org',
  'throwam.com', 'sharklasers.com', 'guerrillamailblock.com',
  'trashmail.com', 'tempmail.com', 'dispostable.com',
]);

function isPersonalEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? FREE_EMAIL_DOMAINS.has(domain) : false;
}

// ─── POST /api/unlock/[id] ────────────────────────────────────────────────────
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const candidateId = params.id;
    const body = await req.json();
    const { contactName, companyName, workEmail, roleHiringFor, urgency } = body;

    if (!workEmail || !companyName || !contactName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const normalisedEmail = workEmail.toLowerCase().trim();

    // ── Gate: reject personal / free email domains ─────────────────────────
    if (isPersonalEmail(normalisedEmail) && !ADMIN_EMAILS.includes(normalisedEmail)) {
      return NextResponse.json(
        {
          error: 'personal_email',
          message: 'Please use your work email address. Personal email accounts (Gmail, Yahoo, Hotmail etc.) are not accepted.',
        },
        { status: 400 }
      );
    }

    // ── Admin bypass: unlimited unlocks ────────────────────────────────────
    const isAdmin = ADMIN_EMAILS.includes(normalisedEmail);

    // ── 1. Find or create employer ─────────────────────────────────────────
    const { data: existing } = await supabaseAdmin
      .from('employers')
      .select('id, unlock_credits, status')
      .eq('email', normalisedEmail)
      .maybeSingle();

    let employerId: string;
    let creditsRemaining: number;

    if (existing) {
      employerId = existing.id;
      creditsRemaining = isAdmin ? 999 : (existing.unlock_credits ?? FREE_UNLOCKS);
    } else {
      const { data: created, error: createErr } = await supabaseAdmin
        .from('employers')
        .insert({
          email: normalisedEmail,
          company_name: companyName,
          contact_name: contactName,
          status: 'active',
          subscription_status: isAdmin ? 'admin' : 'free',
          unlock_credits: isAdmin ? 999 : FREE_UNLOCKS,
        })
        .select('id, unlock_credits')
        .single();

      if (createErr || !created) {
        console.error('Employer create error:', createErr);
        return NextResponse.json({ error: 'Failed to create employer account' }, { status: 500 });
      }

      employerId = created.id;
      creditsRemaining = isAdmin ? 999 : (created.unlock_credits ?? FREE_UNLOCKS);
    }

    // ── 2. Check if already unlocked this candidate ────────────────────────
    const { data: alreadyUnlocked } = await supabaseAdmin
      .from('employer_unlocks')
      .select('id')
      .eq('employer_id', employerId)
      .eq('candidate_id', candidateId)
      .maybeSingle();

    const isNewUnlock = !alreadyUnlocked;

    // ── 3a. Require verified email (admins bypass) ────────────────────────
    if (!isAdmin) {
      const { data: verified } = await supabaseAdmin
        .from('email_verifications')
        .select('id')
        .eq('email', normalisedEmail)
        .eq('verified', true)
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!verified) {
        return NextResponse.json(
          { error: 'email_not_verified', message: 'Please verify your work email before unlocking.' },
          { status: 403 }
        );
      }
    }

    // ── 3b. Check credits (admins always pass) ────────────────────────────
    if (!isAdmin && isNewUnlock && creditsRemaining <= 0) {
      return NextResponse.json(
        { error: 'no_credits', message: 'You have used all your free unlocks. Upgrade to continue.' },
        { status: 402 }
      );
    }

    // ── 4. Fetch full candidate profile ────────────────────────────────────
    const { data: candidate, error: candErr } = await supabaseAdmin
      .from('candidates')
      .select(
        'id, full_name, job_title, location, years_experience, specialisms, certifications, bio, availability_status, work_preference, salary_amount, salary_currency, salary_period, linkedin_url, email, phone_number, is_anonymous, current_company, current_start_year, previous_role, previous_company, previous_start_year, previous_end_year, degree_type, school_name, institution_name, graduation_year, other_certification, certification_link'
      )
      .eq('id', candidateId)
      .eq('status', 'approved')
      .eq('is_visible', true)
      .single();

    if (candErr || !candidate) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    // ── 5. Record unlock + deduct credit ──────────────────────────────────
    if (isNewUnlock) {
      await supabaseAdmin.from('employer_unlocks').insert({
        employer_id: employerId,
        candidate_id: candidateId,
      });

      if (!isAdmin) {
        await supabaseAdmin
          .from('employers')
          .update({ unlock_credits: creditsRemaining - 1 })
          .eq('id', employerId);

        creditsRemaining -= 1;
      }
    }

    // ── 6. Log job request ────────────────────────────────────────────────
    if (roleHiringFor) {
      await supabaseAdmin.from('job_requests').insert({
        employer_id: employerId,
        role_title: roleHiringFor,
        urgency: urgency || null,
        description: `Unlock request for candidate ${candidateId}`,
        status: 'pending',
      });
    }

    // ── 7. Build initials ─────────────────────────────────────────────────
    const fullName = candidate.full_name || '';
    const nameParts = fullName.trim().split(' ').filter(Boolean);
    let initials = 'TX';
    if (nameParts.length === 1) initials = nameParts[0].slice(0, 2).toUpperCase();
    else if (nameParts.length >= 2)
      initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();

    return NextResponse.json({
      success: true,
      creditsRemaining: isAdmin ? 999 : creditsRemaining,
      isNewUnlock,
      isAdmin,
      profile: {
        id:                 candidate.id,
        initials,
        fullName:           candidate.full_name           || null,
        contactEmail:       candidate.email               || null,
        phone:              candidate.phone_number        || null,
        linkedinUrl:        candidate.linkedin_url        || null,
        certificationLink:  candidate.certification_link  || null,
        role:               candidate.job_title           || 'Compliance Professional',
        location:           candidate.location            || '',
        experience:         candidate.years_experience    || '',
        skills:             candidate.specialisms         || [],
        certifications:     candidate.certifications      || [],
        otherCertification: candidate.other_certification || null,
        headline:           candidate.bio                 || '',
        availabilityStatus: candidate.availability_status || 'Available Now',
        workPreference:     candidate.work_preference     || '',
        salaryAmount:       candidate.salary_amount       || '',
        salaryCurrency:     candidate.salary_currency     || 'GBP',
        salaryPeriod:       candidate.salary_period       || 'Year',
        currentCompany:     candidate.current_company     || null,
        currentStartYear:   candidate.current_start_year  || null,
        previousRole:       candidate.previous_role       || null,
        previousCompany:    candidate.previous_company    || null,
        previousStartYear:  candidate.previous_start_year || null,
        previousEndYear:    candidate.previous_end_year   || null,
        degreeType:         candidate.degree_type         || null,
        schoolName:         candidate.school_name         || null,
        institutionName:    candidate.institution_name    || null,
        graduationYear:     candidate.graduation_year     || null,
      },
    });
  } catch (err) {
    console.error('Unlock error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ─── PATCH /api/unlock/[id] — toggle liked status ────────────────────────────
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const candidateId = params.id;
    const { workEmail, liked } = await req.json();

    if (!workEmail) return NextResponse.json({ error: 'Missing workEmail' }, { status: 400 });

    const { data: employer } = await supabaseAdmin
      .from('employers')
      .select('id')
      .eq('email', workEmail.toLowerCase().trim())
      .maybeSingle();

    if (!employer) return NextResponse.json({ error: 'Employer not found' }, { status: 404 });

    const { error } = await supabaseAdmin
      .from('employer_unlocks')
      .update({ liked: !!liked })
      .eq('employer_id', employer.id)
      .eq('candidate_id', candidateId);

    if (error) {
      console.error('Like toggle error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, liked: !!liked });
  } catch (err) {
    console.error('PATCH unlock error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
