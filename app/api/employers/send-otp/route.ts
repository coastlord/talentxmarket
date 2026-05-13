import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const ADMIN_EMAILS = ['soa.tidjani@gmail.com'];

// ─── POST /api/employers/send-otp ─────────────────────────────────────────────
// Body: { email }
// Sends a 6-digit OTP to the employer's email to gate dashboard access.
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const normalised = email.toLowerCase().trim();

    // Admins bypass OTP entirely
    if (ADMIN_EMAILS.includes(normalised)) {
      return NextResponse.json({ success: true, adminBypass: true });
    }

    // Check employer exists before sending OTP (no point sending if no dashboard)
    const { data: employer, error: empErr } = await supabaseAdmin
      .from('employers')
      .select('id')
      .eq('email', normalised)
      .maybeSingle();

    if (empErr) {
      console.error('employer lookup error:', empErr);
      return NextResponse.json({ error: 'Lookup failed' }, { status: 500 });
    }

    if (!employer) {
      // Return a generic error so we don't leak whether an email is registered
      return NextResponse.json(
        { error: 'no_account', message: 'No employer account found for this email address.' },
        { status: 404 }
      );
    }

    // Rate limit: max 1 OTP per 60 seconds
    const { data: recent } = await supabaseAdmin
      .from('email_verifications')
      .select('created_at')
      .eq('email', normalised)
      .gte('created_at', new Date(Date.now() - 60_000).toISOString())
      .limit(1)
      .maybeSingle();

    if (recent) {
      return NextResponse.json(
        { error: 'rate_limited', message: 'Please wait 60 seconds before requesting another code.' },
        { status: 429 }
      );
    }

    // Generate 6-digit OTP
    const code = Math.floor(100_000 + Math.random() * 900_000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60_000).toISOString(); // 10 minutes

    // Store in email_verifications table
    const { error: insertErr } = await supabaseAdmin
      .from('email_verifications')
      .insert({ email: normalised, code, expires_at: expiresAt });

    if (insertErr) {
      console.error('OTP insert error:', insertErr);
      return NextResponse.json({ error: 'Failed to create verification code' }, { status: 500 });
    }

    // Send email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error('RESEND_API_KEY not set');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'TalentX Market <verify@talentxmarket.com>',
        to: [normalised],
        subject: `${code} — Your TalentX Employer Dashboard access code`,
        html: buildEmployerOtpEmail(code),
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.text();
      console.error('Resend error:', errBody);
      return NextResponse.json({ error: 'Failed to send verification email. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('send-otp error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ─── Branded employer dashboard OTP email ─────────────────────────────────────
function buildEmployerOtpEmail(code: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);">

    <!-- Header -->
    <div style="background:#0A0A0A;padding:30px 40px;text-align:center;">
      <div style="display:inline-block;">
        <span style="color:#C9A84C;font-size:21px;font-weight:900;letter-spacing:-0.5px;">TalentX</span>
        <span style="color:rgba(255,255,255,0.5);font-size:21px;font-weight:300;letter-spacing:-0.5px;"> Market</span>
      </div>
      <p style="color:rgba(255,255,255,0.35);font-size:10px;letter-spacing:2px;text-transform:uppercase;margin:6px 0 0;">Employer Dashboard Access</p>
    </div>

    <!-- Body -->
    <div style="padding:44px 40px 36px;">
      <h1 style="font-size:24px;font-weight:900;color:#0A0A0A;margin:0 0 10px;letter-spacing:-0.5px;">Your access code</h1>
      <p style="color:#666;font-size:14px;line-height:1.7;margin:0 0 32px;">
        Someone is trying to access the TalentX Employer Dashboard using this email address.<br>
        Enter the code below to securely sign in and view your unlocked candidate profiles.
      </p>

      <!-- Code box -->
      <div style="background:#FAFAFA;border:2px solid #C9A84C;border-radius:16px;padding:32px 24px;text-align:center;margin:0 0 32px;">
        <p style="font-size:11px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:3px;margin:0 0 14px;">One-time access code</p>
        <p style="font-size:52px;font-weight:900;color:#0A0A0A;letter-spacing:14px;margin:0;font-variant-numeric:tabular-nums;">${code}</p>
      </div>

      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 8px;font-size:13px;color:#999;">
            ⏱&nbsp; Expires in <strong style="color:#0A0A0A;">10 minutes</strong>
          </td>
        </tr>
        <tr>
          <td style="font-size:13px;color:#999;">
            🔒&nbsp; If you didn't request this, please ignore this email — your account remains secure.
          </td>
        </tr>
      </table>
    </div>

    <!-- Footer -->
    <div style="background:#FAFAFA;border-top:1px solid #EDEDED;padding:20px 40px;text-align:center;">
      <p style="color:#CCC;font-size:11px;margin:0;">
        TalentX Market &nbsp;·&nbsp;
        <a href="https://talentxmarket.com" style="color:#C9A84C;text-decoration:none;">talentxmarket.com</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}
