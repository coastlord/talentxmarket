'use client';

import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const clerkAppearance = {
  variables: {
    colorPrimary: '#C9A84C',
    colorBackground: '#FFFFFF',
    colorText: '#0A0A0A',
    colorInputBackground: '#F9F9F9',
    colorInputText: '#0A0A0A',
    colorNeutral: '#9CA3AF',
    borderRadius: '10px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
  },
  elements: {
    rootBox: 'w-full',
    card: 'shadow-none border-0 p-0 w-full bg-transparent',
    // Hide Clerk's built-in header — we provide our own
    header: 'hidden',
    headerTitle: 'hidden',
    headerSubtitle: 'hidden',
    logoBox: 'hidden',
    socialButtonsBlockButton:
      'border border-gray-200 text-[#0A0A0A] hover:bg-gray-50 font-medium rounded-lg',
    socialButtonsBlockButtonText: 'font-medium text-sm',
    formButtonPrimary:
      'bg-[#C9A84C] hover:bg-[#b8963e] text-[#0A0A0A] font-semibold rounded-lg transition-colors',
    footerActionLink: 'text-[#C9A84C] font-semibold hover:text-[#b8963e]',
    footerActionText: 'text-gray-500 text-sm',
    footer: 'pt-2',
    formFieldLabel: 'hidden',
    formFieldInput:
      'border-gray-200 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] bg-[#F9F9F9] rounded-lg',
    formFieldInputShowPasswordButton: 'text-gray-400 hover:text-gray-600',
    dividerText: 'text-gray-400 text-xs font-medium',
    dividerLine: 'bg-gray-200',
    alertText: 'text-red-600 text-sm',
    formFieldErrorText: 'text-red-500 text-xs mt-1',
    formResendCodeLink: 'text-[#C9A84C] font-medium',
    identityPreviewText: 'text-[#0A0A0A] text-sm',
    identityPreviewEditButton: 'text-[#C9A84C]',
    otpCodeFieldInput: 'border border-gray-200 focus:border-[#C9A84C] h-12 text-lg font-bold',
  },
};

const stats = [
  { value: 'AML', label: 'Anti-Money Laundering' },
  { value: 'KYC', label: 'Know Your Customer' },
  { value: 'MLRO', label: 'Money Laundering Reporting' },
  { value: 'Risk', label: 'Risk Management' },
];

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── LEFT PANEL — dark brand side ── */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#0A0A0A] flex-col justify-between px-14 py-16 relative overflow-hidden">

        {/* Subtle decorative rings */}
        <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute top-1/2 right-[-120px] w-96 h-96 rounded-full border border-[#C9A84C]/5 pointer-events-none -translate-y-1/2" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/">
            <Image
              src="/logo-dark.png"
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

        {/* Bottom note */}
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
              src="/logo-dark.png"
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

            {/* Our heading */}
            <div className="mb-7">
              <h1 className="text-2xl font-black text-[#0A0A0A] mb-2">
                Sign in to TalentX
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                Welcome back. Enter your details to access your account.
              </p>
            </div>

            {/* Clerk form */}
            <SignIn appearance={clerkAppearance} />

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
