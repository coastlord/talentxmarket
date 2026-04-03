import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Global Compliance & Financial Crime Briefing — 3 April 2026 | TalentX Market',
  description:
    'FinCEN healthcare fraud advisory & whistleblower NPRM, FCA AML probe into MFS, MAS 16-year prohibition order, OFAC SDN updates & sham transaction advisory, FATF grey list additions, and Investment Adviser AML rule delayed to 2028 — TalentX compliance intelligence briefing for 3 April 2026.',
};

/* ─── DATA ─────────────────────────────────────────────────────── */

const cards = [
  {
    id: 1,
    tag: 'AML',
    priority: 'HIGH' as const,
    headline: 'FinCEN Issues Healthcare Fraud Advisory and Proposes AML Whistleblower Framework',
    summary:
      'On 1 April 2026, FinCEN published Advisory FIN-2026-A001 alerting financial institutions to fraud schemes targeting Medicare, Medicaid, and other government health benefit programmes, with money laundering typologies and red flag indicators. On the same date, FinCEN published a Notice of Proposed Rulemaking (NPRM) to establish a formal whistleblower award and protection programme under the Anti-Money Laundering Act of 2020. Compliance teams should review the advisory\'s red flag indicators and begin assessing how the proposed whistleblower framework may affect their internal reporting culture and SAR filing obligations.',
    source: 'FinCEN · US Treasury',
    url: 'https://www.fincen.gov/resources/advisoriesbulletinsfact-sheets/advisories',
  },
  {
    id: 2,
    tag: 'Enforcement',
    priority: 'HIGH' as const,
    headline: 'FCA Opens AML Investigation into Mortgage Lender MFS Amid £1.3bn Scandal',
    summary:
      'The UK Financial Conduct Authority (FCA) has launched an enforcement investigation into Market Financial Solutions (MFS), a lender at the centre of a £1.3 billion mortgage scandal, specifically for suspected AML compliance failures. This follows a record 2025 enforcement year in which the FCA levied over £124 million in AML-related fines — including £44 million against Nationwide and £42 million against Barclays. MLROs and compliance officers at UK-supervised firms should treat this as a signal that the FCA\'s 2025–30 strategy will continue prioritising AML systems adequacy and governance accountability.',
    source: 'FCA · AML Intelligence',
    url: 'https://www.amlintelligence.com/2026/03/breaking-fca-opens-aml-probe-into-mfs-lender-at-centre-of-1-3bn-mortgage-scandal/',
  },
  {
    id: 3,
    tag: 'Enforcement',
    priority: 'HIGH' as const,
    headline: 'MAS Issues 16-Year Prohibition Order After Singapore\'s S$3bn Money Laundering Case',
    summary:
      'The Monetary Authority of Singapore (MAS) issued prohibition orders in Q1 2026 against former relationship managers Wang Qiming (16-year ban) and Liu Kai (7-year ban), both convicted in connection with Singapore\'s landmark S$3 billion money laundering case. MAS\'s Q1 2026 enforcement summary confirms the regulator is sustaining its post-case accountability drive with direct action against individuals, not just institutions. Private banks and wealth managers across Southeast Asia should review relationship manager oversight frameworks and ensure adequate documentation of enhanced due diligence for high-risk clients.',
    source: 'Monetary Authority of Singapore',
    url: 'https://www.mas.gov.sg/news/media-releases/2026/key-enforcement-actions-taken-by-mas-in-q1-2026',
  },
  {
    id: 4,
    tag: 'Sanctions',
    priority: 'HIGH' as const,
    headline: 'OFAC Updates SDN List and Issues Sham Transactions Evasion Advisory',
    summary:
      'In late March 2026, OFAC published a Sanctions Advisory on sham transactions and sanctions evasion, warning that bad actors are increasingly using front companies and layered structures to obscure the true nature of prohibited transactions. In the same period, OFAC added 16 entries to the SDN List and removed nine designations, with Russia-related and counter-narcotics removals processed on 31 March. Sanctions compliance teams should refresh their screening workflows and counterparty due diligence procedures in line with the new evasion typologies outlined in the Advisory.',
    source: 'OFAC · US Treasury',
    url: 'https://ofac.treasury.gov/recent-actions',
  },
  {
    id: 5,
    tag: 'Regulatory',
    priority: 'HIGH' as const,
    headline: 'FATF Adds Kuwait and Papua New Guinea to Grey List — 23 Jurisdictions Now Monitored',
    summary:
      'At its February 2026 plenary, FATF added Kuwait and Papua New Guinea to its list of jurisdictions under increased monitoring (the Grey List), bringing the total to 23 countries. No jurisdictions were removed in this cycle. The Black List remains unchanged with North Korea, Iran, and Myanmar subject to countermeasures or enhanced due diligence. Compliance and KYC teams must update country risk matrices and enhanced due diligence procedures for clients and counterparties with nexus to Kuwait or Papua New Guinea. The next FATF update is expected in June 2026.',
    source: 'FATF',
    url: 'https://www.fatf-gafi.org/en/publications/High-risk-and-other-monitored-jurisdictions/increased-monitoring-february-2026.html',
  },
  {
    id: 6,
    tag: 'Regulatory',
    priority: 'MEDIUM' as const,
    headline: 'Investment Adviser AML Rule Delayed to 2028; EU AML Authority Takes Shape',
    summary:
      'The US Treasury has postponed the effective date of the Investment Adviser AML/CFT Rule from January 2026 to January 2028, providing registered investment advisers additional time to build compliance infrastructure. Meanwhile, the EU\'s new AML Authority has begun consultations on draft Regulatory Technical Standards covering risk scoring, group-wide controls, and supervisory benchmarks — with direct supervision of selected firms commencing in 2028. Compliance leaders at investment management and cross-border financial firms should use this window to align their AML frameworks to both US and EU expectations before the rules become binding.',
    source: 'US Treasury · Federal Register',
    url: 'https://home.treasury.gov/news/press-releases/sb0201',
  },
];

const signals = [
  {
    title: 'FinCEN Whistleblower — New Era for AML Reporting',
    body: 'The proposed AML whistleblower framework could reshape internal reporting culture at financial institutions. Compliance teams should begin reviewing escalation protocols and ensuring robust speak-up channels are in place ahead of the final rule.',
  },
  {
    title: 'EU AMLA — Single Rulebook Advancing',
    body: 'The EU Anti-Money Laundering Authority is consulting on draft Regulatory Technical Standards that will define risk scoring and group-wide controls for all EU-touching firms. Supervisory benchmarking begins 2028 — planning must start now.',
  },
  {
    title: 'Real-Time AML — Now an Operational Priority',
    body: 'Regulators and industry bodies expect 2026 to be the year banks commit to moving from batch AML processing to sub-second, streaming decision-making. Compliance tech investment is accelerating across major financial centres.',
  },
  {
    title: 'FATF — Next Grey List Update: June 2026',
    body: 'With Kuwait and Papua New Guinea newly added, firms should flag any exposure and update their country risk frameworks. The next FATF plenary update is scheduled for June 2026 — watch for potential removals from the list as well as new additions.',
  },
];

const pulseCards = [
  {
    title: 'Singapore — 400+ AML Roles Open',
    body: 'Singapore continues to post 400+ active AML compliance roles as of Q1 2026, driven by MAS enforcement activity, the FATF Mutual Evaluation fallout, and expanding VASP regulatory requirements. MLRO, DMLRO, and Financial Crime Compliance manager roles are particularly in demand.',
    source: 'Glassdoor · Indeed (Q1 2026)',
  },
  {
    title: 'Senior AML Salaries — SGD 180K–250K',
    body: 'Compliance managers with AML expertise in Singapore are commanding SGD 180,000–250,000 annually, with a 15–20% premium visible for candidates with crypto/VASP regulatory specialisation. Entry-level AML analyst roles range from SGD 36,000-54,000.',
    source: 'Financial Crime Academy · Job Aggregators',
  },
  {
    title: 'Malaysia — Compliance Hiring Accelerating',
    body: 'Over 163 AML-specific roles and nearly 4,000 regulatory compliance postings were live in Malaysia in March 2026. Growth is driven by BNM_s expanding regulatory perimeter covering digital assets, open banking, and the new operational resilience framework.',
    source: 'Glassdoor Malaysia (March 2026)',
  },
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
              <Link href="/intelligence" className="hover:text-brand-gold transition-colors">Intelligence Hub</Link>
              <span>/</span>
              <span className="text-white/60">3 April 2026</span>
            </div>
            <p className="text-brand-gold text-[10px] font-bold tracking-[3px] uppercase mb-4 flex items-center gap-3">
              Intelligence Briefing
              <span className="inline-block w-6 h-px bg-brand-gold" />
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Global Compliance &amp;{' '}
              <span className="text-brand-gold">Financial Crime</span>
              <br />Intelligence Briefing
            </h1>
            <div className="flex items-center gap-5 flex-wrap mt-6 text-sm text-white/50">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />Friday, 3 April 2026</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />AML · Enforcement · Sanctions |· Regulatory</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />Global Coverage |· Southeast Asia Focus</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/10">
              {[{n:'6',l:'Stories'},{n:'5',l:'High priority'},{n:&23',l:'FATF grey list'},{n:'4',l:'Jurisdictions'}].map((s)=>(<div key={s.l}><div className="text-brand-gold font-bold text-2xl">{s.n}</div><div className="text-white/40 text-xs uppercase tracking-wider mt-0.5">{s.l}</div></div>))}
            </div>
          </div>
        </section>
        {/* INTELLIGENCE CARDS */}
        <section className="px-6 py-14">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-brand-gray">Intelligence Cards</p>
              <span className="bg-brand-black text-white text-[9px] font-bold px-2 py-0.5 rounded-sm">{cards.length}</span>
              <div className="flex-1 h-px bg-brand-light-gray" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cards.map((card)=>(
                <div key={card.id} className="border border-brand-light-gray border-t-[3px] border-t-brand-gold bg-white p-7 flex flex-col hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${tagStyle[card.tag]||''}`}>{card.tag}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 ${card.priority==='HIGH'?'text-red-600':'text-brand-gray'}`}>{card.priority==='HIGH'?'● High priority':'╋ Medium priority'}</span>
                  </div>
                  <h2 className="text-base font-bold text-brand-black leading-snug mb-3 font-sans">{card.headline}</h2>
                  <p className="text-sm text-brand-gray leading-relaxed flex-1 mb-6">{card.summary}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-brand-light-gray">
                    <span className="text-xs text-brand-gray/70">{card.source}</span>
                    <a href={card.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-brand-gold hover:underline">Read more →</a>
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
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-brand-gray">Additional Signals</p>
              <span className="bg-brand-black text-white text-[9px] font-bold px-2 py-0.5 rounded-sm">{signals.length}</span>
              <div className="flex-1 h-px bg-brand-light-gray" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {signals.map((s)=>(
                <div key={s.title} className="bg-white border-l-[3px] border-l-brand-gold border border-brand-light-gray p-5">
                  <h3 className="text-xs font-bold text-brand-black mb-2 leading-snug">{s.title}</h3>
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
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-brand-gold">Market Pulse</p>
              <span className="text-[9px] text-white/30 uppercase tracking-widest">Southeast Asia Hiring &amp; Salary Signals</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {pulseCards.map((p)=>(
                <div key={p.title} className="border border-white/10 border-t-2 border-t-brand-gold bg-[#111111] p-6">
                  <h3 className="text-brand-gold text-sm font-bold leading-snug mb-3">{p.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{p.body}</p>
                  <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-brand-gold/60 border border-white/10 px-2 py-0.5 rounded-sm">Data Point · {p.source}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* BACK + NEXT ISSUE */}
        <section className="px-6 py-10 border-t border-brand-light-gray">
          <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
            <Link href="/intelligence" className="flex items-center gap-2 text-sm text-brand-gray hover:text-brand-gold transition-colors font-medium">&#8592; Back to Intelligence Hub</Link>
            <p className="text-xs text-brand-gray/60">Next briefing: Monday, 6 April 2026</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}