const roles = [
  { title: 'MLRO', full: 'Money Laundering Reporting Officer', desc: 'The key individual responsible for overseeing AML compliance and reporting suspicious activity to regulators.', bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800' },
  { title: 'AML Specialist', full: 'Anti-Money Laundering', desc: 'Experts in detecting, preventing, and reporting financial crime including money laundering and terrorist financing.', bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800' },
  { title: 'Risk Manager', full: 'Financial & Operational Risk', desc: 'Professionals who identify, assess, and manage financial, regulatory, and operational risks across the organisation.', bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-800' },
  { title: 'Compliance Officer', full: 'Chief Compliance Officer', desc: 'Senior leaders responsible for building and managing the entire compliance framework of an organisation.', bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-800' },
  { title: 'Trust & Safety', full: 'Platform Trust & Safety', desc: 'Specialists protecting users and platforms from fraud, abuse, and harmful content across digital ecosystems.', bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-800' },
  { title: 'KYC Analyst', full: 'Know Your Customer', desc: 'Professionals managing customer due diligence, enhanced due diligence, and identity verification processes.', bg: 'bg-teal-50', border: 'border-teal-200', badge: 'bg-teal-100 text-teal-800' },
  { title: 'Sanctions Specialist', full: 'Sanctions & Screening', desc: 'Experts in international sanctions regimes, OFAC, UN, EU and HMT screening, and sanctions risk management.', bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-800' },
  { title: 'Regulatory Affairs', full: 'Regulatory Affairs & Policy', desc: 'Professionals who navigate complex regulatory landscapes and engage with regulators such as the FCA, PRA, and EBA.', bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-800' },
  { title: 'Financial Crime', full: 'Financial Crime Investigation', desc: 'Investigators and analysts specialising in fraud, bribery, corruption, and financial crime investigations.', bg: 'bg-rose-50', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-800' },
];
export default function ComplianceRoles() {
  return (
    <section id="roles" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-16 h-1 bg-[#C9A84C] rounded-full mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Compliance Specialisms We Cover</h2>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">From entry-level analysts to C-suite executives — TalentX Market covers the full spectrum of compliance, risk, and financial crime roles.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map((r, i) => (
            <div key={i} className={`rounded-2xl p-6 ${r.bg} border ${r.border} hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{r.title}</h3>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full inline-block ${r.badge} mb-3`}>{r.full}</span>
              <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
