'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

// ─── Types ──────────────────────────────────────────────────────────────────
interface Professional {
  id: string;
  initials: string;
  availabilityStatus: string;
  role: string;
  location: string;
  industry: string;
  employmentType: string;
  experience: string;
  skills: string[];
  certifications: string[];
  headline: string;
}

interface UnlockedProfile {
  fullName: string | null;
  contactEmail: string | null;
  phone: string | null;
  linkedinUrl: string | null;
  certificationLink: string | null;
  role: string;
  location: string;
  experience: string;
  skills: string[];
  certifications: string[];
  otherCertification: string | null;
  headline: string;
  availabilityStatus: string;
  workPreference: string;
  salaryAmount: string;
  salaryCurrency: string;
  salaryPeriod: string;
  creditsRemaining: number;
  currentCompany: string | null;
  currentStartYear: string | null;
  previousRole: string | null;
  previousCompany: string | null;
  previousStartYear: string | null;
  previousEndYear: string | null;
  degreeType: string | null;
  schoolName: string | null;
  institutionName: string | null;
  graduationYear: string | null;
}

// ─── Icons (inline SVG helpers) ─────────────────────────────────────────────
const PinIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const LockIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UnlockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </svg>
);

const PersonIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const FileIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const LinkedInIcon = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const PhoneIcon = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const GraduationIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// ─── Professional Card ───────────────────────────────────────────────────────
function ProfessionalCard({ pro, onUnlock }: { pro: Professional; onUnlock: (pro: Professional) => void }) {
  const isAvailableNow = pro.availabilityStatus?.toLowerCase().includes('available now');
  const visibleSkills = pro.skills.slice(0, 4);
  const extraSkills = pro.skills.length - 4;
  const primaryCert = pro.certifications[0] || null;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:border-brand-gold/25 transition-all duration-300 flex flex-col group">

      {/* ── TOP ROW: Avatar+Location LEFT | Status+Cert RIGHT ── */}
      <div className="flex items-start justify-between mb-3">

        {/* Left: Avatar then Location below */}
        <div className="flex flex-col gap-1.5">
          <div className="w-11 h-11 rounded-full bg-brand-black flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm tracking-wide">{pro.initials}</span>
          </div>
          {pro.location && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="text-brand-gold"><PinIcon /></span>
              <span>{pro.location}</span>
            </div>
          )}
        </div>

        {/* Right: Availability badge then Cert badge below */}
        <div className="flex flex-col items-end gap-1.5">
          {isAvailableNow ? (
            <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Available Now
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              {pro.availabilityStatus || 'Open to Offers'}
            </div>
          )}
          {primaryCert && (
            <div className="inline-flex items-center gap-1.5 bg-brand-black text-brand-gold text-[10.5px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
              <ShieldIcon />
              {primaryCert}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-3" />

      {/* ── ROLE TITLE + PROOF LINE ── */}
      <div className="mb-3">
        <p className="text-sm font-bold text-brand-black leading-snug">{pro.role}</p>
        {pro.headline ? (
          <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2 italic">&ldquo;{pro.headline}&rdquo;</p>
        ) : (
          <p className="text-xs text-gray-400 mt-1 italic">Compliance professional — profile details locked</p>
        )}
      </div>

      {/* ── META ROWS ── */}
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

        {pro.employmentType && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="text-brand-gold"><BriefcaseIcon /></span>
            </div>
            <div>
              <p className="text-[9.5px] text-gray-400 font-semibold uppercase tracking-wider leading-none mb-0.5">Employment Type</p>
              <p className="text-xs font-semibold text-brand-dark">{pro.employmentType}</p>
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

      {/* ── SKILLS ── */}
      {pro.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {visibleSkills.map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
          {extraSkills > 0 && (
            <span className="text-[11px] font-bold text-brand-gold bg-brand-black px-2.5 py-1 rounded-full">
              +{extraSkills} more
            </span>
          )}
        </div>
      )}

      {/* ── LOCKED SECTION ── */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 mb-3">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-brand-gold"><LockIcon size={11} /></span>
          <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-wider">Unlock to reveal</span>
        </div>
        <div className="space-y-1.5">
          {/* Full Name */}
          <div className="flex items-center gap-2">
            <span className="text-gray-300"><PersonIcon /></span>
            <div className="h-2 rounded bg-gradient-to-r from-gray-200 to-gray-100 flex-1 max-w-[140px]" />
          </div>
          {/* Contact */}
          <div className="flex items-center gap-2">
            <span className="text-gray-300"><MailIcon /></span>
            <div className="h-2 rounded bg-gradient-to-r from-gray-200 to-gray-100 flex-1 max-w-[180px]" />
          </div>
          {/* CV */}
          <div className="flex items-center gap-2">
            <span className="text-gray-300"><FileIcon /></span>
            <div className="h-2 rounded bg-gradient-to-r from-gray-200 to-gray-100 flex-1 max-w-[110px]" />
          </div>
          {/* LinkedIn */}
          <div className="flex items-center gap-2">
            <span className="text-gray-300"><LinkedInIcon /></span>
            <div className="h-2 rounded bg-gradient-to-r from-gray-200 to-gray-100 flex-1 max-w-[155px]" />
          </div>
        </div>
      </div>

      {/* ── UNLOCK BUTTON ── */}
      <button
        onClick={() => onUnlock(pro)}
        className="mt-auto w-full flex items-center justify-center gap-2 bg-brand-black hover:bg-brand-gold text-white hover:text-brand-black text-sm font-bold py-3 rounded-xl transition-all duration-200 group-hover:bg-brand-gold group-hover:text-brand-black"
      >
        <span className="text-brand-gold group-hover:text-brand-black transition-colors duration-200">
          <UnlockIcon />
        </span>
        Unlock Profile
      </button>

    </div>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
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
      <div className="h-20 bg-gray-50 rounded-xl mb-3" />
      <div className="h-10 bg-gray-200 rounded-xl" />
    </div>
  );
}

// ─── Filter bar constants ────────────────────────────────────────────────────
const EMP_TYPES = ['All', 'Permanent', 'Contract', 'Interim', 'Advisory', 'Freelance'];
const INDUSTRIES = ['All', 'Banking', 'FinTech', 'Insurance', 'Asset Management', 'Payments', 'Crypto / Web3', 'Consulting', 'Other'];

// ─── Urgency options ─────────────────────────────────────────────────────────
const URGENCY_OPTIONS = ['Within 1 week', '2–4 weeks', '1–3 months', 'No urgency / exploring'];

// ─── OTP Input — 6 individual digit boxes ────────────────────────────────────
function OtpInput({ value, onChange, disabled }: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, char: string) => {
    const digit = char.replace(/\D/g, '').slice(-1);
    const digits = value.padEnd(6, '').split('');
    digits[index] = digit;
    const next = digits.join('').slice(0, 6);
    onChange(next);
    if (digit && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (value[index]) {
        const digits = value.padEnd(6, '').split('');
        digits[index] = '';
        onChange(digits.join('').slice(0, 6));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted.padEnd(6, '').slice(0, 6).trimEnd());
    const focusIndex = Math.min(pasted.length, 5);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className="w-11 h-13 text-center text-xl font-black border-2 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 text-brand-black disabled:opacity-50 transition-all"
          style={{ height: '52px' }}
        />
      ))}
    </div>
  );
}

// ─── Full CV Modal ────────────────────────────────────────────────────────────
function CandidateProfileModal({
  pro,
  profile,
  onClose,
}: {
  pro: Professional;
  profile: UnlockedProfile;
  onClose: () => void;
}) {
  const isAvailableNow = profile.availabilityStatus?.toLowerCase().includes('available now');

  const allCerts = [
    ...(profile.certifications || []),
    ...(profile.otherCertification ? [profile.otherCertification] : []),
  ];

  const hasSalary = profile.salaryAmount;
  const salaryLabel = hasSalary
    ? `${profile.salaryCurrency || 'GBP'} ${Number(profile.salaryAmount).toLocaleString()} / ${profile.salaryPeriod || 'Year'}`
    : null;

  const hasCurrentJob = profile.currentCompany || profile.currentStartYear;
  const hasPreviousJob = profile.previousRole || profile.previousCompany;
  const hasEducation = profile.degreeType || profile.schoolName || profile.institutionName || profile.graduationYear;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '92vh' }}
      >

        {/* ── HEADER BAR ── */}
        <div className="bg-brand-black px-7 py-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center">
              <span className="text-brand-gold font-bold text-sm">{pro.initials}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-0.5">Full Profile — Unlocked</p>
              <p className="text-white font-bold text-base leading-tight">{profile.fullName || profile.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="overflow-y-auto flex-1">

          {/* ── HERO SECTION ── */}
          <div className="bg-gradient-to-b from-gray-50 to-white px-7 pt-6 pb-5 border-b border-gray-100">
            <div className="flex items-start gap-5">

              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-brand-black flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-black text-xl">{pro.initials}</span>
              </div>

              {/* Name + meta */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-black text-brand-black leading-tight mb-0.5">
                  {profile.fullName || 'Name Withheld'}
                </h2>
                <p className="text-sm font-semibold text-gray-600 mb-2">{profile.role}</p>

                {/* Tags row */}
                <div className="flex flex-wrap items-center gap-2">
                  {profile.location && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                      <span className="text-brand-gold"><PinIcon /></span>
                      {profile.location}
                    </span>
                  )}
                  {profile.experience && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                      <span className="text-brand-gold"><ClockIcon /></span>
                      {profile.experience}
                    </span>
                  )}
                  {profile.workPreference && (
                    <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                      {profile.workPreference}
                    </span>
                  )}
                  {isAvailableNow ? (
                    <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Available Now
                    </span>
                  ) : profile.availabilityStatus ? (
                    <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {profile.availabilityStatus}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Salary */}
              {salaryLabel && (
                <div className="flex-shrink-0 text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Salary Expectation</p>
                  <p className="text-base font-black text-brand-black">{salaryLabel}</p>
                </div>
              )}
            </div>
          </div>

          {/* ── CONTACT DETAILS ── */}
          <div className="px-7 py-5 border-b border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Contact Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {profile.contactEmail && (
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-black flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold"><MailIcon size={13} /></span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Email</p>
                    <a
                      href={`mailto:${profile.contactEmail}`}
                      className="text-sm font-semibold text-brand-black hover:text-brand-gold transition-colors truncate block"
                    >
                      {profile.contactEmail}
                    </a>
                  </div>
                </div>
              )}

              {profile.phone && (
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-black flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold"><PhoneIcon size={13} /></span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Phone</p>
                    <a
                      href={`tel:${profile.phone}`}
                      className="text-sm font-semibold text-brand-black hover:text-brand-gold transition-colors"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}

              {profile.linkedinUrl && (
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-black flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold"><LinkedInIcon size={13} /></span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">LinkedIn</p>
                    <a
                      href={profile.linkedinUrl.startsWith('http') ? profile.linkedinUrl : `https://${profile.linkedinUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-brand-black hover:text-brand-gold transition-colors flex items-center gap-1"
                    >
                      View Profile
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}

              {profile.certificationLink && (
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-black flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold"><ShieldIcon /></span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Verify Credentials</p>
                    <a
                      href={profile.certificationLink.startsWith('http') ? profile.certificationLink : `https://${profile.certificationLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-brand-black hover:text-brand-gold transition-colors flex items-center gap-1"
                    >
                      View Certificate
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}

              {!profile.contactEmail && !profile.phone && !profile.linkedinUrl && (
                <div className="col-span-2 flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                  <span className="text-gray-400 text-lg">ℹ️</span>
                  <p className="text-xs text-gray-500">This candidate has not added contact details to their profile yet.</p>
                </div>
              )}
            </div>

            {/* ── SEND EMAIL CTA ── */}
            {profile.contactEmail ? (
              <a
                href={`mailto:${profile.contactEmail}?subject=${encodeURIComponent('Opportunity via TalentX Market')}&body=${encodeURIComponent(`Hi ${profile.fullName ? profile.fullName.split(' ')[0] : ''},\n\nI came across your profile on TalentX Market and would love to connect regarding a ${pro.role} opportunity.\n\nLooking forward to hearing from you.\n\nKind regards`)}`}
                className="mt-4 w-full flex items-center justify-center gap-2.5 bg-brand-gold hover:bg-brand-gold/90 text-brand-black text-sm font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-brand-gold/20"
              >
                <MailIcon size={14} />
                Send Email to Candidate
              </a>
            ) : (
              <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-center">
                <p className="text-xs text-gray-500">No email address on file. Contact via LinkedIn or phone above.</p>
              </div>
            )}
          </div>

          {/* ── PROFESSIONAL SUMMARY ── */}
          {profile.headline && (
            <div className="px-7 py-5 border-b border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Professional Summary</p>
              <p className="text-sm text-gray-700 leading-relaxed italic">&ldquo;{profile.headline}&rdquo;</p>
            </div>
          )}

          {/* ── EXPERIENCE ── */}
          {(hasCurrentJob || hasPreviousJob) && (
            <div className="px-7 py-5 border-b border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Experience</p>
              <div className="space-y-4">

                {/* Current position */}
                {hasCurrentJob && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-lg bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-gold"><BriefcaseIcon /></span>
                      </div>
                      <div className="flex-1 w-px bg-gray-200 mt-2" />
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-brand-black">{profile.role}</p>
                          {profile.currentCompany && (
                            <p className="text-xs font-semibold text-gray-600 mt-0.5">{profile.currentCompany}</p>
                          )}
                        </div>
                        {profile.currentStartYear && (
                          <span className="text-xs text-gray-400 font-medium whitespace-nowrap bg-gray-100 px-2.5 py-1 rounded-full flex-shrink-0">
                            {profile.currentStartYear} – Present
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Current Role
                      </span>
                    </div>
                  </div>
                )}

                {/* Previous position */}
                {hasPreviousJob && (
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-500"><BriefcaseIcon /></span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-brand-black">{profile.previousRole || 'Previous Role'}</p>
                          {profile.previousCompany && (
                            <p className="text-xs font-semibold text-gray-600 mt-0.5">{profile.previousCompany}</p>
                          )}
                        </div>
                        {(profile.previousStartYear || profile.previousEndYear) && (
                          <span className="text-xs text-gray-400 font-medium whitespace-nowrap bg-gray-100 px-2.5 py-1 rounded-full flex-shrink-0">
                            {profile.previousStartYear || '?'} – {profile.previousEndYear || '?'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── EDUCATION ── */}
          {hasEducation && (
            <div className="px-7 py-5 border-b border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Education</p>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-gold"><GraduationIcon /></span>
                </div>
                <div className="flex-1">
                  {profile.degreeType && (
                    <p className="text-sm font-bold text-brand-black">{profile.degreeType}</p>
                  )}
                  {profile.schoolName && (
                    <p className="text-xs font-semibold text-gray-600 mt-0.5">{profile.schoolName}</p>
                  )}
                  {profile.institutionName && (
                    <p className="text-xs text-gray-500 mt-0.5">{profile.institutionName}</p>
                  )}
                  {profile.graduationYear && (
                    <span className="inline-block mt-2 text-xs text-gray-400 font-medium bg-gray-100 px-2.5 py-1 rounded-full">
                      Class of {profile.graduationYear}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── SPECIALISMS ── */}
          {profile.skills.length > 0 && (
            <div className="px-7 py-5 border-b border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Specialisms</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((s) => (
                  <span key={s} className="text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── CERTIFICATIONS ── */}
          {allCerts.length > 0 && (
            <div className="px-7 py-5 border-b border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {allCerts.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold bg-brand-black px-3 py-1.5 rounded-full">
                    <ShieldIcon />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── FOOTER NOTE ── */}
          <div className="px-7 py-5">
            <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-xs text-gray-500">Profile manually verified by TalentX Market · Candidate has consented to employer contact</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Unlock Modal ─────────────────────────────────────────────────────────────
function UnlockModal({ pro, onClose }: { pro: Professional; onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({ contactName: '', companyName: '', workEmail: '', roleHiringFor: '', urgency: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'no_credits' | 'personal_email'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [unlockedProfile, setUnlockedProfile] = useState<UnlockedProfile | null>(null);
  const [showFullProfile, setShowFullProfile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // OTP state
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Countdown for resend button
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  // ── Step 2 → send OTP (or skip if already verified / admin) ──────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpLoading(true);
    setOtpError('');
    try {
      const res = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.workEmail }),
      });
      const data = await res.json();
      if (data?.error === 'personal_email') {
        setStatus('personal_email');
        setOtpLoading(false);
        return;
      }
      if (res.status === 429) {
        setOtpError(data.message || 'Please wait before requesting another code.');
        setOtpLoading(false);
        return;
      }
      if (!res.ok) throw new Error(data?.error || 'Failed to send code');

      if (data.alreadyVerified) {
        // Email already verified in this session — go straight to unlock
        await callUnlockApi();
      } else {
        // Show OTP entry step
        setOtpCode('');
        setResendTimer(60);
        setStep(3);
      }
    } catch (err) {
      setOtpError(String(err));
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Step 3 → verify OTP then unlock ──────────────────────────────────────
  const handleVerifyAndUnlock = async () => {
    if (otpCode.replace(/\s/g, '').length < 6) {
      setOtpError('Please enter all 6 digits.');
      return;
    }
    setOtpLoading(true);
    setOtpError('');
    try {
      const confirmRes = await fetch('/api/verify-email/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.workEmail, code: otpCode }),
      });
      const confirmData = await confirmRes.json();
      if (!confirmRes.ok) {
        setOtpError(confirmData?.error || 'Incorrect code. Please try again.');
        setOtpLoading(false);
        return;
      }
      // OTP confirmed → call unlock
      await callUnlockApi();
    } catch (err) {
      setOtpError(String(err));
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Shared: call the actual unlock API ────────────────────────────────────
  const callUnlockApi = useCallback(async () => {
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(`/api/unlock/${pro.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      });
      const data = await res.json();
      if (res.status === 402) { setStatus('no_credits'); return; }
      if (data?.error === 'personal_email') { setStatus('personal_email'); return; }
      if (!res.ok) throw new Error(data?.error || 'Request failed');
      setIsAdmin(!!data.isAdmin);
      setUnlockedProfile({
        fullName:           data.profile.fullName,
        contactEmail:       data.profile.contactEmail,
        phone:              data.profile.phone,
        linkedinUrl:        data.profile.linkedinUrl,
        certificationLink:  data.profile.certificationLink,
        role:               data.profile.role,
        location:           data.profile.location,
        experience:         data.profile.experience,
        skills:             data.profile.skills,
        certifications:     data.profile.certifications,
        otherCertification: data.profile.otherCertification,
        headline:           data.profile.headline,
        availabilityStatus: data.profile.availabilityStatus,
        workPreference:     data.profile.workPreference,
        salaryAmount:       data.profile.salaryAmount,
        salaryCurrency:     data.profile.salaryCurrency,
        salaryPeriod:       data.profile.salaryPeriod,
        creditsRemaining:   data.creditsRemaining,
        currentCompany:     data.profile.currentCompany,
        currentStartYear:   data.profile.currentStartYear,
        previousRole:       data.profile.previousRole,
        previousCompany:    data.profile.previousCompany,
        previousStartYear:  data.profile.previousStartYear,
        previousEndYear:    data.profile.previousEndYear,
        degreeType:         data.profile.degreeType,
        schoolName:         data.profile.schoolName,
        institutionName:    data.profile.institutionName,
        graduationYear:     data.profile.graduationYear,
      });
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us at hello@talentxmarket.com');
    }
  }, [form, pro.id]);

  const REVEAL_ITEMS = [
    { icon: '👤', label: 'Full Name', sub: 'Hidden on public card' },
    { icon: '📧', label: 'Contact Email', sub: 'Direct line to candidate' },
    { icon: '🔗', label: 'LinkedIn Profile', sub: 'Verify experience instantly' },
    { icon: '📄', label: 'Full CV / Resume', sub: 'Work history, education' },
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(10,10,10,0.80)', backdropFilter: 'blur(6px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">

          {/* ── HEADER ── */}
          <div className="bg-brand-black px-6 py-5 flex items-center justify-between sticky top-0 z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">
                  {status === 'success' ? 'Profile Unlocked' : step === 1 ? 'Employer Access' : step === 2 ? 'Step 2 of 3' : 'Step 3 of 3 — Verify Email'}
                </span>
              </div>
              <h2 className="text-white text-lg font-bold">
                {status === 'success' ? 'You\'re on the list' : step === 1 ? 'Unlock This Profile' : step === 2 ? 'Create Your Access' : 'Check Your Inbox'}
              </h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── PERSONAL EMAIL BLOCKED ── */}
          {status === 'personal_email' ? (
            <div className="px-6 py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-brand-black mb-2">Work Email Required</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto mb-6">
                Personal email addresses (Gmail, Yahoo, Hotmail etc.) are not accepted. Please use your company work email to unlock profiles.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="block w-full py-3.5 bg-brand-black text-white text-sm font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all duration-200 text-center mb-3"
              >
                Try Again with Work Email
              </button>
              <button onClick={onClose} className="text-xs text-gray-400 hover:text-brand-black transition-colors">
                Cancel
              </button>
            </div>

          ) : status === 'no_credits' ? (
            <div className="px-6 py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 border-2 border-brand-gold/30 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-black mb-2">Free Unlocks Used</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto mb-6">
                You&apos;ve used your 3 free unlocks. Upgrade to continue accessing vetted compliance talent.
              </p>
              <a
                href="mailto:hello@talentxmarket.com?subject=Employer Access Upgrade&body=Hi, I'd like to upgrade my TalentX employer access."
                className="block w-full py-3.5 bg-brand-gold text-brand-black text-sm font-bold rounded-xl hover:bg-brand-gold/90 transition-all duration-200 text-center mb-3"
              >
                Contact Us to Upgrade
              </a>
              <button onClick={onClose} className="text-xs text-gray-400 hover:text-brand-black transition-colors">
                Browse talent (limited view)
              </button>
            </div>

          ) : status === 'success' && unlockedProfile ? (
            /* ── PROFILE REVEALED — quick summary + CTA ── */
            <div className="px-6 py-6">

              {/* Unlocked banner */}
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-2 rounded-xl mb-5">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Profile unlocked · {isAdmin ? 'Unlimited admin access' : `${unlockedProfile.creditsRemaining} free ${unlockedProfile.creditsRemaining === 1 ? 'unlock' : 'unlocks'} remaining`}
              </div>

              {/* Quick profile preview */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-brand-black flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-base">{pro.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-brand-black leading-tight truncate">
                      {unlockedProfile.fullName || pro.role}
                    </p>
                    <p className="text-sm text-gray-500">{unlockedProfile.role}</p>
                    {unlockedProfile.location && (
                      <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <PinIcon /> {unlockedProfile.location}
                        {unlockedProfile.experience ? ` · ${unlockedProfile.experience}` : ''}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick contact row */}
                <div className="space-y-2">
                  {unlockedProfile.contactEmail && (
                    <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-lg px-3 py-2">
                      <span className="text-brand-gold"><MailIcon /></span>
                      <span className="text-xs font-semibold text-brand-black truncate">{unlockedProfile.contactEmail}</span>
                    </div>
                  )}
                  {unlockedProfile.linkedinUrl && (
                    <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-lg px-3 py-2">
                      <span className="text-brand-gold"><LinkedInIcon /></span>
                      <span className="text-xs font-semibold text-brand-black">LinkedIn Profile Available</span>
                    </div>
                  )}
                  {!unlockedProfile.contactEmail && !unlockedProfile.linkedinUrl && (
                    <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                      <span className="text-gray-400 text-sm">ℹ️</span>
                      <p className="text-xs text-gray-500">No contact details added yet — view full profile for more.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Primary CTA — View Full Profile */}
              <button
                onClick={() => setShowFullProfile(true)}
                className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold/90 text-brand-black text-sm font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/25 mb-3"
              >
                <FileIcon />
                View Full Candidate Profile
                <ChevronRightIcon />
              </button>

              {/* Secondary — Browse More */}
              <button
                onClick={onClose}
                className="w-full py-2.5 border border-gray-200 text-gray-500 text-sm font-medium rounded-xl hover:border-brand-black hover:text-brand-black transition-all duration-200"
              >
                Browse More Talent
              </button>

              <p className="text-center text-[11px] text-gray-400 mt-3">
                Full CV with experience, education and certifications revealed
              </p>

              {/* Dashboard link */}
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <Link
                  href="/employers"
                  className="text-xs text-brand-gold hover:underline font-semibold"
                >
                  View your employer dashboard →
                </Link>
                <p className="text-[10px] text-gray-300 mt-0.5">All your unlocked profiles in one place</p>
              </div>
            </div>

          ) : step === 1 ? (
            /* ── STEP 1: VALUE PROP ── */
            <div className="px-6 py-6">

              {/* Free unlocks badge */}
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                First 3 unlocks free — no subscription needed
              </div>

              {/* Candidate preview card */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-black flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{pro.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">You are unlocking</p>
                  <p className="text-sm font-bold text-brand-black truncate">{pro.role}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {pro.location && <span className="text-xs text-gray-500">{pro.location}</span>}
                    {pro.experience && <span className="text-xs text-gray-400">· {pro.experience}</span>}
                    {pro.certifications[0] && (
                      <span className="inline-flex items-center gap-1 bg-brand-black text-brand-gold text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <ShieldIcon /> {pro.certifications[0]}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {pro.availabilityStatus || 'Available'}
                  </div>
                </div>
              </div>

              {/* What you unlock */}
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">What you get access to</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {REVEAL_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3">
                    <span className="text-lg leading-none">{item.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-brand-black">{item.label}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust line */}
              <div className="flex items-center gap-2 mb-5 px-1">
                <svg className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-[11px] text-gray-400">All profiles are manually verified · Candidate has consented to contact</p>
              </div>

              {/* CTA */}
              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 bg-brand-black hover:bg-brand-gold text-white hover:text-brand-black text-sm font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <UnlockIcon />
                Continue to Unlock
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <p className="text-center text-[11px] text-gray-400 mt-3">
                Takes 30 seconds · No credit card required
              </p>
            </div>

          ) : step === 2 ? (
            /* ── STEP 2: EMPLOYER DETAILS FORM ── */
            <div className="px-6 py-6">

              {/* Back + progress */}
              <div className="flex items-center gap-3 mb-5">
                <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-black transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-gold rounded-full w-full transition-all duration-500" />
                </div>
              </div>

              {/* Mini candidate reminder */}
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 mb-5">
                <div className="w-8 h-8 rounded-full bg-brand-black flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">{pro.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-brand-black truncate">{pro.role}</p>
                  <p className="text-[10px] text-gray-400">{pro.location}{pro.experience ? ` · ${pro.experience}` : ''}</p>
                </div>
                <span className="text-[10px] font-semibold text-brand-gold bg-brand-black px-2 py-0.5 rounded-full flex-shrink-0">
                  FREE
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-black mb-1.5">Your Name <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      required
                      autoFocus
                      placeholder="e.g. James Reid"
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-black mb-1.5">Company <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. HSBC, Revolut"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-black mb-1.5">Work Email <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.workEmail}
                    onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-black mb-1.5">Role Hiring For <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior MLRO"
                      value={form.roleHiringFor}
                      onChange={(e) => setForm({ ...form, roleHiringFor: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-black mb-1.5">Urgency</label>
                    <select
                      value={form.urgency}
                      onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold bg-white"
                    >
                      <option value="">Optional</option>
                      {URGENCY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{errorMsg}</p>
                )}

                {otpError && step === 2 && (
                  <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{otpError}</p>
                )}

                <button
                  type="submit"
                  disabled={otpLoading}
                  className="w-full py-3.5 bg-brand-black hover:bg-brand-gold text-white hover:text-brand-black text-sm font-bold rounded-xl transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {otpLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending code…
                    </>
                  ) : (
                    <>
                      <MailIcon size={13} />
                      Send Verification Code
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-gray-400">
                  We&apos;ll send a 6-digit code to your work email to verify it&apos;s really you
                </p>
              </form>
            </div>

          ) : step === 3 ? (
            /* ── STEP 3: OTP VERIFICATION ── */
            <div className="px-6 py-6">

              {/* Back */}
              <button onClick={() => { setStep(2); setOtpCode(''); setOtpError(''); }} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-black transition-colors mb-5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              {/* Sent notice */}
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-xs font-bold text-green-800">Code sent to your work email</p>
                  <p className="text-xs text-green-600 mt-0.5 break-all">{form.workEmail}</p>
                </div>
              </div>

              {/* OTP boxes */}
              <div className="mb-2">
                <p className="text-xs font-semibold text-brand-black text-center mb-4">Enter your 6-digit verification code</p>
                <OtpInput value={otpCode} onChange={setOtpCode} disabled={otpLoading} />
              </div>

              {otpError && (
                <p className="text-red-500 text-xs text-center bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-3">{otpError}</p>
              )}

              {/* Verify button */}
              <button
                onClick={handleVerifyAndUnlock}
                disabled={otpLoading || otpCode.replace(/\s/g,'').length < 6}
                className="mt-5 w-full py-3.5 bg-brand-black hover:bg-brand-gold text-white hover:text-brand-black text-sm font-bold rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {otpLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying…
                  </>
                ) : (
                  <>
                    <UnlockIcon />
                    Verify &amp; Unlock Profile
                  </>
                )}
              </button>

              {/* Resend */}
              <div className="mt-4 text-center">
                {resendTimer > 0 ? (
                  <p className="text-xs text-gray-400">Resend code in {resendTimer}s</p>
                ) : (
                  <button
                    onClick={() => handleSendOtp({ preventDefault: () => {} } as React.FormEvent)}
                    disabled={otpLoading}
                    className="text-xs text-brand-gold hover:underline font-semibold disabled:opacity-50"
                  >
                    Didn&apos;t receive it? Resend code
                  </button>
                )}
              </div>

              <p className="text-center text-[10px] text-gray-300 mt-3">
                Code expires in 10 minutes · Check your spam folder if not received
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {/* ── Full CV Modal (layered on top) ── */}
      {showFullProfile && unlockedProfile && (
        <CandidateProfileModal
          pro={pro}
          profile={unlockedProfile}
          onClose={() => setShowFullProfile(false)}
        />
      )}
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function TalentPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [empType, setEmpType] = useState('All');
  const [industry, setIndustry] = useState('All');
  const [search, setSearch] = useState('');
  const [unlockPro, setUnlockPro] = useState<Professional | null>(null);

  useEffect(() => {
    fetch('/api/talent')
      .then((r) => r.json())
      .then((d) => {
        setProfessionals(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => professionals.filter((p) => {
    if (empType !== 'All' && p.employmentType !== empType) return false;
    if (industry !== 'All' && p.industry !== industry) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !(p.role || '').toLowerCase().includes(q) &&
        !(p.location || '').toLowerCase().includes(q) &&
        !(p.industry || '').toLowerCase().includes(q) &&
        !(p.skills || []).some((s) => (s || '').toLowerCase().includes(q))
      ) return false;
    }
    return true;
  }), [professionals, empType, industry, search]);

  const clearFilters = () => {
    setEmpType('All');
    setIndustry('All');
    setSearch('');
  };

  const hasFilters = empType !== 'All' || industry !== 'All' || !!search;

  return (
    <div>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">

        {/* ── Hero ── */}
        <div className="bg-brand-black pt-28 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-gold/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              {loading ? 'Loading...' : `${professionals.length} Verified Professionals`}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Browse Compliance
              <span className="block text-brand-gold">Talent</span>
            </h1>
            <p className="text-white/60 max-w-xl leading-relaxed">
              Pre-screened compliance professionals — AML, MLRO, Risk, KYC, Trust & Safety — available now or open to offers. Unlock profiles to connect directly.
            </p>

            {/* Get Matched CTA strip */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/#hiring"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-black font-bold rounded-xl hover:bg-brand-gold/90 transition-all duration-200 text-sm shadow-lg shadow-brand-gold/20 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Matched in 48 Hours
              </a>
              <p className="text-white/40 text-sm">
                Prefer not to browse? Tell us your role and we&apos;ll send you 2–3 vetted candidates.
              </p>
            </div>
          </div>
        </div>

        {/* ── Info Banner ── */}
        <div className="bg-brand-gold/10 border-b border-brand-gold/20 py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-brand-dark">
              All profiles are verified and actively available. Subscribe to unlock full contact details, CV and LinkedIn.
            </p>
            <Link
              href="/#open-to-work"
              className="flex-shrink-0 bg-brand-gold text-brand-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-brand-gold/90 transition-colors"
            >
              Post Your Availability
            </Link>
          </div>
        </div>

        {/* ── Filter Bar ── */}
        <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by role, skill, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 pl-4 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-gold"
            />
            <select
              value={empType}
              onChange={(e) => setEmpType(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-gold bg-white"
            >
              {EMP_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-gold bg-white"
            >
              {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
            </select>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-brand-gold hover:underline whitespace-nowrap"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <p className="text-brand-gray text-sm mb-6">
            {loading
              ? 'Loading professionals...'
              : `Showing ${filtered.length} ${filtered.length === 1 ? 'professional' : 'professionals'}`}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-gray mb-2">No professionals match your filters.</p>
              <button onClick={clearFilters} className="text-brand-gold hover:underline text-sm">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((pro) => (
                <ProfessionalCard key={pro.id} pro={pro} onUnlock={setUnlockPro} />
              ))}
            </div>
          )}
        </div>

        {/* ── CTA ── */}
        <div className="bg-brand-black py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-4">
              Ready to hire compliance talent?
            </h2>
            <p className="text-white/60 mb-8">
              Subscribe to unlock full profiles — contact details, CV and LinkedIn — directly, with no agency fees.
            </p>
            <Link
              href="/#hiring"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-bold px-8 py-4 rounded-xl hover:bg-brand-gold/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

      </main>
      <Footer />

      {/* ── Unlock Modal ── */}
      {unlockPro && (
        <UnlockModal pro={unlockPro} onClose={() => setUnlockPro(null)} />
      )}
    </div>
  );
}
