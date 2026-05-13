export default function VettingSnapshot() {
  const steps = [
    {
      number: '01',
      title: 'Professional Background',
      desc: 'Career history in regulated industries confirmed. No verifiable compliance background — declined.',
    },
    {
      number: '02',
      title: 'Specialism Assessment',
      desc: 'AML, KYC, MLRO, Sanctions or Financial Crime expertise verified — not just listed.',
    },
    {
      number: '03',
      title: 'Certifications Checked',
      desc: 'CAMS, ICA, ACAMS, CFE and equivalent qualifications reviewed for validity.',
    },
    {
      number: '04',
      title: 'Jurisdiction Confirmed',
      desc: 'Specific regulatory frameworks confirmed — FCA, MAS, FinCEN, DFSA and others.',
    },
    {
      number: '05',
      title: 'Manual Approval Gate',
      desc: 'Reviewed and approved by a compliance professional. No automated publishing.',
    },
  ];

  return (
    <section className="py-16 bg-brand-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-0.5 bg-brand-gold" />
              <p className="text-brand-gold text-xs font-bold uppercase tracking-widest">
                Our Verification Standard
              </p>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Every profile passes a 5-stage manual review
            </h2>
          </div>
          <a
            href="#vetting-process"
            className="flex-shrink-0 inline-flex items-center gap-2 text-brand-gold text-sm font-semibold hover:underline"
          >
            See full process
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Steps — horizontal on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-0">
          {steps.map((step, i) => (
            <div key={i} className="relative flex sm:flex-col gap-4 sm:gap-0 items-start sm:items-start py-5 sm:py-0 sm:px-5 border-b sm:border-b-0 sm:border-r border-white/8 last:border-0">

              {/* Step number */}
              <div className="flex-shrink-0 w-9 h-9 rounded-full border border-brand-gold/40 bg-brand-gold/10 flex items-center justify-center sm:mb-4">
                <span className="text-brand-gold text-xs font-black">{step.number}</span>
              </div>

              {/* Content */}
              <div className="sm:mt-0">
                <p className="text-white font-bold text-sm mb-1.5">{step.title}</p>
                <p className="text-white/70 text-xs leading-relaxed">{step.desc}</p>
              </div>

              {/* Connector arrow — desktop only */}
              {i < steps.length - 1 && (
                <div className="hidden sm:flex absolute -right-3 top-4 z-10 w-6 h-6 items-center justify-center">
                  <svg className="w-3 h-3 text-brand-gold/40" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom trust line */}
        <div className="mt-10 pt-8 border-t border-white/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-white/60 text-sm">
            <span className="text-white font-semibold">No candidate is published automatically.</span>{' '}
            Every profile you see on TalentX has been individually reviewed and approved.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            {[
              { icon: '🔒', text: 'Contact details protected' },
              { icon: '✔', text: 'Business email verified' },
              { icon: '🛡', text: 'UK GDPR compliant' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/60 text-xs">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
