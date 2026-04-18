'use client';

import { useSignUp } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const features = [
  { text: 'Your profile stays anonymous until you choose otherwise' },
  { text: 'Employers see your skills — never your contact details' },
  { text: 'Every profile reviewed before going live' },
  { text: 'Update your availability status anytime' },
];

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
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── LEFT PANEL — dark, brand ── */}
      <div className="lg:w-[45%] bg-[#0A0A0A] flex flex-col px-8 sm:px-12 lg:px-14 py-10 lg:py-16">

        {/* Logo */}
        <Link href="/" className="inline-block mb-12 lg:mb-16">
          <Image
            src="/tx-icon-gold.png"
            alt="TalentX Market"
            width={501}
            height={302}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Headline */}
        <div className="flex-1 flex flex-col justify-center max-w-sm">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-3.5 py-1.5 mb-7 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-wider uppercase">
              Free to join
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-white leading-tight mb-5">
            Your next role<br />starts here.
          </h1>

          <div className="w-10 h-[3px] bg-[#C9A84C] mb-6 rounded-full" />

          <p className="text-white/50 text-sm leading-relaxed mb-10">
            The specialist marketplace for AML, Risk, MLRO, Compliance,
            and Trust &amp; Safety professionals. Post your availability —
            let the right employers find you.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            {features.map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-2.5 h-2.5 text-[#C9A84C]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white/70 text-sm leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="text-white/20 text-xs mt-10 leading-relaxed hidden lg:block">
          &copy; {new Date().getFullYear()} TalentX Market. All rights reserved.
        </p>
      </div>

      {/* ── RIGHT PANEL — white, form ── */}
      <div className="lg:w-[55%] bg-white flex flex-col">

        {/* Top bar */}
        <div className="px-8 sm:px-12 py-5 flex items-center justify-end border-b border-gray-100">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-[#C9A84C] font-semibold hover:underline underline-offset-2 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-8 sm:px-12 py-12">
          <div className="w-full max-w-[420px]">

            {verifying ? (
              /* ── EMAIL VERIFICATION STEP ── */
              <>
                <div className="mb-7">
                  <div className="w-12 h-12 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mb-5">
                    <svg className="w-6 h-6 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black text-[#0A0A0A] mb-2">
                    Check your email
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    We&apos;ve sent a 6-digit verification code to <span className="font-semibold text-[#0A0A0A]">{email}</span>. Enter it below to confirm your account.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                    {error}
                  </div>
                )}

                <form onSubmit={handleVerify} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5 tracking-wide uppercase">
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
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-center text-2xl font-bold tracking-[0.4em] text-[#0A0A0A] bg-[#F9F9F9] placeholder-gray-300 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || code.length < 6}
                    className="w-full bg-[#C9A84C] hover:bg-[#b8963e] disabled:opacity-60 text-[#0A0A0A] font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Verifying…
                      </>
                    ) : (
                      'Verify & continue'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setVerifying(false)}
                    className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
                  >
                    ← Back to registration
                  </button>
                </form>
              </>
            ) : (
              /* ── REGISTRATION STEP ── */
              <>
                <div className="mb-7">
                  <h2 className="text-2xl font-black text-[#0A0A0A] mb-2">
                    Create your account
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Join thousands of compliance professionals already on TalentX Market.
                  </p>
                </div>

                {/* Google Sign-Up */}
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-[#0A0A0A] hover:bg-gray-50 transition-colors mb-5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400 font-medium">or register with email</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {error && (
                  <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                    {error}
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">

                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5 tracking-wide uppercase">
                        First name
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Jane"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A0A0A] bg-[#F9F9F9] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5 tracking-wide uppercase">
                        Last name
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Smith"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A0A0A] bg-[#F9F9F9] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5 tracking-wide uppercase">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A0A0A] bg-[#F9F9F9] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5 tracking-wide uppercase">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-[#0A0A0A] bg-[#F9F9F9] placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
                    className="w-full bg-[#C9A84C] hover:bg-[#b8963e] disabled:opacity-60 text-[#0A0A0A] font-bold py-3.5 rounded-xl text-sm transition-colors mt-2 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Creating account…
                      </>
                    ) : (
                      'Create account'
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center leading-relaxed">
                    By creating an account you agree to our{' '}
                    <Link href="/terms" className="text-[#C9A84C] hover:underline">Terms of Use</Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-[#C9A84C] hover:underline">Privacy Policy</Link>.
                  </p>
                </form>

                {/* Reassurance note */}
                <div className="mt-5 flex items-center gap-2 px-3.5 py-3 bg-gray-50 rounded-xl border border-gray-100">
                  <svg className="w-4 h-4 text-[#C9A84C] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Your profile won&apos;t be visible to employers until our team has reviewed and approved it.
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
