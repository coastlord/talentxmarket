import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-14 md:py-24 bg-[#F4F4F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="gold-line mb-4 md:mb-6" />
            <h2 className="section-heading mb-4 md:mb-6">
              Built by a Group of
              <span className="block text-brand-gold">Compliance Professionals</span>
            </h2>
            <p className="text-brand-gray leading-relaxed mb-4 md:mb-6">
              TalentX Market was founded by a group of compliance professionals who
              have personally hired AML, KYC, MLRO, and Financial Crime roles inside
              regulated institutions — and who saw first-hand how broken the existing
              hiring process was for this sector.
            </p>
            {/* Paragraphs 2 & 3 — hidden on mobile */}
            <p className="hidden md:block text-brand-gray leading-relaxed mb-6">
              We have sat on both sides of the table: as compliance professionals looking
              for the right opportunity, and as hiring managers trying to find candidates
              with genuine specialism depth. The tools available were generic, expensive,
              and entirely unfit for the nuance that compliance hiring demands.
            </p>
            <p className="hidden md:block text-brand-gray leading-relaxed mb-8">
              TalentX Market exists because we built the platform we always wished had existed —
              one that understands what good compliance experience actually looks like,
              and that treats both candidates and employers with the professionalism
              this sector deserves.
            </p>

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
                  src="/tx-icon-gold.png"
                  alt="TalentX Market"
                  width={501}
                  height={302}
                  className="w-auto"
                  style={{ height: '60px' }}
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
