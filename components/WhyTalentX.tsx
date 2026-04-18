const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Compliance-Specific',
    description:
      'Unlike generic job boards, TalentX is built exclusively for compliance, AML, risk, and financial crime professionals. Every feature is designed with your sector in mind.',
    highlight: 'Built for compliance',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Direct Connections',
    description:
      'No recruitment agencies taking a cut. Employers connect directly with talent. Professionals hear from real decision-makers. Faster, more transparent, more efficient.',
    highlight: 'No middlemen',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
    title: 'Post Availability',
    description:
      'Compliance professionals can set themselves as "Open to Work" — specifying role type, location, seniority and availability so the right opportunities find them.',
    highlight: 'Professionals in control',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Talent Search',
    description:
      'Employers can search and browse verified compliance professionals by specialism, jurisdiction, experience level, and availability — in real time.',
    highlight: 'Find the right fit',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: 'Global Reach',
    description:
      'TalentX connects compliance professionals and employers across Europe, APAC, the Americas, and the Middle East — wherever regulated industries operate.',
    highlight: '30+ countries',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Always On',
    description:
      'Whether you\'re actively job hunting or passively open to the right opportunity, your profile works for you 24/7 — you\'re always visible to the right employers.',
    highlight: 'Passive & active',
  },
];

export default function WhyTalentX() {
  return (
    <section id="why-talentx" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-1 bg-brand-gold rounded-full mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Why Choose TalentX Market?
          </h2>
          <p className="text-lg text-white/80 mt-4 max-w-2xl mx-auto">
            The compliance sector deserves its own dedicated talent platform. Here&apos;s
            what makes TalentX different.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-brand-gold/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold/20 transition-colors duration-200">
                {feature.icon}
              </div>
              <div className="mb-3">
                <span className="text-brand-gold/70 text-xs font-semibold uppercase tracking-widest">
                  {feature.highlight}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a href="/sign-up" className="btn-secondary">
              Join as a Professional
            </a>
            <a href="/talent" className="btn-primary">
              Browse Talent
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
