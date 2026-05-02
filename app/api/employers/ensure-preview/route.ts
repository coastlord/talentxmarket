import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Whitelisted preview emails — OTP is bypassed for these accounts
// and the account is reset to a clean new-employer state on every call.
const PREVIEW_EMAILS = ['preview@talentxmarket.com'];

// POST /api/employers/ensure-preview
// Upserts a clean "new employer" record and wipes any existing unlocks,
// so Sulaiman always sees a genuine first-time employer experience.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email?.toLowerCase().trim();

    if (!email || !PREVIEW_EMAILS.includes(email)) {
      return NextResponse.json({ error: 'Not a preview email' }, { status: 403 });
    }

    // Upsert the preview employer — reset credits and name every time
    const { data: employer, error: upsertErr } = await supabaseAdmin
      .from('employers')
      .upsert(
        {
          email,
          company_name: 'Demo Company',
          contact_name: 'New Employer',
          status: 'active',
          subscription_status: 'trial',
          unlock_credits: 3,
          // Clear all saved preferences so the "Set Preferences" prompt shows
          pref_role: null,
          pref_specialism: null,
          pref_employment_type: null,
          pref_work_preference: null,
          pref_experience: null,
          pref_location: null,
        },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select('id')
      .single();

    if (upsertErr || !employer) {
      console.error('ensure-preview upsert error:', upsertErr);
      return NextResponse.json({ error: 'Failed to create preview account' }, { status: 500 });
    }

    // Wipe any unlocks so the dashboard always starts empty
    const { error: deleteErr } = await supabaseAdmin
      .from('employer_unlocks')
      .delete()
      .eq('employer_id', employer.id);

    if (deleteErr) {
      console.error('ensure-preview unlock wipe error:', deleteErr);
      // Non-fatal — return success anyway; worst case they see old unlocks
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : JSON.stringify(err);
    console.error('ensure-preview error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
