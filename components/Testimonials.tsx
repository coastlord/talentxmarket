import Link from 'next/link';

const briefings = [
  {
    slug: 'briefing-2026-04-03',
    shortDate: '3 Apr 2026',
    title: 'Global Compliance & Financial Crime Intelligence Briefing',
    summary:
      'FinCEN healthcare fraud advisory & AML whistleblower NPRM, FCA opens AML probe into MFS mortgage lender, MAS 16-year prohibition order after S$3bn money laundering case, OFAC SDN updates & sham transaction advisory.',
    cardCount: 6,
    tags: ['AML', 'Enforcement', 'Sanctions', 'Regulatory'],
    isLatest: true,
  },
  {
    slug: 'briefing-2026-04-01',
    shortDate: '1 Apr 2026',
    title: 'Global Compliance & Financial Crime Intelligence Briefing',
    summary:
      'US Treasury sham-transaction sanctions alert, FATF Singapore Mutual Evaluation publishing, FATF Ministerial April strategic priorities, BNM operational resilience consultation, GENIUS Act stablecoin NPRM, and FCA CCI regime launches 6 April.',
    cardCount: 6,
    tags: ['Sanctions', 'Regulatory', 'AML'],
    isLatest: false,
  },
  {
    slug: 'briefing-2026-03-30',
    shortDate: '30 Mar 2026',
    title: 'Global Compliance & Financial Crime Weekly Briefing',
    summary:
      'Record $80M FinCEN penalty on broker-dealer, UK overhauls AML regulations, OFAC Iran & Russia oil sanctions updates, FCA opens MFS probe, EU AMLA launches first CDD consultations, and MAS issues 16-year ban.',
    cardCount: 6,
    tags: ['Enforcement', 'Regulatory', 'Sanctions', 'AML'],
    isLatest: false,
  },
];

const tagColors: Record<string, string> = {
  Enforcement: 'bg-red-50 text-red-700 border border-red-200',
  Regulatory: 'bg-blue-50 text-blue-700 border border-blue-200',
  Sanctions: 'bg-orange-50 text-orange-700 border border-orange-200',
  AML: 'bg-purple-50 text-purple-700 border border-purple-200',
};

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-off-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="gold-line mx-auto mb-6" />
          <h2 className="section-heading">Compliance Intelligence Hub</h2>
          <p className="section-subheading mx-auto text-center">
            Curated regulatory intelligence for AML, sanctions, MLRO, KYC and financial crime professionals — sourced from official regulators globally, published every 3 days.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-10 mt-10 pt-8 border-t border-brand-light-gray">
            {[
              { value: '7+', label: 'Regulatory sources' },
              { value: 'Every 3d', label: 'Briefing cadence' },
              { value: 'Global', label: 'Coverage' },
              { value: 'Free', label: 'Always' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-brand-gold font-bold text-xl">{s.value}</div>
                <div className="text-brand-gray text-xs uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Briefing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {briefings.map((b) => (
            <Link
              key={b.slug}
              href={`/intelligence/${b.slug}`}
              className="group block bg-white border border-brand-light-gray border-t-[3px] border-t-brand-gold hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
            >
              {/* Tags row */}
              <div className="flex items-center gap-2 flex-wrap mb-4">
                {b.isLatest && (
                  <span className="inline-flex items-center gap-1.5 bg-brand-gold/10 text-brand-gold border border-brand-gold/30 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                    Latest
                  </span>
                )}
                {b.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${tagColors[tag] || ''}`}
                  >
                    {tag}
                  </span>
                ))}
                <span className="ml-auto text-xs text-brand-gray font-medium shrink-0">{b.shortDate}</span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-brand-black leading-snug mb-3 group-hover:text-brand-gold transition-colors duration-200">
                {b.title}
              </h3>

              {/* Summary */}
              <p className="text-brand-gray text-xs leading-relaxed flex-1 line-clamp-3">
                {b.summary}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-brand-light-gray">
                <span className="text-xs text-brand-gray font-medium">{b.cardCount} stories</span>
                <span className="text-brand-gold text-xs font-semibold group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                  Read briefing →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/intelligence"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-black text-white text-sm font-semibold rounded-lg hover:bg-brand-gold hover:text-brand-black transition-all duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            View All Briefings
          </Link>
        </div>

      </div>
    </section>
  );
}
