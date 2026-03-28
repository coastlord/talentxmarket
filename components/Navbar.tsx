'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-black/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-32">

          {/* Logo — large and prominent */}
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="TalentX Market"
              className="h-28 w-auto object-contain invert"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-white/80 hover:text-brand-gold transition-colors duration-200 text-sm font-medium">How It Works</a>
            <a href="#roles" className="text-white/80 hover:text-brand-gold transition-colors duration-200 text-sm font-medium">Specialisms</a>
            <a href="#why-talentx" className="text-white/80 hover:text-brand-gold transition-colors duration-200 text-sm font-medium">Why TalentX</a>
            <a href="#about" className="text-white/80 hover:text-brand-gold transition-colors duration-200 text-sm font-medium">About</a>
            <Link href="/talent" className="flex items-center gap-1.5 text-brand-gold hover:text-brand-gold/80 transition-colors duration-200 text-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Browse Talent
            </Link>
            <Link href="/jobs" className="flex items-center gap-1.5 text-brand-gold hover:text-brand-gold/80 transition-colors duration-200 text-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Browse Jobs
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#open-to-work" className="px-5 py-2.5 text-sm font-semibold text-white border border-white/30 rounded-lg hover:border-brand-gold hover:text-brand-gold transition-all duration-200">
              I&apos;m a Professional
            </a>
            <a href="#hiring" className="px-5 py-2.5 text-sm font-semibold bg-brand-gold text-brand-black rounded-lg hover:bg-brand-gold-light transition-all duration-200">
              I&apos;m Hiring
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-brand-black border-t border-white/10 py-4">
            <div className="flex flex-col gap-4 px-4">
              <a href="#how-it-works" className="text-white/80 hover:text-brand-gold text-sm font-medium" onClick={() => setMenuOpen(false)}>How It Works</a>
              <a href="#roles" className="text-white/80 hover:text-brand-gold text-sm font-medium" onClick={() => setMenuOpen(false)}>Specialisms</a>
              <a href="#why-talentx" className="text-white/80 hover:text-brand-gold text-sm font-medium" onClick={() => setMenuOpen(false)}>Why TalentX</a>
              <a href="#about" className="text-white/80 hover:text-brand-gold text-sm font-medium" onClick={() => setMenuOpen(false)}>About</a>
              <Link href="/talent" className="flex items-center gap-1.5 text-brand-gold text-sm font-semibold" onClick={() => setMenuOpen(false)}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Browse Talent
              </Link>
              <Link href="/jobs" className="flex items-center gap-1.5 text-brand-gold text-sm font-semibold" onClick={() => setMenuOpen(false)}>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Browse Jobs
              </Link>
              <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
                <a href="#open-to-work" className="btn-secondary text-center text-sm py-3" onClick={() => setMenuOpen(false)}>I&apos;m a Professional</a>
                <a href="#hiring" className="btn-primary text-center text-sm py-3" onClick={() => setMenuOpen(false)}>I&apos;m Hiring</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
