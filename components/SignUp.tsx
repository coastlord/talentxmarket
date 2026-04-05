'use client';

const PROFESSIONAL_FORM_ID = 'D4VGWb';
const EMPLOYER_FORM_ID = 'GxLk2O';

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

      {/* ── CANDIDATE: Open to Work ── */}
      <section id="open-to-work" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Info */}
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

            {/* Right: Tally Form */}
            <div className="bg-brand-off-white rounded-2xl p-8 border border-brand-light-gray">
              <TallyEmbed formId={PROFESSIONAL_FORM_ID} title="Open to Work Form" />
            </div>
          </div>
        </div>
      </section>

      {/* ── EMPLOYER: Get Matched ── */}
      <section id="hiring" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Info */}
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-semibold px-4 py-2 rounded-full border border-[#C9A84C]/30 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                For Employers
              </span>
              <h2 className="text-4xl font-black text-white leading-tight mb-6">
                Get Matched with
                <span className="block text-[#C9A84C]">Vetted Talent</span>
                <span className="block text-white">in 48 Hours</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                No job postings. No CV sifting. Tell us your role and we personally match you
                with pre-qualified AML, MLRO, Risk and Compliance professionals.
              </p>
              <ul className="space-y-4">
                {[
                  'Receive 2–3 vetted candidates within 48 hours',
                  'All professionals pre-screened by TalentX',
                  'AML, MLRO, KYC, Risk, Trust & Safety specialists',
                  'Permanent, contract and interim available',
                  'No agency fees during early access',
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
            </div>

            {/* Right: Tally Form */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="mb-4">
                <h3 className="text-white font-bold text-lg mb-1">Tell us what you&apos;re hiring for</h3>
                <p className="text-white/50 text-sm">We&apos;ll match you with the right candidates and make introductions within 24–48 hours.</p>
              </div>
              <TallyEmbed formId={EMPLOYER_FORM_ID} title="Get Matched Form" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
