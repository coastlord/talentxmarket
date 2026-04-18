'use client';

import Link from 'next/link';

export default function SignUp() {
  return (
    <div>

      {/* ── CANDIDATE CTA ────────────────────────────────────────────── */}
      <section id="open-to-work" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: value proposition */}
            <div>
              <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full border border-green-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                For Compliance Professionals
              </span>
              <h2 className="text-4xl font-black text-brand-dark leading-tight mb-6">
                Your Next Move
                <span className="block text-brand-gold">Starts Here.</span>
              </h2>
              <p className="text-brand-gray leading-relaxed mb-8 text-lg">
                Stop waiting for the right role to find you. Create your profile,
                signal your availability, and let vetted compliance employers
                come to you — on your terms, at your pace.
              </p>
              <ul className="space-y-4">
                {[
                  { text: 'Visible only to verified, compliance-specific employers' },
                  { text: 'Control your availability status at any time' },
                  { text: 'Specify role type: permanent, contract or interim' },
                  { text: 'Your contact details stay private until you are unlocked' },
                  { text: 'Completely free for compliance professionals' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-brand-dark text-sm leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: sign-up card */}
            <div className="relative">
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-brand-gold/5 rounded-3xl blur-xl pointer-events-none" />

              <div className="relative bg-brand-black rounded-3xl p-10 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold/3 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-bold uppercase tracking-widest">
                      Now Accepting Profiles
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-3xl font-black text-white leading-tight mb-3">
                    Ready to be
                    <span className="block text-brand-gold">discovered?</span>
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-8">
                    Create your profile in minutes. Our team reviews every
                    application — once approved, you are live and visible
                    to compliance employers actively hiring.
                  </p>

                  {/* Primary CTA */}
                  <Link
                    href="/sign-up"
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-brand-gold text-brand-black font-bold rounded-xl hover:bg-[#E8C97A] transition-all duration-200 text-base shadow-xl shadow-brand-gold/25 hover:-translate-y-0.5 mb-3"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Create Your Profile — It&apos;s Free
                  </Link>

                  {/* Secondary CTA */}
                  <Link
                    href="/sign-in"
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white/8 text-white font-semibold rounded-xl border border-white/15 hover:bg-white/15 hover:border-white/30 transition-all duration-200 text-sm mb-8"
                  >
                    Already a member? Sign In
                    <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>

                  {/* Divider */}
                  <div className="border-t border-white/10 pt-6">
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

      {/* ── EMPLOYER: Browse and Hire ────────────────────────────────── */}
      <section id="hiring" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-semibold px-4 py-2 rounded-full border border-[#C9A84C]/30 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                For Employers
              </span>
              <h2 className="text-4xl font-black text-white leading-tight mb-6">
                Browse Vetted Talent.
                <span className="block text-[#C9A84C]">Unlock Who You Want.</span>
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                No job postings. No CV sifting. Browse our pool of pre-qualified compliance
                professionals and unlock the profiles that matter to you.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Every profile is a compliance specialist — no noise',
                  'See role, skills, certifications and availability upfront',
                  'Unlock full contact details when you find the right person',
                  'AML, MLRO, KYC, Risk, Trust & Safety, Sanctions',
                  'Permanent, contract and interim available',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/talent"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A84C] text-[#0A0A0A] font-bold rounded-xl hover:bg-[#E8C97A] transition-all duration-200 text-base shadow-xl shadow-[#C9A84C]/20 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Browse the Talent Pool
                <span className="opacity-70">→</span>
              </Link>
            </div>
            <div className="space-y-4">
              {[
                {
                  step: '01', title: 'Browse Profiles',
                  desc: 'Explore compliance professionals filtered by role, skills, certifications and availability.',
                  icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>),
                },
                {
                  step: '02', title: 'Unlock a Profile',
                  desc: 'Found the right person? Click Unlock to verify your company and access their full contact details.',
                  icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11V7a5 5 0 019.9-1" /></svg>),
                },
                {
                  step: '03', title: 'Make Contact',
                  desc: 'Connect directly — no agency middleman, no recruiter fees. Just you and the right candidate.',
                  icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>),
                },
              ].map(({ step, title, desc, icon }) => (
                <div key={step} className="flex gap-5 p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-[#C9A84C]/30 transition-colors duration-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]">
                    {icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-widest text-[#C9A84C]/60 uppercase">{step}</span>
                      <span className="text-white font-bold text-sm">{title}</span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
