import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-brand-black overflow-hidden flex items-center">
      {/* Background gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-gray-900 to-brand-black" />
        {/* Gold accent glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201, 168, 76, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 168, 76, 0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-brand-gold text-sm font-medium">
                The Compliance Talent Marketplace
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
              Where
              <span className="block text-brand-gold">Compliance</span>
              <span className="block">Talent Meets</span>
              <span className="block text-white/80">Opportunity</span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed">
              TalentX Market is the unified platform connecting AML, Risk, MLRO,
              Trust &amp; Safety professionals with the organisations that need
              them most.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#open-to-work"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-gold text-brand-black font-bold rounded-xl hover:bg-brand-gold-light transition-all duration-200 text-base shadow-xl shadow-brand-gold/20 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                I&apos;m Open to Work
                <span className="text-xs font-normal opacity-70">→</span>
              </a>
              <a
                href="#hiring"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-200 text-base backdrop-blur-sm hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                I&apos;m Hiring
                <span className="text-xs font-normal opacity-70">→</span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex items-center gap-6 flex-wrap">
              <div className="flex -space-x-2">
                {['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-amber-500', 'bg-pink-500'].map((color, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full ${color} border-2 border-brand-black flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {['A', 'R', 'C', 'T', 'M'][i]}
                  </div>
                ))}
              </div>
              <p className="text-white/50 text-sm">
                Trusted by <span className="text-white font-semibold">compliance professionals</span> across the globe
              </p>
            </div>
          </div>

          {/* Right: Visual Cards */}
          <div className="hidden lg:block relative">
            {/* Floating card 1 - Professional */}
            <div className="absolute top-0 right-0 w-80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/20 border border-brand-gold/30 flex items-center justify-center">
                  <span className="text-brand-gold font-bold">SC</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Sarah Chen</p>
                  <p className="text-white/50 text-xs">MLRO • 8 Years Experience</p>
                </div>
                <span className="ml-auto bg-green-500/20 text-green-400 text-xs font-medium px-2.5 py-1 rounded-full border border-green-500/20">
                  Open to Work
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['AML', 'Compliance', 'FATF', 'Risk'].map((tag) => (
                  <span key={tag} className="bg-white/10 text-white/60 text-xs px-2.5 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating card 2 - Job */}
            <div className="absolute top-52 -left-8 w-80 bg-brand-black border border-brand-gold/20 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-semibold text-sm">Head of Compliance</p>
                  <p className="text-brand-gold text-xs mt-0.5">FinTech Europe • London, UK</p>
                </div>
                <span className="bg-brand-gold/10 text-brand-gold text-xs font-medium px-2.5 py-1 rounded-full border border-brand-gold/20">
                  Hiring
                </span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">
                Seeking an experienced MLRO to lead our compliance function across 12 markets...
              </p>
              <div className="mt-3 flex gap-2">
                {['MLRO', 'FCA', 'AML5'].map((tag) => (
                  <span key={tag} className="bg-white/5 text-white/40 text-xs px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating card 3 - Match */}
            <div className="absolute bottom-0 right-12 w-64 bg-brand-gold/10 backdrop-blur-sm border border-brand-gold/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center">
                  <svg className="w-4 h-4 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-brand-gold font-semibold text-sm">New Match!</p>
              </div>
              <p className="text-white/70 text-xs">
                Your profile matched <strong className="text-white">3 new opportunities</strong> today
              </p>
            </div>

            {/* Decorative circles */}
            <div className="w-96 h-96 rounded-full border border-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="w-72 h-72 rounded-full border border-brand-gold/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <p className="text-white/30 text-xs uppercase tracking-widest">Scroll</p>
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
