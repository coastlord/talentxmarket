export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-16 h-1 bg-[#C9A84C] rounded-full mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Built by Compliance<br /><span className="text-[#C9A84C]">Professionals</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5">TalentX Market was founded with one clear mission: to give the compliance sector a dedicated space where talent and opportunity can find each other — without noise, without generic job boards, and without inflated recruitment fees.</p>
            <p className="text-gray-500 leading-relaxed mb-5">Whether you work in AML, financial crime, regulatory risk, Trust &amp; Safety, or hold an MLRO designation, TalentX Market is your professional home.</p>
            <p className="text-gray-500 leading-relaxed mb-8">Our platform brings together compliance professionals who are ready for their next move with the organisations that are ready to hire them — directly, transparently, and efficiently.</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Specialist Focus', desc: 'Compliance only — no noise' },
                { label: 'Direct Access', desc: 'No recruiters in the middle' },
                { label: 'Global Network', desc: '30+ countries represented' },
                { label: 'Professional-Led', desc: 'Built by the community' },
              ].map((v, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-bold text-gray-900 text-sm">{v.label}</p>
                  <p className="text-gray-500 text-xs mt-1">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#0A0A0A] rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative mb-10">
              <img src="/logo.png" alt="TalentX Market" className="h-48 w-auto invert" />
            </div>
            <div className="relative text-center mb-10">
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-4">Our Mission</p>
              <p className="text-white text-xl font-bold leading-relaxed">"To be the world's most trusted marketplace for compliance talent."</p>
            </div>
            <div className="relative grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              {[{ val: '2025', label: 'Founded' }, { val: 'Global', label: 'Reach' }, { val: '100%', label: 'Compliance' }].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-[#C9A84C] font-black text-xl">{s.val}</p>
                  <p className="text-white/40 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
