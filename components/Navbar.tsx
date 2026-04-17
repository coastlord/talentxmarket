'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-brand-black ${
        scrolled ? 'shadow-lg shadow-black/40' : 'border-b border-white/8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/tx-icon-gold.png"
              alt="TalentX Market"
              width={501}
              height={302}
              className="w-auto object-contain"
              style={{ height: '80px' }}
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
              How It Works
            </a>
            <a href="#roles" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
              Specialisms
            </a>
            <a href="#why-talentx" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
              Why TalentX
            </a>
            <a href="#about" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
              About
            </a>
            <Link href="/talent" className="flex items-center gap-1.5 text-brand-gold hover:text-brand-gold/80 transition-colors duration-200 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Browse Talent
            </Link>
          </div>

          {/* CTA / Auth */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/employers"
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all duration-200"
            >
              Employer Dashboard
            </Link>
            {isLoaded && isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-brand-gold border border-brand-gold/30 rounded-lg hover:border-brand-gold hover:bg-brand-gold/5 transition-all duration-200"
                >
                  My Dashboard
                </Link>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    variables: { colorPrimary: '#C9A84C' },
                    elements: { avatarBox: 'w-8 h-8' },
                  }}
                />
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-semibold text-brand-gold border border-brand-gold/40 rounded-lg hover:bg-brand-gold/10 hover:border-brand-gold transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white p-1.5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <div className="flex flex-col gap-3 px-2">
              <a href="#how-it-works" className="text-white/70 hover:text-white text-sm py-1.5" onClick={() => setMenuOpen(false)}>How It Works</a>
              <a href="#roles" className="text-white/70 hover:text-white text-sm py-1.5" onClick={() => setMenuOpen(false)}>Specialisms</a>
              <a href="#why-talentx" className="text-white/70 hover:text-white text-sm py-1.5" onClick={() => setMenuOpen(false)}>Why TalentX</a>
              <a href="#about" className="text-white/70 hover:text-white text-sm py-1.5" onClick={() => setMenuOpen(false)}>About</a>
              <Link href="/talent" className="flex items-center gap-1.5 text-brand-gold text-sm font-medium py-1.5" onClick={() => setMenuOpen(false)}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Browse Talent
              </Link>
              <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
                <Link href="/employers" className="text-center text-sm font-medium text-white/60 hover:text-white py-2.5 border border-white/10 rounded-lg hover:border-white/30 transition-all" onClick={() => setMenuOpen(false)}>
                  Employer Dashboard
                </Link>
                {isLoaded && isSignedIn ? (
                  <Link href="/dashboard" className="text-center text-sm font-medium text-brand-gold border border-brand-gold/30 rounded-lg py-2.5 hover:bg-brand-gold/5 transition-all" onClick={() => setMenuOpen(false)}>
                    My Dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/sign-in" className="text-center text-sm font-medium text-white/70 hover:text-white py-2.5 border border-white/20 rounded-lg hover:border-white/40 transition-all" onClick={() => setMenuOpen(false)}>
                      Sign In
                    </Link>
                    <Link href="/sign-up" className="text-center text-sm font-semibold text-brand-gold border border-brand-gold/40 rounded-lg py-2.5 hover:bg-brand-gold/10 hover:border-brand-gold transition-all" onClick={() => setMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
