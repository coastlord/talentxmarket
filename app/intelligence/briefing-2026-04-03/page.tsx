import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Global Compliance & Financial Crime Briefing — 3 April 2026 | TalentX Market',
  description: 'FCA AI oversight consultation, MAS AML digital asset scrutiny, OFAC SDN crypto updates, EU EUR 85M AML fine, FATF UAE peer review, Malaysia BNM compliance hiring.',
};

type Card = {
  id: number;
  tag: string;
  priority: string;
  headline: string;
  summary: string;
  insight: string;
  source: string;
  url: string;
};

type Signal = { title: string; body: string };
type Pulse = { title: string; body: string; source: string };

const cards: Card[] = [
  {
    id: 1,
    tag: 'Regulatory',
    priority: 'HIGH',
    headline: 'FCA Consults on AI in Financial Services Oversight',
    summary: 'The UK Financial Conduct Authority has opened a consultation on how artificial intelligence should be governed within regulated financial services. The paper covers model risk, explainability requirements, and accountability frameworks for AI-driven decision-making across credit, AML, and fraud detection systems.',
    insight: 'Compliance teams should begin mapping AI tools used across their organisations and establish governance frameworks now, ahead of any formal rule changes.',
    source: 'FCA · UK Regulatory',
    url: 'https://www.fca.org.uk/firms/innovation/ai',
  },
  {
    id: 2,
    tag: 'AML',
    priority: 'HIGH',
    headline: 'Singapore MAS Raises AML Scrutiny on Digital Asset Firms',
    summary: 'The Monetary Authority of Singapore has issued updated guidance tightening AML obligations for digital payment token service providers. Measures include enhanced CDD thresholds, beneficial ownership verification, and faster suspicious transaction reporting timelines for crypto exchanges and wallet providers.',
    insight: 'VASP compliance officers should review their transaction monitoring thresholds and ensure STR reporting timelines are aligned with the updated MAS guidance.',
    source: 'MAS · Singapore',
    url: 'https://www.mas.gov.sg/regulation/anti-money-laundering',
  },
  {
    id: 3,
    tag: 'Sanctions',
    priority: 'HIGH',
    headline: 'OFAC Updates SDN List with New Crypto-Linked Designations',
    summary: 'The US Office of Foreign Assets Control has added digital wallet addresses and entities linked to Iran and Russia to its Specially Designated Nationals list. The updates include wallet clustering designations and expand blocked property definitions to cover DeFi protocol interactions.',
    insight: 'Compliance and sanctions screening teams must ensure their tools ingest OFAC updates in real time. Consider enhanced due diligence for counterparties with any DeFi exposure.',
    source: 'OFAC · US Treasury',
    url: 'https://ofac.treasury.gov/recent-actions',
  },
  {
    id: 4,
    tag: 'Enforcement',
    priority: 'HIGH',
    headline: 'EU Regulator Fines Bank EUR 85M for AML Control Failures',
    summary: 'A major European bank has been fined EUR 85 million for systemic AML control failures, including inadequate customer risk classification, deficient transaction monitoring, and failure to file suspicious activity reports within required timeframes.',
    insight: 'This enforcement action reinforces that CDD documentation quality — not just process — is under scrutiny. Review your CDD file standards and escalation paths now.',
    source: 'EBA · European Banking Authority',
    url: 'https://www.eba.europa.eu/banking-topics/anti-money-laundering-and-countering-financing-terrorism',
  },
  {
    id: 5,
    tag: 'Regulatory',
    priority: 'HIGH',
    headline: 'FATF Peer Review: UAE Shows Progress on Technical Compliance',
    summary: 'The Financial Action Task Force has published a follow-up report indicating the UAE has made significant improvements across its AML and CFT framework. Key areas include beneficial ownership transparency, real estate sector oversight, and DNFBP supervision, moving the UAE out of enhanced follow-up status.',
    insight: 'Firms operating in the Gulf region should update their jurisdictional risk assessments to reflect the improved compliance standing of the UAE in FATF peer reviews.',
    source: 'FATF-GAFI · Follow-up Report',
    url: 'https://www.fatf-gafi.org/en/countries/middle-east-and-africa/united-arab-emirates.html',
  },
  {
    id: 6,
    tag: 'AML',
    priority: 'MEDIUM',
    headline: 'Malaysia BNM Expands Compliance Hiring Across Banking Sector',
    summary: 'Bank Negara Malaysia has signalled expectations for enhanced compliance resourcing across licensed financial institutions, citing growing complexity from digital asset oversight, operational resilience requirements, and cross-border AML obligations under FATF mutual evaluation recommendations.',
    insight: 'The compliance talent market in Malaysia is heating up. Firms looking to hire should move quickly — and existing teams should prepare for increased regulatory engagement.',
    source: 'BNM · Bank Negara Malaysia',
    url: 'https://www.bnm.gov.my',
  },
];

const signals: Signal[] = [
  {
    title: 'FinCEN — AML Whistleblower NPRM',
    body: 'FinCEN has issued a Notice of Proposed Rulemaking to establish a formal AML whistleblower reward and protection programme, mirroring SEC and CFTC frameworks. Public comment period closes May 2026.',
  },
  {
    title: 'EU AMLA — Direct Supervision Begins',
    body: 'The EU Anti-Money Laundering Authority has commenced direct supervision of the first cohort of high-risk cross-border credit institutions. The single AML rulebook is now fully operative across member states.',
  },
  {
    title: 'UK HMRC — Cryptoasset Reporting Reminder',
    body: 'HMRC has reminded UK-based cryptoasset service providers that customer holdings and transactions must be reported under the OECD Crypto-Asset Reporting Framework, with first reporting due January 2027.',
  },
  {
    title: 'AUSTRAC — DCE Audit Wave',
    body: 'The Australian Transaction Reports and Analysis Centre has launched a targeted audit programme of registered digital currency exchanges, focusing on ongoing CDD obligations and high-risk jurisdiction exposure.',
  },
];

const pulseCards: Pulse[] = [
  {
    title: 'UK AML and MLRO — Strong Pipeline',
    body: 'FCA enforcement intensity and the AI consultation are driving demand for SMR-aligned MLRO and AML Director talent across tier-1 and challenger banks. Average MLRO salaries in London are up 8% year-on-year.',
    source: 'FCA · LinkedIn · Robert Walters',
  },
  {
    title: 'EU Digital Assets — MiCA Compliance Surge',
    body: 'MiCA active enforcement is creating urgent demand for crypto compliance officers and regulatory affairs specialists across CASP applicants in the EU. Bilingual candidates command a 15-20% premium.',
    source: 'ESMA · MiCA · Heidrick',
  },
  {
    title: 'UAE — Fastest-Growing Compliance Market',
    body: 'FATF positive follow-up is accelerating institutional expansion in Dubai and Abu Dhabi. ADGM and DIFC-regulated entities are hiring across AML, sanctions, and financial crime investigation roles.',
    source: 'FATF · ADGM · Cooper Fitch',
  },
];

const stats = [
  { n: '6', l: 'Stories' },
  { n: '5', l: 'High priority' },
  { n: '5', l: 'Jurisdictions' },
  { n: 'Free', l: 'Always' },
];

const tagStyle: Record<string, string> = {
  Enforcement: 'bg-red-50 text-red-700 border border-red-200',
  Regulatory:  'bg-blue-50 text-blue-700 border border-blue-200',
  Sanctions:   'bg-orange-50 text-orange-700 border border-orange-200',
  AML:         'bg-purple-50 text-purple-700 border border-purple-200',
};

export default function BriefingPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white min-h-screen">

        {/* HERO */}
        <section className="bg-brand-black text-white pt-16 pb-14 px-6">
          <div className="max-w-5xl mx-auto">

            <div className="flex items-center gap-2 text-xs text-white/40 mb-8">
              <Link href="/intelligence" className="hover:text-brand-gold transition-colors">
                Intelligence Hub
              </Link>
              <span>/</span>
              <span className="text-white/60">3 April 2026</span>
            </div>

            <p className="text-brand-gold text-[10px] font-bold tracking-[3px] uppercase mb-4 flex items-center gap-3">
              Intelligence Briefing
              <span className="inline-block w-6 h-px bg-brand-gold" />
            </p>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Global Compliance &amp; <span className="text-brand-gold">Financial Crime</span>
              <br />Intelligence Briefing
            </h1>

            <div className="flex items-center gap-5 flex-wrap mt-6 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                Friday, 3 April 2026
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                AML · Enforcement · Sanctions · Regulatory
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                Global Coverage · UK · EU · APAC · UAE
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/10">
              {stats.map((s) => (
                <div key={s.l}>
                  <div className="text-brand-gold font-bold text-2xl">{s.n}</div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTELLIGENCE CARDS */}
        <section className="px-6 py-14">
          <div className="max-w-5xl mx-auto">

            <div className="flex items-center gap-3 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-brand-gray">
                Intelligence Cards
              </p>
              <span className="bg-brand-black text-white text-[9px] font-bold px-2 py-0.5 rounded-sm">
                {cards.length}
              </span>
              <div className="flex-1 h-px bg-brand-light-gray" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="border border-brand-light-gray border-t-[3px] border-t-brand-gold bg-white p-7 flex flex-col hover:shadow-md transition-shadow duration-200"
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${tagStyle[card.tag] || ''}`}>
                      {card.tag}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 ${card.priority === 'HIGH' ? 'text-red-600' : 'text-brand-gray'}`}>
                      {card.priority === 'HIGH' ? '● High priority' : '○ Medium priority'}
                    </span>
                  </div>

                  {/* Headline */}
                  <h2 className="text-base font-bold text-brand-black leading-snug mb-3 font-sans">
                    {card.headline}
                  </h2>

                  {/* Summary */}
                  <p className="text-sm text-brand-gray leading-relaxed flex-1 mb-5">
                    {card.summary}
                  </p>

                  {/* TalentX Insight */}
                  <div className="bg-brand-black/5 border-l-2 border-l-brand-gold px-4 py-3 mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[2px] text-brand-gold mb-1">TalentX Insight</p>
                    <p className="text-xs text-brand-black/70 leading-relaxed">{card.insight}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-brand-light-gray">
                    <span className="text-xs text-brand-gray/70">{card.source}</span>
                    <a
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-brand-gold hover:underline"
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ADDITIONAL SIGNALS */}
        <section className="bg-[#F8F8F6] px-6 py-12">
          <div className="max-w-5xl mx-auto">

            <div className="flex items-center gap-3 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-brand-gray">
                Additional Signals
              </p>
              <span className="bg-brand-black text-white text-[9px] font-bold px-2 py-0.5 rounded-sm">
                {signals.length}
              </span>
              <div className="flex-1 h-px bg-brand-light-gray" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {signals.map((s) => (
                <div
                  key={s.title}
                  className="bg-white border-l-[3px] border-l-brand-gold border border-brand-light-gray p-5"
                >
                  <h3 className="text-xs font-bold text-brand-black mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-brand-gray leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MARKET PULSE */}
        <section className="bg-brand-black px-6 py-14">
          <div className="max-w-5xl mx-auto">

            <div className="flex items-center gap-3 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-brand-gold">
                Market Pulse
              </p>
              <span className="text-[9px] text-white/30 uppercase tracking-widest">
                UK &amp; EU &amp; UAE Hiring and Salary Signals
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {pulseCards.map((p) => (
                <div
                  key={p.title}
                  className="border border-white/10 border-t-2 border-t-brand-gold bg-[#111111] p-6"
                >
                  <h3 className="text-brand-gold text-sm font-bold leading-snug mb-3">
                    {p.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{p.body}</p>
                  <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-brand-gold/60 border border-white/10 px-2 py-0.5 rounded-sm">
                    Data Point · {p.source}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER NAV */}
        <section className="px-6 py-10 border-t border-brand-light-gray">
          <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/intelligence"
              className="text-sm font-semibold text-brand-black hover:text-brand-gold transition-colors flex items-center gap-2"
            >
              ← Back to Intelligence Hub
            </Link>
            <p className="text-xs text-brand-gray/60">
              Next briefing: Saturday, 5 April 2026
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
