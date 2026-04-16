import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const FREE_UNLOCKS = 3;

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

    // ── 1. Find or create employer ─────────────────────────────────────────
    const { data: existing } = await supabaseAdmin
      .from('employers')
      .select('id, unlock_credits, status')
      .eq('email', workEmail)
      .maybeSingle();

    let employerId: string;
    let creditsRemaining: number;

    if (existing) {
      employerId = existing.id;
      creditsRemaining = existing.unlock_credits ?? FREE_UNLOCKS;
    } else {
      // New employer — create with 3 free unlock credits
      const { data: created, error: createErr } = await supabaseAdmin
        .from('employers')
        .insert({
          email: workEmail,
          company_name: companyName,
          contact_name: contactName,
          status: 'active',
          subscription_status: 'free',
          unlock_credits: FREE_UNLOCKS,
        })
        .select('id, unlock_credits')
        .single();

      if (createErr || !created) {
        console.error('Employer create error:', createErr);
        return NextResponse.json({ error: 'Failed to create employer account' }, { status: 500 });
      }

      employerId = created.id;
      creditsRemaining = created.unlock_credits ?? FREE_UNLOCKS;
    }

    // ── 2. Check if already unlocked this candidate ────────────────────────
    const { data: alreadyUnlocked } = await supabaseAdmin
      .from('employer_unlocks')
      .select('id')
      .eq('employer_id', employerId)
      .eq('candidate_id', candidateId)
      .maybeSingle();

    const isNewUnlock = !alreadyUnlocked;

    // ── 3. Check credits if this is a new unlock ───────────────────────────
    if (isNewUnlock && creditsRemaining <= 0) {
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

    // ── 5. Record the unlock (if new) + deduct credit ──────────────────────
    if (isNewUnlock) {
      await supabaseAdmin.from('employer_unlocks').insert({
        employer_id: employerId,
        candidate_id: candidateId,
      });

      await supabaseAdmin
        .from('employers')
        .update({ unlock_credits: creditsRemaining - 1 })
        .eq('id', employerId);

      creditsRemaining -= 1;
    }

    // ── 6. Log job request for audit ───────────────────────────────────────
    if (roleHiringFor) {
      await supabaseAdmin.from('job_requests').insert({
        employer_id: employerId,
        role_title: roleHiringFor,
        urgency: urgency || null,
        description: `Unlock request for candidate ${candidateId}`,
        status: 'pending',
      });
    }

    // ── 7. Return full profile ─────────────────────────────────────────────
    const fullName = candidate.full_name || '';
    const nameParts = fullName.trim().split(' ').filter(Boolean);
    let initials = 'TX';
    if (nameParts.length === 1) initials = nameParts[0].slice(0, 2).toUpperCase();
    else if (nameParts.length >= 2)
      initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();

    return NextResponse.json({
      success: true,
      creditsRemaining,
      isNewUnlock,
      profile: {
        id:                 candidate.id,
        initials,
        fullName:           candidate.is_anonymous ? null : candidate.full_name,
        contactEmail:       candidate.is_anonymous ? null : candidate.email,
        phone:              candidate.is_anonymous ? null : (candidate.phone_number || null),
        linkedinUrl:        candidate.is_anonymous ? null : candidate.linkedin_url,
        certificationLink:  candidate.certification_link || null,
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
