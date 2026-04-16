import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// ─── GET /api/employers?email=work@company.com ────────────────────────────────
// Returns employer record + all their unlocked candidate profiles
export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email')?.toLowerCase().trim();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    // Find employer
    const { data: employer, error: empErr } = await supabaseAdmin
      .from('employers')
      .select('id, email, company_name, contact_name, unlock_credits, subscription_status')
      .eq('email', email)
      .maybeSingle();

    if (empErr) throw empErr;

    if (!employer) {
      return NextResponse.json({ employer: null, unlocks: [] });
    }

    const isAdmin = employer.subscription_status === 'admin';

    // Fetch unlock records for this employer
    const { data: unlockRecords, error: unlockErr } = await supabaseAdmin
      .from('employer_unlocks')
      .select('id, candidate_id, liked, created_at')
      .eq('employer_id', employer.id)
      .order('created_at', { ascending: false });

    if (unlockErr) throw unlockErr;

    if (!unlockRecords || unlockRecords.length === 0) {
      return NextResponse.json({
        employer: formatEmployer(employer, isAdmin),
        unlocks: [],
      });
    }

    // Fetch all candidate profiles in one query
    const candidateIds = unlockRecords.map((u) => u.candidate_id);
    const { data: candidates, error: candErr } = await supabaseAdmin
      .from('candidates')
      .select(
        'id, full_name, job_title, location, years_experience, specialisms, certifications, bio, availability_status, work_preference, salary_amount, salary_currency, salary_period, linkedin_url, email, phone_number, current_company, other_certification, certification_link'
      )
      .in('id', candidateIds);

    if (candErr) throw candErr;

    const candidateMap = new Map((candidates || []).map((c) => [c.id, c]));

    const unlocks = unlockRecords
      .map((u) => {
        const c = candidateMap.get(u.candidate_id);
        if (!c) return null;

        const nameParts = (c.full_name || '').trim().split(' ').filter(Boolean);
        let initials = 'TX';
        if (nameParts.length === 1) initials = nameParts[0].slice(0, 2).toUpperCase();
        else if (nameParts.length >= 2)
          initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();

        return {
          unlockId: u.id,
          liked: u.liked ?? false,
          unlockedAt: u.created_at,
          candidate: {
            id: c.id,
            initials,
            fullName: c.full_name || null,
            role: c.job_title || 'Compliance Professional',
            location: c.location || '',
            experience: c.years_experience || '',
            availabilityStatus: c.availability_status || '',
            contactEmail: c.email || null,
            phone: c.phone_number || null,
            linkedinUrl: c.linkedin_url || null,
            certificationLink: c.certification_link || null,
            skills: c.specialisms || [],
            certifications: [
              ...(c.certifications || []),
              ...(c.other_certification ? [c.other_certification] : []),
            ],
            headline: c.bio || '',
            currentCompany: c.current_company || null,
            workPreference: c.work_preference || '',
            salaryAmount: c.salary_amount || '',
            salaryCurrency: c.salary_currency || 'GBP',
            salaryPeriod: c.salary_period || 'Year',
          },
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      employer: formatEmployer(employer, isAdmin),
      unlocks,
    });
  } catch (err) {
    console.error('Employers GET error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

function formatEmployer(
  e: { id: string; email: string; company_name: string | null; contact_name: string | null; unlock_credits: number | null; subscription_status: string | null },
  isAdmin: boolean
) {
  return {
    id: e.id,
    email: e.email,
    companyName: e.company_name || '',
    contactName: e.contact_name || '',
    creditsRemaining: isAdmin ? 999 : (e.unlock_credits ?? 0),
    isAdmin,
  };
}
