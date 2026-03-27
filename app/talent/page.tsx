'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PROFESSIONALS = [
  { id: 1, initials: 'J.M.', specialism: 'MLRO', seniority: 'Director', experience: '12+ years', location: 'London, UK', remote: true, type: 'Permanent', availability: 'now', skills: ['FCA', 'AML', 'Sanctions', 'PEPs', 'FATF'] },
  { id: 2, initials: 'S.K.', specialism: 'AML', seniority: 'Senior Manager', experience: '7+ years', location: 'Dubai, UAE', remote: true, type: 'Contract', availability: 'now', skills: ['AML', 'KYC', 'CDD', 'FinCEN', 'STR'] },
  { id: 3, initials: 'A.O.', specialism: 'KYC', seniority: 'VP', experience: '9+ years', location: 'Amsterdam, NL', remote: false, type: 'Permanent', availability: 'soon', skills: ['KYC', 'EDD', 'CDD', 'MiFID II', 'DORA'] },
  { id: 4, initials: 'R.P.', specialism: 'Financial Crime', seniority: 'Director', experience: '15+ years', location: 'New York, US', remote: true, type: 'Interim', availability: 'now', skills: ['BSA', 'FinCEN', 'OFAC', 'SAR', 'ACAMS'] },
  { id: 5, initials: 'M.T.', specialism: 'Sanctions', seniority: 'Senior Manager', experience: '6+ years', location: 'London, UK', remote: true, type: 'Contract', availability: 'now', skills: ['OFAC', 'EU Sanctions', 'OFSI', 'SDN', 'UN'] },
  { id: 6, initials: 'C.B.', specialism: 'Risk & Compliance', seniority: 'Manager', experience: '5+ years', location: 'Singapore', remote: false, type: 'Permanent', availability: 'soon', skills: ['MAS', 'ISO 31000', 'Basel III', 'ERM', 'CRO'] },
  { id: 7, initials: 'F.N.', specialism: 'Trust & Safety', seniority: 'Senior Manager', experience: '8+ years', location: 'Remote', remote: true, type: 'Contract', availability: 'now', skills: ['Content Moderation', 'Policy', 'CSAM', 'T&S Ops'] },
  { id: 8, initials: 'L.H.', specialism: 'MLRO', seniority: 'Associate Director', experience: '10+ years', location: 'Dublin, IE', remote: true, type: 'Permanent', availability: 'now', skills: ['CBI', 'AML', 'PSD2', 'Crypto', 'DeFi'] },
  { id: 9, initials: 'D.A.', specialism: 'KYC', seniority: 'Manager', experience: '4+ years', location: 'Lagos, NG', remote: true, type: 'Permanent', availability: 'soon', skills: ['KYC', 'CDD', 'FATF', 'FinTech', 'EDD'] },
  { id: 10, initials: 'P.W.', specialism: 'Financial Crime', seniority: 'VP', experience: '11+ years', location: 'Frankfurt, DE', remote: true, type: 'Permanent', availability: 'now', skills: ['BaFin', 'EU AML', 'AMLD6', 'FinCrime', 'PEPs'] },
  { id: 11, initials: 'T.O.', specialism: 'AML', seniority: 'Manager', experience: '6+ years', location: 'Toronto, CA', remote: true, type: 'Contract', availability: 'now', skills: ['FINTRAC', 'OSFI', 'AML', 'KYC', 'CDD'] },
  { id: 12, initials: 'H.R.', specialism: 'Sanctions', seniority: 'Director', experience: '13+ years', location: 'London, UK', remote: false, type: 'Interim', availability: 'soon', skills: ['OFAC', 'OFSI', 'SDN', 'Derisking', 'Correspondent'] },
];

const SPECIALISMS = ['All', 'MLRO', 'AML', 'KYC', 'Sanctions', 'Financial Crime', 'Risk & Compliance', 'Trust & Safety'];
const TYPES = ['All', 'Permanent', 'Contract', 'Interim'];
const AVAILABILITY_OPTIONS = ['All', 'Available Now', 'Available Soon'];

const SPECIALISM_COLORS: Record<string, string> = {
  'MLRO': 'bg-purple-100 text-purple-700',
  'AML': 'bg-blue-100 text-blue-700',
  'KYC': 'bg-green-100 text-green-700',
  'Sanctions': 'bg-red-100 text-red-700',
  'Financial Crime': 'bg-orange-100 text-orange-700',
  'Risk & Compliance': 'bg-teal-100 text-teal-700',
  'Trust & Safety': 'bg-indigo-100 text-indigo-700',
};

type Professional = typeof PROFESSIONALS[0];

function ProfessionalCard({ pro }: { pro: Professional }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-brand-gold/30 transition-all duration-300 group flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-brand-black flex items-center justify-center flex-shrink-0">
            <span className="text-brand-gold font-bold text-sm">{pro.initials}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${SPECIALISM_COLORS[pro.specialism] || 'bg-gray-100 text-gray-700'}`}>
                {pro.specialism}
              </span>
            </div>
            <p className="text-brand-dark font-semibold text-sm mt-1">{pro.seniority}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
          pro.availability === 'now'
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${pro.availability === 'now' ? 'bg-green-500' : 'bg-amber-400'}`} />
          {pro.availability === 'now' ? 'Available Now' : 'Available Soon'}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-brand-gray text-sm">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2" />
          </svg>
          <span>{pro.experience} experience</span>
        </div>
        <div className="flex items-center gap-2 text-brand-gray text-sm">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{pro.location}</span>
          {pro.remote && <span className="text-brand-gold text-xs font-medium">· Remote</span>}
        </div>
        <div className="flex items-center gap-2 text-brand-gray text-sm">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{pro.type}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {pro.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="text-xs bg-gray-50 text-brand-gray border border-gray-200 px-2 py-0.5 rounded-md">
            {skill}
          </span>
        ))}
        {pro.skills.length > 4 && (
          <span className="text-xs bg-gray-50 text-brand-gray border border-gray-200 px-2 py-0.5 rounded-md">
            +{pro.skills.length - 4}
          </span>
        )}
      </div>

      <div className="border-t border-dashed border-gray-200 pt-4 mt-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs text-gray-400">Full name, contact & CV locked</span>
          </div>
        </div>
        
          href="mailto:hello@talentxmarket.com?subject=Employer Access Request"
          className="w-full flex items-center justify-center gap-2 bg-brand-black hover:bg-brand-gold text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 group-hover:bg-brand-gold"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Unlock Profile
        </a>
      </div>
    </div>
  );
}

export default function TalentPage() {
  const [specialism, setSpecialism] = useState('All');
  const [type, setType] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return PROFESSIONALS.filter((pro) => {
      if (specialism !== 'All' && pro.specialism !== specialism) return false;
      if (type !== 'All' && pro.type !== type) return false;
      if (availability === 'Available Now' && pro.availability !== 'now') return false;
      if (availability === 'Available Soon' && pro.availability !== 'soon') return false;
      if (search && !pro.specialism.toLowerCase().includes(search.toLowerCase()) &&
          !pro.location.toLowerCase().includes(search.toLowerCase()) &&
          !pro.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))) return false;
      return true;
    });
  }, [specialism, type, availability, search]);

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">

        {/* Hero */}
        <div className="bg-brand-black pt-28 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-gold/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              {PROFESSIONALS.length} Professionals Available
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Browse Compliance
              <span className="block text-brand-gold">Talent</span>
            </h1>
            <p className="text-white/60 max-w-xl leading-relaxed mb-8">
              Discover pre-registered compliance professionals actively open to new opportunities.
              Subscribe to unlock full profiles and contact them directly — no agency fees.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Professionals', value: '500+', note: 'and growing' },
                { label: 'Specialisms', value: '15+', note: 'covered' },
                { label: 'Countries', value: '30+', note: 'represented' },
                { label: 'Agency fee', value: '£0', note: 'saved per hire' },
              ].map(({ label, value, note }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black text-brand-gold">{value}</div>
                  <div className="text-white/50 text-xs">{label} <span className="text-white/30">{note}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subscription Banner */}
        <div className="bg-brand-gold/10 border-b border-brand-gold/20 py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-brand-dark">
              <svg className="w-4 h-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Full names, contact details and CVs are visible to subscribed employers only.</span>
            </div>
            
              href="mailto:hello@talentxmarket.com?subject=Employer Access Request - TalentX"
              className="flex-shrink-0 bg-brand-gold text-brand-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-brand-gold/90 transition-colors"
            >
              Get Employer Access →
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by skill, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
              />
            </div>
            <select
              value={specialism}
              onChange={(e) => setSpecialism(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-gold bg-white"
            >
              {SPECIALISMS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-gold bg-white"
            >
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-gold bg-white"
            >
              {AVAILABILITY_OPTIONS.map((a) => <option key={a}>{a}</option>)}
            </select>
            {(specialism !== 'All' || type !== 'All' || availability !== 'All' || search) && (
              <button
                onClick={() => { setSpecialism('All'); setType('All'); setAvailability('All'); setSearch(''); }}
                className="text-sm text-brand-gold hover:underline whitespace-nowrap"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <p className="text-brand-gray text-sm">
              Showing <span className="font-semibold text-brand-dark">{filtered.length}</span> professionals
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-gray mb-2">No professionals match your current filters.</p>
              <button onClick={() => { setSpecialism('All'); setType('All'); setAvailability('All'); setSearch(''); }} className="text-brand-gold hover:underline text-sm">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((pro, i) => (
                <>
                  <ProfessionalCard key={pro.id} pro={pro} />
                  {i === 7 && (
                    <div key="cta-card" className="sm:col-span-2 lg:col-span-3 xl:col-span-4 bg-brand-black rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div>
                        <h3 className="text-white font-black text-xl mb-2">Ready to access the full talent pool?</h3>
                        <p className="text-white/50 text-sm">Unlock full profiles, contact details and CVs. No agency fees. Direct access.</p>
                      </div>
                      
                        href="mailto:hello@talentxmarket.com?subject=Employer Access Request - TalentX"
                        className="flex-shrink-0 bg-brand-gold text-brand-black font-bold px-6 py-3 rounded-xl hover:bg-brand-gold/90 transition-colors text-sm whitespace-nowrap"
                      >
                        Get Employer Access →
                      </a>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="bg-brand-black py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-4">
              Are you a compliance professional?
            </h2>
            <p className="text-white/60 mb-8">
              Register your availability and get discovered by compliance-focused employers.
              Always free. No recruiters involved.
            </p>
            <Link
              href="/#open-to-work"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/90 transition-colors"
            >
              Post Your Availability →
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
