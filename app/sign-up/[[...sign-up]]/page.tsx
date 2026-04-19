'use client';

import { useSignUp } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const features = [
  { text: 'Your profile stays anonymous until you choose otherwise' },
  { text: 'Employers see your skills — never your contact details' },
  { text: 'Every profile is manually reviewed before going live' },
  { text: 'Update your availability status anytime' },
];

const specialisms = ['AML', 'KYC', 'MLRO', 'Risk', 'Sanctions', 'FinCrime'];

export default function SignUpPage() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();

  // Step 1: registration fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: email verification
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGoogleSignUp() {
    if (!isLoaded) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard',
      });
    } catch (err: unknown) {
      const clerkError = err as { errors?: { message?: string }[] };
      setError(clerkError?.errors?.[0]?.message ?? 'Google sign-up failed.');
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setError('');
    setLoading(true);

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      // Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerifying(true);
    } catch (err: unknown) {
      const clerkError = err as { errors?: { message?: string }[] };
      setError(clerkError?.errors?.[0]?.message ?? 'Could not create account. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setError('');
    setLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/dashboard');
      } else {
        setError('Verification could not be completed. Please try again.');
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: { message?: string }[] };
      setError(clerkError?.errors?.[0]?.message ?? 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Google Fonts + shared styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }

        /* Dot-grid overlay */
        .dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* Input focus glow */
        .tx-input:focus {
          outline: none;
          border-color: #C9A84C;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
        }

        /* Gold CTA button */
        .tx-btn-gold:hover:not(:disabled) {
          background-color: #b8963e;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(201,168,76,0.25);
        }
        .tx-btn-gold:active:not(:disabled) { transform: translateY(0); }
        .tx-btn-gold { transition: background-color 0.15s, transform 0.15s, box-shadow 0.15s; }

        /* Google button */
        .tx-btn-google:hover { background-color: #fafafa; border-color: #d1d5db; }
        .tx-btn-google { transition: background-color 0.15s, border-color 0.15s; }
      `}</style>

      <div className="min-h-screen flex" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

        {/* ── LEFT PANEL ── */}
        <div className="hidden lg:flex lg:w-[44%] xl:w-[42%] bg-[#0A0A0A] flex-col relative overflow-hidden">

          {/* Dot grid texture */}
          <div className="absolute inset-0 dot-grid pointer-events-none" />

          {/* Gold top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />

          {/* Inner content */}
          <div className="relative z-10 flex flex-col h-full px-12 xl:px-14 py-12">

            {/* Logo */}
            <Link href="/" className="inline-block mb-auto">
              <Image
                src="/tx-mark.png"
                alt="TalentX Market"
                width={134}
                height={70}
                className="w-auto object-contain"
                style={{ height: '70px' }}
                priority
              />
            </Link>

            {/* Main content */}
            <div className="flex flex-col justify-center flex-1 py-16">

              {/* Badge */}
              <div className="flex items-center gap-2 mb-8 w-fit">
                <div className="flex items-center gap-2 rounded-full px-3.5 py-1.5"
                  style={{ backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                  <span className="text-[#C9A84C] text-[11px] font-semibold tracking-[0.18em] uppercase"
                    style={{ fontFamily: 'Inter, sans-serif' }}>
                    Free to join
                  </span>
                </div>
              </div>

              {/* Overline */}
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-8 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.18em] uppercase"
                  style={{ fontFamily: 'Inter, sans-serif' }}>
                  Compliance Talent Marketplace
                </span>
              </div>

              {/* Headline */}
              <h2
                className="text-white leading-[1.15] mb-7"
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontWeight: 900,
                  fontSize: 'clamp(1.9rem, 2.6vw, 2.6rem)',
                }}
              >
                Your next<br />
                compliance role<br />
                starts here.
              </h2>

              {/* Body */}
              <p className="text-white/40 text-sm leading-[1.8] max-w-[290px] mb-10"
                style={{ fontFamily: 'Inter, sans-serif' }}>
                The specialist marketplace for AML, Risk, MLRO, and Trust &amp; Safety professionals.
                Post your availability — let the right employers find you.
              </p>

              {/* Feature list */}
              <div className="space-y-4 mb-10">
                {features.map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        backgroundColor: 'rgba(201,168,76,0.1)',
                        border: '1px solid rgba(201,168,76,0.25)',
                      }}
                    >
                      <svg className="w-2.5 h-2.5 text-[#C9A84C]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/65 text-sm leading-relaxed"
                      style={{ fontFamily: 'Inter, sans-serif' }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Specialism chips */}
              <div className="flex flex-wrap gap-2">
                {specialisms.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full text-[11px] font-semibold border"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#C9A84C',
                      borderColor: 'rgba(201,168,76,0.25)',
                      backgroundColor: 'rgba(201,168,76,0.07)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-white/20 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                &copy; {new Date().getFullYear()} TalentX Market Ltd. All rights reserved.
              </p>
            </div>

          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex-1 bg-white flex flex-col">

          {/* Top bar */}
          <div
            className="px-8 sm:px-12 xl:px-16 py-4 lg:py-5 flex flex-col lg:flex-row lg:items-center lg:justify-end gap-3 lg:gap-0"
            style={{ borderBottom: '1px solid #F0F0F0' }}
          >
            {/* Mobile logo — stacks above the link */}
            <Link href="/" className="lg:hidden inline-block">
              <Image
                src="/logo-dark.png"
                alt="TalentX Market"
                width={140}
                height={36}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>

            <p className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
              Already have an account?{' '}
              <Link
                href="/sign-in"
                className="font-semibold hover:underline underline-offset-2 transition-colors"
                style={{ color: '#C9A84C' }}
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Form area */}
          <div className="flex-1 flex items-center justify-center px-8 sm:px-12 xl:px-16 py-10">
            <div className="w-full max-w-[420px]">

              {verifying ? (

                /* ── STEP 2: EMAIL VERIFICATION ── */
                <>
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: 'rgba(201,168,76,0.08)',
                      border: '1px solid rgba(201,168,76,0.2)',
                    }}
                  >
                    <svg className="w-6 h-6 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>

                  {/* Heading */}
                  <div className="mb-7">
                    <h1
                      className="text-[#0A0A0A] mb-2"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.6rem',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Check your inbox
                    </h1>
                    <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      We sent a 6-digit code to{' '}
                      <span className="font-semibold text-[#0A0A0A]">{email}</span>.
                      Enter it below to verify your account.
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div
                      className="mb-5 px-4 py-3 rounded-xl text-sm text-red-600"
                      style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}
                    >
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleVerify} className="space-y-4">

                    {/* Code input */}
                    <div>
                      <label
                        className="block text-[11px] font-semibold text-[#0A0A0A] mb-2 tracking-[0.1em] uppercase"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Verification code
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="000000"
                        className="tx-input w-full rounded-xl px-4 py-4 text-center text-[1.75rem] font-bold tracking-[0.45em] text-[#0A0A0A] transition-all"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          border: '1px solid #E5E7EB',
                          backgroundColor: '#FAFAFA',
                          color: '#0A0A0A',
                        }}
                      />
                      <p className="mt-2 text-xs text-gray-400 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Check your spam folder if you don&apos;t see it within a minute.
                      </p>
                    </div>

                    {/* Verify button */}
                    <button
                      type="submit"
                      disabled={loading || code.length < 6}
                      className="tx-btn-gold w-full bg-[#C9A84C] disabled:opacity-60 disabled:cursor-not-allowed text-[#0A0A0A] font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Verifying…
                        </>
                      ) : (
                        <>
                          Verify &amp; continue
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </>
                      )}
                    </button>

                    {/* Back link */}
                    <button
                      type="button"
                      onClick={() => setVerifying(false)}
                      className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-1 flex items-center justify-center gap-1.5"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                      </svg>
                      Back to registration
                    </button>

                  </form>
                </>

              ) : (

                /* ── STEP 1: REGISTRATION ── */
                <>
                  {/* Heading */}
                  <div className="mb-7">
                    <h1
                      className="text-[#0A0A0A] mb-2"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.6rem',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Create your account
                    </h1>
                    <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Join compliance professionals already on TalentX Market. Free to join.
                    </p>
                  </div>

                  {/* Google Sign-Up */}
                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    className="tx-btn-google w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-sm font-medium text-[#0A0A0A] bg-white"
                    style={{ fontFamily: 'Inter, sans-serif', border: '1px solid #E5E7EB' }}
                  >
                    <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-[11px] text-gray-400 font-medium tracking-wide uppercase"
                      style={{ fontFamily: 'Inter, sans-serif' }}>
                      or with email
                    </span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>

                  {/* Error */}
                  {error && (
                    <div
                      className="mb-5 px-4 py-3 rounded-xl text-sm text-red-600"
                      style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}
                    >
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleRegister} className="space-y-4">

                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          className="block text-[11px] font-semibold text-[#0A0A0A] mb-2 tracking-[0.1em] uppercase"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Jane"
                          className="tx-input w-full rounded-xl px-4 py-3.5 text-sm text-[#0A0A0A] transition-all"
                          style={{ fontFamily: 'Inter, sans-serif', border: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}
                        />
                      </div>
                      <div>
                        <label
                          className="block text-[11px] font-semibold text-[#0A0A0A] mb-2 tracking-[0.1em] uppercase"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Smith"
                          className="tx-input w-full rounded-xl px-4 py-3.5 text-sm text-[#0A0A0A] transition-all"
                          style={{ fontFamily: 'Inter, sans-serif', border: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        className="block text-[11px] font-semibold text-[#0A0A0A] mb-2 tracking-[0.1em] uppercase"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="tx-input w-full rounded-xl px-4 py-3.5 text-sm text-[#0A0A0A] transition-all"
                        style={{ fontFamily: 'Inter, sans-serif', border: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        className="block text-[11px] font-semibold text-[#0A0A0A] mb-2 tracking-[0.1em] uppercase"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          minLength={8}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Minimum 8 characters"
                          className="tx-input w-full rounded-xl px-4 py-3.5 pr-12 text-sm text-[#0A0A0A] transition-all"
                          style={{ fontFamily: 'Inter, sans-serif', border: '1px solid #E5E7EB', backgroundColor: '#FAFAFA' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                          ) : (
                            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading || !isLoaded}
                      className="tx-btn-gold w-full bg-[#C9A84C] disabled:opacity-60 disabled:cursor-not-allowed text-[#0A0A0A] font-bold py-3.5 rounded-xl text-sm mt-1 flex items-center justify-center gap-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Creating account…
                        </>
                      ) : (
                        <>
                          Create account
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </>
                      )}
                    </button>

                    {/* Terms */}
                    <p className="text-xs text-gray-400 text-center leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      By creating an account you agree to our{' '}
                      <Link href="/terms" className="hover:underline underline-offset-2" style={{ color: '#C9A84C' }}>
                        Terms of Use
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="hover:underline underline-offset-2" style={{ color: '#C9A84C' }}>
                        Privacy Policy
                      </Link>.
                    </p>

                  </form>

                  {/* Profile review notice */}
                  <div
                    className="mt-5 flex items-start gap-3 px-4 py-3.5 rounded-xl"
                    style={{ backgroundColor: '#F9F9F9', border: '1px solid #EFEFEF' }}
                  >
                    <svg className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Your profile won&apos;t be visible to employers until our team has reviewed and approved it. We&apos;ll notify you once you&apos;re live.
                    </p>
                  </div>

                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
