-- ============================================================
-- TALENTX MARKET — SUPABASE DATABASE SCHEMA
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================
-- 1. CANDIDATES
-- Linked to Clerk via clerk_user_id
-- ============================================================
CREATE TABLE candidates (
  id                   UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  clerk_user_id        TEXT UNIQUE NOT NULL,
  email                TEXT UNIQUE NOT NULL,

  -- Profile
  full_name            TEXT,
  location             TEXT,
  current_role         TEXT,             -- Job title e.g. "Senior MLRO"
  current_company      TEXT,
  previous_company     TEXT,
  years_experience     TEXT,             -- e.g. "5–8 years"
  bio                  TEXT,             -- Professional summary (max 300 chars)
  education            TEXT,

  -- Skills & Certs (stored as arrays for Phase 1)
  specialisms          TEXT[],           -- ['AML', 'KYC', 'Sanctions']
  certifications       TEXT[],           -- ['CAMS', 'ICA', 'CFE']

  -- Preferences
  salary_amount        TEXT,
  salary_currency      TEXT DEFAULT 'GBP',
  salary_period        TEXT DEFAULT 'Year',
  work_preference      TEXT DEFAULT 'Both', -- 'On-site', 'Remote', 'Both'
  availability_status  TEXT DEFAULT 'Available Now', -- 'Available Now', 'Open to Offers', 'Not Looking'

  -- Locked fields (only visible post-subscription unlock)
  linkedin_url         TEXT,
  resume_url           TEXT,

  -- Privacy & Approval
  is_anonymous         BOOLEAN DEFAULT TRUE,
  is_visible           BOOLEAN DEFAULT TRUE,
  status               TEXT DEFAULT 'pending',
  -- 'pending'   = signed up, awaiting admin approval
  -- 'approved'  = live on /talent page
  -- 'rejected'  = not approved
  -- 'suspended' = removed from listing

  -- Profile completeness (0–100)
  profile_completion   INTEGER DEFAULT 0,

  -- Timestamps
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW(),
  approved_at          TIMESTAMPTZ,
  approved_by          TEXT          -- clerk_user_id of admin who approved
);


-- ============================================================
-- 2. EMPLOYERS
-- ============================================================
CREATE TABLE employers (
  id                      UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  clerk_user_id           TEXT UNIQUE,   -- NULL until employer creates account
  email                   TEXT UNIQUE NOT NULL,

  -- Company
  company_name            TEXT NOT NULL,
  company_size            TEXT,          -- '1–10', '11–50', '51–200', '200+'
  industry                TEXT,
  website                 TEXT,

  -- Contact
  contact_name            TEXT,
  contact_role            TEXT,          -- e.g. "Head of Talent"

  -- Subscription (Stripe — Phase 2)
  subscription_status     TEXT DEFAULT 'free',  -- 'free', 'active', 'cancelled', 'past_due'
  subscription_tier       TEXT,                 -- 'starter', 'growth', 'enterprise'
  stripe_customer_id      TEXT,
  stripe_subscription_id  TEXT,
  subscription_started_at TIMESTAMPTZ,
  subscription_ends_at    TIMESTAMPTZ,

  -- Free tier limits
  unlock_credits          INTEGER DEFAULT 2,    -- free employers get 2 profile unlocks

  -- Status
  status                  TEXT DEFAULT 'active', -- 'active', 'suspended'
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 3. JOB REQUESTS
-- Employer submits "Get Matched" — admin handles the rest
-- ============================================================
CREATE TABLE job_requests (
  id                  UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  employer_id         UUID REFERENCES employers(id) ON DELETE CASCADE,

  -- Role details
  role_title          TEXT NOT NULL,
  experience_level    TEXT,             -- 'Junior', 'Mid', 'Senior', 'Head', 'Director'
  required_skills     TEXT[],
  salary_budget       TEXT,
  urgency             TEXT,             -- 'ASAP', 'Within 1 month', 'Within 3 months'
  location_preference TEXT,
  work_type           TEXT,             -- 'Remote', 'Hybrid', 'On-site'
  description         TEXT,

  -- Status
  status              TEXT DEFAULT 'open',
  -- 'open'        = submitted, waiting for admin to shortlist
  -- 'shortlisted' = admin has selected candidates
  -- 'filled'      = role has been filled
  -- 'closed'      = closed without filling

  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 4. MATCHES
-- Admin-created matches between a job request and a candidate
-- ============================================================
CREATE TABLE matches (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_request_id   UUID REFERENCES job_requests(id) ON DELETE CASCADE,
  candidate_id     UUID REFERENCES candidates(id) ON DELETE CASCADE,
  employer_id      UUID REFERENCES employers(id) ON DELETE CASCADE,

  -- Scoring (Phase 2 — AI)
  match_score      INTEGER,             -- 0–100
  matched_by       TEXT DEFAULT 'admin', -- 'admin' or 'system'
  admin_notes      TEXT,

  -- Pipeline status
  status           TEXT DEFAULT 'shortlisted',
  -- 'shortlisted'          = admin picked candidate
  -- 'sent_to_employer'     = employer has seen shortlist
  -- 'employer_interested'  = employer wants to proceed
  -- 'candidate_notified'   = candidate told about opportunity
  -- 'accepted'             = candidate accepted intro
  -- 'declined'             = candidate declined
  -- 'interviewing'         = interview scheduled
  -- 'hired'                = placed!
  -- 'rejected'             = employer passed

  -- Timestamps
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  updated_at               TIMESTAMPTZ DEFAULT NOW(),
  employer_responded_at    TIMESTAMPTZ,
  candidate_responded_at   TIMESTAMPTZ,

  UNIQUE(job_request_id, candidate_id)
);


-- ============================================================
-- 5. UNLOCK LOGS
-- Track which employer paid to unlock which candidate profile
-- Critical for Stripe paywall enforcement
-- ============================================================
CREATE TABLE unlock_logs (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  employer_id   UUID REFERENCES employers(id) ON DELETE CASCADE,
  candidate_id  UUID REFERENCES candidates(id) ON DELETE CASCADE,
  unlocked_at   TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(employer_id, candidate_id)  -- one unlock per employer-candidate pair
);


-- ============================================================
-- 6. ACTIVITY LOGS
-- Analytics engine — track every key event
-- ============================================================
CREATE TABLE activity_logs (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  actor_type   TEXT NOT NULL,   -- 'candidate', 'employer', 'admin', 'system'
  actor_id     UUID,            -- references candidates.id or employers.id
  event_type   TEXT NOT NULL,
  -- 'profile_viewed', 'card_viewed', 'profile_unlocked',
  -- 'match_created', 'interview_scheduled', 'hired',
  -- 'signup', 'profile_updated', 'visibility_toggled'
  entity_type  TEXT,            -- 'candidate', 'employer', 'match', 'job_request'
  entity_id    UUID,
  metadata     JSONB,           -- any extra context
  created_at   TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 7. SKILLS (Normalised — Phase 2 ready)
-- ============================================================
CREATE TABLE skills (
  id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name       TEXT UNIQUE NOT NULL,
  category   TEXT,              -- 'Regulatory', 'Technical', 'Soft'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE candidate_skills (
  candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
  skill_id     UUID REFERENCES skills(id) ON DELETE CASCADE,
  proficiency  TEXT,            -- 'Beginner', 'Intermediate', 'Expert'
  PRIMARY KEY (candidate_id, skill_id)
);


-- ============================================================
-- 8. CERTIFICATIONS (Normalised — Phase 2 ready)
-- ============================================================
CREATE TABLE certifications (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name         TEXT UNIQUE NOT NULL,      -- 'CAMS'
  full_name    TEXT,                      -- 'Certified Anti-Money Laundering Specialist'
  issuing_body TEXT,                      -- 'ACAMS'
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE candidate_certifications (
  candidate_id      UUID REFERENCES candidates(id) ON DELETE CASCADE,
  certification_id  UUID REFERENCES certifications(id) ON DELETE CASCADE,
  verified          BOOLEAN DEFAULT FALSE,
  issued_at         DATE,
  expires_at        DATE,
  PRIMARY KEY (candidate_id, certification_id)
);


-- ============================================================
-- INDEXES — Performance
-- ============================================================
CREATE INDEX idx_candidates_status         ON candidates(status);
CREATE INDEX idx_candidates_clerk          ON candidates(clerk_user_id);
CREATE INDEX idx_candidates_visible        ON candidates(is_visible, status);
CREATE INDEX idx_employers_clerk           ON employers(clerk_user_id);
CREATE INDEX idx_employers_stripe          ON employers(stripe_customer_id);
CREATE INDEX idx_matches_status            ON matches(status);
CREATE INDEX idx_matches_employer          ON matches(employer_id);
CREATE INDEX idx_matches_candidate         ON matches(candidate_id);
CREATE INDEX idx_activity_actor            ON activity_logs(actor_type, actor_id);
CREATE INDEX idx_activity_event            ON activity_logs(event_type);
CREATE INDEX idx_unlock_employer           ON unlock_logs(employer_id);
CREATE INDEX idx_unlock_candidate          ON unlock_logs(candidate_id);


-- ============================================================
-- AUTO updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_candidates_updated_at
  BEFORE UPDATE ON candidates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_employers_updated_at
  BEFORE UPDATE ON employers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_job_requests_updated_at
  BEFORE UPDATE ON job_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_matches_updated_at
  BEFORE UPDATE ON matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Candidates can only read/write their own record.
-- Service role (admin API) bypasses RLS entirely.
-- ============================================================
ALTER TABLE candidates              ENABLE ROW LEVEL SECURITY;
ALTER TABLE employers               ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_requests            ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE unlock_logs             ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs           ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_skills        ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_certifications ENABLE ROW LEVEL SECURITY;

-- Public can read approved + visible candidate cards (the /talent page)
CREATE POLICY "Public read approved candidates"
  ON candidates FOR SELECT
  USING (status = 'approved' AND is_visible = TRUE);

-- Candidates can read and update their own record
CREATE POLICY "Candidate reads own record"
  ON candidates FOR SELECT
  USING (auth.uid()::text = clerk_user_id);

CREATE POLICY "Candidate updates own record"
  ON candidates FOR UPDATE
  USING (auth.uid()::text = clerk_user_id);


-- ============================================================
-- SEED DATA — Skills
-- ============================================================
INSERT INTO skills (name, category) VALUES
  ('AML', 'Regulatory'),
  ('KYC / Customer Due Diligence', 'Regulatory'),
  ('Sanctions & Screening', 'Regulatory'),
  ('Financial Crime', 'Regulatory'),
  ('Risk Management', 'Technical'),
  ('MLRO', 'Regulatory'),
  ('Trust & Safety', 'Technical'),
  ('Fraud Prevention', 'Technical'),
  ('Transaction Monitoring', 'Technical'),
  ('Regulatory Compliance', 'Regulatory'),
  ('Data Privacy / GDPR', 'Regulatory'),
  ('Compliance Advisory', 'Soft'),
  ('Internal Audit', 'Technical'),
  ('Due Diligence', 'Technical'),
  ('Policy Writing', 'Soft'),
  ('Stakeholder Management', 'Soft'),
  ('Training & Education', 'Soft'),
  ('FATF', 'Regulatory'),
  ('FCA Regulations', 'Regulatory'),
  ('MiFID II', 'Regulatory'),
  ('PSD2', 'Regulatory'),
  ('Basel III', 'Regulatory')
ON CONFLICT (name) DO NOTHING;


-- ============================================================
-- SEED DATA — Certifications
-- ============================================================
INSERT INTO certifications (name, full_name, issuing_body) VALUES
  ('CAMS',  'Certified Anti-Money Laundering Specialist',         'ACAMS'),
  ('CGSS',  'Certified Global Sanctions Specialist',              'ACAMS'),
  ('CCAS',  'Certified Crypto Asset Specialist',                  'ACAMS'),
  ('CFE',   'Certified Fraud Examiner',                           'ACFE'),
  ('ICA',   'ICA International Diploma in Compliance',            'ICA'),
  ('CKYC',  'Certified Know Your Customer Professional',          'ACAMS'),
  ('ACAMS', 'ACAMS Member',                                       'ACAMS'),
  ('CRCM',  'Certified Regulatory Compliance Manager',            'ABA'),
  ('CFCS',  'Certified Financial Crime Specialist',               'ACFCS'),
  ('FRM',   'Financial Risk Manager',                             'GARP'),
  ('CIPP',  'Certified Information Privacy Professional',         'IAPP'),
  ('CRISC', 'Certified in Risk and Information Systems Control',  'ISACA')
ON CONFLICT (name) DO NOTHING;


-- ============================================================
-- DONE ✓
-- Tables created: candidates, employers, job_requests, matches,
--   unlock_logs, activity_logs, skills, candidate_skills,
--   certifications, candidate_certifications
-- ============================================================
