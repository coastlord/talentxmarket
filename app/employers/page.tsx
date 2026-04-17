'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── Constants ────────────────────────────────────────────────────────────────
const ADMIN_EMAILS = ['soa.tidjani@gmail.com'];

// ─── Types ───────────────────────────────────────────────────────────────────
interface Candidate {
  id: string;
  initials: string;
  fullName: string | null;
  role: string;
  location: string;
  experience: string;
  availabilityStatus: string;
  contactEmail: string | null;
  phone: string | null;
  linkedinUrl: string | null;
  certificationLink: string | null;
  skills: string[];
  certifications: string[];
  headline: string;
  currentCompany: string | null;
  workPreference: string;
  salaryAmount: string;
  salaryCurrency: string;
  salaryPeriod: string;
}

interface Unlock {
  unlockId: string;
  liked: boolean;
  unlockedAt: string | null;
  candidate: Candidate;
}

interface Employer {
  id: string;
  email: string;
  companyName: string;
  contactName: string;
  creditsRemaining: number;
  isAdmin: boolean;
}

// ─── Icons ───────────────────────────────────────────────────────────────────
const MailIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LinkedInIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ShieldIcon = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const PinIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const HeartIcon = ({ filled, size = 16 }: { filled: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#C9A84C' : 'none'} stroke={filled ? '#C9A84C' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ─── Unlocked Profile Card ────────────────────────────────────────────────────
function UnlockedCard({
  unlock,
  employerEmail,
  onLikeToggle,
}: {
  unlock: Unlock;
  employerEmail: string;
  onLikeToggle: (candidateId: string, newLiked: boolean) => void;
}) {
  const { candidate, liked, unlockedAt } = unlock;
  const [likeLoading, setLikeLoading] = useState(false);
  const isAvailableNow = candidate.availabilityStatus?.toLowerCase().includes('available now');

  const handleLike = async () => {
    setLikeLoading(true);
    try {
      await fetch(`/api/unlock/${candidate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workEmail: employerEmail, liked: !liked }),
      });
      onLikeToggle(candidate.id, !liked);
    } finally {
      setLikeLoading(false);
    }
  };

  const hasSalary = candidate.salaryAmount;
  const salaryLabel = hasSalary
    ? `${candidate.salaryCurrency} ${Number(candidate.salaryAmount).toLocaleString()} / ${candidate.salaryPeriod}`
    : null;

  const unlockDate = unlockedAt
    ? new Date(unlockedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  return (
    <div className={`bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col ${liked ? 'border-brand-gold/40 ring-1 ring-brand-gold/20' : 'border-gray-100'}`}>

      {/* ── HEADER ── */}
      <div className="bg-brand-black px-4 sm:px-5 py-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center flex-shrink-0">
            <span className="text-brand-gold font-black text-sm">{candidate.initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">
              {candidate.fullName || candidate.role}
            </p>
            <p className="text-white/50 text-xs truncate">{candidate.role}</p>
          </div>
        </div>
        <button
          onClick={handleLike}
          disabled={likeLoading}
          title={liked ? 'Remove from saved' : 'Save profile'}
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${liked ? 'bg-brand-gold/20 border border-brand-gold/40' : 'bg-white/10 hover:bg-brand-gold/20 border border-white/10 hover:border-brand-gold/40'}`}
        >
          <HeartIcon filled={liked} size={15} />
        </button>
      </div>

      {/* ── BODY ── */}
      <div className="px-4 sm:px-5 py-4 flex-1 flex flex-col gap-3">

        {/* Meta + availability */}
        <div className="flex flex-wrap items-center gap-2">
          {candidate.location && (
            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
              <span className="text-brand-gold"><PinIcon /></span>
              {candidate.location}
            </span>
          )}
          {candidate.experience && (
            <span className="text-xs text-gray-400">· {candidate.experience}</span>
          )}
          {candidate.workPreference && (
            <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {candidate.workPreference}
            </span>
          )}
          {isAvailableNow ? (
            <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              Available Now
            </span>
          ) : candidate.availabilityStatus ? (
            <span className="inline-flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
              {candidate.availabilityStatus}
            </span>
          ) : null}
        </div>

        {/* Salary */}
        {salaryLabel && (
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Salary Expectation</p>
            <p className="text-sm font-black text-brand-black">{salaryLabel}</p>
          </div>
        )}

        {/* Contact details */}
        <div className="space-y-1.5">
          {candidate.contactEmail && (
            <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 min-w-0">
              <span className="text-brand-gold flex-shrink-0"><MailIcon size={12} /></span>
              <a href={`mailto:${candidate.contactEmail}`} className="text-xs font-semibold text-brand-black hover:text-brand-gold transition-colors truncate min-w-0">
                {candidate.contactEmail}
              </a>
            </div>
          )}
          {candidate.phone && (
            <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
              <span className="text-brand-gold flex-shrink-0"><PhoneIcon size={12} /></span>
              <a href={`tel:${candidate.phone}`} className="text-xs font-semibold text-brand-black hover:text-brand-gold transition-colors">
                {candidate.phone}
              </a>
            </div>
          )}
          {candidate.linkedinUrl && (
            <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
              <span className="text-brand-gold flex-shrink-0"><LinkedInIcon size={12} /></span>
              <a
                href={candidate.linkedinUrl.startsWith('http') ? candidate.linkedinUrl : `https://${candidate.linkedinUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-brand-black hover:text-brand-gold transition-colors flex items-center gap-1"
              >
                View LinkedIn <ExternalIcon />
              </a>
            </div>
          )}
          {!candidate.contactEmail && !candidate.phone && !candidate.linkedinUrl && (
            <p className="text-xs text-gray-400 italic">No contact details added yet by this candidate.</p>
          )}
        </div>

        {/* Current company */}
        {candidate.currentCompany && (
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-brand-black">Current:</span> {candidate.currentCompany}
          </p>
        )}

        {/* Skills */}
        {candidate.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.slice(0, 4).map((s) => (
              <span key={s} className="text-[10.5px] font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
                {s}
              </span>
            ))}
            {candidate.skills.length > 4 && (
              <span className="text-[10.5px] font-bold text-brand-gold bg-brand-black px-2.5 py-1 rounded-full">
                +{candidate.skills.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Certifications */}
        {candidate.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {candidate.certifications.slice(0, 3).map((c) => (
              <span key={c} className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-gold bg-brand-black px-2.5 py-1 rounded-full">
                <ShieldIcon size={9} />
                {c}
              </span>
            ))}
          </div>
        )}

        {/* Headline */}
        {candidate.headline && (
          <p className="text-xs text-gray-500 italic leading-relaxed line-clamp-2">&ldquo;{candidate.headline}&rdquo;</p>
        )}
      </div>

      {/* ── FOOTER ACTIONS ── */}
      <div className="px-4 sm:px-5 pb-4 flex flex-col gap-2">
        {candidate.contactEmail && (
          <a
            href={`mailto:${candidate.contactEmail}?subject=${encodeURIComponent('Opportunity via TalentX Market')}&body=${encodeURIComponent(`Hi ${candidate.fullName ? candidate.fullName.split(' ')[0] : ''},\n\nI came across your profile on TalentX Market and would love to connect regarding a ${candidate.role} opportunity.\n\nLooking forward to hearing from you.\n\nKind regards`)}`}
            className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-black text-xs font-bold py-2.5 rounded-xl transition-all duration-200"
          >
            <MailIcon size={12} />
            Send Email to Candidate
          </a>
        )}
        <div className="flex items-center justify-between">
          <button
            onClick={handleLike}
            disabled={likeLoading}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${liked ? 'text-brand-gold' : 'text-gray-400 hover:text-brand-gold'}`}
          >
            <HeartIcon filled={liked} size={13} />
            {liked ? 'Saved' : 'Save Profile'}
          </button>
          {unlockDate && (
            <span className="text-[10px] text-gray-300">Unlocked {unlockDate}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EmployerDashboard() {
  const { user, isLoaded: clerkLoaded } = useUser();

  // Email search state (for non-admin employers)
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Dashboard state
  const [loading, setLoading] = useState(false);
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [unlocks, setUnlocks] = useState<Unlock[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [filter, setFilter] = useState<'all' | 'liked'>('all');

  // Prevent the admin auto-load effect from running more than once
  const adminInitialised = useRef(false);

  const isSignedInAdmin = clerkLoaded && !!user
    ? ADMIN_EMAILS.includes(user.primaryEmailAddress?.emailAddress?.toLowerCase().trim() ?? '')
    : false;

  // ── Core fetch ────────────────────────────────────────────────────────────
  const fetchDashboard = useCallback(async (emailToFetch: string): Promise<boolean> => {
    setLoading(true);
    setNotFound(false);
    setEmployer(null);
    setUnlocks([]);
    try {
      const res = await fetch(`/api/employers?email=${encodeURIComponent(emailToFetch)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      if (!data.employer) {
        setNotFound(true);
        return false; // not found
      }
      setEmployer(data.employer);
      setUnlocks(data.unlocks || []);
      return true; // found
    } catch (err) {
      console.error('fetchDashboard error:', err);
      setNotFound(true);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Ensure admin employer record exists, then reload ─────────────────────
  const ensureAdminAndLoad = useCallback(async (adminEmail: string) => {
    // Try loading first
    const found = await fetchDashboard(adminEmail);
    if (found) return;

    // Not found → silently create account via ensure endpoint
    try {
      const res = await fetch('/api/employers/ensure', { method: 'POST' });
      if (!res.ok) {
        // Ensure failed — show not-found with helpful message
        setNotFound(true);
        return;
      }
      // Re-fetch after creation
      await fetchDashboard(adminEmail);
    } catch (err) {
      console.error('ensure error:', err);
      setNotFound(true);
    }
  }, [fetchDashboard]);

  // ── Auto-load for signed-in admin ─────────────────────────────────────────
  useEffect(() => {
    if (!clerkLoaded) return;
    if (adminInitialised.current) return; // only run once
    const clerkEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase().trim();
    if (clerkEmail && ADMIN_EMAILS.includes(clerkEmail)) {
      adminInitialised.current = true;
      setSubmittedEmail(clerkEmail);
      ensureAdminAndLoad(clerkEmail);
    }
  }, [clerkLoaded, user, ensureAdminAndLoad]);

  // ── Regular employer: submit email ────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.toLowerCase().trim();
    if (!trimmed) return;
    setSubmittedEmail(trimmed);
    fetchDashboard(trimmed);
  };

  const handleLikeToggle = (candidateId: string, newLiked: boolean) => {
    setUnlocks((prev) =>
      prev.map((u) =>
        u.candidate.id === candidateId ? { ...u, liked: newLiked } : u
      )
    );
  };

  const displayed = filter === 'liked' ? unlocks.filter((u) => u.liked) : unlocks;
  const likedCount = unlocks.filter((u) => u.liked).length;

  return (
    <div>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">

        {/* ── HERO ── */}
        <div className="bg-brand-black pt-20 pb-14 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-gold/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              Employer Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
              Your Talent
              <span className="block text-brand-gold">Shortlist</span>
            </h1>
            <p className="text-white/50 max-w-lg leading-relaxed text-sm">
              View, contact and manage every compliance professional you&apos;ve unlocked. Save your favourites and reach out directly.
            </p>
          </div>
        </div>

        {/* ── EMAIL LOOKUP — only shown to non-admin employers ── */}
        {!isSignedInAdmin && (
          <div className="max-w-4xl mx-auto px-4 -mt-6">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-5 sm:p-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Enter your work email to access your dashboard
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-brand-black hover:bg-brand-gold text-white hover:text-brand-black text-sm font-bold rounded-xl transition-all duration-200 whitespace-nowrap disabled:opacity-60"
                >
                  {loading ? 'Loading…' : 'View My Candidates'}
                </button>
              </form>

              {submittedEmail && notFound && !loading && (
                <div className="mt-3 flex items-start gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                  <span className="mt-0.5 flex-shrink-0">ℹ️</span>
                  <span>
                    No account found for <strong>{submittedEmail}</strong>. Start by{' '}
                    <Link href="/talent" className="text-brand-gold hover:underline font-semibold">unlocking profiles</Link>{' '}
                    on the talent page — your dashboard will appear here automatically after your first unlock.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── LOADING STATE ── */}
        {loading && (
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <div className="inline-flex items-center gap-3 text-gray-500">
              <svg className="w-5 h-5 animate-spin text-brand-gold" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm font-medium">Loading your candidates…</span>
            </div>
          </div>
        )}

        {/* ── DASHBOARD CONTENT ── */}
        {employer && !loading && (
          <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">

            {/* Account info bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Signed in as</p>
                <p className="text-sm font-bold text-brand-black">{employer.contactName || employer.email}</p>
                <p className="text-xs text-gray-400">{employer.email}</p>
              </div>
              {employer.isAdmin && (
                <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold px-3 py-1.5 rounded-full">
                  <ShieldIcon size={11} />
                  Admin · Unlimited Access
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
                <p className="text-2xl font-black text-brand-black">{unlocks.length}</p>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Profiles Unlocked</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
                <p className="text-2xl font-black text-brand-gold">{likedCount}</p>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Saved</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
                <p className="text-2xl font-black text-brand-black">
                  {employer.isAdmin ? '∞' : employer.creditsRemaining}
                </p>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Credits Left</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
                <p className="text-sm font-bold text-brand-black truncate">{employer.companyName || '—'}</p>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">Company</p>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${filter === 'all' ? 'bg-brand-black text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-brand-black hover:text-brand-black'}`}
              >
                All Profiles ({unlocks.length})
              </button>
              <button
                onClick={() => setFilter('liked')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${filter === 'liked' ? 'bg-brand-gold text-brand-black' : 'bg-white border border-gray-200 text-gray-500 hover:border-brand-gold hover:text-brand-gold'}`}
              >
                <HeartIcon filled={filter === 'liked'} size={13} />
                Saved ({likedCount})
              </button>
              <div className="ml-auto">
                <Link href="/talent" className="flex items-center gap-1.5 text-xs font-bold text-brand-gold hover:underline">
                  + Unlock More Talent
                </Link>
              </div>
            </div>

            {/* Cards */}
            {displayed.length === 0 ? (
              <div className="text-center py-20">
                {filter === 'liked' ? (
                  <>
                    <p className="text-3xl mb-3">💛</p>
                    <p className="text-brand-black font-bold mb-1">No saved profiles yet</p>
                    <p className="text-gray-400 text-sm">Click the heart on any card to save a candidate here.</p>
                    <button onClick={() => setFilter('all')} className="mt-4 text-brand-gold text-sm hover:underline font-semibold">
                      View all profiles
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-4xl mb-4">🔓</p>
                    <p className="text-brand-black font-bold text-lg mb-2">No profiles unlocked yet</p>
                    <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                      Head to the talent page, click &ldquo;Unlock Profile&rdquo; on any candidate, and they&apos;ll appear here instantly.
                    </p>
                    <Link
                      href="/talent"
                      className="inline-flex items-center gap-2 bg-brand-gold text-brand-black text-sm font-bold px-6 py-3 rounded-xl hover:bg-brand-gold/90 transition-colors"
                    >
                      Browse Compliance Talent →
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {displayed.map((unlock) => (
                  <UnlockedCard
                    key={unlock.unlockId}
                    unlock={unlock}
                    employerEmail={submittedEmail}
                    onLikeToggle={handleLikeToggle}
                  />
                ))}
              </div>
            )}

            {/* Upgrade nudge */}
            {!employer.isAdmin && employer.creditsRemaining === 0 && (
              <div className="mt-10 bg-brand-black rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-white font-bold text-base mb-1">Free unlocks used up</p>
                  <p className="text-white/50 text-sm">Upgrade to continue accessing vetted compliance talent with no limits.</p>
                </div>
                <a
                  href="mailto:hello@talentxmarket.com?subject=Employer Access Upgrade"
                  className="flex-shrink-0 px-6 py-3 bg-brand-gold text-brand-black text-sm font-bold rounded-xl hover:bg-brand-gold/90 transition-colors"
                >
                  Contact Us to Upgrade
                </a>
              </div>
            )}
          </div>
        )}

        {/* ── EMPTY START STATE — no email submitted, not admin ── */}
        {!employer && !loading && !submittedEmail && !isSignedInAdmin && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {[
                { icon: '🔓', title: 'All Your Unlocked Profiles', body: 'Every candidate you\'ve unlocked in one place — name, email, phone, LinkedIn.' },
                { icon: '💛', title: 'Save & Shortlist', body: 'Heart profiles to build a shortlist. Filter between all candidates and saved ones instantly.' },
                { icon: '📧', title: 'One-Click Outreach', body: 'Send a pre-filled email to any candidate directly from the dashboard.' },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-6 text-left shadow-sm">
                  <p className="text-3xl mb-3">{item.icon}</p>
                  <p className="text-sm font-bold text-brand-black mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
