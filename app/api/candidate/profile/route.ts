import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// ─── GET /api/candidate/profile ───────────────────────────────────────────────
// Load the signed-in candidate's saved profile from Supabase
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
                                                                                        // Create or update the signed-in candidate's profile in Supabase
                                                                                        export async function POST(req: NextRequest) {
                                                                                          try {
                                                                                              const user = await currentUser();
                                                                                                  if (!user) {
                                                                                                        return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
                                                                                                            }

                                                                                                                const body = await req.json();
                                                                                                                    const email = user.emailAddresses[0]?.emailAddress ?? '';

                                                                                                                        // Calculate profile completion percentage (out of 7 key fields)
                                                                                                                            const completionFields = [
                                                                                                                                  body.title,
                                                                                                                                        body.experience,
                                                                                                                                              body.location,
      body.specialisms?.length > 0,
      body.bio,
      body.certifications?.length > 0,
      body.linkedinUrl,
    ];
    const completedCount = completionFields.filter(Boolean).length;
    const profileCompletion = Math.round((completedCount / completionFields.length) * 100);

    const upsertData = {
      clerk_user_id:       user.id,
      email,
      full_name:           [body.firstName, body.lastName].filter(Boolean).join(' ') || undefined,
      job_title:           body.title        || undefined,
      years_experience:    body.experience   || undefined,
      location:            body.location     || undefined,
      specialisms:         body.specialisms  || [],
      certifications:      body.certifications || [],
      bio:                 body.bio          || undefined,
      linkedin_url:        body.linkedinUrl  || undefined,
      phone_number:        body.phone        || undefined,
      work_preference:     body.workPreference || undefined,
      availability_status: body.availability || undefined,
      salary_amount:       body.salaryAmount  || undefined,
      salary_currency:     body.salaryCurrency || 'GBP',
      salary_period:       body.salaryPeriod  || 'Year',
      current_company:      body.currentCompany     || undefined,
      current_start_year:   body.currentStartYear   || undefined,
      previous_role:        body.previousRole        || undefined,
      previous_company:     body.previousCompany     || undefined,
      previous_start_year:  body.previousStartYear   || undefined,
      previous_end_year:    body.previousEndYear     || undefined,
      degree_type:          body.degreeType          || undefined,
      school_name:          body.school              || undefined,
      institution_name:     body.institution         || undefined,
      graduation_year:      body.graduationYear      || undefined,
      is_anonymous:        body.isAnonymous   ?? true,
      is_visible:          body.isVisible     ?? true,
      profile_completion:  profileCompletion,
    };

    const { data, error } = await supabaseAdmin
      .from('candidates')
      .upsert(upsertData, { onConflict: 'clerk_user_id' })
      .select('*')
      .single();

    if (error) {
      console.error('Supabase upsert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Profile POST error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ─── PATCH /api/candidate/profile ─────────────────────────────────────────────
// Partial update — used for visibility toggle etc.
export async function PATCH(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }

    const body = await req.json();
    const allowed: Record<string, unknown> = {};
    if (body.isVisible !== undefined) allowed.is_visible = body.isVisible;
    if (body.isAnonymous !== undefined) allowed.is_anonymous = body.isAnonymous;

    if (Object.keys(allowed).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
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
