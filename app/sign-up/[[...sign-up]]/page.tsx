'use client';

import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const clerkAppearance = {
  variables: {
    colorPrimary: '#C9A84C',
    colorBackground: '#FFFFFF',
    colorText: '#0A0A0A',
    colorInputBackground: '#F8F8F8',
    colorInputText: '#0A0A0A',
    colorNeutral: '#6B7280',
    borderRadius: '10px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
  },
  elements: {
    rootBox: 'w-full',
    card: 'shadow-none border-0 p-0 w-full bg-transparent',
    headerTitle: 'text-[#0A0A0A] font-bold text-xl',
    headerSubtitle: 'text-gray-500 text-sm',
    socialButtonsBlockButton:
      'border border-gray-200 text-[#0A0A0A] hover:bg-gray-50 font-medium',
    formButtonPrimary:
      'bg-[#C9A84C] hover:bg-[#b8963e] text-[#0A0A0A] font-semibold transition-colors duration-200',
    footerActionLink: 'text-[#C9A84C] hover:text-[#b8963e] font-medium',
    formFieldLabel: 'text-[#0A0A0A] text-sm font-medium',
    formFieldInput:
      'border-gray-200 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] bg-[#F8F8F8]',
    identityPreviewText: 'text-[#0A0A0A]',
    identityPreviewEditButton: 'text-[#C9A84C]',
    dividerText: 'text-gray-400 text-xs',
    dividerLine: 'bg-gray-100',
    footer: 'hidden',
  },
};

const features = [
  'Your profile is private by default',
  'You control your visibility to employers',
  'Edit and update your card anytime',
  'Employers see your skills — not your contact details',
];

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Top bar */}
      <header className="px-6 sm:px-10 py-5 flex items-center justify-between border-b border-gray-100">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-icon.png"
            alt="TalentX Market"
            width={160}
            height={48}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>
        <Link
          href="/sign-in"
          className="text-sm text-gray-500 hover:text-[#C9A84C] transition-colors duration-200 font-medium"
        >
          Already have an account? <span className="text-[#C9A84C]">Sign in</span>
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">

          {/* Left: Brand messaging */}
          <div className="lg:flex-1 text-center lg:text-left lg:pt-6">

            {/* Invitation badge */}
            <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-wider uppercase">
                Invitation Only
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] leading-tight mb-5">
              You've been<br className="hidden lg:block" /> selected.
            </h1>

            {/* Gold rule */}
            <div className="w-14 h-[3px] bg-[#C9A84C] mb-6 mx-auto lg:mx-0 rounded-full" />

            {/* Description */}
            <p className="text-gray-500 text-base leading-relaxed mb-9 max-w-sm mx-auto lg:mx-0">
              Welcome to TalentX Market — the compliance talent marketplace for AML, Risk, MLRO, and Trust &amp; Safety professionals.
            </p>

            {/* Feature list */}
            <div className="space-y-3.5">
              {features.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-2.5 h-2.5 text-[#C9A84C]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-[#0A0A0A] text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Divider + platform note */}
            <div className="mt-10 pt-8 border-t border-gray-100 hidden lg:block">
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                TalentX Market is a curated network. Every profile is manually
                reviewed before being made visible to employers.
              </p>
            </div>
          </div>

          {/* Right: Sign-up form */}
          <div className="lg:flex-1 w-full max-w-md">

            {/* Form card */}
            <div className="border border-gray-100 rounded-2xl p-7 sm:p-9 shadow-sm bg-white">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-1">
                  Create your account
                </h2>
                <p className="text-sm text-gray-500">
                  Complete setup to access your candidate dashboard.
                </p>
              </div>

              <SignUp appearance={clerkAppearance} />
            </div>

            {/* Sub-note */}
            <p className="text-center text-xs text-gray-400 mt-4">
              If you received this link in error, please disregard.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-gray-100">
        <p className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} TalentX Market. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
