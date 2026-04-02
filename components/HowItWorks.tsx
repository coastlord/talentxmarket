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
    title: 'Post Your Vacancy',
    description:
      'Describe the compliance role you need filled — from MLRO and CCO to AML Analyst and Risk Manager. Set your requirements, location, and timeline.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Browse Available Talent',
    description:
      'Access a curated pool of compliance professionals actively looking for their next role. Filter by specialism, experience level, location, and availability.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Connect & Hire',
    description:
      'Reach out directly to candidates. No middlemen, no inflated fees. Build your compliance team with specialists who are genuinely ready to make a move.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
            <a href="#open-to-work" className="btn-dark">
              Post My Availability →
            </a>
          ) : (
            <a href="#hiring" className="btn-primary">
              Post a Vacancy →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
