'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TYPES = ['All', 'Permanent', 'Contract', 'Interim', 'Advisory'];
const LOCATIONS = ['All', 'Remote', 'Hybrid', 'On-site'];

const TYPE_COLORS: { [key: string]: string } = {
  Permanent: 'bg-blue-100 text-blue-700',
  Contract: 'bg-purple-100 text-purple-700',
  Interim: 'bg-orange-100 text-orange-700',
  Advisory: 'bg-teal-100 text-teal-700',
};

const LOC_COLORS: { [key: string]: string } = {
  Remote: 'bg-green-50 text-green-700 border-green-200',
  Hybrid: 'bg-amber-50 text-amber-700 border-amber-200',
  'On-site': 'bg-gray-50 text-gray-600 border-gray-200',
};

interface Job {
  id: string;
  companyName: string;
  jobTitle: string;
  workLocation: string;
  employmentType: string;
  location: string;
  salary: string;
  experience: string;
  jurisdictions: string;
  certifications: string;
  postedAt: string;
}

function getInitials(name: string): string {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function timeAgo(iso: string): string {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function Card({ job }: { job: Job }) {
  const initials = getInitials(job.companyName);
  const locColor = LOC_COLORS[job.workLocation] || 'bg-gray-50 text-gray-600 border-gray-200';
  const typeColor = TYPE_COLORS[job.employmentType] || 'bg-gray-100 text-gray-700';

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-brand-gold/30 transition-all duration-300 group flex flex-col">

      {/* Header: company logo + name + posted date */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-11 h-11 rounded-full bg-brand-black flex items-center justify-center flex-shrink-0">
            <span className="text-brand-gold font-bold text-xs">{initials}</span>
          </div>
          <p className="text-brand-dark font-semibold text-sm truncate">{job.companyName}</p>
        </div>
        {job.postedAt && (
          <span className="text-xs text-gray-400 flex-shrink-0 ml-2 mt-0.5">
            {timeAgo(job.postedAt)}
          </span>
        )}
      </div>

      {/* Job title */}
      <p className="text-brand-dark font-bold text-base leading-snug mb-3 line-clamp-2">
        {job.jobTitle}
      </p>

      {/* Type + location badges — own row, no overflow */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.employmentType && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColor}`}>
            {job.employmentType}
          </span>
        )}
        {job.workLocation && (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${locColor}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 flex-shrink-0" />
            {job.workLocation}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-3" />

      {/* Key details with icons */}
      <div className="space-y-1.5 mb-3 text-sm text-brand-gray">
        {job.location && (
          <div className="flex items-center gap-2">
            <span className="text-brand-gold flex-shrink-0 text-xs">📍</span>
            <span className="truncate">{job.location}</span>
          </div>
        )}
        {job.salary && (
          <div className="flex items-center gap-2">
            <span className="text-brand-gold flex-shrink-0 text-xs">💰</span>
            <span className="truncate">{job.salary}</span>
          </div>
        )}
        {job.experience && (
          <div className="flex items-center gap-2">
            <span className="text-brand-gold flex-shrink-0 text-xs">⏱</span>
            <span>{job.experience} experience</span>
          </div>
        )}
      </div>

      {/* Jurisdictions / certifications tags */}
      {(job.jurisdictions || job.certifications) && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {job.jurisdictions && (
            <span className="text-xs bg-gray-50 text-brand-gray border border-gray-200 px-2 py-0.5 rounded-md truncate max-w-[130px]">
              {job.jurisdictions}
            </span>
          )}
          {job.certifications && (
            <span className="text-xs bg-gray-50 text-brand-gray border border-gray-200 px-2 py-0.5 rounded-md truncate max-w-[130px]">
              {job.certifications}
            </span>
          )}
        </div>
      )}

      {/* Apply button */}
      <div className="border-t border-dashed border-gray-200 pt-3 mt-auto">
        <a
          href="mailto:hello@talentxmarket.com?subject=Job Application Enquiry"
          className="w-full flex items-center justify-center gap-2 bg-brand-black hover:bg-brand-gold text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 group-hover:bg-brand-gold"
        >
          Apply / Enquire
        </a>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-full bg-gray-200" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
        <div className="h-3 bg-gray-100 rounded w-10" />
      </div>
      <div className="h-5 bg-gray-200 rounded w-4/5 mb-3" />
      <div className="flex gap-2 mb-3">
        <div className="h-6 bg-gray-100 rounded-full w-20" />
        <div className="h-6 bg-gray-100 rounded-full w-16" />
      </div>
      <div className="border-t border-gray-100 mb-3" />
      <div className="space-y-2 mb-3">
        <div className="h-3 bg-gray-100 rounded-full w-full" />
        <div className="h-3 bg-gray-100 rounded-full w-2/3" />
      </div>
      <div className="border-t border-dashed border-gray-200 pt-3 mt-auto">
        <div className="h-9 bg-gray-200 rounded-xl w-full" />
      </div>
    </div>
  );
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('All');
  const [location, setLocation] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/jobs')
      .then((r) => r.json())
      .then((d) => {
        setJobs(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => jobs.filter((j) => {
    if (type !== 'All' && j.employmentType !== type) return false;
    if (location !== 'All' && j.workLocation !== location) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !j.jobTitle.toLowerCase().includes(q) &&
        !j.companyName.toLowerCase().includes(q) &&
        !j.location.toLowerCase().includes(q) &&
        !j.jurisdictions.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  }), [jobs, type, location, search]);

  const clearFilters = () => {
    setType('All');
    setLocation('All');
    setSearch('');
  };

  return (
    <div>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <div className="bg-brand-black pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-gold/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              {loading ? 'Loading...' : jobs.length + ' Live Vacancies'}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Browse Compliance
              <span className="block text-brand-gold">Vacancies</span>
            </h1>
            <p className="text-white/60 max-w-xl leading-relaxed">
              Compliance and financial crime roles posted directly by hiring organisations — no agencies, no middlemen.
            </p>
          </div>
        </div>

        {/* Info banner */}
        <div className="bg-brand-gold/10 border-b border-brand-gold/20 py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-brand-dark">New vacancies are added as employers post them — check back regularly.</p>
            <Link
              href="/#hiring"
              className="flex-shrink-0 bg-brand-gold text-brand-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-brand-gold/90 transition-colors"
            >
              Post a Vacancy
            </Link>
          </div>
        </div>

        {/* Filter bar */}
        <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by title, company or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 pl-4 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-gold"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-gold bg-white"
            >
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-gold bg-white"
            >
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </select>
            {(type !== 'All' || location !== 'All' || search) && (
              <button onClick={clearFilters} className="text-sm text-brand-gold hover:underline whitespace-nowrap">
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <p className="text-brand-gray text-sm mb-6">
            {loading ? 'Loading...' : 'Showing ' + filtered.length + ' ' + (filtered.length === 1 ? 'vacancy' : 'vacancies')}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <Skeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-gray mb-2">No vacancies match your filters.</p>
              <button onClick={clearFilters} className="text-brand-gold hover:underline text-sm">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((job) => (
                <Card key={job.id} job={job} />
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
