/**
 * TalentX Market — Test Candidate Seed Script
 * ============================================
 * Inserts 10 realistic test candidate profiles directly into Supabase.
 * These appear immediately on /talent (no Clerk account needed).
 *
 * Usage:
 *   cd /mnt/c/Users/soati/Documents/Claude/Projects/TalentX
 *   node scripts/seed_test_candidates.js
 *
 * To remove all test profiles later:
 *   In Supabase → Table Editor → candidates → filter by approved_by = 'seed_script' → delete
 */

const https = require('https');

// ── Config — paste your Supabase URL and service_role key ────────────────────
// Find these in: Supabase Dashboard → Project Settings → API
const SUPABASE_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL      || 'YOUR_SUPABASE_URL';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY  || 'YOUR_SERVICE_ROLE_KEY';
// ─────────────────────────────────────────────────────────────────────────────

const candidates = [
  {
    full_name:          'Amara Osei',
    email:              'amara.osei84@gmail.com',
    job_title:          'MLRO',
    location:           'London, UK',
    years_experience:   '9',
    specialisms:        ['AML', 'Financial Crime', 'Sanctions'],
    certifications:     ['CAMS', 'ICA Diploma'],
    bio:                'Senior MLRO with 9 years across retail banking and fintech. Led FCA-facing AML programmes and managed SAR filing operations for a regulated payments firm.',
    availability_status:'Available Now',
    work_preference:    'Remote',
    current_industry:   'Fintech',
    employment_type:    'Contract',
    salary_amount:      850,
    salary_currency:    'GBP',
    salary_period:      'day',
    is_anonymous:       false,
    is_visible:         true,
    status:             'approved',
    profile_completion: 95,
    approved_by:        'seed_script',
    approved_at:        new Date().toISOString(),
    clerk_user_id:      'seed_' + Math.random().toString(36).slice(2, 11),
  },
  {
    full_name:          'James Whitfield',
    email:              'j.whitfield@outlook.com',
    job_title:          'Head of Compliance',
    location:           'Manchester, UK',
    years_experience:   '12',
    specialisms:        ['Regulatory Compliance', 'FCA', 'Risk Management'],
    certifications:     ['ICA Advanced Certificate', 'CFA'],
    bio:                'Compliance leader with 12 years spanning investment management and wealth advisory. Deep FCA COBS and SYSC expertise. Available for senior interim roles.',
    availability_status:'Available Now',
    work_preference:    'Hybrid',
    current_industry:   'Investment Management',
    employment_type:    'Permanent',
    salary_amount:      110000,
    salary_currency:    'GBP',
    salary_period:      'year',
    is_anonymous:       false,
    is_visible:         true,
    status:             'approved',
    profile_completion: 90,
    approved_by:        'seed_script',
    approved_at:        new Date().toISOString(),
    clerk_user_id:      'seed_' + Math.random().toString(36).slice(2, 11),
  },
  {
    full_name:          'Fatima Al-Rashidi',
    email:              'fatima.rashidi@hotmail.com',
    job_title:          'KYC & Onboarding Manager',
    location:           'Dubai, UAE',
    years_experience:   '7',
    specialisms:        ['KYC', 'CDD', 'AML', 'DFSA'],
    certifications:     ['CAMS', 'ICA Certificate'],
    bio:                'KYC specialist with 7 years in UAE-regulated financial services. Expert in DFSA requirements, CDD frameworks, and high-risk customer onboarding. Fluent in Arabic and English.',
    availability_status:'Available in 2 Weeks',
    work_preference:    'On-site',
    current_industry:   'Banking',
    employment_type:    'Contract',
    salary_amount:      650,
    salary_currency:    'USD',
    salary_period:      'day',
    is_anonymous:       false,
    is_visible:         true,
    status:             'approved',
    profile_completion: 88,
    approved_by:        'seed_script',
    approved_at:        new Date().toISOString(),
    clerk_user_id:      'seed_' + Math.random().toString(36).slice(2, 11),
  },
  {
    full_name:          'Daniel Ferreira',
    email:              'dferreira.compliance@gmail.com',
    job_title:          'Financial Crime Analyst',
    location:           'Lisbon, Portugal',
    years_experience:   '5',
    specialisms:        ['Financial Crime', 'Transaction Monitoring', 'Sanctions'],
    certifications:     ['CAMS'],
    bio:                'Financial crime analyst with 5 years in crypto and e-money firms. Strong background in transaction monitoring rule-tuning and OFAC/EU sanctions screening.',
    availability_status:'Available Now',
    work_preference:    'Remote',
    current_industry:   'Crypto / Web3',
    employment_type:    'Contract',
    salary_amount:      500,
    salary_currency:    'EUR',
    salary_period:      'day',
    is_anonymous:       false,
    is_visible:         true,
    status:             'approved',
    profile_completion: 85,
    approved_by:        'seed_script',
    approved_at:        new Date().toISOString(),
    clerk_user_id:      'seed_' + Math.random().toString(36).slice(2, 11),
  },
  {
    full_name:          'Ngozi Eze',
    email:              'ngozi.eze@yahoo.com',
    job_title:          'MLRO / Deputy MLRO',
    location:           'Lagos, Nigeria',
    years_experience:   '10',
    specialisms:        ['AML', 'MLRO', 'CBN Regulations', 'Financial Crime'],
    certifications:     ['CAMS', 'CFE'],
    bio:                'Licensed MLRO with 10 years in Nigerian banking sector. Extensive CBN and NFIU compliance experience. Led AML uplift projects at two Tier-1 banks.',
    availability_status:'Available Now',
    work_preference:    'Remote',
    current_industry:   'Banking',
    employment_type:    'Permanent',
    salary_amount:      95000,
    salary_currency:    'USD',
    salary_period:      'year',
    is_anonymous:       false,
    is_visible:         true,
    status:             'approved',
    profile_completion: 92,
    approved_by:        'seed_script',
    approved_at:        new Date().toISOString(),
    clerk_user_id:      'seed_' + Math.random().toString(36).slice(2, 11),
  },
  {
    full_name:          'Sophie Laurent',
    email:              'sophie.laurent77@gmail.com',
    job_title:          'Trust & Safety Lead',
    location:           'Paris, France',
    years_experience:   '6',
    specialisms:        ['Trust & Safety', 'Content Policy', 'Risk Management'],
    certifications:     ['ICA Certificate'],
    bio:                'Trust & Safety professional with 6 years at a major social platform. Policy development, abuse investigation, and cross-functional risk programmes. GDPR compliance experience.',
    availability_status:'Available in 1 Month',
    work_preference:    'Remote',
    current_industry:   'Tech / SaaS',
    employment_type:    'Permanent',
    salary_amount:      90000,
    salary_currency:    'EUR',
    salary_period:      'year',
    is_anonymous:       false,
    is_visible:         true,
    status:             'approved',
    profile_completion: 87,
    approved_by:        'seed_script',
    approved_at:        new Date().toISOString(),
    clerk_user_id:      'seed_' + Math.random().toString(36).slice(2, 11),
  },
  {
    full_name:          'Marcus Webb',
    email:              'm.webb.compliance@gmail.com',
    job_title:          'Compliance Officer',
    location:           'Edinburgh, UK',
    years_experience:   '8',
    specialisms:        ['FCA', 'SMCR', 'Consumer Duty', 'Regulatory Compliance'],
    certifications:     ['ICA Diploma', 'CISI'],
    bio:                'Experienced compliance officer with 8 years in UK retail banking and insurance. Consumer Duty implementation lead. Strong FCA supervisory relationship management.',
    availability_status:'Available Now',
    work_preference:    'Hybrid',
    current_industry:   'Insurance',
    employment_type:    'Permanent',
    salary_amount:      85000,
    salary_currency:    'GBP',
    salary_period:      'year',
    is_anonymous:       false,
    is_visible:         true,
    status:             'approved',
    profile_completion: 91,
    approved_by:        'seed_script',
    approved_at:        new Date().toISOString(),
    clerk_user_id:      'seed_' + Math.random().toString(36).slice(2, 11),
  },
  {
    full_name:          'Priya Menon',
    email:              'priyamenon.risk@gmail.com',
    job_title:          'Sanctions Compliance Specialist',
    location:           'Singapore',
    years_experience:   '7',
    specialisms:        ['Sanctions', 'AML', 'MAS', 'Trade Finance'],
    certifications:     ['CAMS', 'CGSS'],
    bio:                'Sanctions specialist with 7 years across Singapore-regulated trade finance and correspondent banking. MAS Notice 626 expert. CGSS certified. Strong OFAC and EU sanctions background.',
    availability_status:'Available Now',
    work_preference:    'Hybrid',
    current_industry:   'Banking',
    employment_type:    'Contract',
    salary_amount:      800,
    salary_currency:    'SGD',
    salary_period:      'day',
    is_anonymous:       false,
    is_visible:         true,
    status:             'approved',
    profile_completion: 93,
    approved_by:        'seed_script',
    approved_at:        new Date().toISOString(),
    clerk_user_id:      'seed_' + Math.random().toString(36).slice(2, 11),
  },
  {
    full_name:          'Kofi Asante',
    email:              'kofi.asante@outlook.com',
    job_title:          'AML Consultant',
    location:           'Accra, Ghana',
    years_experience:   '11',
    specialisms:        ['AML', 'Financial Crime', 'Regulatory Advisory', 'Training'],
    certifications:     ['CAMS', 'ICA Diploma', 'CFE'],
    bio:                'Senior AML consultant with 11 years advising banks and fintechs across West Africa. FATF mutual evaluation experience. Delivers AML training programmes and gap assessments.',
    availability_status:'Available Now',
    work_preference:    'Remote',
    current_industry:   'Consultancy',
    employment_type:    'Contract',
    salary_amount:      700,
    salary_currency:    'USD',
    salary_period:      'day',
    is_anonymous:       false,
    is_visible:         true,
    status:             'approved',
    profile_completion: 96,
    approved_by:        'seed_script',
    approved_at:        new Date().toISOString(),
    clerk_user_id:      'seed_' + Math.random().toString(36).slice(2, 11),
  },
  {
    full_name:          'Elena Russo',
    email:              'elena.russo.aml@gmail.com',
    job_title:          'Risk & Compliance Manager',
    location:           'Milan, Italy',
    years_experience:   '9',
    specialisms:        ['Operational Risk', 'Regulatory Compliance', 'DORA', 'ESG Risk'],
    certifications:     ['ICA Advanced Certificate', 'FRM'],
    bio:                'Risk & compliance manager with 9 years in Italian and EU-regulated banking. Currently navigating DORA implementation. ESG and climate risk framework experience.',
    availability_status:'Available in 2 Weeks',
    work_preference:    'Hybrid',
    current_industry:   'Banking',
    employment_type:    'Permanent',
    salary_amount:      100000,
    salary_currency:    'EUR',
    salary_period:      'year',
    is_anonymous:       false,
    is_visible:         true,
    status:             'approved',
    profile_completion: 89,
    approved_by:        'seed_script',
    approved_at:        new Date().toISOString(),
    clerk_user_id:      'seed_' + Math.random().toString(36).slice(2, 11),
  },
];

// ── Insert via Supabase REST API ──────────────────────────────────────────────

function supabaseInsert(rows) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(rows);
    const url  = new URL(`${SUPABASE_URL}/rest/v1/candidates`);

    const options = {
      hostname: url.hostname,
      path:     url.pathname,
      method:   'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Prefer':        'return=representation',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function run() {
  if (SUPABASE_URL === 'YOUR_SUPABASE_URL') {
    console.error('❌  Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first.');
    console.error('    Run: export NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co');
    console.error('         export SUPABASE_SERVICE_ROLE_KEY=eyJ...');
    process.exit(1);
  }

  console.log(`\nInserting ${candidates.length} test candidates...`);
  try {
    const result = await supabaseInsert(candidates);
    console.log(`\n✅  ${result.length} candidates inserted successfully.`);
    console.log('   They are now live on /talent\n');
    console.log('To remove them later:');
    console.log('  Supabase → Table Editor → candidates → filter approved_by = seed_script → delete\n');
  } catch (err) {
    console.error('❌  Insert failed:', err.message);
  }
}

run();
