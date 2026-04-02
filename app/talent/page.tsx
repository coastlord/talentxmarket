'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SPECIALISMS = ['All', 'MLRO', 'AML', 'KYC', 'Sanctions', 'Financial Crime', 'Risk & Compliance', 'Trust & Safety'];
const TYPES = ['All', 'Permanent', 'Contract', 'Interim', 'Freelance'];
const INDUSTRIES = ['All', 'Banking', 'FinTech', 'Insurance', 'Asset Management', 'Payments', 'Crypto / Web3', 'Consulting'];

interface Pro {
  id: string;
  initials: string;
  specialism: string;
  seniority: string;
  experience: string;
  location: string;
  remote: boolean;
  type: string;
  industry: string;
  availability: string;
  skills: string[];
  certifications: string[];
}

// ── Icons ──────────────────────────────────────────────────────────────────
const PinIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const BuildingIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);
const LockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const PersonIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const MailIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const FileIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const UnlockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
);

// ── Card ───────────────────────────────────────────────────────────────────
function Card({ pro }: { pro: Pro }) {
  const isAvailNow = pro.availability === 'now';
  const primaryCert = pro.certifications[0] || null;
  const visibleSkills = pro.skills.slice(0, 4);
  const extraSkills = pro.skills.length - 4;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:border-brand-gold/25 transition-all duration-300 group flex flex-col">

      {/* TOP: Avatar+Location LEFT | Status+Cert RIGHT */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col gap-1.5">
          <div className="w-11 h-11 rounded-full bg-brand-black flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm tracking-wide">{pro.initials}</span>
          </div>
          {pro.location && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="text-brand-gold"><PinIcon /></span>
              <span>{pro.location}{pro.remote && <span className="text-brand-gold ml-1">· Remote</span>}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${isAvailNow ? 'bg-green-50 border-green-200 text-green-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isAvailNow ? 'bg-green-500' : 'bg-amber-400'}`} />
            {isAvailNow ? 'Available Now' : 'Available Soon'}
          </span>
          {primaryCert && (
            <span className="inline-flex items-center gap-1.5 bg-brand-black text-brand-gold text-[10.5px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
              <ShieldIcon />{primaryCert}
            </span>
          )}
          {pro.certifications.length > 1 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-black text-brand-gold border border-brand-gold/40">
              +{pro.certifications.length - 1} more
            </span>
          )}
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-100 mb-3" />

      {/* META ROWS */}
      <div className="space-y-2 mb-3">
        {pro.industry && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="text-brand-gold"><BuildingIcon /></span>
            </div>
            <div>
              <p className="text-[9.5px] text-gray-400 font-semibold uppercase tracking-wider leading-none mb-0.5">Industry</p>
              <p className="text-xs font-semibold text-brand-dark">{pro.industry}</p>
            </div>
          </div>
        )}
        {pro.type && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="text-brand-gold"><BriefcaseIcon /></span>
            </div>
            <div>
              <p className="text-[9.5px] text-gray-400 font-semibold uppercase tracking-wider leading-none mb-0.5">Employment Type</p>
              <p className="text-xs font-semibold text-brand-dark">{pro.type}</p>
            </div>
          </div>
        )}
        {pro.experience && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="text-brand-gold"><ClockIcon /></span>
            </div>
            <div>
              <p className="text-[9.5px] text-gray-400 font-semibold uppercase tracking-wider leading-none mb-0.5">Experience</p>
              <p className="text-xs font-semibold text-brand-dark">{pro.experience}</p>
            </div>
          </div>
        )}
      </div>

      {/* SKILLS */}
      {pro.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {visibleSkills.map((s) => (
            <span key={s} className="text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
              {s}
            </span>
          ))}
          {extraSkills > 0 && (
            <span className="text-[11px] font-bold text-brand-gold bg-brand-black px-2.5 py-1 rounded-full">
              +{extraSkills} more
            </span>
          )}
        </div>
      )}

      {/* LOCKED SECTION */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 mb-3">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-brand-gold"><LockIcon /></span>
          <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-wider">Unlock to reveal</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-gray-300"><PersonIcon /></span>
            <div className="h-2 rounded bg-gradient-to-r from-gray-200 to-gray-100 flex-1 max-w-[140px]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-300"><MailIcon /></span>
            <div className="h-2 rounded bg-gradient-to-r from-gray-200 to-gray-100 flex-1 max-w-[180px]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-300"><FileIcon /></span>
            <div className="h-2 rounded bg-gradient-to-r from-gray-200 to-gray-100 flex-1 max-w-[110px]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-300"><LinkedInIcon /></span>
            <div className="h-2 rounded bg-gradient-to-r from-gray-200 to-gray-100 flex-1 max-w-[155px]" />
          </div>
        </div>
      </div>

      {/* UNLOCK BUTTON */}
      <a
        href="mailto:hello@talentxmarket.com?subject=Employer Access Request"
        className="mt-auto w-full flex items-center justify-center gap-2 bg-brand-black hover:bg-brand-gold text-white hover:text-brand-black text-sm font-bold py-3 rounded-xl transition-all duration-200 group-hover:bg-brand-gold group-hover:text-brand-black"
      >
        <span className="text-brand-gold group-hover:text-brand-black transition-colors duration-200">
          <UnlockIcon />
        </span>
        Unlock Profile
      </a>
    </div>
  );
}

// ── Skeleton ───────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col gap-2">
          <div className="w-11 h-11 rounded-full bg-gray-200" />
          <div className="h-2.5 bg-gray-100 rounded w-24" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-6 bg-gray-100 rounded-full w-28" />
          <div className="h-6 bg-gray-200 rounded-full w-32" />
        </div>
      </div>
      <div className="border-t border-gray-100 mb-3" />
      <div className="space-y-2 mb-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gray-100" />
            <div className="space-y-1">
              <div className="h-2 bg-gray-100 rounded w-12" />
              <div className="h-2.5 bg-gray-200 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 mb-3">
        {[1, 2, 3].map((i) => <div key={i} className="h-6 bg-gray-100 rounded-full w-20" />)}
      </div>
      <div className="h-24 bg-gray-50 rounded-xl mb-3" />
      <div className="h-10 bg-gray-200 rounded-xl" />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function TalentPage() {
  const [pros, setPros] = useState<Pro[]>([]);
  const [loading, setLoading] = useState(true);
  const [specialism, setSpecialism] = useState('All');
  const [type, setType] = useState('All');
  const [industry, setIndustry] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/talent')
      .then((r) => r.json())
      .then((d) => { setPros(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => pros.filter((p) => {
    if (specialism !== 'All' && p.specialism !== specialism) return false;
    if (type !== 'All' && p.type !== type) return false;
    if (industry !== 'All' && p.industry !== industry) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !p.specialism.toLowerCase().includes(q) &&
        !p.location.toLowerCase().includes(q) &&
        !p.industry.toLowerCase().includes(q) &&
        !p.skills.some((s) => s.toLowerCase().includes(q))
      ) return false;
    }
    return true;
  }), [pros, specialism, type, industry, search]);

  const clearFilters = () => { setSpecialism('All'); setType('All'); setIndustry('All'); setSearch(''); };
  const hasFilters = specialism !== 'All' || type !== 'All' || industry !== 'All' || !!search;

  return (
    <div>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <div className="bg-brand-black pt-28 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-gold/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              {loading ? 'Loading...' : pros.length + ' Professionals Registered'}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Browse Compliance
              <span className="block text-brand-gold">Talent</span>
            </h1>
            <p className="text-white/60 max-w-xl leading-relaxed">
              Compliance professionals actively open to new opportunities. Subscribe to unlock full profiles and contact directly — no agency fees.
            </p>
          </div>
        </div>

        {/* Info banner */}
        <div className="bg-brand-gold/10 border-b border-brand-gold/20 py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-brand-dark">Full names, contact details, CV and LinkedIn profiles are visible to subscribed employers only.</p>
            <a href="mailto:hello@talentxmarket.com?subject=Employer Access Request"
              className="flex-shrink-0 bg-brand-gold text-brand-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-brand-gold/90 transition-colors">
              Get Employer Access
            </a>
          </div>
        </div>

        {/* Filter bar */}
        <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by skill, industry or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 pl-4 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-gold"
            />
            <select value={specialism} onChange={(e) => setSpecialism(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-gold bg-white">
              {SPECIALISMS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-gold bg-white">
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-gold bg-white">
              {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
            </select>
            {hasFilters && (
              <button onClick={clearFilters} className="text-sm text-brand-gold hover:underline whitespace-nowrap">Clear</button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <p className="text-brand-gray text-sm mb-6">
            {loading ? 'Loading...' : 'Showing ' + filtered.length + ' professionals'}
          </p>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[1,2,3,4,5,6,7,8].map((i) => <Skeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-gray mb-2">No professionals match your filters.</p>
              <button onClick={clearFilters} className="text-brand-gold hover:underline text-sm">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((pro) => <Card key={pro.id} pro={pro} />)}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-brand-black py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-4">Are you a compliance professional?</h2>
            <p className="text-white/60 mb-8">Register your availability and get discovered by compliance-focused employers. Always free.</p>
            <Link href="/#open-to-work"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/90 transition-colors">
              Post Your Availability
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
              }
