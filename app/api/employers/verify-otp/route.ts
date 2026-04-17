import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// ─── POST /api/employers/verify-otp ──────────────────────────────────────────
// Body: { email, code }
// Verifies the OTP for employer dashboard access.
export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    const normalised = email.toLowerCase().trim();
    const trimmedCode = code.toString().trim();

    // Find the latest unexpired, unverified OTP for this email
    const { data: record, error: fetchErr } = await supabaseAdmin
      .from('email_verifications')
      .select('id, code, expires_at, attempts, verified')
      .eq('email', normalised)
      .eq('verified', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchErr) {
      console.error('OTP fetch error:', fetchErr);
      return NextResponse.json({ error: 'Verification lookup failed' }, { status: 500 });
    }

    if (!record) {
      return NextResponse.json(
        { error: 'Code has expired or is invalid. Please request a new one.' },
        { status: 400 }
      );
    }

    // Too many wrong attempts → invalidate
    if (record.attempts >= 3) {
      return NextResponse.json(
        { error: 'Too many incorrect attempts. Please request a new code.' },
        { status: 400 }
      );
    }

    // Wrong code → increment attempts
    if (record.code !== trimmedCode) {
      await supabaseAdmin
        .from('email_verifications')
        .update({ attempts: record.attempts + 1 })
        .eq('id', record.id);

      const attemptsLeft = 2 - record.attempts;
      return NextResponse.json(
        { error: `Incorrect code. ${attemptsLeft} attempt${attemptsLeft === 1 ? '' : 's'} remaining.` },
        { status: 400 }
      );
    }

    // ✅ Correct — mark as verified
    await supabaseAdmin
      .from('email_verifications')
      .update({ verified: true, expires_at: new Date(Date.now() + 60 * 60_000).toISOString() })
      .eq('id', record.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('verify-otp error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
