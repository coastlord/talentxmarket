'use client';

import { useState } from 'react';

const professionalSteps = [
  {
    step: '01',
    title: 'Create Your Profile',
    description:
      'Tell us about your compliance specialism — AML, Risk, MLRO, Trust & Safety and more. Highlight your qualifications, experience, and the roles you\'re open to.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Post Your Availability',
    description:
      'Set your status to "Open to Work" and let employers know your preferred role type — contract, permanent, interim — and your location preferences.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Get Matched & Hired',
    description:
      'Employers find you directly. Receive enquiries from verified compliance-hiring organisations and move forward with the right opportunity on your terms.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const employerSteps = [
  {
    step: '01',
    title: 'Browse Verified Talent',
    description:
      'Explore a curated pool of compliance professionals — AML, MLRO, Risk, KYC, Trust & Safety and more. Filter by specialism, experience level, location, and availability status.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Unlock the Full Profile',
    description:
      'Found the right fit? Request access to the candidate\'s complete details — full name, contact information, CV, and LinkedIn — directly through TalentX with no agency gatekeeping.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Interview & Hire Directly',
    description:
      'Connect with your chosen candidate on your terms. No recruiters, no inflated fees, no delays. Build your compliance team with specialists who are genuinely ready to move.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'professional' | 'employer'>('professional');
  const steps = activeTab === 'professional' ? professionalSteps : employerSteps;

  return (
    <section id="how-it-works" className="py-24 bg-brand-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="gold-line mx-auto mb-6" />
          <h2 className="section-heading">How TalentX Works</h2>
          <p className="section-subheading mx-auto text-center">
            Whether you&apos;re a compliance professional ready for your next move, or an
            employer seeking specialist talent — TalentX makes the connection simple.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex bg-white border border-brand-light-gray rounded-xl p-1.5 shadow-sm">
            <button
              onClick={() => setActiveTab('professional')}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'professional'
                  ? 'bg-brand-black text-white shadow-md'
                  : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              For Professionals
            </button>
            <button
              onClick={() => setActiveTab('employer')}
              className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'employer'
                  ? 'bg-brand-gold text-brand-black shadow-md'
                  : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              For Employers
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`card group hover:border-brand-gold/30 transition-all duration-300 ${
                activeTab === 'employer' ? 'hover:border-brand-gold/40' : 'hover:border-brand-black/20'
              }`}>
                {/* Step number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg ${
                    activeTab === 'professional'
                      ? 'bg-brand-black text-white'
                      : 'bg-brand-gold text-brand-black'
                  }`}>
                    {step.step}
                  </div>
                  <div className={`text-brand-gray/40 ${
                    activeTab === 'professional' ? 'text-brand-black/20' : 'text-brand-gold/30'
                  }`}>
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">{step.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          {activeTab === 'professional' ? (
            <a href="/sign-up" className="btn-dark">
              Post My Availability →
            </a>
          ) : (
            <a href="/talent" className="btn-primary">
              Browse Talent →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
