import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// ── Blocked free / personal email domains (same list as unlock route) ─────────
const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com',
  'yahoo.com', 'yahoo.co.uk', 'yahoo.fr', 'yahoo.de', 'yahoo.es',
  'yahoo.it', 'yahoo.ca', 'yahoo.com.au', 'yahoo.co.in', 'ymail.com',
  'hotmail.com', 'hotmail.co.uk', 'hotmail.fr', 'hotmail.de',
  'outlook.com', 'outlook.co.uk', 'live.com', 'live.co.uk', 'msn.com',
  'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'aol.co.uk',
  'protonmail.com', 'proton.me', 'pm.me', 'tutanota.com', 'tuta.io', 'hushmail.com',
  'mail.com', 'email.com', 'inbox.com',
  'gmx.com', 'gmx.net', 'gmx.de',
  'fastmail.com', 'fastmail.fm',
  'zoho.com', 'zohomail.com',
  'yandex.com', 'yandex.ru', 'qq.com', '163.com', '126.com',
  'mailinator.com', 'guerrillamail.com', 'temp-mail.org',
  'throwam.com', 'sharklasers.com', 'trashmail.com', 'tempmail.com',
]);

function isPersonalEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? FREE_EMAIL_DOMAINS.has(domain) : false;
}

const ADMIN_EMAILS = ['soa.tidjani@gmail.com'];

// ─── POST /api/verify-email ────────────────────────────────────────────────────
// Send a 6-digit OTP to the given work email. Returns { alreadyVerified: true }
// if a valid verification already exists (skips re-sending).
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const normalised = email.toLowerCase().trim();
    const isAdmin = ADMIN_EMAILS.includes(normalised);

    // Admins skip OTP
    if (isAdmin) {
      return NextResponse.json({ success: true, alreadyVerified: true });
    }

    // Block personal/free email domains
    if (isPersonalEmail(normalised)) {
      return NextResponse.json(
        { error: 'personal_email', message: 'Please use your work email address. Personal accounts (Gmail, Yahoo etc.) are not accepted.' },
        { status: 400 }
      );
    }

    // Check if already verified within the last 60 minutes → skip re-send
    const { data: existing } = await supabaseAdmin
      .from('email_verifications')
      .select('id, expires_at')
      .eq('email', normalised)
      .eq('verified', true)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: true, alreadyVerified: true });
    }

    // Rate limit: max 1 OTP request per 60 seconds per email
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

    // Store OTP in DB
    const { error: insertErr } = await supabaseAdmin
      .from('email_verifications')
      .insert({ email: normalised, code, expires_at: expiresAt });

    if (insertErr) {
      console.error('OTP insert error:', insertErr);
      return NextResponse.json({ error: 'Failed to create verification code' }, { status: 500 });
    }

    // Send email via Resend REST API (no SDK needed)
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error('RESEND_API_KEY not set');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const emailHtml = buildOtpEmail(code);

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'TalentX Market <verify@talentxmarket.com>',
        to: [normalised],
        subject: `${code} — Your TalentX verification code`,
        html: emailHtml,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.text();
      console.error('Resend error:', errBody);
      return NextResponse.json({ error: 'Failed to send verification email. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, alreadyVerified: false });
  } catch (err) {
    console.error('verify-email error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ─── Branded OTP email template ───────────────────────────────────────────────
function buildOtpEmail(code: string): string {
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
      <p style="color:rgba(255,255,255,0.35);font-size:10px;letter-spacing:2px;text-transform:uppercase;margin:6px 0 0;">Verified Compliance Talent</p>
    </div>

    <!-- Body -->
    <div style="padding:44px 40px 36px;">
      <h1 style="font-size:24px;font-weight:900;color:#0A0A0A;margin:0 0 10px;letter-spacing:-0.5px;">Verify your work email</h1>
      <p style="color:#666;font-size:14px;line-height:1.7;margin:0 0 32px;">
        You requested access to unlock a compliance professional's profile on TalentX Market.<br>
        Enter the code below to verify your identity and proceed.
      </p>

      <!-- Code box -->
      <div style="background:#FAFAFA;border:2px solid #C9A84C;border-radius:16px;padding:32px 24px;text-align:center;margin:0 0 32px;">
        <p style="font-size:11px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:3px;margin:0 0 14px;">Your one-time code</p>
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
            🔒&nbsp; If you didn't request this, please ignore this email — no action is needed.
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
