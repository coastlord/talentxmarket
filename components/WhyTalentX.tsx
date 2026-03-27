const features = [
  { title: 'Compliance-Specific', highlight: 'Built for compliance', desc: 'Unlike generic job boards, TalentX is built exclusively for compliance, AML, risk, and financial crime professionals. Every feature is designed with your sector in mind.' },
  { title: 'Direct Connections', highlight: 'No middlemen', desc: 'No recruitment agencies taking a cut. Employers connect directly with talent. Professionals hear from real decision-makers. Faster, more transparent, more efficient.' },
  { title: 'Post Availability', highlight: 'Professionals in control', desc: 'Compliance professionals can set themselves as Open to Work — specifying role type, location, seniority and availability so the right opportunities find them.' },
  { title: 'Talent Search', highlight: 'Find the right fit', desc: 'Employers can search and browse verified compliance professionals by specialism, jurisdiction, experience level, and availability — in real time.' },
  { title: 'Global Reach', highlight: '30+ countries', desc: 'TalentX connects compliance professionals and employers across Europe, APAC, the Americas, and the Middle East — wherever regulated industries operate.' },
  { title: 'Always On', highlight: 'Passive & active', desc: 'Whether you are actively job hunting or passively open to the right opportunity, your profile works for you 24/7 — always visible to the right employers.' },
];
export default function WhyTalentX() {
  return (
    <section id="why-talentx" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-16 h-1 bg-[#C9A84C] rounded-full mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">Why Choose TalentX Market?</h2>
          <p className="text-lg text-white/50 mt-4 max-w-2xl mx-auto">The compliance sector deserves its own dedicated talent platform. Here is what makes TalentX different.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#C9A84C]/30 transition-all duration-300">
              <p className="text-[#C9A84C]/70 text-xs font-semibold uppercase tracking-widest mb-3">{f.highlight}</p>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#open-to-work" className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-black transition-all duration-200">Join as a Professional</a>
          <a href="#hiring" className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] text-black font-semibold rounded-lg hover:bg-[#E8C96A] transition-all duration-200 shadow-lg">Start Hiring Today</a>
        </div>
      </div>
    </section>
  );
}
