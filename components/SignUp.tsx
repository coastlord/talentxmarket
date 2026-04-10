'use client';

import Link from 'next/link';

const PROFESSIONAL_FORM_ID = 'D4VGWb';

function TallyEmbed({ formId, title }: { formId: string; title: string }) {
  return (
    <div style={{ width: '100%' }}>
      <iframe
        src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
        width="100%"
        height="600"
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title={title}
        style={{ minHeight: '500px' }}
      />
    </div>
  );
}

export default function SignUp() {
  return (
    <div>

      {/* CANDIDATE: Open to Work */}
      <section id="open-to-work" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full border border-green-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                For Compliance Professionals
              </span>
              <h2 className="text-4xl font-black text-brand-dark leading-tight mb-6">
                Post Your
                <span className="block text-brand-gold">Availability</span>
              </h2>
              <p className="text-brand-gray leading-relaxed mb-8">
                Let compliance-focused employers know you&apos;re open to the right opportunity.
                Register your availability in minutes and get matched with relevant roles.
              </p>
              <ul className="space-y-4">
                {[
                  'Visible to compliance-specific employers only',
                  'Control your availability status at any time',
                  'Specify role type: permanent, contract, or interim',
                  'Set your preferred location and remote preferences',
                  'Completely free for compliance professionals',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-brand-dark text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-off-white rounded-2xl p-8 border border-brand-light-gray">
              <TallyEmbed formId={PROFESSIONAL_FORM_ID} title="Open to Work Form" />
            </div>
          </div>
        </div>
      </section>

      {/* EMPLOYER: Browse and Hire */}
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
              <p className="text-white/60 leading-relaxed mb-8">
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
                  desc: 'Found the right person? Click Unlock to register your company and access their full contact details.',
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
                    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
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
