'use client';

import Link from 'next/link';

export default function SignUp() {
  return (
    <section id="get-started" className="py-14 md:py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-stretch">

          {/* ── LEFT: FOR EMPLOYERS ─────────────────────────────────── */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col">
            <span className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold text-sm font-semibold px-4 py-2 rounded-full border border-brand-gold/30 mb-5 md:mb-8 self-start">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              For Employers
            </span>

            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3 md:mb-4">
              Browse Vetted Talent.
              <span className="block text-brand-gold">Unlock Who You Want.</span>
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-5 md:mb-8">
              No job postings. No CV sifting. Browse our pool of pre-qualified compliance
              professionals and unlock the profiles that matter to you.
            </p>

            {/* Bullet list — hidden on mobile */}
            <ul className="hidden md:block space-y-3 mb-10 flex-1">
              {[
                'Every profile is a compliance specialist — no noise',
                'See role, skills, certifications and availability upfront',
                'Unlock full contact details when you find the right person',
                'AML, MLRO, KYC, Risk, Trust & Safety, Sanctions',
                'Permanent, contract and interim available',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {/* Mobile: compact spec chips */}
            <div className="md:hidden flex flex-wrap gap-2 mb-5">
              {['AML', 'MLRO', 'KYC', 'Risk', 'Sanctions', 'Trust & Safety'].map(t => (
                <span key={t} className="text-[11px] font-medium text-white/60 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>

            <Link
              href="/talent"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-gold text-brand-black font-bold rounded-xl hover:bg-[#E8C97A] transition-all duration-200 text-base shadow-xl shadow-brand-gold/20 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Browse the Talent Pool →
            </Link>
          </div>

          {/* ── RIGHT: FOR PROFESSIONALS ────────────────────────────── */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-brand-gold/10 rounded-3xl blur-xl pointer-events-none" />
            <div className="relative bg-brand-black border border-brand-gold/20 rounded-3xl p-6 md:p-10 overflow-hidden h-full flex flex-col">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold/3 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="relative flex flex-col flex-1">
                {/* Eyebrow */}
                <div className="flex items-center gap-2 mb-8">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-bold uppercase tracking-widest">
                    Now Accepting Profiles
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                  Ready to be
                  <span className="block text-brand-gold">discovered?</span>
                </h2>
                <p className="text-white/70 text-sm leading-relaxed mb-5 md:mb-8">
                  Create your profile in minutes. Our team reviews every application — once
                  approved, you are live and visible to compliance employers actively hiring.
                </p>

                {/* CTAs */}
                <Link
                  href="/sign-up"
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-brand-gold text-brand-black font-bold rounded-xl hover:bg-[#E8C97A] transition-all duration-200 text-base shadow-xl shadow-brand-gold/25 hover:-translate-y-0.5 mb-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Create Your Profile — It&apos;s Free
                </Link>

                <Link
                  href="/sign-in"
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white/8 text-white font-semibold rounded-xl border border-white/15 hover:bg-white/15 hover:border-white/30 transition-all duration-200 text-sm mb-8"
                >
                  Already a member? Sign In
                  <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                {/* Steps — hidden on mobile */}
                <div className="hidden md:block border-t border-white/10 pt-6 mt-auto">
                  <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-4">
                    What happens after you sign up
                  </p>
                  <div className="space-y-3">
                    {[
                      { step: '1', text: 'Build your compliance profile' },
                      { step: '2', text: 'Our team manually reviews and approves' },
                      { step: '3', text: 'Your profile goes live — employers find you' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full border border-brand-gold/30 bg-brand-gold/10 flex items-center justify-center text-brand-gold text-xs font-black flex-shrink-0">
                          {item.step}
                        </span>
                        <span className="text-white/70 text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
