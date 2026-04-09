import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Public client — used client-side and for public reads (approved candidate cards)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client — server-side only, bypasses RLS (used in API routes + admin panel)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// TypeScript types for our tables
export type CandidateStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type SubscriptionStatus = 'free' | 'active' | 'cancelled' | 'past_due';

export interface Candidate {
  id: string;
  clerk_user_id: string;
  email: string;
  full_name?: string;
  location?: string;
  job_title?: string;
  current_company?: string;
  previous_company?: string;
  years_experience?: string;
  bio?: string;
  education?: string;
  specialisms?: string[];
  certifications?: string[];
  salary_amount?: string;
  salary_currency?: string;
  salary_period?: string;
  work_preference?: string;
  availability_status?: string;
  linkedin_url?: string;
  resume_url?: string;
  is_anonymous?: boolean;
  is_visible?: boolean;
  status?: CandidateStatus;
  profile_completion?: number;
  created_at?: string;
  updated_at?: string;
  approved_at?: string;
  approved_by?: string;
}

export interface Employer {
  id: string;
  clerk_user_id?: string;
  email: string;
  company_name: string;
  company_size?: string;
  industry?: string;
  website?: string;
  contact_name?: string;
  contact_role?: string;
  subscription_status?: SubscriptionStatus;
  subscription_tier?: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  subscription_started_at?: string;
  subscription_ends_at?: string;
  unlock_credits?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface JobRequest {
  id: string;
  employer_id: string;
  role_title: string;
  experience_level?: string;
  required_skills?: string[];
  salary_budget?: string;
  urgency?: string;
  location_preference?: string;
  work_type?: string;
  description?: string;
  status?: string;
  created_at?: string;
}

export interface Match {
  id: string;
  job_request_id: string;
  candidate_id: string;
  employer_id: string;
  match_score?: number;
  matched_by?: string;
  admin_notes?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}
