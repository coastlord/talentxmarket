import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="gold-line mb-6" />
            <h2 className="section-heading mb-6">
              Built by Compliance
              <span className="block text-brand-gold">Professionals</span>
            </h2>
            <p className="text-brand-gray leading-relaxed mb-6">
              TalentX Market was founded with one clear mission: to give the compliance
              sector a dedicated space where talent and opportunity can find each other —
              without noise, without generic job boards, and without inflated recruitment fees.
            </p>
            <p className="text-brand-gray leading-relaxed mb-6">
              Whether you work in AML, financial crime, regulatory risk, Trust &amp; Safety, or
              hold an MLRO designation, TalentX Market is your professional home. A platform
              that understands the nuances of compliance hiring and the career paths of
              compliance professionals.
            </p>
            <p className="text-brand-gray leading-relaxed mb-8">
              Our platform brings together compliance professionals who are ready for their
              next move with the organisations that are ready to hire them — directly, transparently,
              and efficiently.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Specialist Focus', desc: 'Compliance only — no noise' },
                { label: 'Direct Access', desc: 'No recruiters in the middle' },
                { label: 'Global Network', desc: '30+ countries represented' },
                { label: 'Professional-Led', desc: 'Built by the community' },
              ].map((value, i) => (
                <div key={i} className="bg-brand-off-white rounded-xl p-4 border border-brand-light-gray">
                  <p className="font-bold text-brand-dark text-sm">{value.label}</p>
                  <p className="text-brand-gray text-xs mt-1">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="relative bg-brand-black rounded-3xl p-10 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              {/* Logo */}
              <div className="relative flex justify-center mb-10">
                <Image
                  src="/logo-light.png"
                  alt="TalentX Market"
                  width={200}
                  height={60}
                  className="h-14 w-auto"
                />
              </div>

              {/* Mission statement */}
              <div className="relative text-center">
                <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-4">
                  Our Mission
                </p>
                <p className="text-white text-xl font-bold leading-relaxed">
                  &ldquo;To be the world&apos;s most trusted marketplace for compliance talent.&rdquo;
                </p>
              </div>

              {/* Stats */}
              <div className="relative mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                {[
                  { val: '2025', label: 'Founded' },
                  { val: 'Global', label: 'Reach' },
                  { val: '100%', label: 'Compliance' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="text-brand-gold font-black text-xl">{s.val}</p>
                    <p className="text-white/40 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
