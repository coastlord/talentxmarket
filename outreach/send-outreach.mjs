// ─────────────────────────────────────────────────────────────
//  TalentX Market — Outreach Script
//  Run: node outreach/send-outreach.mjs
// ─────────────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const FROM     = 'Sulaiman | TalentX Market <sulaiman@talentxmarket.com>';
const REPLY_TO = 'sulaiman@talentxmarket.com';
const BCC      = 'hello@talentxmarket.com';   // copy on every send

// ─── Leads list ───────────────────────────────────────────────
const leads = [
  { firstName: 'Diana',    fullName: 'Diana Ng\'ang\'a',  email: 'diana.muthoni@cibke.com',          title: 'Manager, Financial Crime Compliance',          company: 'CIB Kenya' },
  { firstName: 'Elijah',   fullName: 'Elijah Cafca',      email: 'elijah.etoh@fairmoney.io',          title: 'Senior Compliance Manager',                    company: 'FairMoney' },
  { firstName: 'John',     fullName: 'John Kinuthia',     email: 'kinuthiaj@stanbic.com',             title: 'AML/CFT Compliance',                           company: 'Stanbic Bank Kenya' },
  { firstName: 'Catherine',fullName: 'Catherine Muchoki', email: 'catherine_muchoki@bat.com',         title: 'Cluster Head of Tax, East & Southern Africa',  company: 'BAT' },
  { firstName: 'Caroline', fullName: 'Caroline Konongoi', email: 'ckonongoi@nationalbank.co.ke',      title: 'AML CFT Compliance Manager',                   company: 'National Bank of Kenya' },
  { firstName: 'Michael',  fullName: 'Michael Rading',    email: 'radingm@stanbic.com',               title: 'Manager, Financial Crime Compliance',          company: 'Stanbic Bank Kenya' },
  { firstName: 'Mary',     fullName: 'Mary Mumbi',        email: 'mmumbi@sidianbank.co.ke',           title: 'Compliance Manager',                           company: 'Sidian Bank' },
  { firstName: 'Moses',    fullName: 'Moses Muasya',      email: 'mmuasya@ecobank.com',               title: 'Financial Crime Compliance Manager',           company: 'Ecobank Kenya' },
  { firstName: 'Purity',   fullName: 'Purity Gakuru',     email: 'purity@wallet.tg',                  title: 'Compliance Specialist, KYC',                   company: 'Wallet in Telegram' },
  { firstName: 'Mercy',    fullName: 'Mercy Muasya',      email: 'mercy.muasya@equitybank.co.ke',     title: 'Manager, Financial Crime Compliance',          company: 'Equity Bank' },
  { firstName: 'Grace',    fullName: 'Grace Mugo',        email: 'gmugo@flywheeladvisory.com',        title: 'Financial Crime Compliance Manager',           company: 'Flywheel Advisory Africa' },
  { firstName: 'Emily',    fullName: 'Emily Mochama',     email: 'emily@afriex.co',                   title: 'Chief Compliance Officer',                     company: 'Afriex' },
  { firstName: 'Sharone',  fullName: 'Sharone Otieno',    email: 'sharone@apolloagriculture.com',     title: 'Senior Compliance Manager',                    company: 'Apollo Agriculture' },
  { firstName: 'Michael',  fullName: 'Michael Wanja',     email: 'michael.wanja@equitybank.co.ke',    title: 'Risk & Compliance Manager',                    company: 'Equity Bank' },
  { firstName: 'Gideon',   fullName: 'Gideon Njeru',      email: 'gideon.njeru@citi.com',             title: 'MLRO',                                         company: 'Citi' },
  { firstName: 'Victor',   fullName: 'Victor Onyango',    email: 'victor.ccfc@adcb.com',              title: 'Senior Specialist, Financial Crime Compliance', company: 'Abu Dhabi Commercial Bank' },
];

// ─── Email body ───────────────────────────────────────────────
function buildEmail({ firstName }) {
  const p = (text) =>
    `<p style="margin:0 0 18px;font-size:15px;line-height:1.8;color:#1a1a1a;font-family:Georgia,serif;">${text}</p>`;

  const link = (url, label) =>
    `<a href="https://${url}" style="color:#1a1a1a;text-decoration:underline;">${label}</a>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;">
<div style="max-width:560px;margin:0 auto;padding:48px 24px;font-family:Georgia,serif;">

  ${p(`Hi ${firstName},`)}
  ${p(`There's a lot of noise in the compliance hiring space — generic job boards where your profile sits unread, recruiters who don't truly understand the difference between an MLRO and a financial crime analyst, and opportunities that rarely match the depth of what you actually bring.`)}
  ${p(`We built TalentX Market to change that. It's a platform built exclusively for compliance, AML, risk, financial crime and regulatory professionals — a space where your expertise gets the visibility it genuinely deserves, in front of employers who are specifically looking for what you do.`)}
  ${p(`You post your availability once. The right employers find you. No noise, no chasing.`)}
  ${p(`And that visibility goes further than you might expect. Remote compliance hiring is growing fast — global companies are actively looking for experienced professionals who can work across borders. Being on TalentX puts you in front of those opportunities too, without you having to lift a finger.`)}
  ${p(`It's free to join. Visit ${link('www.talentxmarket.com', 'www.talentxmarket.com')}, create a free account and give your profile the global visibility it deserves. We'd love to have you on the platform.`)}

  ${p(`Warm regards,<br><br>TalentX Market Team<br>${link('www.talentxmarket.com', 'www.talentxmarket.com')}`)}

</div>
</body>
</html>`;
}

// ─── Send ─────────────────────────────────────────────────────
async function sendEmail(lead) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:     FROM,
      reply_to: REPLY_TO,
      bcc:      [BCC],
      to:       [lead.email],
      subject:  `Your compliance expertise deserves better visibility`,
      html:     buildEmail(lead),
    }),
  });

  const data = await res.json();

  if (res.ok) {
    console.log(`✅  Sent → ${lead.fullName} <${lead.email}>`);
  } else {
    console.error(`❌  Failed → ${lead.email}:`, JSON.stringify(data));
  }
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Run ──────────────────────────────────────────────────────
async function main() {
  console.log(`\n🚀  TalentX Outreach — sending to ${leads.length} professionals...\n`);

  for (let i = 0; i < leads.length; i++) {
    await sendEmail(leads[i]);
    if (i < leads.length - 1) {
      await delay(4000);   // 4s gap between sends
    }
  }

  console.log('\n✅  All done. Check hello@talentxmarket.com for copies.\n');
}

main();
