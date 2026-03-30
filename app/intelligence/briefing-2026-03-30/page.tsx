import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Global Compliance & Financial Crime Briefing — 30 March 2026 | TalentX Market',
  description: 'Record $80M FinCEN penalty, UK AML overhaul, OFAC sanctions updates, FCA MFS probe, EU AMLA consultations, and MAS 16-year ban — the TalentX compliance intelligence briefing for 30 March 2026.',
};

const cards = [
  { id:1, tag:'Enforcement', priority:'HIGH' as const, headline:'FinCEN Imposes Record $80M Penalty on Canaccord Genuity for AML Failures', summary:'On 6 March 2026, FinCEN assessed an $80 million civil money penalty against broker-dealer Canaccord Genuity LLC — the largest BSA enforcement action ever brought against a broker-dealer. The action stems from willful failure to implement an effective AML programme between 2018 and 2024, including unreviewed surveillance reports. Compliance professionals in broker-dealer and wealth management sectors should review their own transaction monitoring backlogs and AML programme adequacy immediately.', source:'FinCEN · Holland & Knight', url:'https://www.hklaw.com/en/insights/publications/2026/03/fincen-imposes-record-penalty-on-broker-dealer' },
  { id:2, tag:'Regulatory', priority:'HIGH' as const, headline:'UK Lays Draft Regulations to Overhaul AML Framework, Tightens Crypto Rules', summary:'On 25 March 2026, HM Treasury laid the Money Laundering and Terrorist Financing (Amendment) Regulations 2026 before Parliament. Key changes include narrowing the "high-risk third countries" definition to FATF black-list-only jurisdictions, updating enhanced due diligence triggers, and requiring crypto firms to apply EDD to correspondent relationships while banning relationships with shell banks. Implementation expected May–June 2026. Compliance teams at UK-regulated firms should begin gap analyses now.', source:'HM Treasury · AML Intelligence', url:'https://www.amlintelligence.com/2026/03/latest-uk-to-overhaul-aml-rules-here-are-the-main-changes/' },
  { id:3, tag:'Sanctions', priority:'HIGH' as const, headline:'OFAC Issues Iran & Russia Oil General Licenses, Settles with TradeStation for $1.1M', summary:'On 20 March 2026, OFAC issued General License U authorising wind-down transactions for Iranian-origin crude oil shipments, mirroring Russia-related GL 134 from 12 March. Separately, TradeStation Securities agreed to pay $1,110,661 to settle 481 apparent OFAC violations for providing brokerage services to persons in Iran, Syria, and Crimea. Sanctions compliance teams should review exposure to energy sector clients and ensure screening processes capture geographic risk indicators.', source:'OFAC · Steptoe', url:'https://www.steptoe.com/en/news-publications/international-compliance-blog/weekly-sanctions-update-march-23-2026.html' },
  { id:4, tag:'Enforcement', priority:'HIGH' as const, headline:'FCA Opens AML Probe into MFS Amid £1.3Bn Mortgage Scandal', summary:"The UK Financial Conduct Authority has opened a formal enforcement investigation into Market Financial Solutions (MFS), the lender at the centre of a £1.3 billion mortgage scandal. MFS is supervised by the FCA solely for AML compliance as an Annex 1 business. This case underscores the FCA's sharpening focus on financial crime — AML-related investigations now account for 74% of FCA enforcement caseload. MLROs and compliance officers at non-bank lenders should take note.", source:'FCA · AML Intelligence', url:'https://www.amlintelligence.com/2026/03/breaking-fca-opens-aml-probe-into-mfs-lender-at-centre-of-1-3bn-mortgage-scandal/' },
  { id:5, tag:'Regulatory', priority:'MEDIUM' as const, headline:'EU Anti-Money Laundering Authority Launches First Consultations on CDD Standards', summary:"The EU's new Anti-Money Laundering Authority (AMLA), which assumed rule-setting powers from the European Banking Authority in January 2026, has launched two consultations — one refining customer due diligence standards and another addressing linked transaction detection. This marks a major step toward harmonised AML/CFT supervision across EU member states. Firms operating cross-border in Europe should monitor these consultations closely as they will shape compliance requirements for 2027 onward.", source:'AMLA · RegTech Analyst', url:'https://regtechanalyst.com/global-financial-crime-compliance-key-signals-for-march-2026/' },
  { id:6, tag:'Enforcement', priority:'MEDIUM' as const, headline:'MAS Issues 16-Year Ban on Ex-Banker Linked to Singapore Money Laundering Case', summary:"In March 2026, the Monetary Authority of Singapore issued Prohibition Orders against two former relationship managers connected to the major August 2023 money laundering case — a 16-year ban for Wang Qiming and a 7-year ban for Liu Kai. This follows MAS's stated intent to take robust enforcement action where financial institutions and individuals fail AML/CFT obligations. Compliance teams in Singapore should use this as a case study for staff training on personal accountability.", source:'Monetary Authority of Singapore', url:'https://www.mas.gov.sg/regulation/enforcement/enforcement-actions/2026/mas-issues-prohibition-orders-against-former-relationship-managers-wang-qiming-and-liu-kai' },
];

const signals = [
  { title:'FATF — Grey List Update', body:'Kuwait and Papua New Guinea added to FATF increased monitoring list at the February 2026 Plenary. Myanmar faces potential countermeasures by June 2026 if no further progress is demonstrated.' },
  { title:'Bank Negara Malaysia — AML Fines', body:'Four entities fined RM1.07M for AML/CFT failures: MBSB Bank (RM560K) and SME Bank (RM460K) for delayed STR reporting, plus two corporate services firms for due diligence failures.' },
  { title:'FinCEN — Real Estate Rule Live', body:'Residential real estate reporting requirements for non-financed transfers to legal entities and trusts took effect 1 March 2026. All relevant parties must comply immediately.' },
  { title:'ACAMS — AI Risk at Record High', body:'75% of respondents rate malicious use of generative AI as a high or very high risk to financial crime programmes — ranking as the top external risk for the third consecutive year.' },
];

const pulseCards = [
  { title:'Malaysia Compliance Hiring — Surging Demand', body:"Over 20,000 open compliance roles in Malaysia as of February 2026. Digital bank launches and Bank Negara's expanding regulatory perimeter across digital assets, open banking, and cross-border payments are the primary drivers. CAMS and ACAMS certifications give candidates a strong competitive edge.", source:'Glassdoor · Net2Source' },
  { title:'Singapore MLRO — Premium for Crypto & VASP Experience', body:"Active MLRO and Compliance Officer roles increasingly require 6+ years' experience plus crypto/VASP regulatory knowledge, reflecting MAS's expanding digital asset oversight. Average AML Analyst salary sits around SGD 59,500, with senior roles (8+ years) reaching ~SGD 74,000.", source:'Glassdoor · SalaryExpert · Robert Walters' },
  { title:'Regional Trend — Compliance as a Strategic Hire', body:'Across Southeast Asia, banks and fintechs are repositioning compliance roles as strategic hires contributing to growth, not overhead. ESG compliance and digital banking compliance are emerging as premium specialisations in Malaysia and Singapore.', source:'Robert Walters · Morgan McKinley' },
];

const tagStyle: Record<string,string> = {
  Enforcement:'bg-red-50 text-red-700 border border-red-200',
  Regulatory:'bg-blue-50 text-blue-700 border border-blue-200',
  Sanctions:'bg-orange-50 text-orange-700 border border-orange-200',
  AML:'bg-purple-50 text-purple-700 border border-purple-200',
};

export default function BriefingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <section className="bg-brand-black text-white pt-28 pb-14 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-white/40 mb-8">
              <Link href="/intelligence" className="hover:text-brand-gold transition-colors">Intelligence Hub</Link>
              <span>/</span><span className="text-white/60">30 March 2026</span>
            </div>
            <p className="text-brand-gold text-[10px] font-bold tracking-[3px] uppercase mb-4 flex items-center gap-3">Weekly Briefing<span className="inline-block w-6 h-px bg-brand-gold" /></p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Global Compliance &amp; <span className="text-brand-gold">Financial Crime</span><br />Weekly Briefing</h1>
            <div className="flex items-center gap-5 flex-wrap mt-6 text-sm text-white/50">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />Monday, 30 March 2026</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />AML · Sanctions · Regulatory · Enforcement</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />Southeast Asia Focus</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/10">
              {[{n:'6',l:'Stories'},{n:'4',l:'High priority'},{n:'$80M',l:'Largest fine'},{n:'4',l:'Jurisdictions'}].map((s) => (
                <div key={s.l}><div className="text-brand-gold font-bold text-2xl">{s.n}</div><div className="text-white/40 text-xs uppercase tracking-wider mt-0.5">{s.l}</div></div>
              ))}
            </div>
          </div>
        </section>
        <section className="px-6 py-14">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-brand-gray">Intelligence Cards</p>
              <span className="bg-brand-black text-white text-[9px] font-bold px-2 py-0.5 rounded-sm">{cards.length}</span>
              <div className="flex-1 h-px bg-brand-light-gray" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cards.map((card) => (
                <div key={card.id} className="border border-brand-light-gray border-t-[3px] border-t-brand-gold bg-white p-7 flex flex-col hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${tagStyle[card.tag]||''}`}>{card.tag}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 ${card.priority==='HIGH'?'text-red-600':'text-brand-gray'}`}>{card.priority==='HIGH'?'● High priority':'○ Medium priority'}</span>
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
        <section className="bg-[#F8F8F6] px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-brand-gray">Additional Signals</p>
              <span className="bg-brand-black text-white text-[9px] font-bold px-2 py-0.5 rounded-sm">{signals.length}</span>
              <div className="flex-1 h-px bg-brand-light-gray" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {signals.map((s) => (
                <div key={s.title} className="bg-white border-l-[3px] border-l-brand-gold border border-brand-light-gray p-5">
                  <h3 className="text-xs font-bold text-brand-black mb-2 leading-snug">{s.title}</h3>
                  <p className="text-xs text-brand-gray leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-brand-black px-6 py-14">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-brand-gold">Market Pulse</p>
              <span className="text-[9px] text-white/30 uppercase tracking-widest">Southeast Asia Hiring &amp; Salary Signals</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {pulseCards.map((p) => (
                <div key={p.title} className="border border-white/10 border-t-2 border-t-brand-gold bg-[#111111] p-6">
                  <h3 className="text-brand-gold text-sm font-bold leading-snug mb-3">{p.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{p.body}</p>
                  <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-brand-gold/60 border border-white/10 px-2 py-0.5 rounded-sm">Data Point · {p.source}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="px-6 py-10 border-t border-brand-light-gray">
          <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
            <Link href="/intelligence" className="flex items-center gap-2 text-sm text-brand-gray hover:text-brand-gold transition-colors font-medium">← Back to Intelligence Hub</Link>
            <p className="text-xs text-brand-gray/60">Next briefing: Monday, 6 April 2026</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
