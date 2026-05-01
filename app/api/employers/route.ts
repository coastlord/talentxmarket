import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// ─── GET /api/employers?email=work@company.com ────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email')?.toLowerCase().trim();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const { data: allRows, error: empErr } = await supabaseAdmin
      .from('employers')
      .select('id, email, company_name, contact_name, unlock_credits, subscription_status, created_at, pref_role, pref_specialism, pref_employment_type, pref_work_preference, pref_experience, pref_location')
      .eq('email', email)
      .order('created_at', { ascending: false });

    if (empErr) {
      console.error('Employers GET — employer query error:', JSON.stringify(empErr));
      return NextResponse.json({ error: `employer_query: ${empErr.message || JSON.stringify(empErr)}` }, { status: 500 });
    }

    if (!allRows || allRows.length === 0) {
      return NextResponse.json({ employer: null, unlocks: [] });
    }

    const employer = allRows[0];
    const isAdmin = allRows.some((r) => r.subscription_status === 'admin');
    const allEmployerIds = allRows.map((r) => r.id);

    const { data: unlockRecords, error: unlockErr } = await supabaseAdmin
      .from('employer_unlocks')
      .select('id, candidate_id, liked, employer_id')
      .in('employer_id', allEmployerIds);

    if (unlockErr) {
      console.error('Employers GET — unlocks query error:', JSON.stringify(unlockErr));
      return NextResponse.json({ error: `unlocks_query: ${unlockErr.message || JSON.stringify(unlockErr)}` }, { status: 500 });
    }

    if (!unlockRecords || unlockRecords.length === 0) {
      return NextResponse.json({
        employer: formatEmployer(employer, isAdmin),
        unlocks: [],
      });
    }

    const seen = new Set<string>();
    const deduped = unlockRecords.filter((u) => {
      if (seen.has(u.candidate_id)) return false;
      seen.add(u.candidate_id);
      return true;
    });

    const candidateIds = deduped.map((u) => u.candidate_id);
    const { data: candidates, error: candErr } = await supabaseAdmin
      .from('candidates')
      .select(
        'id, full_name, job_title, location, years_experience, specialisms, certifications, bio, availability_status, work_preference, salary_amount, salary_currency, salary_period, linkedin_url, email, phone_number, current_company, other_certification, certification_link'
      )
      .in('id', candidateIds);

    if (candErr) {
      console.error('Employers GET — candidates query error:', JSON.stringify(candErr));
      return NextResponse.json({ error: `candidates_query: ${candErr.message || JSON.stringify(candErr)}` }, { status: 500 });
    }

    const candidateMap = new Map((candidates || []).map((c) => [c.id, c]));

    const unlocks = deduped
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
          unlockedAt: null,
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
    const msg = err instanceof Error ? err.message : JSON.stringify(err);
    console.error('Employers GET error:', msg);
    return NextResponse.json({ error: `catch: ${msg}` }, { status: 500 });
  }
}

// ─── PATCH /api/employers — save hiring preferences ───────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, prefRole, prefSpecialism, prefEmploymentType, prefWorkPreference, prefExperience, prefLocation } = body;

    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const { data: rows, error: fetchErr } = await supabaseAdmin
      .from('employers')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .order('created_at', { ascending: false })
      .limit(1);

    if (fetchErr || !rows || rows.length === 0) {
      return NextResponse.json({ error: 'Employer not found' }, { status: 404 });
    }

    const { error: updateErr } = await supabaseAdmin
      .from('employers')
      .update({
        pref_role:            prefRole            || null,
        pref_specialism:      prefSpecialism      || null,
        pref_employment_type: prefEmploymentType  || null,
        pref_work_preference: prefWorkPreference  || null,
        pref_experience:      prefExperience      || null,
        pref_location:        prefLocation        || null,
      })
      .eq('id', rows[0].id);

    if (updateErr) {
      console.error('Employers PATCH error:', updateErr);
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : JSON.stringify(err);
    console.error('Employers PATCH catch:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatEmployer(
  e: {
    id: string; email: string; company_name: string | null; contact_name: string | null;
    unlock_credits: number | null; subscription_status: string | null;
    pref_role?: string | null; pref_specialism?: string | null;
    pref_employment_type?: string | null; pref_work_preference?: string | null;
    pref_experience?: string | null; pref_location?: string | null;
  },
  isAdmin: boolean
) {
  return {
    id:               e.id,
    email:            e.email,
    companyName:      e.company_name      || '',
    contactName:      e.contact_name      || '',
    creditsRemaining: isAdmin ? 999 : (e.unlock_credits ?? 0),
    isAdmin,
    prefRole:            e.pref_role            || '',
    prefSpecialism:      e.pref_specialism      || '',
    prefEmploymentType:  e.pref_employment_type || '',
    prefWorkPreference:  e.pref_work_preference || '',
    prefExperience:      e.pref_experience      || '',
    prefLocation:        e.pref_location        || '',
  };
}
    prefWorkPreference:  e.pref_work_preference || '',
    prefExperience:      e.pref_experience      || '',
    prefLocation:        e.pref_location        || '',
  };
}
EOF
