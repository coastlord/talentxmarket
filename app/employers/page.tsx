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

  // OTP gate state
  type Step = 'email' | 'otp' | 'dashboard';
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

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

  // ── Resend cooldown timer ─────────────────────────────────────────────────
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

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
        return false;
      }
      setEmployer(data.employer);
      setUnlocks(data.unlocks || []);
      return true;
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
    const found = await fetchDashboard(adminEmail);
    if (found) return;
    try {
      const res = await fetch('/api/employers/ensure', { method: 'POST' });
      if (!res.ok) { setNotFound(true); return; }
      await fetchDashboard(adminEmail);
    } catch (err) {
      console.error('ensure error:', err);
      setNotFound(true);
    }
  }, [fetchDashboard]);

  // ── Auto-load for signed-in admin (bypasses OTP) ─────────────────────────
  useEffect(() => {
    if (!clerkLoaded) return;
    if (adminInitialised.current) return;
    const clerkEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase().trim();
    if (clerkEmail && ADMIN_EMAILS.includes(clerkEmail)) {
      adminInitialised.current = true;
      setSubmittedEmail(clerkEmail);
      setStep('dashboard');
      ensureAdminAndLoad(clerkEmail);
    }
  }, [clerkLoaded, user, ensureAdminAndLoad]);

  // ── Step 1: Submit email → send OTP ──────────────────────────────────────
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.toLowerCase().trim();
    if (!trimmed) return;
    setOtpError('');
    setOtpLoading(true);
    try {
      const res = await fetch('/api/employers/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOtpError(data.message || data.error || 'Failed to send code.');
        return;
      }
      setSubmittedEmail(trimmed);
      setResendCooldown(60);
      setStep('otp');
    } catch {
      setOtpError('Something went wrong. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Step 2: Verify OTP → load dashboard ──────────────────────────────────
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) return;
    setOtpError('');
    setOtpLoading(true);
    try {
      const res = await fetch('/api/employers/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: submittedEmail, code: otpCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOtpError(data.error || 'Incorrect code. Please try again.');
        return;
      }
      setStep('dashboard');
      fetchDashboard(submittedEmail);
    } catch {
      setOtpError('Something went wrong. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Resend OTP ────────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setOtpError('');
    setOtpCode('');
    setOtpLoading(true);
    try {
      const res = await fetch('/api/employers/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: submittedEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOtpError(data.message || data.error || 'Failed to resend code.');
      } else {
        setResendCooldown(60);
      }
    } catch {
      setOtpError('Something went wrong.');
    } finally {
      setOtpLoading(false);
    }
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

        {/* ── OTP GATE — only for non-admin employers ── */}
        {!isSignedInAdmin && step !== 'dashboard' && (
          <div className="max-w-md mx-auto px-4 -mt-6">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">

              {/* Step indicator */}
              <div className="flex border-b border-gray-100">
                <div className={`flex-1 py-3 text-center text-xs font-bold transition-colors ${step === 'email' ? 'text-brand-black bg-gray-50' : 'text-gray-300'}`}>
                  1 · Enter Email
                </div>
                <div className={`flex-1 py-3 text-center text-xs font-bold transition-colors ${step === 'otp' ? 'text-brand-black bg-gray-50' : 'text-gray-300'}`}>
                  2 · Verify Code
                </div>
                <div className="flex-1 py-3 text-center text-xs font-bold text-gray-300">
                  3 · Dashboard
                </div>
              </div>

              <div className="p-6 sm:p-7">

                {/* ── STEP 1: Email ── */}
                {step === 'email' && (
                  <>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-brand-black flex items-center justify-center flex-shrink-0">
                        <MailIcon size={15} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-brand-black">Access your dashboard</p>
                        <p className="text-xs text-gray-400">We&apos;ll send a secure code to verify it&apos;s you</p>
                      </div>
                    </div>

                    <form onSubmit={handleEmailSubmit} className="space-y-3">
                      <input
                        type="email"
                        required
                        placeholder="your@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                      />
                      {otpError && (
                        <p className="text-xs text-red-500 font-medium">{otpError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={otpLoading}
                        className="w-full py-3 bg-brand-black hover:bg-brand-gold text-white hover:text-brand-black text-sm font-bold rounded-xl transition-all duration-200 disabled:opacity-60"
                      >
                        {otpLoading ? 'Sending code…' : 'Send Access Code →'}
                      </button>
                    </form>

                    <div className="mt-4 flex items-start gap-2.5 px-3.5 py-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        <span className="font-semibold text-gray-700">No account yet?</span>{' '}
                        <Link href="/talent" className="text-brand-gold font-semibold hover:underline underline-offset-2">Browse compliance professionals</Link>
                        {' '}and unlock profiles — your dashboard is created automatically.
                      </p>
                    </div>
                  </>
                )}

                {/* ── STEP 2: OTP ── */}
                {step === 'otp' && (
                  <>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-black text-brand-black">Check your inbox</p>
                        <p className="text-xs text-gray-400 truncate max-w-[220px]">Code sent to <span className="font-semibold text-brand-black">{submittedEmail}</span></p>
                      </div>
                    </div>

                    <form onSubmit={handleOtpSubmit} className="space-y-3">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d{6}"
                        maxLength={6}
                        placeholder="6-digit code"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full px-4 py-3.5 text-center text-2xl font-black tracking-[0.4em] border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                        autoFocus
                      />
                      {otpError && (
                        <p className="text-xs text-red-500 font-medium">{otpError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={otpLoading || otpCode.length !== 6}
                        className="w-full py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-black text-sm font-bold rounded-xl transition-all duration-200 disabled:opacity-40"
                      >
                        {otpLoading ? 'Verifying…' : 'Access Dashboard →'}
                      </button>
                    </form>

                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => { setStep('email'); setOtpCode(''); setOtpError(''); }}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        ← Use different email
                      </button>
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendCooldown > 0 || otpLoading}
                        className="text-xs font-semibold text-brand-gold hover:underline disabled:text-gray-300 disabled:no-underline transition-colors"
                      >
                        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
                      </button>
                    </div>

                    <p className="mt-4 text-[10px] text-gray-400 text-center leading-relaxed">
                      Code expires in 10 minutes · 3 attempts allowed
                    </p>
                  </>
                )}

              </div>
            </div>
          </div>
        )}

        {/* ── LOADING STATE ── */}
        {loading && step === 'dashboard' && (
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

        {/* ── EMPTY START STATE — waiting for OTP verification ── */}
        {!employer && !loading && step === 'email' && !isSignedInAdmin && (
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
