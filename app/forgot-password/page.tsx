'use client';

import { useSignIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const { signIn, isLoaded } = useSignIn();

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setError('');
    setLoading(true);

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      setSent(true);
    } catch (err: unknown) {
      const clerkError = err as { errors?: { message?: string }[] };
      setError(clerkError?.errors?.[0]?.message ?? 'Could not send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-[400px]">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link href="/">
            <Image
              src="/tx-icon-gold.png"
              alt="TalentX Market"
              width={160}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-[#0A0A0A] mb-3">Check your inbox</h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              We&apos;ve sent a password reset link to <span className="font-semibold text-[#0A0A0A]">{email}</span>.
              Check your spam folder if you don&apos;t see it.
            </p>
            <Link href="/sign-in" className="text-[#C9A84C] font-semibold text-sm hover:underline">
              ← Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-black text-[#0A0A0A] mb-2">Reset your password</h1>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Enter the email address linked to your account and we&apos;ll send you a reset link.
            </p>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <button
                type="submit"
                disabled={loading || !isLoaded}
                className="w-full bg-[#C9A84C] hover:bg-[#b8963e] disabled:opacity-60 text-[#0A0A0A] font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  'Send reset link'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/sign-in" className="text-sm text-[#C9A84C] font-semibold hover:underline">
                ← Back to sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
