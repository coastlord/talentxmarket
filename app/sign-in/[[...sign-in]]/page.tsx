'use client';

import { useSignIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const stats = [
  { value: 'AML', label: 'Anti-Money Laundering' },
  { value: 'KYC', label: 'Know Your Customer' },
  { value: 'MLRO', label: 'Money Laundering Reporting' },
  { value: 'Risk', label: 'Risk Management' },
];

export default function SignInPage() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setError('');
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/dashboard');
      } else {
        setError('Sign in could not be completed. Please try again.');
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: { message?: string }[] };
      const msg = clerkError?.errors?.[0]?.message ?? 'Invalid email or password.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard',
      });
    } catch (err: unknown) {
      const clerkError = err as { errors?: { message?: string }[] };
      setError(clerkError?.errors?.[0]?.message ?? 'Google sign-in failed.');
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── LEFT PANEL — dark brand side ── */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#0A0A0A] flex-col justify-between px-14 py-16 relative overflow-hidden">

        {/* Decorative rings */}
        <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute top-1/2 right-[-120px] w-96 h-96 rounded-full border border-[#C9A84C]/5 pointer-events-none -translate-y-1/2" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/">
            <Image
              src="/tx-icon-gold.png"
              alt="TalentX Market"
              width={220}
              height={56}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Main message */}
        <div className="relative z-10">
          <div className="w-10 h-[3px] bg-[#C9A84C] mb-8 rounded-full" />
          <h2 className="text-white text-4xl font-black leading-tight mb-5">
            Welcome back<br />to the compliance<br />talent marketplace.
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            The specialist platform connecting AML, Risk, MLRO, and Trust &amp; Safety
            professionals with the organisations that need them most.
          </p>

          {/* Specialism chips */}
          <div className="flex flex-wrap gap-2 mt-8">
            {stats.map((s) => (
              <div key={s.value} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[#C9A84C] text-xs font-bold">{s.value}</span>
                <span className="text-white/30 text-xs"> · {s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="relative z-10 border-t border-white/10 pt-7">
          <p className="text-white/20 text-xs leading-relaxed">
            &copy; {new Date().getFullYear()} TalentX Market. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL — white form side ── */}
      <div className="flex-1 bg-white flex flex-col">

        {/* Top bar */}
        <div className="px-8 sm:px-12 py-5 flex items-center justify-between border-b border-gray-100">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden">
            <Image
              src="/tx-icon-gold.png"
              alt="TalentX Market"
              width={140}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
          <div className="hidden lg:block" />
          <p className="text-sm text-gray-500">
            New to TalentX?{' '}
            <Link href="/sign-up" className="text-[#C9A84C] font-semibold hover:underline underline-offset-2 transition-colors">
              Create an account
            </Link>
          </p>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-8 sm:px-12 py-12">
          <div className="w-full max-w-[420px]">

            {/* Heading */}
            <div className="mb-7">
              <h1 className="text-2xl font-black text-[#0A0A0A] mb-2">
                Sign in to TalentX
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                Welcome back. Enter your details to access your account.
              </p>
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
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
              <span className="text-xs text-gray-400 font-medium">or sign in with email</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#0A0A0A] tracking-wide uppercase">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-[#C9A84C] hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
                    Signing in…
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            {/* Legal links */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-5">
              <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-200">|</span>
              <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Terms of Use
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
