import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendNewCandidateAlert } from '@/lib/email';

export const dynamic = 'force-dynamic';

// ─── GET /api/candidate/profile ───────────────────────────────────────────────
export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from('candidates')
      .select('*')
      .eq('clerk_user_id', user.id)
      .single();

    // PGRST116 = no rows found — first login, profile not created yet
    if (error && error.code !== 'PGRST116') {
      console.error('Supabase GET error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || null);
  } catch (err) {
    console.error('Profile GET error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ─── POST /api/candidate/profile ──────────────────────────────────────────────
// Save profile — always UPDATE if row exists, INSERT only for first-time users.
// Never touches the email column on existing rows to avoid candidates_email_key conflicts.
export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }

    const body = await req.json();
    const email = user.emailAddresses[0]?.emailAddress ?? '';

    // Weighted profile completion — must match DashboardClient.tsx exactly (weights sum to 100)
    const scoreFields = [
      { value: body.fullName,                                                       weight: 8  },
      { value: body.title,                                                          weight: 12 },
      { value: body.experience,                                                     weight: 10 },
      { value: body.location,                                                       weight: 8  },
      { value: (body.specialisms?.length ?? 0) > 0,                                weight: 12 },
      { value: body.bio,                                                            weight: 12 },
      { value: body.linkedinUrl,                                                    weight: 8  },
      { value: body.phone,                                                          weight: 8  },
      { value: body.currentCompany,                                                 weight: 8  },
      { value: (body.certifications?.length ?? 0) > 0 || !!body.otherCertification, weight: 8 },
      { value: body.salaryAmount,                                                   weight: 3  },
      { value: body.degreeType || body.school || body.institution,                  weight: 3  },
    ];
    const totalWeight = scoreFields.reduce((s, f) => s + f.weight, 0);
    const earnedWeight = scoreFields.filter(f => Boolean(f.value)).reduce((s, f) => s + f.weight, 0);
    const profileCompletion = Math.min(100, Math.round((earnedWeight / totalWeight) * 100));

    // Fields that are safe to write on both INSERT and UPDATE
    const profileData = {
      full_name:           body.fullName            || null,
      job_title:           body.title              || null,
      years_experience:    body.experience         || null,
      location:            body.location           || null,
      specialisms:         body.specialisms        || [],
      certifications:      body.certifications     || [],
      bio:                 body.bio                || null,
      linkedin_url:        body.linkedinUrl        || null,
      phone_number:        body.phone              || null,
      other_certification: body.otherCertification || null,
      certification_link:  body.certificationLink  || null,
      work_preference:     body.workPreference     || null,
      availability_status: body.availabilityStatus  || body.availability || null,
      salary_amount:       body.salaryAmount       || null,
      salary_currency:     body.salaryCurrency     || 'GBP',
      salary_period:       body.salaryPeriod       || 'Year',
      current_company:     body.currentCompany     || null,
      current_start_year:  body.currentStartYear   || null,
      previous_role:       body.previousRole       || null,
      previous_company:    body.previousCompany    || null,
      previous_start_year: body.previousStartYear  || null,
      previous_end_year:   body.previousEndYear    || null,
      degree_type:         body.degreeType         || null,
      school_name:         body.school             || null,
      institution_name:    body.institution        || null,
      graduation_year:     body.graduationYear     || null,
      is_visible:          body.isVisible          ?? true,
      is_anonymous:        body.isAnonymous        ?? true,
      profile_completion:  profileCompletion,
    };

    // ── Step 1: Check if a row already exists for this Clerk user ──────────────
    const { data: existing } = await supabaseAdmin
      .from('candidates')
      .select('id')
      .eq('clerk_user_id', user.id)
      .single();

    if (existing) {
      // ── Row exists → UPDATE only (never touch email or clerk_user_id) ────────
      const { data, error } = await supabaseAdmin
        .from('candidates')
        .update(profileData)
        .eq('clerk_user_id', user.id)
        .select('*')
        .single();

      if (error) {
        console.error('Supabase UPDATE error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json(data);
    }

    // ── Step 2: No row found → INSERT new record ───────────────────────────────
    const { data, error } = await supabaseAdmin
      .from('candidates')
      .insert({ clerk_user_id: user.id, email, ...profileData })
      .select('*')
      .single();

    if (error) {
      // Fallback: if email already exists with a different/missing clerk_user_id,
      // claim the row by updating it with this user's clerk_user_id.
      if (error.code === '23505') {
        console.warn('Email conflict on insert — claiming row by email:', email);
        const { data: claimed, error: claimError } = await supabaseAdmin
          .from('candidates')
          .update({ clerk_user_id: user.id, ...profileData })
          .eq('email', email)
          .select('*')
          .single();

        if (claimError) {
          console.error('Supabase claim-by-email error:', claimError);
          return NextResponse.json({ error: claimError.message }, { status: 500 });
        }

        sendNewCandidateAlert({
          candidateName: claimed.full_name || body.fullName || email,
          candidateEmail: email,
          jobTitle:       claimed.job_title  || '',
          location:       claimed.location   || '',
          specialisms:    claimed.specialisms || [],
        }).catch(err => console.error('[email] new candidate alert (claim) failed:', err));

        return NextResponse.json(claimed);
      }

      console.error('Supabase INSERT error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fire new-submission alert to Tj — non-blocking, never fails the response
    sendNewCandidateAlert({
      candidateName: data.full_name || body.fullName || email,
      candidateEmail: email,
      jobTitle:       data.job_title  || '',
      location:       data.location   || '',
      specialisms:    data.specialisms || [],
    }).catch(err => console.error('[email] new candidate alert failed:', err));

    return NextResponse.json(data);
  } catch (err) {
    console.error('Profile POST error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ─── PATCH /api/candidate/profile ─────────────────────────────────────────────
// Partial update — visibility toggle and anonymity flag only.
export async function PATCH(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }

    const body = await req.json();
    const allowed: Record<string, unknown> = {};
    if (body.isVisible  !== undefined) allowed.is_visible  = body.isVisible;
    if (body.isAnonymous !== undefined) allowed.is_anonymous = body.isAnonymous;

    if (Object.keys(allowed).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    // Check row exists first — PATCH is a no-op if profile was never saved
    const { data: existing } = await supabaseAdmin
      .from('candidates')
      .select('id, is_visible, is_anonymous')
      .eq('clerk_user_id', user.id)
      .single();

    if (!existing) {
      // Profile not yet created — return the desired values so UI stays consistent
      return NextResponse.json({ is_visible: body.isVisible ?? true, is_anonymous: body.isAnonymous ?? true });
    }

    const { data, error } = await supabaseAdmin
      .from('candidates')
      .update(allowed)
      .eq('clerk_user_id', user.id)
      .select('*')
      .single();

    if (error) {
      console.error('Supabase PATCH error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Profile PATCH error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
