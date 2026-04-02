import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Global Compliance & Financial Crime Briefing — 1 April 2026 | TalentX Market',
  description:
    'US Treasury sham transactions alert, FATF Singapore Mutual Evaluation, FATF Ministerial April 2026, BNM operational resilience consultation, GENIUS Act stablecoin NPRM, and FCA CCI regime launch — TalentX compliance intelligence briefing for 1 April 2026.',
};

/* ─── DATA ─────────────────────────────────────────────────────── */

const cards = [
  {
    id: 1,
    tag: 'Sanctions',
    priority: 'HIGH' as const,
    headline: 'US Treasury Warns of "Sham Transactions" Being Used to Bypass Sanctions',
    summary:
      'The US Treasury has issued an alert warning that sanctioned individuals and entities are increasingly using sham transactions — fictitious or disguised deals — to retain effective control of assets while appearing to comply with sanctions requirements. The alert calls on financial institutions and sanctions compliance teams to apply heightened scrutiny beyond formal ownership structures, focusing on beneficial control and economic substance. Sanctions and OFAC compliance professionals should review transaction monitoring rules and escalation procedures for shell or nominee arrangements.',
    source: 'US Treasury · AML Intelligence',
    url: 'https://www.amlintelligence.com/2026/04/latest-us-treasury-warns-of-rise-in-sham-transactions-to-bypass-sanctions/',
  },
  {
    id: 2,
    tag: 'Regulatory',
    priority: 'HIGH' as const,
    headline: 'FATF Singapore Mutual Evaluation Report to Be Published in April 2026',
    summary:
      'Following endorsement at the February 2026 FATF Plenary, the Mutual Evaluation Reports for Singapore, Austria, and Italy are scheduled for publication in April–May 2026 after a global quality and consistency review. For Singapore — a key jurisdiction in the APAC compliance market — this is a landmark moment. The MAS-supervised financial sector will face public scrutiny of its AML/CFT effectiveness ratings, directly shaping regulatory expectations, enforcement posture, and compliance hiring priorities in Singapore for the next cycle. Compliance professionals and employers in Singapore should monitor the publication date closely.',
    source: 'FATF · ComplyAdvantage',
    url: 'https://complyadvantage.com/insights/fatf-plenary-february-2026-key-updates/',
  },
  {
    id: 3,
    tag: 'Regulatory',
    priority: 'HIGH' as const,
    headline: 'FATF Ministers to Endorse 2026–2028 Strategic Priorities in April Washington Meeting',
    summary:
      'FATF Ministers are convening in April 2026 to formally endorse the body\'s strategic priorities for the next two-year cycle. Key focus areas include: strengthening beneficial ownership transparency, increasing asset recovery capabilities, combating corruption, and enhancing coordination across the FATF\'s Global Network of 200+ jurisdictions. For compliance professionals, this meeting sets the policy direction that will cascade through every national regulator — from BNM and MAS to the FCA and FinCEN — over the next two years. Monitoring the Ministerial Declaration is essential reading for MLROs and Chief Compliance Officers building 2026–2027 risk frameworks.',
    source: 'FATF',
    url: 'https://www.fatf-gafi.org/en/publications/Fatfgeneral/outcomes-FATF-plenary-february-2026.html',
  },
  {
    id: 4,
    tag: 'Regulatory',
    priority: 'HIGH' as const,
    headline: 'BNM Opens Consultation on Operational Resilience Framework — Deadline 30 April 2026',
    summary:
      'Bank Negara Malaysia has published a discussion paper outlining its direction to strengthen the operational resilience of financial institutions under its supervision. The paper proposes governance mechanisms to ensure continuity of critical financial services and invites written feedback from stakeholders by 30 April 2026. This signals BNM\'s shift from purely financial soundness supervision toward operational and systemic resilience — a growing compliance remit. Malaysian compliance professionals, especially those in risk, BCM, and governance roles, should engage with this paper and flag implications for their institutions.',
    source: 'Bank Negara Malaysia',
    url: 'https://www.bnm.gov.my',
  },
  {
    id: 5,
    tag: 'Regulatory',
    priority: 'HIGH' as const,
    headline: 'US Treasury Issues First-Ever Proposed Rule to Implement GENIUS Act Stablecoin Regulation',
    summary:
      'The US Department of the Treasury has issued a Notice of Proposed Rulemaking (NPRM) seeking public comment on its implementation of the GENIUS Act — the first federal framework specifically governing stablecoins. This marks the beginning of formal AML/CFT compliance obligations for stablecoin issuers, including transaction monitoring, Travel Rule compliance, and KYC requirements aligned with bank-grade standards. For compliance professionals in digital assets, crypto, and fintech, this signals a rapidly maturing regulatory environment in the US with significant implications globally as other jurisdictions follow suit.',
    source: 'US Department of the Treasury',
    url: 'https://home.treasury.gov/news/press-releases/sb0201',
  },
  {
    id: 6,
    tag: 'Regulatory',
    priority: 'MEDIUM' as const,
    headline: 'FCA\'s New Consumer Composite Investments Regime Begins 6 April 2026',
    summary:
      'The UK Financial Conduct Authority\'s new Consumer Composite Investments (CCI) disclosure regime takes effect from 6 April 2026, replacing the widely criticised PRIIPs Regulation and UCITS disclosure requirements for retail investment products. Firms have until 8 June 2027 for full mandatory compliance. UK compliance and product governance teams at asset managers, platforms, and banks distributing retail funds must begin gap analyses and disclosure document updates immediately. This is one of the most significant UK retail regulatory changes post-Brexit.',
    source: 'FCA · Proskauer FinReg',
    url: 'https://www.proskauer.com/report/finreg-timeline-2026',
  },
];

const signals = [
  {
    title: 'EU MiCA — Active Enforcement Phase',
    body: 'The EU\'s Markets in Crypto-Assets Regulation (MiCA) is now in active enforcement. Digital asset service providers across Europe must meet bank-grade AML/KYC standards: full transaction monitoring, Travel Rule adherence, and sanction screening. Compliance hiring for crypto/VASP roles in Europe is surging.',
  },
  {
    title: 'EU AMLA — Single Rulebook Goes Live',
    body: 'The new EU Anti-Money Laundering Authority is now directly supervising high-risk cross-border entities and enforcing a unified AML single rulebook, replacing 27 divergent national frameworks. A generation-defining shift for compliance professionals operating across EU jurisdictions.',
  },
  {
    title: 'FATF — Travel Rule Gaps Persist',
    body: 'FATF\'s June 2025 update flagged persistent global gaps in Travel Rule implementation for VASPs, urging stronger enforcement and cross-border cooperation. Expect increased supervisory focus on Travel Rule compliance through 2026.',
  },
  {
    title: 'California DFPI — Crypto Rules Proposed',
    body: 'California\'s DFPI released formal crypto rulemaking proposals in April covering registration, disclosures, and surety bond standards. Compliance deadline: 1 July 2026. Relevant for digital asset firms with US exposure.',
  },
];

const pulseCards = [
  {
    title: 'Malaysia — Compliance Demand Sustained',
    body: 'BNM\'s expanding regulatory perimeter — now covering digital assets, open banking, and operational resilience — is generating sustained demand for compliance professionals across banking, fintech, and digital bank sectors. CAMS and ICA certifications remain strong differentiators for candidates.',
    source: 'BNM · Glassdoor',
  },
  {
    title: 'Singapore MLRO — Crypto/VASP Premium',
    body: 'With the FATF Singapore Mutual Evaluation imminent and MAS expanding digital asset oversight, MLRO and Compliance Officer roles increasingly demand 6+ years\' experience plus crypto/VASP regulatory knowledge. Premium salary uplifts of 15–20% are visible for VASP-specialist compliance profiles.',
    source: 'MAS · Robert Walters',
  },
  {
    title: 'Digital Asset Compliance — New Career Track',
    body: 'Across APAC and Europe, digital asset compliance is crystallising as a distinct profession with its own regulatory curriculum, certifications, and career ladder. Firms are hiring at MLRO, Head, and VP level for dedicated crypto compliance roles.',
    source: 'Industry Observation',
  },
];

/* ─── TAG STYLES ────────────────────────────────────────────────── */

const tagStyle: Record<string, string> = {
  Enforcement: 'bg-red-50 text-red-700 border border-red-200',
  Regulatory:  'bg-blue-50 text-blue-700 border border-blue-200',
  Sanctions:   'bg-orange-50 text-orange-700 border border-orange-200',
  AML:         'bg-purple-50 text-purple-700 border border-purple-200',
};

/* ─── PAGE ──────────────────────────────────────────────────────── */

export default function BriefingPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white min-h-screen">

        {/* ── HERO ── */}
        <section className="bg-brand-black text-white pt-16 pb-14 px-6">
          <div className="max-w-5xl mx-auto">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-white/40 mb-8">
              <Link href="/intelligence" className="hover:text-brand-gold transition-colors">
                Intelligence Hub
              </Link>
              <span>/</span>
              <span className="text-white/60">1 April 2026</span>
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
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                Wednesday, 1 April 2026
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                Sanctions · Regulatory · AML · Digital Assets
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                Global Coverage · Southeast Asia Focus
              </span>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/10">
              {[
                { n: '6',       l: 'Stories' },
                { n: '5',       l: 'High priority' },
                { n: 'FATF',    l: 'Ministerial April' },
                { n: '5',       l: 'Jurisdictions' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-brand-gold font-bold text-2xl">{s.n}</div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTELLIGENCE CARDS ── */}
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
                  <p className="text-sm text-brand-gray leading-relaxed flex-1 mb-6">
                    {card.summary}
                  </p>

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

        {/* ── ADDITIONAL SIGNALS ── */}
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

        {/* ── MARKET PULSE ── */}
        <section className="bg-brand-black px-6 py-14">
          <div className="max-w-5xl mx-auto">

            <div className="flex items-center gap-3 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-brand-gold">
                Market Pulse
              </p>
              <span className="text-[9px] text-white/30 uppercase tracking-widest">
                Southeast Asia Hiring &amp; Salary Signals
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

        {/* ── BACK + NEXT ISSUE ── */}
        <section className="px-6 py-10 border-t border-brand-light-gray">
          <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/intelligence"
              className="flex items-center gap-2 text-sm text-brand-gray hover:text-brand-gold transition-colors font-medium"
            >
              ← Back to Intelligence Hub
            </Link>
            <p className="text-xs text-brand-gray/60">
              Next briefing: Saturday, 4 April 2026
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
