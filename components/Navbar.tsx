'use client';
import { useState, useEffect } from 'react';
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-32">
          <a href="/">
            <img src="/logo.png" alt="TalentX Market" className="h-40 w-auto invert" />
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-white/80 hover:text-[#C9A84C] transition-colors text-sm font-medium">How It Works</a>
            <a href="#roles" className="text-white/80 hover:text-[#C9A84C] transition-colors text-sm font-medium">Specialisms</a>
            <a href="#why-talentx" className="text-white/80 hover:text-[#C9A84C] transition-colors text-sm font-medium">Why TalentX</a>
            <a href="#about" className="text-white/80 hover:text-[#C9A84C] transition-colors text-sm font-medium">About</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="#open-to-work" className="px-5 py-2.5 text-sm font-semibold text-white border border-white/30 rounded-lg hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-200">I'm a Professional</a>
            <a href="#hiring" className="px-5 py-2.5 text-sm font-semibold bg-[#C9A84C] text-black rounded-lg hover:bg-[#E8C96A] transition-all duration-200">I'm Hiring</a>
          </div>
          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0A0A0A] border-t border-white/10 py-4">
            <div className="flex flex-col gap-4 px-4">
              <a href="#how-it-works" className="text-white/80 text-sm font-medium" onClick={() => setMenuOpen(false)}>How It Works</a>
              <a href="#roles" className="text-white/80 text-sm font-medium" onClick={() => setMenuOpen(false)}>Specialisms</a>
              <a href="#why-talentx" className="text-white/80 text-sm font-medium" onClick={() => setMenuOpen(false)}>Why TalentX</a>
              <a href="#about" className="text-white/80 text-sm font-medium" onClick={() => setMenuOpen(false)}>About</a>
              <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
                <a href="#open-to-work" className="text-center text-sm py-3 text-white border border-white rounded-lg" onClick={() => setMenuOpen(false)}>I'm a Professional</a>
                <a href="#hiring" className="text-center text-sm py-3 bg-[#C9A84C] text-black rounded-lg font-semibold" onClick={() => setMenuOpen(false)}>I'm Hiring</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
