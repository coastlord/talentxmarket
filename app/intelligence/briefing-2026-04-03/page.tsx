import Link from 'next/link';
import Navbar from '../../../components/Navbar';

const briefingDate = "3 April 2026";

interface Article {
  id: number;
  tag: string;
  title: string;
  summary: string;
  insight: string;
  source: string;
  readTime: string;
}

const articles: Article[] = [
  {
    id: 1,
    tag: "Regulatory",
    title: "FCA Consults on AI in Financial Services Oversight",
    summary: "The UK Financial Conduct Authority has opened a consultation on how artificial intelligence should be governed within regulated financial services firms.",
    insight: "Compliance teams should begin mapping AI tools used across their organisations and establish governance frameworks now, ahead of any formal rules. Early movers will be better positioned when binding requirements arrive.",
    source: "FCA.org.uk",
    readTime: "3 min read",
  },
  {
    id: 2,
    tag: "AML",
    title: "Singapore MAS Raises AML Scrutiny on Digital Asset Firms",
    summary: "The Monetary Authority of Singapore has issued updated guidance on anti-money laundering obligations for digital payment token service providers, with heightened focus on transaction monitoring.",
    insight: "VASP compliance officers should review their transaction monitoring thresholds and ensure STR reporting workflows are aligned with MAS expectations. Singapore is signalling zero tolerance for gaps.",
    source: "MAS.gov.sg",
    readTime: "4 min read",
  },
  {
    id: 3,
    tag: "Sanctions",
    title: "OFAC Updates SDN List with New Crypto-Linked Designations",
    summary: "The US Office of Foreign Assets Control has added several digital wallet addresses and entities to its Specially Designated Nationals list following investigations into sanctions evasion.",
    insight: "Compliance and sanctions screening teams must ensure their tools ingest OFAC updates in real time. Crypto-linked exposures are now a board-level risk requiring dedicated oversight.",
    source: "OFAC.gov",
    readTime: "3 min read",
  },
  {
    id: 4,
    tag: "Enforcement",
    title: "EU Regulator Fines Bank EUR 85M for AML Control Failures",
    summary: "A major European bank has been fined EUR 85 million by its national regulator for systemic failures in anti-money laundering controls, including inadequate customer due diligence processes.",
    insight: "This enforcement action reinforces that CDD documentation quality, not just process, is under scrutiny. MLROs should commission internal audits of CDD completeness before regulators do.",
    source: "European Banking Authority",
    readTime: "4 min read",
  },
  {
    id: 5,
    tag: "Regulatory",
    title: "FATF Peer Review: UAE Shows Progress on Technical Compliance",
    summary: "The Financial Action Task Force has published a follow-up report indicating the UAE has made significant progress on technical compliance, particularly around beneficial ownership.",
    insight: "Firms operating in the Gulf region should update their jurisdictional risk assessments to reflect the improved FATF standing of the UAE. This may affect correspondent banking and onboarding decisions.",
    source: "FATF-GAFI.org",
    readTime: "3 min read",
  },
  {
    id: 6,
    tag: "AML",
    title: "Malaysia BNM Expands Compliance Hiring Across Banking Sector",
    summary: "Bank Negara Malaysia has signalled expectations for enhanced compliance resourcing across licensed financial institutions, with over 4,000 new compliance roles posted across the sector in Q1 2026.",
    insight: "The compliance talent market in Malaysia is heating up. Firms looking to hire should move quickly. Experienced MLRO and DMLRO candidates are being placed faster than at any point in the last five years.",
    source: "BNM.gov.my",
    readTime: "3 min read",
  },
];

const tagStyle: Record<string, string> = {
  Enforcement: "bg-red-50 text-red-700 border border-red-200",
  Regulatory: "bg-blue-50 text-blue-700 border border-blue-200",
  Sanctions: "bg-orange-50 text-orange-700 border border-orange-200",
  AML: "bg-purple-50 text-purple-700 border border-purple-200",
};

export default function BriefingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <section className="bg-brand-black text-white pt-16 pb-14 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-white/40 mb-8">
              <Link href="/intelligence" className="hover:text-brand-gold transition-colors">Intelligence Hub</Link>
              <span className="text-white/60">/</span>
              <span className="text-white/60">{briefingDate}</span>
            </div>
            <p className="text-brand-gold text-[10px] font-bold tracking-[3px] uppercase mb-4 flex items-center gap-3">
              Intelligence Briefing
              <span className="inline-block w-6 h-px bg-brand-gold" />
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Global Compliance &amp;{" "}
              <span className="text-brand-gold">Financial Crime</span>
              <br />Intelligence Briefing
            </h1>
            <div className="flex items-center gap-5 flex-wrap mt-6 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                {briefingDate}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                AML &bull; Enforcement &bull; Sanctions &bull; Regulatory
              </span>
            </div>
          </div>
        </section>
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="border border-brand-light-gray border-t-[3px] border-t-brand-gold p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagStyle[article.tag] || ""}`}>
                    {article.tag}
                  </span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{article.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-brand-black mb-3">{article.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{article.summary}</p>
                <div className="bg-amber-50 border-l-4 border-brand-gold px-5 py-4 rounded-r">
                  <p className="text-sm font-semibold text-brand-gold mb-1">TalentX Insight</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{article.insight}</p>
                </div>
                <p className="text-xs text-gray-400 mt-4">Source: {article.source}</p>
              </article>
            ))}
          </div>
          <div className="flex items-center justify-between mt-16 pt-8 border-t border-brand-light-gray">
            <Link
              href="/intelligence"
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-gold transition-colors"
            >
              <span>&#8592;</span>
              Back to Intelligence Hub
            </Link>
            <Link
              href="/intelligence/briefing-2026-04-01"
              className="text-sm font-medium text-brand-gold hover:underline"
            >
              Previous Briefing &rarr;
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
