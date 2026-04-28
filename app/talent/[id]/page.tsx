// ─── TalentX Market — Public Shareable Candidate Profile ─────────────────────
// Server-rendered page. Shows public info only — no contact details.
// Contact details (email, phone, LinkedIn) stay behind the unlock gate on /talent.

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabaseAdmin } from '@/lib/supabase';

type Props = { params: { id: string } };

// ─── Fetch helper — reused in both generateMetadata + Page ───────────────────
async function getCandidate(id: string) {
  const { data } = await supabaseAdmin
    .from('candidates')
    .select(
      'id, full_name, job_title, location, years_experience, specialisms, certifications, bio, availability_status, work_preference, current_industry, employment_type, other_certification, certification_verified'
    )
    .eq('id', id)
    .eq('status', 'approved')
    .eq('is_visible', true)
    .single();
  return data;
}

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const candidate = await getCandidate(params.id);

  if (!candidate) {
    return { title: 'Compliance Professional | TalentX Market' };
  }

  const name    = candidate.full_name  || 'Compliance Professional';
  const title   = candidate.job_title  || 'Compliance Professional';
  const loc     = candidate.location   ? ` · ${candidate.location}` : '';
  const desc    = candidate.bio
    ? candidate.bio.slice(0, 160)
    : `${title} available for compliance roles on TalentX Market — the verified compliance talent platform.`;

  return {
    title:       `${name} — ${title}${loc} | TalentX Market`,
    description: desc,
    openGraph: {
      title:       `${name} — ${title} | TalentX Market`,
      description: desc,
      url:         `https://talentxmarket.com/talent/${params.id}`,
      siteName:    'TalentX Market',
      type:        'profile',
    },
    twitter: {
      card:        'summary',
      title:       `${name} — ${title} | TalentX Market`,
      description: desc,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function TalentProfilePage({ params }: Props) {
  const candidate = await getCandidate(params.id);
  if (!candidate) notFound();

  const name          = candidate.full_name || 'Compliance Professional';
  const title         = candidate.job_title || 'Compliance Professional';
  const specialisms   = (candidate.specialisms || []) as string[];
  const certifications = [
    ...((candidate.certifications || []) as string[]).filter((c: string) => c !== 'None'),
    ...(candidate.other_certification ? [candidate.other_certification as string] : []),
  ];
  const isAvailableNow = (candidate.availability_status || '').toLowerCase().includes('available now');
  const initials = name.trim().split(/\s+/).map((w: string) => w[0]).filter(Boolean).join('').slice(0, 2).toUpperCase() || 'TX';

  return (
    <div>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">

        {/* ── Hero ── */}
        <div className="bg-brand-black pt-20 pb-10 px-4">
          <div className="max-w-3xl mx-auto">

            {/* Back link */}
            <Link
              href="/talent"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-brand-gold text-xs font-medium mb-7 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Browse all compliance talent
            </Link>

            {/* Profile header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center flex-shrink-0">
                <span className="text-brand-gold text-xl font-black">{initials}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <h1 className="text-2xl font-black text-white leading-tight">{name}</h1>
                  {candidate.certification_verified !== false && certifications.length > 0 && (
                    <span className="inline-flex items-center gap-1 bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[10px] font-bold px-2 py-1 rounded-full">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-white/60 text-sm">{title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">

          {/* Availability + meta row */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="flex flex-wrap items-center gap-3">
              {isAvailableNow ? (
                <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Available Now
                </span>
              ) : candidate.availability_status ? (
                <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  {candidate.availability_status}
                </span>
              ) : null}

              {candidate.location && (
                <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                  <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {candidate.location}
                </span>
              )}

              {candidate.years_experience && (
                <span className="text-sm text-gray-500">· {candidate.years_experience}</span>
              )}

              {candidate.work_preference && (
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  {candidate.work_preference}
                </span>
              )}

              {candidate.current_industry && (
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  {candidate.current_industry}
                </span>
              )}
            </div>
          </div>

          {/* Bio */}
          {candidate.bio && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">About</p>
              <p className="text-sm text-gray-700 leading-relaxed">{candidate.bio}</p>
            </div>
          )}

          {/* Specialisms */}
          {specialisms.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Specialisms</p>
              <div className="flex flex-wrap gap-2">
                {specialisms.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {certifications.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold bg-brand-black px-3 py-1.5 rounded-full"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
                    </svg>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Locked contact section */}
          <div className="bg-brand-black rounded-2xl p-6">
            <p className="text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-2">Full Profile — Locked</p>
            <p className="text-white text-sm font-semibold mb-1">Contact details available to verified employers</p>
            <p className="text-white/50 text-xs leading-relaxed mb-5">
              Email, phone number, LinkedIn profile, and full work history are unlockable on TalentX Market. First 3 unlocks are free.
            </p>

            <div className="space-y-2.5 mb-6">
              {[
                'Direct email address',
                'Phone number',
                'LinkedIn profile URL',
                'Full work history & education',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <span className="text-white/40 text-xs">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/talent"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-black text-sm font-bold px-6 py-3 rounded-xl hover:bg-brand-gold/90 transition-colors"
            >
              Unlock Full Profile →
            </Link>
            <p className="text-white/30 text-[11px] mt-3">
              Browse all verified compliance professionals on TalentX Market
            </p>
          </div>

          {/* Trust footer */}
          <div className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl px-4 py-3">
            <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-xs text-gray-500">
              Profile manually verified by TalentX Market · Candidate has consented to employer contact
            </p>
          </div>

          {/* Discover more */}
          <div className="text-center py-4">
            <p className="text-sm text-gray-400 mb-3">Looking for more compliance talent?</p>
            <Link
              href="/talent"
              className="inline-flex items-center gap-2 bg-brand-black text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all duration-200"
            >
              Browse All Professionals
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
