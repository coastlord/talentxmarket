import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy singletons — only instantiated when first used (not at build time)
let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error('Missing Supabase public env vars');
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error(`Missing Supabase admin env vars: url=${url ? 'OK' : 'MISSING'}, key=${key ? 'OK' : 'MISSING'}`);
    _supabaseAdmin = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return _supabaseAdmin;
}

// Convenience aliases — Proxy with correct method binding so 'this' is preserved
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const client = getSupabase();
    const value = (client as any)[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const client = getSupabaseAdmin();
    const value = (client as any)[prop];
    return typeof value === 'function' ? value.bind(client) : value;
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
