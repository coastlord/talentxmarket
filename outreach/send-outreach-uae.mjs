// ─────────────────────────────────────────────────────────────
//  TalentX Market — UAE Outreach Script (Batch 2)
//  Run: node outreach/send-outreach-uae.mjs
// ─────────────────────────────────────────────────────────────

const RESEND_API_KEY = 're_ixL4pUV3_K9secyMqcJRYVYzi4WPUPBR3';

const FROM     = 'Sulaiman | TalentX Market <sulaiman@talentxmarket.com>';
const REPLY_TO = 'sulaiman@talentxmarket.com';
const SUMMARY  = 'hello@talentxmarket.com';  // single summary email at the end only

// ─── Leads list (61 leads — 4 irrelevant "Ica" entries removed) ───
const leads = [
  { firstName: 'Jazib',        email: 'jaziba@rsm.ae',                          title: 'Compliance Officer',                                                              company: 'RSM UAE' },
  { firstName: 'Dino',         email: 'dino.paguio@akwconsultants.com',          title: 'Compliance Manager',                                                              company: 'AKW Consultants' },
  { firstName: 'Hani',         email: 'hani.awad@tamara.co',                     title: 'MLRO',                                                                            company: 'Tamara' },
  { firstName: 'Swapnil',      email: 'swapnil.tondon@beyonmoney.com',           title: 'Head of Compliance & MLRO',                                                       company: 'Beyon Money' },
  { firstName: 'Ajo',          email: 'ajo.simon@vz.ae',                         title: 'Compliance Officer',                                                              company: 'Virtuzone' },
  { firstName: 'Arslan',       email: 'arslanahmed.shaikh@cscglobal.com',        title: 'Assistant Vice President Compliance & MLRO',                                      company: 'CSC' },
  { firstName: 'Neveen',       email: 'neveenkenawy@hsbc.com',                   title: 'AVP, Head, Global Trade Finance',                                                 company: 'HSBC' },
  { firstName: 'Mostafa',      email: 'mostafa.hassan@alfardanexchange.com',     title: 'Senior Compliance Manager',                                                       company: 'Al Fardan Exchange' },
  { firstName: 'Muhammad',     email: 'mumer@jicjo.com',                         title: 'Risk Manager',                                                                    company: 'Jordan Insurance Company' },
  { firstName: 'Jana',         email: 'jana.von@gh-consultancy.de',              title: 'Managing Director',                                                               company: 'GH Consultancy' },
  { firstName: 'Tracey',       email: 'tracey.carty@lloydsbanking.com',          title: 'Financial Crime Manager',                                                         company: 'Lloyds Banking Group' },
  { firstName: 'Kaushik',      email: 'kaushik.saha@barclays.com',               title: 'Director, Head of APAC Whistleblowing Investigations & Regulatory Compliance',    company: 'Barclays' },
  { firstName: 'Saboor',       email: 'saboor.siddiqui@dib.ae',                  title: 'Vice President - Group Compliance',                                               company: 'Dubai Islamic Bank' },
  { firstName: 'Reem',         email: 'rica@gig.com.kw',                         title: 'Compliance Officer',                                                              company: 'GIG Kuwait' },
  { firstName: 'Vishnu',       email: 'vishnu.madhu@medgulf.ae',                 title: 'Compliance Professional',                                                         company: 'MEDGULF UAE' },
  { firstName: 'Ebrahim',      email: 'ebrahim.almarzuqi@rakbank.ae',            title: 'Senior Vice President & Head of Financial Crime Compliance',                      company: 'RAKBANK' },
  { firstName: 'Mostafa',      email: 'mostafa.mahmoud@banquemisr.ae',           title: 'Compliance Monitoring & Testing Manager',                                         company: 'Banque Misr UAE' },
  { firstName: 'Adeel',        email: 'adeel.mirza@almasraf.ae',                 title: 'Head of AML & KYC Unit',                                                         company: 'Al Masraf' },
  { firstName: 'Kelvin',       email: 'kelvin.toh@bankfab.com',                  title: 'Group Head of Sanctions',                                                         company: 'First Abu Dhabi Bank' },
  { firstName: 'Yasser',       email: 'y.salah@multipass.co',                    title: 'Financial Crime Manager',                                                         company: 'MultiPass' },
  { firstName: 'Maysa',        email: 'maysa.kafafy@hsbc.com',                   title: 'Country Manager, Regulatory Compliance',                                          company: 'HSBC' },
  { firstName: 'Sonika',       email: 'sonika.kanadia@schroders.com',            title: 'Head of Compliance & MLRO',                                                       company: 'Schroders' },
  { firstName: 'Ahmed',        email: 'ahmed.abdelmegid@banquemisr.ae',          title: 'Senior Anti-Money Laundering Officer',                                            company: 'Banque Misr UAE' },
  { firstName: 'Adeel',        email: 'adeel.janjua@bankalfalah.com',            title: 'Regional Head-GCC, Home Remittances',                                             company: 'Bank Alfalah' },
  { firstName: 'Sreeraj',      email: 'sreeraj.cams@adcb.com',                   title: 'Senior Financial Analyst',                                                        company: 'Abu Dhabi Commercial Bank' },
  { firstName: 'Sharon',       email: 'sharon.koh@sg.ey.com',                    title: 'Manager, Corporate Secretarial & Entity Compliance',                              company: 'EY' },
  { firstName: 'James',        email: 'james.wilmot@natwest.com',                title: 'Transaction Monitoring Financial Crime QA Associate',                             company: 'NatWest Group' },
  { firstName: 'Sohail',       email: 'sohail.akbar@uhy-ae.com',                 title: 'Head of Compliance',                                                              company: 'UHY James' },
  { firstName: 'Vinit',        email: 'vinit.srivastava@natwest.com',            title: 'Data Analyst, AVP',                                                               company: 'NatWest Group' },
  { firstName: 'Wael',         email: 'wael.alhalabi@mbankuae.com',              title: 'SVP - Acting Chief Compliance Officer & MLRO',                                    company: 'Al Maryah Community Bank' },
  { firstName: 'Huma',         email: 'huma.syed@pay10.ae',                      title: 'Head of Compliance & MLRO (CBUAE Approved)',                                      company: 'Pay10 UAE' },
  { firstName: 'Mohamed',      email: 'ziyaulhuq@ideexchange.com',               title: 'Chief Compliance Officer',                                                        company: 'International Development Exchange' },
  { firstName: 'Venkat',       email: 'venkat.raghavan@rakbank.ae',              title: 'Chief Compliance Officer',                                                        company: 'RAKBANK' },
  { firstName: 'Abdalla',      email: 'abdallaharoun@sfm.com',                   title: 'Head of Compliance / Group Compliance Manager / MLRO',                            company: 'SFM Corporate Services' },
  { firstName: 'Renu',         email: 'renu@affiniax.com',                       title: 'Head of Compliance & MLRO',                                                       company: 'Affiniax' },
  { firstName: 'Mohamed',      email: 'mohamedamin@qnb.com',                     title: 'Head of Sanctions & Filtering - Compliance',                                      company: 'QNB Group' },
  { firstName: 'Kranthideep',  email: 'k.burra@metaworldgroups.com',             title: 'Anti-Money Laundering Analyst',                                                   company: 'METAWORLD TECHNOLOGY FZ-LLC' },
  { firstName: 'Riaz',         email: 'riaz.faiz@indexexchange.ae',              title: 'Compliance Officer',                                                              company: 'Index Exchange' },
  { firstName: 'Nadeem',       email: 'nadeem.maniar@bakertilly.ae',             title: 'Partner',                                                                         company: 'Baker Tilly UAE' },
  { firstName: 'Subhash',      email: 'subhash.jasti@earnedwealth.com',          title: 'Vice President, Enterprise Systems & IT',                                         company: 'Earned' },
  { firstName: 'Rajkumar',     email: 'rajkumar.i@icicibank.com',               title: 'Associate Leadership Team',                                                       company: 'ICICI Bank' },
  { firstName: 'Waqas',        email: 'waqas.ali@sadiqexchange.com',             title: 'Chief Compliance Officer & MLRO',                                                 company: 'Sadiq Exchange Company' },
  { firstName: 'Ike',          email: 'ike.ica@hbl.com',                         title: 'Head of Compliance, MLRO and DPO',                                                company: 'HBL' },
  { firstName: 'Kareem',       email: 'kareem.ica@hsbc.com',                     title: 'NRFB Client Implementation Manager',                                              company: 'HSBC' },
  { firstName: 'Shinu',        email: 'shinu@joyalukkasexchange.com',            title: 'Alternate Compliance Officer',                                                    company: 'Joyalukkas Exchange' },
  { firstName: 'George',       email: 'georgetarabay@equiomgroup.com',           title: 'Associate Director - Governance, Risk and Compliance',                            company: 'Equiom Group' },
  { firstName: 'Yahiya',       email: 'yahiya.hamza@dib.ae',                     title: 'Senior Assistant - Transaction Monitoring',                                       company: 'Dubai Islamic Bank' },
  { firstName: 'Neha',         email: 'neha.nigam@barclays.com',                 title: 'Director, Head of BGSC UK Branch and Service Management',                        company: 'Barclays' },
  { firstName: 'Jesu',         email: 'jesu@tflc.ae',                            title: 'Compliance Officer',                                                              company: 'Themis The Firm Legal Consultants' },
  { firstName: 'Muhammad',     email: 'muhammad.iftikhar@waystone.com',          title: 'Compliance Officer & MLRO (Authorised by DFSA, FSRA)',                            company: 'Waystone' },
  { firstName: 'Jyoti',        email: 'jyoti@niyeahma.com',                      title: 'Partner',                                                                         company: 'NIYEAHMA' },
  { firstName: 'Paul',         email: 'paml@howdengroupholdings.com',            title: 'Group Head of Economic Sanctions',                                                company: 'Howden' },
  { firstName: 'Ghaffar',      email: 'ghaffar.ica@soharinternational.com',      title: 'Regulatory Advisory & Testing',                                                   company: 'Sohar International' },
  { firstName: 'Steve',        email: 'steve.wilkins@crownagentsbank.com',       title: 'Bank Operations',                                                                 company: 'Crown Agents Bank' },
  { firstName: 'Jyoti',        email: 'jyoti@lunarrails.io',                     title: 'Compliance Officer',                                                              company: 'Lunar Ark' },
  { firstName: 'Siny',         email: 'siny.varghese@bankfab.com',               title: 'Team Lead - Investment Banking',                                                  company: 'First Abu Dhabi Bank' },
  { firstName: 'Emma',         email: 'emma.marshall@british-business-bank.co.uk', title: 'Senior Manager Fraud and Financial Crime',                                      company: 'British Business Bank' },
  { firstName: 'Awais',        email: 'awais.amjad@ecmarkets.com',               title: 'Head of Compliance & MLRO (CMA Accredited)',                                      company: 'EC Markets' },
  { firstName: 'Samir',        email: 'samir.cooraban@nomura.com',               title: 'Financial Crime Compliance Advisory (EMEA)',                                      company: 'Nomura' },
  { firstName: 'Ahmed',        email: 'aaly@banquemisr.ae',                      title: 'Compliance Officer',                                                              company: 'Banque Misr UAE' },
  { firstName: 'Zsombor',      email: 'zsombor.brommer@uab.ae',                  title: 'Chief Compliance Officer',                                                        company: 'United Arab Bank' },
  { firstName: 'Hammad',       email: 'hibrahim@riafinancial.com',               title: 'Regional Compliance Officer',                                                     company: 'Ria Money Transfer' },
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

// ─── Summary email ────────────────────────────────────────────
function buildSummaryEmail(sent, failed) {
  const rows = sent.map(l =>
    `<tr><td style="padding:4px 8px;border-bottom:1px solid #eee;">${l.firstName}</td><td style="padding:4px 8px;border-bottom:1px solid #eee;">${l.title}</td><td style="padding:4px 8px;border-bottom:1px solid #eee;">${l.company}</td><td style="padding:4px 8px;border-bottom:1px solid #eee;">${l.email}</td></tr>`
  ).join('');

  const failRows = failed.length ? failed.map(l =>
    `<tr><td style="padding:4px 8px;color:red;">${l.email}</td></tr>`
  ).join('') : '<tr><td style="padding:4px 8px;">None</td></tr>';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;padding:32px;color:#1a1a1a;">
  <h2 style="color:#C9A84C;">TalentX Market — Outreach Batch 2 Summary</h2>
  <p><strong>Total sent:</strong> ${sent.length} &nbsp;|&nbsp; <strong>Failed:</strong> ${failed.length}</p>
  <table style="border-collapse:collapse;width:100%;font-size:13px;">
    <thead>
      <tr style="background:#0A0A0A;color:#fff;">
        <th style="padding:6px 8px;text-align:left;">Name</th>
        <th style="padding:6px 8px;text-align:left;">Title</th>
        <th style="padding:6px 8px;text-align:left;">Company</th>
        <th style="padding:6px 8px;text-align:left;">Email</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  ${failed.length ? `<h3 style="color:red;margin-top:24px;">Failed</h3><table style="border-collapse:collapse;font-size:13px;"><tbody>${failRows}</tbody></table>` : ''}
</body>
</html>`;
}

// ─── Send individual email ────────────────────────────────────
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
      to:       [lead.email],
      subject:  `Your compliance expertise deserves better visibility`,
      html:     buildEmail(lead),
    }),
  });

  const data = await res.json();
  if (res.ok) {
    console.log(`✅  Sent → ${lead.firstName} <${lead.email}>`);
    return true;
  } else {
    console.error(`❌  Failed → ${lead.email}:`, JSON.stringify(data));
    return false;
  }
}

// ─── Send summary email ───────────────────────────────────────
async function sendSummary(sent, failed) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:    FROM,
      to:      [SUMMARY],
      subject: `TalentX Outreach Batch 2 — ${sent.length} emails sent`,
      html:    buildSummaryEmail(sent, failed),
    }),
  });

  if (res.ok) {
    console.log(`\n📋  Summary sent → ${SUMMARY}`);
  } else {
    const data = await res.json();
    console.error(`❌  Summary failed:`, JSON.stringify(data));
  }
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Main ─────────────────────────────────────────────────────
async function main() {
  console.log(`\n🚀  TalentX Outreach Batch 2 — sending to ${leads.length} professionals...\n`);

  const sent   = [];
  const failed = [];

  for (let i = 0; i < leads.length; i++) {
    const ok = await sendEmail(leads[i]);
    if (ok) sent.push(leads[i]); else failed.push(leads[i]);
    if (i < leads.length - 1) await delay(4000);  // 4s gap between sends
  }

  console.log(`\n📊  Done — ${sent.length} sent, ${failed.length} failed.`);
  await sendSummary(sent, failed);
  console.log('\n✅  All done. Check hello@talentxmarket.com for your summary.\n');
}

main();
