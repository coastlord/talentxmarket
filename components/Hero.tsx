import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-brand-black overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-brand-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28 md:py-32 md:pt-40 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-2 mb-6 md:mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-brand-gold text-xs sm:text-sm font-medium">
            Pre-vetted Compliance Talent · Introductions in 48 Hours
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
          Hire Vetted
          <span className="block text-brand-gold">Risk &amp; Compliance</span>
          <span className="block">Talent in 48 Hours</span>
        </h1>
        <p className="mt-5 md:mt-8 text-base sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
          No job postings. No recruiters. Browse pre-qualified AML, MLRO, Risk &amp; KYC professionals — unlock the profile when you find the right person.
        </p>
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/talent"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-gold text-brand-black font-bold rounded-xl hover:bg-brand-gold-light transition-all duration-200 text-base shadow-xl shadow-brand-gold/20 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Browse Talent →
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 text-base"
          >
            Post My Availability →
          </Link>
        </div>
        {/* Trust badges — visible on all screen sizes, compact on mobile */}
        <div className="mt-8 md:mt-10 flex items-center gap-4 md:gap-6 justify-center flex-wrap">
          {[
            { icon: '✔', text: 'Pre-vetted professionals' },
            { icon: '⚡', text: '48h introductions' },
            { icon: '🎯', text: 'No agency fees' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-1.5 text-white/70 text-xs md:text-sm">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
