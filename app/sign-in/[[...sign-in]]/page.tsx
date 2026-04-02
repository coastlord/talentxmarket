'use client';

import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const clerkAppearance = {
  variables: {
    colorPrimary: '#0A0A0A',
    colorBackground: '#FFFFFF',
    colorText: '#0A0A0A',
    colorInputBackground: '#F9F9F9',
    colorInputText: '#0A0A0A',
    colorNeutral: '#9CA3AF',
    borderRadius: '8px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
  },
  elements: {
    rootBox: 'w-full',
    card: 'shadow-none border-0 p-0 w-full bg-transparent',
    headerTitle: 'hidden',
    headerSubtitle: 'hidden',
    logoBox: 'hidden',
    socialButtonsBlockButton:
      'border border-gray-200 text-[#0A0A0A] hover:bg-gray-50 font-medium rounded-lg h-12 text-sm w-full',
    socialButtonsBlockButtonText: 'font-medium text-sm',
    formButtonPrimary:
      'bg-[#0A0A0A] hover:bg-[#222] text-white font-semibold h-12 rounded-lg text-sm w-full transition-colors',
    footerActionLink: 'hidden',
    footerAction: 'hidden',
    footer: 'hidden',
    formFieldLabel: 'text-[#0A0A0A] text-sm font-semibold mb-1.5 block',
    formFieldInput:
      'border border-gray-200 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 h-12 rounded-lg text-sm px-4 w-full bg-[#F9F9F9]',
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

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── LEFT PANEL — Gold brand side ── */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#C9A84C] flex-col justify-between p-14 relative overflow-hidden">

        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full border-2 border-black" />
          <div className="absolute bottom-[-40px] left-[-40px] w-56 h-56 rounded-full border-2 border-black" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Image
            src="/logo-dark.png"
            alt="TalentX Market"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
          <p className="text-black/70 text-xs font-bold tracking-[0.22em] uppercase mt-3">
            AML · KYC · RISK · COMPLIANCE CAREERS
          </p>
        </div>

        {/* Main message */}
        <div className="relative z-10">
          <div className="w-12 h-[3px] bg-black/30 mb-8 rounded-full" />
          <h2 className="text-black text-4xl font-extrabold leading-tight mb-5">
            The world&apos;s most<br />trusted compliance<br />talent marketplace.
          </h2>
          <p className="text-black/65 text-base leading-relaxed max-w-sm">
            A curated, invitation-only network of senior AML, Risk, MLRO, KYC and Trust &amp; Safety professionals — built exclusively for the compliance sector.
          </p>
        </div>

        {/* Bottom badge */}
        <div className="relative z-10 border-t border-black/20 pt-7 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-black text-sm font-bold">Invitation only.</p>
            <p className="text-black/55 text-xs mt-0.5 leading-relaxed">Every professional is manually vetted before being admitted to the platform.</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — White form side ── */}
      <div className="flex-1 bg-white flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-20">

        {/* Mobile logo */}
        <div className="lg:hidden mb-10 text-center">
          <Image
            src="/logo-dark.png"
            alt="TalentX Market"
            width={160}
            height={48}
            className="h-10 w-auto object-contain mx-auto"
            priority
          />
          <p className="text-[#C9A84C] text-[10px] font-bold tracking-[0.18em] uppercase mt-2">
            AML · KYC · RISK · COMPLIANCE CAREERS
          </p>
        </div>

        <div className="w-full max-w-[400px] mx-auto">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-[28px] font-extrabold text-[#0A0A0A] leading-tight mb-2">
              Sign in to TalentX
            </h1>
            <p className="text-gray-500 text-[15px]">
              Welcome back. Please enter your details to continue.
            </p>
          </div>

          {/* Clerk form — seamless, no inner card */}
          <SignIn appearance={clerkAppearance} />

          {/* Divider */}
          <div className="mt-8 pt-7 border-t border-gray-100 flex items-center justify-center gap-5">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-200">|</span>
            <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Terms of Service
            </Link>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
            Don&apos;t have an account?{' '}
            <span className="text-[#0A0A0A] font-semibold">Accounts are by invitation only.</span>
          </p>
        </div>
      </div>

    </div>
  );
}
