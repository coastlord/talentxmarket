'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ─── Icons ───────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const SpinIcon = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EmployerAccessPage() {
  const [form, setForm] = useState({
    contactName: '',
    companyName: '',
    workEmail: '',
    roleHiringFor: '',
  });
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
        body: JSON.stringify({ ...form, urgency: '' }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email hello@talentxmarket.com');
    }
  };

  const BENEFITS = [
    'Browse vetted compliance professionals instantly',
    'Unlock full profiles — name, LinkedIn, contact',
    '3 free unlocks — no credit card required',
    'Request introductions directly from the platform',
    'Candidates are pre-screened and available now',
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Navbar strip ── */}
      <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo-dark.png" alt="TalentX Market" width={140} height={36} className="h-9 w-auto" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-400 hidden sm:block">Already have access?</span>
          <Link href="/talent" className="text-brand-black font-semibold hover:text-brand-gold transition-colors">
            Browse Talent →
          </Link>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 flex flex-col lg:flex-row">

        {/* LEFT — value prop */}
        <div className="bg-brand-black lg:w-[45%] px-8 py-14 flex flex-col justify-center">
          <div className="max-w-sm mx-auto lg:mx-0 lg:ml-auto lg:pr-8">

            <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold text-xs font-bold px-3 py-1.5 rounded-full border border-brand-gold/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              Employer Access
            </div>

            <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
              Hire vetted{' '}
              <span className="text-brand-gold">compliance talent</span>{' '}
              without the agency fee.
            </h1>

            <p className="text-white/60 text-sm leading-relaxed mb-8">
              TalentX Market connects you directly to pre-screened AML, MLRO, Risk,
              KYC, and Trust &amp; Safety professionals who are actively available.
            </p>

            <ul className="space-y-3 mb-10">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-white/80">
                  <CheckIcon />
                  {b}
                </li>
              ))}
            </ul>

            {/* Social proof strip */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3">
                Specialists in
              </p>
              <div className="flex flex-wrap gap-2">
                {['AML / CAMS', 'MLRO', 'KYC / CDD', 'Sanctions', 'Risk', 'Trust & Safety', 'FinCrime'].map((tag) => (
                  <span key={tag} className="text-[11px] text-white/60 border border-white/15 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="flex-1 flex items-center justify-center px-6 py-14">
          <div className="w-full max-w-md">

            {status === 'success' ? (
              /* ── Success ── */
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-brand-black mb-2">You&apos;re in.</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-2">
                  Your employer account has been created.
                </p>
                <p className="text-gray-400 text-sm mb-8">
                  Start browsing and unlock your first 3 profiles free.
                </p>
                <Link
                  href="/talent"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all duration-200 text-sm"
                >
                  Browse Talent Now →
                </Link>
              </div>

            ) : (
              /* ── Form ── */
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-brand-black mb-1">Get Access</h2>
                  <p className="text-gray-500 text-sm">
                    Takes 30 seconds. 3 free profile unlocks included.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-black mb-1.5">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        autoFocus
                        placeholder="e.g. Sarah Okafor"
                        value={form.contactName}
                        onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-black mb-1.5">
                        Company <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Barclays, Revolut"
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-black mb-1.5">
                      Work Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.workEmail}
                      onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-black mb-1.5">
                      Role You&apos;re Hiring For <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior AML Analyst, MLRO"
                      value={form.roleHiringFor}
                      onChange={(e) => setForm({ ...form, roleHiringFor: e.target.value })}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-colors"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-brand-black text-white font-bold rounded-xl hover:bg-brand-gold hover:text-brand-black transition-all duration-200 text-sm disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                  >
                    {status === 'loading' ? (
                      <><SpinIcon /> Creating your access…</>
                    ) : (
                      'Get Access — It\'s Free →'
                    )}
                  </button>

                  <p className="text-center text-[11px] text-gray-400 pt-1">
                    No subscription required · No credit card · 3 free unlocks included
                  </p>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-400">
                    Looking to post your availability?{' '}
                    <Link href="/sign-up" className="text-brand-gold font-semibold hover:underline">
                      Join as a Candidate →
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
