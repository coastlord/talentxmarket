'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SPECIALISMS = ['All', 'MLRO', 'AML', 'KYC', 'Sanctions', 'Financial Crime', 'Risk & Compliance', 'Trust & Safety'];
const TYPES = ['All', 'Permanent', 'Contract', 'Interim'];
const AVAIL_OPTIONS = ['All', 'Available Now', 'Available Soon'];

const COLORS: { [key: string]: string } = {
  'MLRO': 'bg-purple-100 text-purple-700',
  'AML': 'bg-blue-100 text-blue-700',
  'KYC': 'bg-green-100 text-green-700',
  'Sanctions': 'bg-red-100 text-red-700',
  'Financial Crime': 'bg-orange-100 text-orange-700',
  'Risk & Compliance': 'bg-teal-100 text-teal-700',
  'Trust & Safety': 'bg-indigo-100 text-indigo-700',
};

interface Pro {
  id: string;
  initials: string;
  specialism: string;
  seniority: string;
  experience: string;
  location: string;
  remote: boolean;
  type: string;
  availability: string;
  skills: string[];
}

function Card({ pro }: { pro: Pro }) {
  const specColor = COLORS[pro.specialism] || 'bg-gray-100 text-gray-700';
  const isAvailNow = pro.availability === 'now';

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-brand-gold/30 transition-all duration-300 group flex flex-col">

      {/* Header: avatar + availability badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-full bg-brand-black flex items-center justify-center flex-shrink-0">
          <span className="text-brand-gold font-bold text-sm">{pro.initials}</span>
        </div>
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${isAvailNow ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isAvailNow ? 'bg-green-500' : 'bg-amber-400'}`} />
          {isAvailNow ? 'Available Now' : 'Available Soon'}
        </span>
      </div>

      {/* Job title + specialism */}
      <div className="mb-3">
        <p className="text-brand-dark font-bold text-base leading-snug mb-2 line-clamp-2">{pro.seniority}</p>
        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${specColor}`}>
          {pro.specialism}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-3" />

      {/* Key details with icons */}
      <div className="space-y-1.5 mb-4 text-sm text-brand-gray">
        {pro.location && (
          <div className="flex items-center gap-2">
            <span className="text-brand-gold flex-shrink-0 text-xs">📍</span>
            <span className="truncate">
              {pro.location}
              {pro.remote && <span className="text-brand-gold ml-1 text-xs font-medium">· Remote</span>}
            </span>
          </div>
        )}
        {pro.type && (
          <div className="flex items-center gap-2">
            <span className="text-brand-gold flex-shrink-0 text-xs">💼</span>
            <span>{pro.type}</span>
          </div>
        )}
        {pro.experience && (
          <div className="flex items-center gap-2">
            <span className="text-brand-gold flex-shrink-0 text-xs">⏱</span>
            <span>{pro.experience} experience</span>
          </div>
        )}
      </div>

      {/* Skills */}
      {pro.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pro.skills.slice(0, 3).map((s) => (
            <span key={s} className="text-xs bg-gray-50 text-brand-gray border border-gray-200 px-2 py-0.5 rounded-md truncate max-w-[110px]">
              {s}
            </span>
          ))}
          {pro.skills.length > 3 && (
            <span className="text-xs bg-gray-50 text-brand-gray border border-gray-200 px-2 py-0.5 rounded-md">
              +{pro.skills.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-dashed border-gray-200 pt-3 mt-auto">
        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
          🔒 Full name, contact and CV locked
        </p>
        <a
          href="mailto:hello@talentxmarket.com?subject=Employer Access Request"
          className="w-full flex items-center justify-center gap-2 bg-brand-black hover:bg-brand-gold text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 group-hover:bg-brand-gold"
        >
          Unlock Profile
        </a>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="h-6 bg-gray-100 rounded-full w-28" />
      </div>
      <div className="mb-3 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-5 bg-gray-100 rounded-full w-20" />
      </div>
      <div className="border-t border-gray-100 mb-3" />
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-2/3" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-5 bg-gray-100 rounded-md w-16" />
        <div className="h-5 bg-gray-100 rounded-md w-20" />
      </div>
      <div className="border-t border-dashed border-gray-200 pt-3 mt-auto">
        <div className="h-9 bg-gray-200 rounded-xl w-full" />
      </div>
    </div>
  );
}

export default function TalentPage() {
  const [pros, setPros] = useState<Pro[]>([]);
  const [loading, setLoading] = useState(true);
  const [specialism, setSpecialism] = useState('All');
  const [type, setType] = useState('All');
  const [avail, setAvail] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/talent')
      .then((r) => r.json())
      .then((d) => {
        setPros(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => pros.filter((p) => {
    if (specialism !== 'All' && p.specialism !== specialism) return false;
    if (type !== 'All' && p.type !== type) return false;
    if (avail === 'Available Now' && p.availability !== 'now') return false;
    if (avail === 'Available Soon' && p.availability !== 'soon') return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !p.specialism.toLowerCase().includes(q) &&
        !p.location.toLowerCase().includes(q) &&
        !p.skills.some((s) => s.toLowerCase().includes(q))
      ) return false;
    }
    return true;
  }), [pros, specialism, type, avail, search]);

  const clearFilters = () => {
    setSpecialism('All');
    setType('All');
    setAvail('All');
    setSearch('');
  };

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
            <p className="text-sm text-brand-dark">Full names, contact details and CVs are visible to subscribed employers only.</p>
            <a
              href="mailto:hello@talentxmarket.com?subject=Employer Access Request"
              className="flex-shrink-0 bg-brand-gold text-brand-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-brand-gold/90 transition-colors"
            >
              Get Employer Access
            </a>
          </div>
        </div>

        {/* Filter bar */}
        <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by skill or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 pl-4 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-gold"
            />
            <select value={specialism} onChange={(e) => setSpecialism(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-gold bg-white">
              {SPECIALISMS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-gold bg-white">
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select value={avail} onChange={(e) => setAvail(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-gold bg-white">
              {AVAIL_OPTIONS.map((a) => <option key={a}>{a}</option>)}
            </select>
            {(specialism !== 'All' || type !== 'All' || avail !== 'All' || search) && (
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
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <Skeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-gray mb-2">No professionals match your filters.</p>
              <button onClick={clearFilters} className="text-brand-gold hover:underline text-sm">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((pro) => (
                <Card key={pro.id} pro={pro} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-brand-black py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-4">Are you a compliance professional?</h2>
            <p className="text-white/60 mb-8">
              Register your availability and get discovered by compliance-focused employers. Always free.
            </p>
            <Link
              href="/#open-to-work"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/90 transition-colors"
            >
              Post Your Availability
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
                }
