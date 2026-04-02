const roles = [
  {
    title: 'MLRO',
    full: 'Money Laundering Reporting Officer',
    description: 'The key individual responsible for overseeing AML compliance and reporting suspicious activity to regulators.',
    color: 'from-amber-500/10 to-amber-600/5',
    border: 'border-amber-500/20',
    badge: 'bg-amber-500/10 text-amber-700',
  },
  {
    title: 'AML Specialist',
    full: 'Anti-Money Laundering',
    description: 'Experts in detecting, preventing, and reporting financial crime including money laundering and terrorist financing.',
    color: 'from-blue-500/10 to-blue-600/5',
    border: 'border-blue-500/20',
    badge: 'bg-blue-500/10 text-blue-700',
  },
  {
    title: 'Risk Manager',
    full: 'Financial & Operational Risk',
    description: 'Professionals who identify, assess, and manage financial, regulatory, and operational risks across the organisation.',
    color: 'from-purple-500/10 to-purple-600/5',
    border: 'border-purple-500/20',
    badge: 'bg-purple-500/10 text-purple-700',
  },
  {
    title: 'Compliance Officer',
    full: 'Chief Compliance Officer / CCO',
    description: 'Senior leaders responsible for building and managing the entire compliance framework of an organisation.',
    color: 'from-green-500/10 to-green-600/5',
    border: 'border-green-500/20',
    badge: 'bg-green-500/10 text-green-700',
  },
  {
    title: 'Trust & Safety',
    full: 'Platform Trust & Safety',
    description: 'Specialists protecting users and platforms from fraud, abuse, and harmful content across digital ecosystems.',
    color: 'from-red-500/10 to-red-600/5',
    border: 'border-red-500/20',
    badge: 'bg-red-500/10 text-red-700',
  },
  {
    title: 'KYC Analyst',
    full: 'Know Your Customer',
    description: 'Professionals managing customer due diligence (CDD), enhanced due diligence (EDD), and identity verification processes.',
    color: 'from-teal-500/10 to-teal-600/5',
    border: 'border-teal-500/20',
    badge: 'bg-teal-500/10 text-teal-700',
  },
  {
    title: 'Sanctions Specialist',
    full: 'Sanctions & Screening',
    description: 'Experts in international sanctions regimes, OFAC, UN, EU and HMT screening, and sanctions risk management.',
    color: 'from-orange-500/10 to-orange-600/5',
    border: 'border-orange-500/20',
    badge: 'bg-orange-500/10 text-orange-700',
  },
  {
    title: 'Regulatory Affairs',
    full: 'Regulatory Affairs & Policy',
    description: 'Professionals who navigate complex regulatory landscapes and engage with regulators such as the FCA, PRA, and EBA.',
    color: 'from-indigo-500/10 to-indigo-600/5',
    border: 'border-indigo-500/20',
    badge: 'bg-indigo-500/10 text-indigo-700',
  },
  {
    title: 'Financial Crime',
    full: 'Financial Crime Investigation',
    description: 'Investigators and analysts specialising in fraud, bribery, corruption, and financial crime investigations.',
    color: 'from-rose-500/10 to-rose-600/5',
    border: 'border-rose-500/20',
    badge: 'bg-rose-500/10 text-rose-700',
  },
];

export default function ComplianceRoles() {
  return (
    <section id="roles" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="gold-line mx-auto mb-6" />
          <h2 className="section-heading">Compliance Specialisms We Cover</h2>
          <p className="section-subheading mx-auto text-center">
            From entry-level analysts to C-suite executives — TalentX Market covers the full
            spectrum of compliance, risk, and financial crime roles.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map((role, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl p-6 bg-gradient-to-br ${role.color} border ${role.border} hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">{role.title}</h3>
                  <p className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-full inline-block ${role.badge}`}>
                    {role.full}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              <p className="text-brand-gray text-sm leading-relaxed">{role.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-brand-gray text-sm">
            Don&apos;t see your specialism?{' '}
            <a href="#open-to-work" className="text-brand-gold font-semibold hover:underline">
              Register anyway
            </a>{' '}
            — we&apos;re continuously expanding our coverage.
          </p>
        </div>
      </div>
    </section>
  );
}
