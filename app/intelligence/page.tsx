import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Compliance Intelligence Hub | TalentX Market',
  description:
    "Stay ahead with TalentX Market's Compliance Intelligence Hub — curated AML, sanctions, regulatory and enforcement briefings for compliance professionals across Southeast Asia and beyond.",
};

const briefings = [
  {
    slug: 'briefing-2026-04-03',
    date: 'Friday, 3 April 2026',
    shortDate: '3 Apr 2026',
    title: 'Global Compliance & Financial Crime Intelligence Briefing',
    summary:
      'FinCEN healthcare fraud advisory & AML whistleblower NPRM, FCA opens AML probe into MFS mortgage lender, MAS 16-year prohibition order after S$3bn money laundering case, OFAC SDN updates & sham transaction advisory, FATF grey list adds Kuwait and Papua New Guinea (23 jurisdictions), and Investment Adviser AML rule delayed to 2028.',
    cardCount: 6,
    tags: ['AML', 'Enforcement', 'Sanctions', 'Regulatory'],
    priority: 'HIGH',
    isLatest: true,
  },
  {
    slug: 'briefing-2026-04-01',
    date: 'Wednesday, 1 April 2026',
    shortDate: '1 Apr 2026',
    title: 'Global Compliance & Financial Crime Intelligence Briefing',
    summary:
      'US Treasury sham-transaction sanctions alert, FATF Singapore Mutual Evaluation publishing, FATF Ministerial April strategic priorities, BNM operational resilience consultation (deadline 30 Apr), GENIUS Act stablecoin NPRM, and FCA CCI regime launches 6 April.',
    cardCount: 6,
    tags: ['Sanctions', 'Regulatory', 'AML'],
    priority: 'HIGH',
    isLatest: false,
  },
  {
    slug: 'briefing-2026-03-30',
    date: 'Monday, 30 March 2026',
    shortDate: '30 Mar 2026',
    title: 'Global Compliance & Financial Crime Weekly Briefing',
    summary:
      'Record $80M FinCEN penalty on broker-dealer, UK overhauls AML regulations, OFAC Iran & Russia oil sanctions updates, FCA opens MFS probe, EU AMLA launches first CDD consultations, and MAS issues 16-year ban.',
    cardCount: 6,
    tags: ['Enforcement', 'Regulatory', 'Sanctions', 'AML'],
    priority: 'HIGH',
    isLatest: false,
  },
];

const tagColors: Record<string, string> = {
  Enforcement: 'bg-red-50 text-red-700 border border-red-200',
  Regulatory:  'bg-blue-50 text-blue-700 border border-blue-200',
  Sanctions:   'bg-orange-50 text-orange-700 border border-orange-200',
  AML:         'bg-purple-50 text-purple-700 border border-purple-200',
  Insight:     'bg-green-50 text-green-700 border border-green-200',
};

export default function IntelligenceHubPage() {
  const latest = briefings[0];
  const previous = briefings.slice(1);

  return (
    <>
      <Navbar />

      <main className="bg-white min-h-screen">

        {/* ── HERO ── */}
        <section className="bg-brand-black text-white pt-20 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-brand-gold text-xs font-bold tracking-[3px] uppercase mb-5 flex items-center gap-3">
              TalentX Market
              <span className="inline-block w-8 h-px bg-brand-gold" />
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Compliance{' '}
              <span className="text-brand-gold">Intelligence Hub</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
              Curated regulatory intelligence for AML, sanctions, MLRO, KYC and
              financial crime professionals — sourced from official regulators
              globally, published every 3 days.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/10">
              {[
                { value: '7+',      label: 'Regulatory sources' },
                { value: 'Every 3d', label: 'Briefing cadence' },
                { value: 'Global',  label: 'Coverage' },
                { value: 'Free',    label: 'Always' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-brand-gold font-bold text-xl">{s.value}</div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOURCES STRIP ── */}
        <div className="bg-[#F5F0E8] border-b border-brand-gold/30 py-3 px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto flex items-center gap-6 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold shrink-0">
              Sources monitored:
            </span>
            {['FATF', 'FCA', 'MAS', 'BNM', 'OFAC', 'FinCEN', 'ACAMS', 'AMLA'].map((s) => (
              <span
                key={s}
                className="text-xs font-semibold text-brand-black/60 tracking-wide"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* ── FEATURED LATEST ── */}
        <section className="px-6 py-14">
          <div className="max-w-5xl mx-auto">

            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-brand-gray mb-1">
                  Latest Briefing
                </p>
                <div className="w-10 h-0.5 bg-brand-gold rounded-full" />
              </div>
            </div>

            {/* Featured card */}
            <Link
              href={`/intelligence/${latest.slug}`}
              className="group block border border-brand-light-gray border-t-[3px] border-t-brand-gold bg-white hover:shadow-lg transition-all duration-300 p-8 md:p-10"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 bg-brand-gold/10 text-brand-gold border border-brand-gold/30 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                    Latest
                  </span>
                  {latest.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${tagColors[tag] || ''}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-brand-gray font-medium">{latest.shortDate}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-brand-black leading-snug mb-4 group-hover:text-brand-gold transition-colors duration-200">
                {latest.title}
              </h2>
              <p className="text-brand-gray text-sm leading-relaxed max-w-3xl mb-8">
                {latest.summary}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-xs text-brand-gray">
                  <span className="font-semibold text-brand-black">{latest.cardCount} stories</span>
                  <span>·</span>
                  <span>Market Pulse included</span>
                  <span>·</span>
                  <span>Southeast Asia focus</span>
                </div>
                <span className="text-brand-gold text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                  Read briefing <span>→</span>
                </span>
              </div>
            </Link>

          </div>
        </section>

        {/* ── PREVIOUS BRIEFINGS ── */}
        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-brand-gray">
                Previous Briefings
              </p>
              <div className="flex-1 h-px bg-brand-light-gray" />
            </div>

            <div className="flex flex-col gap-4">
              {previous.map((b) => (
                <Link
                  key={b.slug}
                  href={`/intelligence/${b.slug}`}
                  className="group flex items-start justify-between gap-6 border border-brand-light-gray bg-white p-6 hover:border-brand-gold hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className="text-xs text-brand-gray font-medium">{b.shortDate}</span>
                      {b.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${tagColors[tag] || ''}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-sm font-bold text-brand-black leading-snug mb-1 group-hover:text-brand-gold transition-colors duration-200">
                      {b.title}
                    </h3>
                    <p className="text-xs text-brand-gray leading-relaxed line-clamp-2">
                      {b.summary}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-3 text-xs text-brand-gray mt-1">
                    <span>{b.cardCount} stories</span>
                    <span className="text-brand-gold group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <section className="bg-brand-black px-6 py-14">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-white text-2xl font-bold mb-2">
                Are you a compliance professional?
              </h3>
              <p className="text-white/50 text-sm">
                Post your availability and let the right employers find you.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="/#open-to-work"
                className="px-6 py-3 bg-brand-gold text-brand-black text-sm font-bold rounded-lg hover:bg-brand-gold-light transition-colors"
              >
                I&apos;m Open to Work
              </a>
              <a
                href="/#hiring"
                className="px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-lg hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                I&apos;m Hiring
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
