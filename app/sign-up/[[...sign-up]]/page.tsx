'use client';

import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const clerkAppearance = {
  variables: {
    colorPrimary: '#C9A84C',
    colorBackground: '#FFFFFF',
    colorText: '#0A0A0A',
    colorInputBackground: '#F9F9F9',
    colorInputText: '#0A0A0A',
    colorNeutral: '#6B7280',
    borderRadius: '10px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
  },
  elements: {
    rootBox: 'w-full',
    card: 'shadow-none border-0 p-0 w-full bg-transparent',
    // Hide Clerk's built-in header — we provide our own above
    header: 'hidden',
    headerTitle: 'hidden',
    headerSubtitle: 'hidden',
    socialButtonsBlockButton:
      'border border-gray-200 text-[#0A0A0A] hover:bg-gray-50 font-medium rounded-lg',
    formButtonPrimary:
      'bg-[#C9A84C] hover:bg-[#b8963e] text-[#0A0A0A] font-semibold transition-colors duration-200 rounded-lg',
    footerActionLink: 'text-[#C9A84C] hover:text-[#b8963e] font-medium',
    footerActionText: 'text-gray-500 text-sm',
    footer: 'pt-2',
    formFieldLabel: 'hidden',
    formFieldInput:
      'border-gray-200 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] bg-[#F9F9F9] rounded-lg',
    dividerText: 'text-gray-400 text-xs',
    dividerLine: 'bg-gray-100',
    identityPreviewText: 'text-[#0A0A0A]',
    identityPreviewEditButton: 'text-[#C9A84C]',
  },
};

const features = [
  { text: 'Your profile stays anonymous until you choose otherwise' },
  { text: 'Employers see your skills — never your contact details' },
  { text: 'Every profile reviewed before going live' },
  { text: 'Update your availability status anytime' },
];

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

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

        {/* Bottom note */}
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

            {/* Our heading — replaces Clerk's hidden one */}
            <div className="mb-7">
              <h2 className="text-2xl font-black text-[#0A0A0A] mb-2">
                Create your account
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Join thousands of compliance professionals already on TalentX Market.
              </p>
            </div>

            {/* Clerk form */}
            <SignUp
              appearance={clerkAppearance}
              afterSignUpUrl="/dashboard"
              redirectUrl="/dashboard"
            />

            {/* Reassurance note */}
            <div className="mt-5 flex items-center gap-2 px-3.5 py-3 bg-gray-50 rounded-xl border border-gray-100">
              <svg className="w-4 h-4 text-[#C9A84C] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-xs text-gray-500 leading-relaxed">
                Your profile won&apos;t be visible to employers until our team has reviewed and approved it.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
