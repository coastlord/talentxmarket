'use client';

import { useState, useMemo, useEffect } from 'react';
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

const MailIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const LinkedInIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
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

// ─── Page ────────────────────────────────────────────────────────────────────
// ─── Unlock Modal ────────────────────────────────────────────────────────────
const URGENCY_OPTIONS = ['Within 1 week', '2–4 weeks', '1–3 months', 'No urgency / exploring'];

function UnlockModal({ pro, onClose }: { pro: Professional; onClose: () => void }) {
  const [form, setForm] = useState({ companyName: '', workEmail: '', roleHiringFor: '', urgency: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/employer-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          candidateId: pro.id,
          candidateRole: pro.role,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us at hello@talentxmarket.com');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

        {/* Modal header */}
        <div className="bg-brand-black px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">Request Access</span>
            </div>
            <h2 className="text-white text-lg font-bold">Unlock This Profile</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === 'success' ? (
          /* ── SUCCESS STATE ── */
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-2">Request Received</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto mb-6">
              We&apos;ll review your request and introduce you to this professional within <strong>24–48 hours</strong>.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-brand-black text-white text-sm font-semibold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all duration-200"
            >
              Browse More Talent
            </button>
          </div>
        ) : (
          <div className="px-6 py-6">

            {/* Candidate preview */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-black flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">{pro.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 font-medium mb-0.5">You are requesting access to</p>
                <p className="text-sm font-bold text-brand-black">{pro.role}</p>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
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
                <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {pro.availabilityStatus || 'Available'}
                </div>
              </div>
            </div>

            {/* What you get */}
            <div className="flex items-center gap-6 mb-6 px-1">
              {[
                { icon: '👤', label: 'Full Name' },
                { icon: '📧', label: 'Contact' },
                { icon: '📄', label: 'CV / LinkedIn' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
              <div className="ml-auto text-xs text-brand-gold font-semibold flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Verified only
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-black mb-1.5">Company Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HSBC, Revolut"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                  />
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
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-black mb-1.5">Role You Are Hiring For <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior MLRO, AML Analyst"
                  value={form.roleHiringFor}
                  onChange={(e) => setForm({ ...form, roleHiringFor: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-black mb-1.5">Hiring Urgency</label>
                <select
                  value={form.urgency}
                  onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold bg-white"
                >
                  <option value="">Select urgency (optional)</option>
                  {URGENCY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 bg-brand-black hover:bg-brand-gold text-white hover:text-brand-black text-sm font-bold rounded-xl transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>
                    <UnlockIcon />
                    Request Access
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                We&apos;ll introduce you within 24–48 hours. No spam, no agency fees.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
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
        !p.role.toLowerCase().includes(q) &&
        !p.location.toLowerCase().includes(q) &&
        !p.industry.toLowerCase().includes(q) &&
        !p.skills.some((s) => s.toLowerCase().includes(q))
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
