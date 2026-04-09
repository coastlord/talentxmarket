import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Only return candidates that are approved + visible
    const { data, error } = await supabaseAdmin
      .from('candidates')
      .select(
        'id, full_name, job_title, location, years_experience, specialisms, certifications, bio, availability_status, work_preference, salary_amount, salary_currency, salary_period, is_anonymous, status, is_visible'
      )
      .eq('status', 'approved')
      .eq('is_visible', true)
      .order('approved_at', { ascending: false });

    if (error) {
      console.error('Supabase talent fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Shape the data for the talent card UI
    const sanitized = (data || []).map((candidate) => {
      // Derive initials — never expose the actual name on the public card
      const fullName: string = candidate.full_name || '';
      const nameParts = fullName.trim().split(' ').filter(Boolean);
      let initials = 'TX';
      if (nameParts.length === 1) initials = nameParts[0].slice(0, 2).toUpperCase();
      else if (nameParts.length >= 2)
        initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();

      return {
        id:                 candidate.id,
        initials,
        availabilityStatus: candidate.availability_status || 'Available Now',
        role:               candidate.job_title           || 'Compliance Professional',
        location:           candidate.location            || '',
        experience:         candidate.years_experience    || '',
        skills:             candidate.specialisms         || [],
        certifications:     candidate.certifications      || [],
        headline:           candidate.bio                 || '',
        workPreference:     candidate.work_preference     || '',
        salaryAmount:       candidate.salary_amount       || '',
        salaryCurrency:     candidate.salary_currency     || 'GBP',
        salaryPeriod:       candidate.salary_period       || 'Year',
        isAnonymous:        candidate.is_anonymous        ?? true,
      };
    });

    return NextResponse.json(sanitized);
  } catch (err) {
    console.error('Talent fetch error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
