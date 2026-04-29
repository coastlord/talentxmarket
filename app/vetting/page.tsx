import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Vetting Process | TalentX Market',
  description: 'Every compliance profile on TalentX Market is manually verified by compliance professionals. No algorithm decides who appears on the platform.',
  openGraph: {
    title: 'Vetting Process | TalentX Market',
    description: 'Every compliance profile on TalentX Market is manually verified. No auto-approvals, no algorithms.',
    url: 'https://talentxmarket.com/vetting',
    type: 'website',
  },
};

const steps = [
  {
    number: '01',
    title: 'Professional Background Review',
    body: 'We review the candidate\'s complete career history to confirm genuine, documented experience within regulated industries. Candidates without a verifiable compliance background are declined at this stage.',
    note: 'Regulated industry experience required — banking, fintech, insurance, asset management, or equivalent.',
  },
  {
    number: '02',
    title: 'Specialism Verification',
    body: 'Each candidate\'s core specialism is assessed against their stated expertise. We confirm whether their experience in AML, KYC, Sanctions, MLRO, Financial Crime, Regulatory Risk, or Trust & Safety is substantive — not just listed.',
    note: 'Generic "compliance" profiles without a defined specialism are not accepted.',
  },
  {
    number: '03',
    title: 'Certification & Qualification Check',
    body: 'Professional certifications are reviewed for validity and relevance. This includes CAMS, ICA Certificates and Diplomas, ACAMS, CFE, and jurisdiction-specific regulatory qualifications. Unverified or unsupported claims are flagged and queried.',
    note: 'Candidates must evidence their qualifications — not simply list them.',
  },
  {
    number: '04',
    title: 'Regulatory Jurisdiction Confirmation',
    body: 'We confirm the specific regulatory frameworks and jurisdictions the candidate has operated under — FCA, MAS, FINMA, FinCEN, SEC, CBN, DFSA, and others. This ensures employers know exactly the regulatory depth and geography of each profile.',
    note: 'Jurisdiction experience is displayed clearly on every approved profile.',
  },
  {
    number: '05',
    title: 'Manual Approval Gate',
    body: 'The final stage is a manual review by our compliance team. Only candidates who pass all four prior stages are approved for publication. There is no automatic pathway to the platform — every profile visible on TalentX has been explicitly approved by a compliance professional.',
    note: 'No automated publishing. Every card you see has been individually cleared.',
  },
];

const employerSees = [
  'Verified specialism (AML, KYC, MLRO, Sanctions etc.)',
  'Years of compliance-specific experience',
  'Confirmed regulatory jurisdiction exposure',
  'Professional certifications (CAMS, ICA, CFE etc.)',
  'Current availability and location',
  'Direct contact details — unlocked on demand',
];

export default function VettingPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Nav spacer */}
      <div className="h-20 bg-brand-black" />

      {/* Hero */}
      <section className="bg-brand-black pt-16 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">How We Verify</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6">
            Every Profile Is<br />
            <span className="text-brand-gold">Manually Verified</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            We do not auto-approve. No algorithm decides who appears on TalentX. Every candidate goes through a structured, multi-stage verification process before their profile is published — and reviewed by compliance professionals, not software.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10">
            {steps.map((step, i) => (
              <div key={step.number} className="flex gap-6 md:gap-10">
                {/* Number + connector */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-brand-black flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold text-xs font-black tracking-widest">{step.number}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-gray-100 mt-3" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-10 flex-1">
                  <h2 className="text-xl font-black text-brand-black mb-3 leading-tight">{step.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{step.body}</p>
                  <div className="inline-flex items-start gap-2 bg-[#C9A84C]/8 border border-[#C9A84C]/20 rounded-xl px-4 py-3">
                    <span className="text-brand-gold mt-0.5 flex-shrink-0">—</span>
                    <p className="text-[#8A6F2E] text-xs font-semibold leading-relaxed">{step.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-20 px-6 bg-[#F9F9F9] border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="mb-3">
            <div className="w-8 h-0.5 bg-brand-gold mb-6" />
            <h2 className="text-2xl md:text-3xl font-black text-brand-black leading-tight mb-5">
              Why Manual Verification Matters
            </h2>
          </div>
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            In compliance hiring, an unvetted placement is not just a bad hire — it is a regulatory risk. Organisations need to know that the professionals they contact have genuine, documented experience in their specialism and jurisdiction.
          </p>
          <p className="text-gray-600 text-base leading-relaxed">
            That is why we will never automate this process. Every profile on TalentX has been reviewed by someone who understands what good compliance experience actually looks like.
          </p>
        </div>
      </section>

      {/* What employers see */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="w-8 h-0.5 bg-brand-gold mb-6" />
          <h2 className="text-2xl md:text-3xl font-black text-brand-black leading-tight mb-10">
            What Employers See on Every Profile
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {employerSees.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-[#F9F9F9] border border-gray-100 rounded-2xl px-5 py-4">
                <span className="text-brand-gold font-black text-base mt-0.5 flex-shrink-0">✓</span>
                <span className="text-gray-700 text-sm font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-brand-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Ready to hire verified compliance talent?
          </h2>
          <p className="text-white/50 text-sm mb-8">
            Browse our vetted candidate pool and unlock full profiles with a verified company email.
          </p>
          <Link
            href="/talent"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-bold text-sm px-8 py-4 rounded-xl hover:bg-brand-gold/90 transition-all duration-200"
          >
            Browse Verified Talent →
          </Link>
        </div>
      </section>

    </main>
  );
}
