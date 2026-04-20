// ─── TalentX Market — Resend email utility ────────────────────────────────────
// All outbound emails go through this file. Uses Resend REST API directly
// (no SDK) to match the pattern already used in verify-email/route.ts.

const FROM = 'TalentX Market <verify@talentxmarket.com>';
const RESEND_URL = 'https://api.resend.com/emails';

// ─── Core send helper ─────────────────────────────────────────────────────────
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('[email] RESEND_API_KEY not set — skipping send');
    return;
  }

  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('[email] Resend error:', body);
  }
}

// ─── Shared layout wrapper ────────────────────────────────────────────────────
function layout(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F2F2F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="max-width:580px;margin:40px auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);">

    <!-- Header -->
    <div style="background:#0A0A0A;padding:28px 40px;text-align:center;">
      <div style="display:inline-block;">
        <span style="color:#C9A84C;font-size:21px;font-weight:900;letter-spacing:-0.5px;">TalentX</span>
        <span style="color:rgba(255,255,255,0.45);font-size:21px;font-weight:300;letter-spacing:-0.5px;"> Market</span>
      </div>
      <p style="color:rgba(255,255,255,0.30);font-size:10px;letter-spacing:2px;text-transform:uppercase;margin:5px 0 0;">Verified Compliance Talent</p>
    </div>

    <!-- Body -->
    <div style="padding:40px 40px 32px;">
      ${bodyHtml}
    </div>

    <!-- Footer -->
    <div style="background:#FAFAFA;border-top:1px solid #EDEDED;padding:18px 40px;text-align:center;">
      <p style="color:#CCC;font-size:11px;margin:0;">
        TalentX Market &nbsp;·&nbsp;
        <a href="https://talentxmarket.com" style="color:#C9A84C;text-decoration:none;">talentxmarket.com</a>
        &nbsp;·&nbsp;
        <a href="mailto:hello@talentxmarket.com" style="color:#CCC;text-decoration:none;">hello@talentxmarket.com</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ─── 1. New candidate submission alert → Tj ───────────────────────────────────
export async function sendNewCandidateAlert({
  candidateName,
  candidateEmail,
  jobTitle,
  location,
  specialisms,
}: {
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  location: string;
  specialisms: string[];
}): Promise<void> {
  const specialismLine =
    specialisms.length > 0
      ? specialisms.slice(0, 4).join(' &nbsp;·&nbsp; ') + (specialisms.length > 4 ? ` &nbsp;+${specialisms.length - 4} more` : '')
      : 'Not specified';

  const html = layout(`
    <!-- Alert badge -->
    <div style="display:inline-flex;align-items:center;gap:8px;background:#C9A84C15;border:1px solid #C9A84C50;border-radius:100px;padding:5px 14px;margin-bottom:24px;">
      <span style="width:8px;height:8px;border-radius:50%;background:#C9A84C;display:inline-block;"></span>
      <span style="color:#8a6d25;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">New Submission</span>
    </div>

    <h1 style="font-size:22px;font-weight:900;color:#0A0A0A;margin:0 0 6px;letter-spacing:-0.4px;">New candidate profile submitted</h1>
    <p style="color:#666;font-size:14px;line-height:1.7;margin:0 0 28px;">A compliance professional just saved their profile on TalentX Market and is waiting for your review.</p>

    <!-- Candidate details card -->
    <div style="background:#FAFAFA;border:1px solid #EDEDED;border-radius:14px;padding:24px 28px;margin:0 0 28px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 14px;vertical-align:top;">
            <p style="font-size:10px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 4px;">Name</p>
            <p style="font-size:15px;font-weight:700;color:#0A0A0A;margin:0;">${candidateName || 'Not provided'}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 0 14px;vertical-align:top;">
            <p style="font-size:10px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 4px;">Email</p>
            <p style="font-size:14px;color:#0A0A0A;margin:0;">${candidateEmail}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 0 14px;vertical-align:top;">
            <p style="font-size:10px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 4px;">Job Title</p>
            <p style="font-size:14px;color:#0A0A0A;margin:0;">${jobTitle || 'Not specified'}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 0 14px;vertical-align:top;">
            <p style="font-size:10px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 4px;">Location</p>
            <p style="font-size:14px;color:#0A0A0A;margin:0;">${location || 'Not specified'}</p>
          </td>
        </tr>
        <tr>
          <td style="vertical-align:top;">
            <p style="font-size:10px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 4px;">Specialisms</p>
            <p style="font-size:13px;color:#555;margin:0;">${specialismLine}</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- CTA button -->
    <a href="https://talentxmarket.com/admin"
       style="display:inline-block;background:#0A0A0A;color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:12px;letter-spacing:0.2px;">
      Review in Admin Panel →
    </a>

    <p style="color:#AAA;font-size:12px;margin:20px 0 0;line-height:1.6;">
      Approve or reject at <a href="https://talentxmarket.com/admin" style="color:#C9A84C;text-decoration:none;">talentxmarket.com/admin</a>.
      The candidate&apos;s card will only go live after you approve it.
    </p>
  `);

  await sendEmail({
    to: 'soa.tidjani@gmail.com',
    subject: `New profile submission — ${candidateName || candidateEmail}`,
    html,
  });
  await sendEmail({
    to: 'hello@talentxmarket.com',
    subject: `New profile submission — ${candidateName || candidateEmail}`,
    html,
  });
}

// ─── 2. Candidate approved → candidate ───────────────────────────────────────
export async function sendCandidateApprovedEmail({
  candidateEmail,
  candidateName,
  jobTitle,
}: {
  candidateEmail: string;
  candidateName: string;
  jobTitle: string;
}): Promise<void> {
  const firstName = candidateName?.split(' ')[0] || 'there';

  const html = layout(`
    <!-- Approved badge -->
    <div style="display:inline-flex;align-items:center;gap:8px;background:#d1fae515;border:1px solid #6ee7b750;border-radius:100px;padding:5px 14px;margin-bottom:24px;">
      <span style="width:8px;height:8px;border-radius:50%;background:#10b981;display:inline-block;"></span>
      <span style="color:#065f46;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Profile Approved</span>
    </div>

    <h1 style="font-size:22px;font-weight:900;color:#0A0A0A;margin:0 0 6px;letter-spacing:-0.4px;">You&apos;re live on TalentX Market</h1>
    <p style="color:#666;font-size:14px;line-height:1.7;margin:0 0 24px;">
      Hi ${firstName}, your compliance profile has been reviewed and approved. You are now visible to compliance employers actively hiring on TalentX Market.
    </p>

    <!-- Profile summary card -->
    <div style="background:#0A0A0A;border-radius:14px;padding:24px 28px;margin:0 0 28px;">
      <p style="color:#C9A84C;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 6px;">Your Profile</p>
      <p style="color:#fff;font-size:16px;font-weight:800;margin:0 0 4px;">${candidateName}</p>
      <p style="color:rgba(255,255,255,0.55);font-size:13px;margin:0;">${jobTitle || 'Compliance Professional'}</p>
      <div style="border-top:1px solid rgba(255,255,255,0.1);margin:16px 0;"></div>
      <p style="color:rgba(255,255,255,0.45);font-size:12px;margin:0;">
        ✓ &nbsp;Profile active &nbsp;&nbsp;·&nbsp;&nbsp; ✓ &nbsp;Visible to employers
      </p>
    </div>

    <!-- What happens next -->
    <div style="margin:0 0 28px;">
      <p style="font-size:13px;font-weight:700;color:#0A0A0A;margin:0 0 12px;">What happens next</p>
      <table style="width:100%;border-collapse:collapse;">
        ${[
          ['Employers browse your profile', 'Your card is visible to compliance employers searching TalentX Market.'],
          ['They unlock your contact details', 'When an employer wants to reach you, they pay to unlock your full profile.'],
          ['You hear from them directly', 'They will contact you via the email and phone on your profile.'],
        ].map(([title, desc], i) => `
        <tr>
          <td style="vertical-align:top;padding:0 0 14px;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <div style="min-width:24px;height:24px;background:#C9A84C15;border:1px solid #C9A84C40;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-top:1px;">
                <span style="color:#C9A84C;font-size:11px;font-weight:900;">${i + 1}</span>
              </div>
              <div>
                <p style="font-size:13px;font-weight:700;color:#0A0A0A;margin:0 0 2px;">${title}</p>
                <p style="font-size:12px;color:#888;margin:0;line-height:1.6;">${desc}</p>
              </div>
            </div>
          </td>
        </tr>`).join('')}
      </table>
    </div>

    <!-- CTA -->
    <a href="https://talentxmarket.com/dashboard"
       style="display:inline-block;background:#C9A84C;color:#0A0A0A;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:12px;letter-spacing:0.2px;">
      View Your Dashboard →
    </a>

    <p style="color:#AAA;font-size:12px;margin:20px 0 0;line-height:1.6;">
      Keep your profile up to date — a complete profile gets significantly more attention from employers.
      You can toggle your visibility on or off at any time from your dashboard.
    </p>
  `);

  await sendEmail({
    to: candidateEmail,
    subject: `You're live on TalentX Market — employers can now find you`,
    html,
  });
}
