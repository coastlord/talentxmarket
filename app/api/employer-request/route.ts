import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contactName, companyName, workEmail, roleHiringFor, urgency, candidateId, candidateRole } = body;

    if (!contactName || !companyName || !workEmail || !roleHiringFor) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Upsert employer record — update if email already exists
    const { data: employer, error: employerError } = await supabaseAdmin
      .from('employers')
      .upsert(
        {
          email: workEmail,
          company_name: companyName,
          contact_name: contactName,
          status: 'pending',
          subscription_status: 'free',
        },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select('id')
      .single();

    if (employerError || !employer) {
      console.error('Supabase employer upsert error:', employerError);
      return NextResponse.json({ error: 'Failed to create employer account' }, { status: 500 });
    }

    // 2. Log unlock request as a job_request for full audit trail
    const { error: jobError } = await supabaseAdmin
      .from('job_requests')
      .insert({
        employer_id: employer.id,
        role_title: roleHiringFor,
        urgency: urgency || null,
        description: candidateId
          ? `Unlock request for candidate ${candidateId} (${candidateRole || 'Unknown role'})`
          : `Unlock request — role: ${roleHiringFor}`,
        status: 'pending',
      });

    if (jobError) {
      console.error('Supabase job_request insert error:', jobError);
    }

    return NextResponse.json({ success: true, employerId: employer.id });
  } catch (err) {
    console.error('Employer request error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
