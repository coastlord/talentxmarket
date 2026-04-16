import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/tx-icon-gold.png"
              alt="TalentX Market"
              width={501}
              height={302}
              className="w-auto mb-6"
              style={{ height: '50px' }}
            />
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              The compliance talent marketplace. Connecting AML, Risk, MLRO, and
              Trust &amp; Safety professionals with the right opportunities.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/talentxmarket"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-gold/20 hover:border-brand-gold/30 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-gold transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/talentxmarket"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-gold/20 hover:border-brand-gold/30 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-gold transition-all duration-200"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.264 5.632 5.9-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* For Professionals */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">
              For Professionals
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Post Your Availability', href: '#open-to-work' },
                { label: 'Browse Vacancies', href: '#hiring' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Compliance Specialisms', href: '#roles' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-brand-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">
              For Employers
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Post a Vacancy', href: '#hiring' },
                { label: 'Search Talent', href: '#hiring' },
                { label: 'Specialisms We Cover', href: '#roles' },
                { label: 'Why TalentX', href: '#why-talentx' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-brand-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About TalentX', href: '#about' },
                { label: 'Contact Us', href: 'mailto:hello@talentxmarket.com' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-brand-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {currentYear} TalentX Market. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            The compliance talent marketplace —{' '}
            <a
              href="https://talentxmarket.com"
              className="text-brand-gold/60 hover:text-brand-gold transition-colors duration-200"
            >
              talentxmarket.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
