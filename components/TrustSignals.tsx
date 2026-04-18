export default function TrustSignals() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────
          SECTION 1 — THE PROBLEM WE SOLVE
      ───────────────────────────────────────────────────────────────── */}
      <section id="the-problem" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-1 bg-brand-gold rounded-full mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight">
              Compliance Hiring Is{' '}
              <span className="text-brand-gold">Broken</span>
            </h2>
            <p className="text-lg text-brand-gray mt-4 max-w-2xl mx-auto leading-relaxed">
              Every organisation hiring in compliance faces the same frustration.
              The existing options are either too slow, too expensive, or simply not built for this sector.
            </p>
          </div>

          {/* Pain points grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                problem: 'Generic Job Boards',
                headline: 'Signal lost in the noise',
                body: 'Platforms like LinkedIn, Indeed, and Reed were not designed for compliance hiring. You post a role and receive hundreds of irrelevant applications from candidates with no AML, KYC, or regulatory experience — wasting weeks of review time.',
                stat: '80%',
                statLabel: 'of CVs received are irrelevant to the role',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                problem: 'Recruitment Agencies',
                headline: 'Expensive, slow, and opaque',
                body: 'Traditional compliance recruiters charge 20–30% of the first-year salary — often for candidates they found on the same job boards you could access yourself. The process is slow, the margins are hidden, and the recruiter rarely understands the technical depth of your role.',
                stat: '25%',
                statLabel: 'average agency fee on compliance placement',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                problem: 'No Specialist Platform',
                headline: 'The compliance sector had no home',
                body: 'Compliance, AML, MLRO, Trust & Safety — these are specialisms that require deep regulatory knowledge. No platform existed that was built exclusively for these professionals: somewhere to surface verified talent, ensure quality, and protect candidate privacy.',
                stat: '0',
                statLabel: 'dedicated compliance-only talent platforms before TalentX',
              },
            ].map((item, i) => (
              <div key={i} className="bg-brand-off-white rounded-2xl p-8 border border-brand-light-gray">
                <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-400 mb-6">
                  {item.icon}
                </div>
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">{item.problem}</p>
                <h3 className="text-xl font-bold text-brand-dark mb-3">{item.headline}</h3>
                <p className="text-brand-gray text-sm leading-relaxed mb-6">{item.body}</p>
                <div className="pt-4 border-t border-brand-light-gray">
                  <p className="text-3xl font-black text-brand-dark">{item.stat}</p>
                  <p className="text-xs text-brand-gray mt-1">{item.statLabel}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Transition statement */}
          <div className="text-center bg-brand-black rounded-2xl px-8 py-10">
            <p className="text-white text-xl md:text-2xl font-bold leading-relaxed max-w-3xl mx-auto">
              TalentX Market was built to fix this — a{' '}
              <span className="text-brand-gold">closed, curated, compliance-only</span>{' '}
              network where every professional is verified before anyone sees them.
            </p>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 2 — OUR VETTING PROCESS
      ───────────────────────────────────────────────────────────────── */}
      <section id="vetting-process" className="py-24 bg-brand-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="w-16 h-1 bg-brand-gold rounded-full mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-4">
              Every Profile Is{' '}
              <span className="text-brand-gold">Manually Verified</span>
            </h2>
            <p className="text-lg text-brand-gray leading-relaxed">
              We do not auto-approve. No algorithm decides who appears on TalentX.
              Every candidate goes through a structured, multi-stage verification process
              before their profile is published — and reviewed by compliance professionals,
              not software.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: stages */}
            <div className="space-y-0">
              {[
                {
                  stage: '01',
                  title: 'Professional Background Review',
                  description:
                    'We review the candidate\'s complete career history to confirm genuine, documented experience within regulated industries. Candidates without a verifiable compliance background are declined at this stage.',
                  detail: 'Regulated industry experience required — banking, fintech, insurance, asset management, or equivalent.',
                  color: 'bg-brand-gold',
                },
                {
                  stage: '02',
                  title: 'Specialism Verification',
                  description:
                    'Each candidate\'s core specialism is assessed against their stated expertise. We confirm whether their experience in AML, KYC, Sanctions, MLRO, Financial Crime, Regulatory Risk, or Trust & Safety is substantive — not just listed.',
                  detail: 'Generic "compliance" profiles without a defined specialism are not accepted.',
                  color: 'bg-brand-gold',
                },
                {
                  stage: '03',
                  title: 'Certification & Qualification Check',
                  description:
                    'Professional certifications are reviewed for validity and relevance. This includes CAMS, ICA Certificates and Diplomas, ACAMS, CFE, and jurisdiction-specific regulatory qualifications. Unverified or unsupported claims are flagged and queried.',
                  detail: 'Candidates must evidence their qualifications — not simply list them.',
                  color: 'bg-brand-gold',
                },
                {
                  stage: '04',
                  title: 'Regulatory Jurisdiction Confirmation',
                  description:
                    'We confirm the specific regulatory frameworks and jurisdictions the candidate has operated under — FCA, MAS, FINMA, FinCEN, SEC, CBN, DFSA, and others. This ensures employers know exactly the regulatory depth and geography of each profile.',
                  detail: 'Jurisdiction experience is displayed clearly on every approved profile.',
                  color: 'bg-brand-gold',
                },
                {
                  stage: '05',
                  title: 'Manual Approval Gate',
                  description:
                    'The final stage is a manual review by our compliance team. Only candidates who pass all four prior stages are approved for publication. There is no automatic pathway to the platform — every profile visible on TalentX has been explicitly approved by a compliance professional.',
                  detail: 'No automated publishing. Every card you see has been individually cleared.',
                  color: 'bg-brand-gold',
                },
              ].map((step, i, arr) => (
                <div key={i} className="flex gap-6">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center flex-shrink-0 z-10">
                      <span className="text-brand-gold text-xs font-black">{step.stage}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-px flex-1 bg-brand-light-gray mt-2 mb-0" style={{ minHeight: '32px' }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pb-8 ${i === arr.length - 1 ? '' : ''}`}>
                    <h3 className="text-lg font-bold text-brand-dark mb-2">{step.title}</h3>
                    <p className="text-brand-gray text-sm leading-relaxed mb-3">{step.description}</p>
                    <div className="inline-flex items-start gap-2 bg-brand-gold/10 border border-brand-gold/20 rounded-lg px-3 py-2">
                      <svg className="w-3.5 h-3.5 text-brand-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-brand-gold text-xs font-medium leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: trust callout */}
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Main callout */}
              <div className="bg-brand-black rounded-2xl p-8">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Why Manual Verification Matters</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  In compliance hiring, an unvetted placement is not just a bad hire — it is a regulatory risk.
                  Organisations need to know that the professionals they contact have genuine, documented
                  experience in their specialism and jurisdiction.
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  That is why we will never automate this process. Every profile on TalentX has been
                  reviewed by someone who understands what good compliance experience actually looks like.
                </p>
              </div>

              {/* What employers see */}
              <div className="bg-white rounded-2xl p-6 border border-brand-light-gray">
                <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-4">
                  What Employers See on Every Profile
                </p>
                <div className="space-y-3">
                  {[
                    { icon: '✓', label: 'Verified specialism (AML, KYC, MLRO, Sanctions etc.)' },
                    { icon: '✓', label: 'Years of compliance-specific experience' },
                    { icon: '✓', label: 'Confirmed regulatory jurisdiction exposure' },
                    { icon: '✓', label: 'Professional certifications (CAMS, ICA, CFE etc.)' },
                    { icon: '✓', label: 'Current availability and location' },
                    { icon: '✓', label: 'Direct contact details — unlocked on demand' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold text-xs font-bold flex-shrink-0 mt-0.5">
                        {item.icon}
                      </span>
                      <p className="text-brand-gray text-sm">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security note */}
              <div className="bg-brand-off-white rounded-xl p-5 border border-brand-light-gray">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-gray mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <p className="text-xs font-bold text-brand-dark mb-1">Candidate Privacy Protected</p>
                    <p className="text-xs text-brand-gray leading-relaxed">
                      Contact details are never visible to the public. Employers must verify
                      their business identity before any profile can be unlocked.
                      Candidate data is handled in accordance with UK GDPR.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 3 — WHAT MAKES US DIFFERENT
      ───────────────────────────────────────────────────────────────── */}
      <section id="why-different" className="py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-1 bg-brand-gold rounded-full mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Why TalentX Is{' '}
              <span className="text-brand-gold">Not Another Job Board</span>
            </h2>
            <p className="text-lg text-white/50 mt-4 max-w-2xl mx-auto">
              See how TalentX compares to every alternative you&apos;ve tried — and why compliance
              professionals and employers trust it more.
            </p>
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto mb-16">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr>
                  <th className="text-left pb-6 pr-4 text-white/40 text-sm font-semibold">Feature</th>
                  <th className="pb-6 px-4 text-white/40 text-sm font-semibold text-center">Generic Job Boards</th>
                  <th className="pb-6 px-4 text-white/40 text-sm font-semibold text-center">Recruitment Agencies</th>
                  <th className="pb-6 px-4 text-white/40 text-sm font-semibold text-center">LinkedIn</th>
                  <th className="pb-6 pl-4 text-center">
                    <span className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/30 rounded-full px-4 py-1 text-brand-gold text-sm font-bold">
                      TalentX Market
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  {
                    feature: 'Compliance-only platform',
                    boards: false, agencies: false, linkedin: false, talentx: true,
                  },
                  {
                    feature: 'Manual candidate vetting',
                    boards: false, agencies: 'Partial', linkedin: false, talentx: true,
                  },
                  {
                    feature: 'Specialism-level filtering',
                    boards: false, agencies: 'Partial', linkedin: false, talentx: true,
                  },
                  {
                    feature: 'No agency placement fee',
                    boards: true, agencies: false, linkedin: true, talentx: true,
                  },
                  {
                    feature: 'Candidate privacy protected',
                    boards: false, agencies: false, linkedin: false, talentx: true,
                  },
                  {
                    feature: 'Business email gate for employers',
                    boards: false, agencies: false, linkedin: false, talentx: true,
                  },
                  {
                    feature: 'Built by compliance professionals',
                    boards: false, agencies: false, linkedin: false, talentx: true,
                  },
                  {
                    feature: 'Direct employer-to-candidate contact',
                    boards: true, agencies: false, linkedin: true, talentx: true,
                  },
                  {
                    feature: 'Jurisdiction & certification verified',
                    boards: false, agencies: 'Partial', linkedin: false, talentx: true,
                  },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="py-4 pr-4 text-white/70 text-sm font-medium">{row.feature}</td>
                    {(['boards', 'agencies', 'linkedin'] as const).map(col => (
                      <td key={col} className="py-4 px-4 text-center">
                        {row[col] === true && (
                          <span className="inline-flex justify-center">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                        {row[col] === false && (
                          <span className="inline-flex justify-center">
                            <svg className="w-5 h-5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                        {typeof row[col] === 'string' && (
                          <span className="text-white/30 text-xs">{row[col]}</span>
                        )}
                      </td>
                    ))}
                    <td className="py-4 pl-4 text-center">
                      <span className="inline-flex justify-center">
                        <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Four differentiator cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Curated, Not Crowded',
                body: 'Every profile is approved by hand. You will never scroll through thousands of irrelevant candidates. Every person you see on TalentX belongs there.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Direct, Not Delegated',
                body: 'No recruitment agency sitting in the middle, marking up fees and filtering your options. You access talent directly — on your timeline, at your terms.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Controlled Access',
                body: 'Candidate contact details are never public. Employers must verify their business identity before accessing any profile — protecting candidates from unwanted exposure.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Built by the Sector',
                body: 'TalentX was built by compliance professionals who have worked inside regulated organisations. We understand what good looks like — because we have hired for it ourselves.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-brand-gold/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-5">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/sign-up"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-gold text-brand-black font-bold rounded-xl hover:bg-brand-gold-light transition-all duration-200 text-base shadow-xl shadow-brand-gold/20 hover:-translate-y-0.5"
              >
                Post Your Availability
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/talent"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 text-base backdrop-blur-sm hover:-translate-y-0.5"
              >
                Browse Verified Talent
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
