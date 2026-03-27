export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0A0A0A] overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-gray-900 to-[#0A0A0A]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A84C]/5 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="text-[#C9A84C] text-sm font-medium">The Compliance Talent Marketplace</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
            Where <span className="text-[#C9A84C]">Compliance</span><br />
            Talent Meets<br />
            <span className="text-white/70">Opportunity</span>
          </h1>
          <p className="mt-8 text-lg text-white/60 max-w-xl leading-relaxed">
            TalentX Market is the unified platform connecting AML, Risk, MLRO, Trust &amp; Safety professionals with the organisations that need them most.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href="#open-to-work" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] text-black font-bold rounded-xl hover:bg-[#E8C96A] transition-all duration-200 text-base shadow-xl hover:-translate-y-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              I'm Open to Work
            </a>
            <a href="#hiring" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 text-base hover:-translate-y-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              I'm Hiring
            </a>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-2">
              {['bg-blue-500','bg-purple-500','bg-green-500','bg-amber-500','bg-pink-500'].map((c,i) => (
                <div key={i} className={`w-9 h-9 rounded-full ${c} border-2 border-[#0A0A0A] flex items-center justify-center text-white text-xs font-bold`}>
                  {['A','R','C','T','M'][i]}
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm">Trusted by <span className="text-white font-semibold">compliance professionals</span> across the globe</p>
          </div>
        </div>
      </div>
    </section>
  );
}
