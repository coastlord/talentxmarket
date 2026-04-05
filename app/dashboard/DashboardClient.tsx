'use client';

import { useState } from 'react';
import { UserButton, useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

interface DashboardClientProps {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
}

const specialisms = [
  'AML / Anti-Money Laundering',
  'KYC / Customer Due Diligence',
  'MLRO',
  'Financial Crime',
  'Sanctions & Screening',
  'Regulatory Compliance',
  'Risk Management',
  'Trust & Safety',
  'Fraud Prevention',
  'Data Privacy / GDPR',
  'Compliance Advisory',
  'Internal Audit',
];

const experienceLevels = ['1–3 years', '3–5 years', '5–8 years', '8–12 years', '12+ years'];

const locationOptions = [
  'London, UK', 'Dubai, UAE', 'Singapore', 'New York, USA',
  'Hong Kong', 'Kuala Lumpur, Malaysia', 'Frankfurt, Germany',
  'Amsterdam, Netherlands', 'Zurich, Switzerland', 'Remote', 'Open to Relocation',
];

const certOptions = ['CAMS', 'CKYC', 'CFE', 'ICA', 'ACAMS', 'CRCM', 'CGSS', 'CFCS'];

type View = 'profile' | 'edit';

export default function DashboardClient({ firstName, lastName, email, imageUrl }: DashboardClientProps) {
  const { signOut } = useClerk();
  const [view, setView] = useState<View>('profile');
  const [isVisible, setIsVisible] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    title: '',
    experience: '',
    location: '',
    specialisms: [] as string[],
    certifications: [] as string[],
    salaryAmount: '',
    salaryCurrency: 'GBP',
    salaryPeriod: 'Year',
    workPreference: 'Both',
    bio: '',
    currentCompany: '',
    previousCompany: '',
    education: '',
  });

  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Your Name';
  const initials = [firstName?.[0], lastName?.[0]].filter(Boolean).join('').toUpperCase() || 'TX';

  const handleSpecialismToggle = (s: string) => {
    setProfile(p => ({
      ...p,
      specialisms: p.specialisms.includes(s) ? p.specialisms.filter(x => x !== s) : [...p.specialisms, s],
    }));
  };

  const handleCertToggle = (c: string) => {
    setProfile(p => ({
      ...p,
      certifications: p.certifications.includes(c) ? p.certifications.filter(x => x !== c) : [...p.certifications, c],
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/candidate/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profile, isVisible }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('Profile save failed:', err);
      }
    } catch (err) {
      console.error('Profile save error:', err);
    } finally {
      setIsSaving(false);
      setSaved(true);
      setView('profile');
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const profileComplete = [
    profile.title, profile.experience, profile.location,
    profile.specialisms.length > 0, profile.bio,
  ].filter(Boolean).length;
  const completePct = Math.round((profileComplete / 5) * 100);

  return (
    <div className="min-h-screen bg-[#F5F5F5]" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── TOP NAV ── */}
      <nav className="bg-[#0A0A0A] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo-light.png" alt="TalentX" width={120} height={36} className="h-7 w-auto object-contain" priority />
          </Link>
          <div className="flex items-center gap-6">
            <button onClick={() => setView('profile')} className={`text-sm font-medium transition-colors ${view === 'profile' ? 'text-[#C9A84C]' : 'text-white/60 hover:text-white'}`}>
              Dashboard
            </button>
            <Link href="/talent" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
              Talent Board
            </Link>
            <button
              onClick={() => signOut({ redirectUrl: '/' })}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              Sign Out
            </button>
            <UserButton afterSignOutUrl="/" appearance={{ variables: { colorPrimary: '#C9A84C' }, elements: { avatarBox: 'w-8 h-8' } }} />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* ── PROFILE VIEW ── */}
        {view === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left column — profile card */}
            <div className="lg:col-span-1 space-y-4">

              {/* Identity card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                {/* Avatar */}
                <div className="flex flex-col items-center text-center mb-5">
                  <div className="relative mb-3">
                    {imageUrl ? (
                      <Image src={imageUrl} alt={fullName} width={88} height={88} className="w-22 h-22 rounded-xl object-cover" />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-[#0A0A0A] flex items-center justify-center">
                        <span className="text-[#C9A84C] text-2xl font-bold">{initials}</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-[#0A0A0A]">{fullName}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{profile.title || 'Compliance Professional'}</p>
                  {profile.location && (
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs text-gray-400">{profile.location}</span>
                    </div>
                  )}
                </div>

                {/* Certifications */}
                {profile.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                    {profile.certifications.map(c => (
                      <span key={c} className="text-xs px-2.5 py-1 bg-[#C9A84C]/10 text-[#0A0A0A] border border-[#C9A84C]/30 rounded-full font-semibold">
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                {/* Visibility toggle */}
                <div className="border border-gray-100 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#0A0A0A]">Visibility</p>
                    <p className={`text-xs mt-0.5 font-medium ${isVisible ? 'text-green-600' : 'text-gray-400'}`}>
                      {isVisible ? 'Open to Opportunities' : 'Not Visible'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsVisible(!isVisible)}
                    className={`relative w-11 h-6 rounded-full transition-all duration-300 ${isVisible ? 'bg-[#C9A84C]' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${isVisible ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              </div>

              {/* Profile completeness */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-wide">Profile Completeness</p>
                  <span className="text-sm font-bold text-[#C9A84C]">{completePct}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C9A84C] rounded-full transition-all duration-500" style={{ width: `${completePct}%` }} />
                </div>
                {completePct < 100 && (
                  <button onClick={() => setView('edit')} className="text-xs text-[#C9A84C] mt-2 font-medium hover:underline">
                    Complete your profile →
                  </button>
                )}
              </div>

              {/* Salary */}
              {profile.salaryAmount && (
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Salary Expectation</p>
                  <p className="text-base font-bold text-[#0A0A0A]">
                    {profile.salaryCurrency} {Number(profile.salaryAmount).toLocaleString()}
                    <span className="text-sm font-normal text-gray-400"> / {profile.salaryPeriod}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Right column — profile details */}
            <div className="lg:col-span-2 space-y-4">

              {/* Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide">Summary</h3>
                  <button onClick={() => setView('edit')} className="text-xs text-[#C9A84C] font-medium hover:underline">Edit</button>
                </div>
                {profile.bio ? (
                  <p className="text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
                ) : (
                  <div className="border border-dashed border-gray-200 rounded-xl p-5 text-center">
                    <p className="text-sm text-gray-400 mb-3">Add a professional summary to stand out to employers.</p>
                    <button onClick={() => setView('edit')} className="px-4 py-2 bg-[#0A0A0A] text-white text-xs font-semibold rounded-lg hover:bg-[#1a1a1a] transition-colors">
                      Add Summary
                    </button>
                  </div>
                )}
              </div>

              {/* Experience */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide">Experience</h3>
                  <button onClick={() => setView('edit')} className="text-xs text-[#C9A84C] font-medium hover:underline">Edit</button>
                </div>
                {profile.currentCompany || profile.previousCompany ? (
                  <div className="space-y-4">
                    {profile.currentCompany && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0A0A0A]">{profile.title || 'Compliance Professional'}</p>
                          <p className="text-xs text-gray-500">{profile.currentCompany} · Present</p>
                        </div>
                      </div>
                    )}
                    {profile.previousCompany && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0A0A0A]">Previous Role</p>
                          <p className="text-xs text-gray-500">{profile.previousCompany}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border border-dashed border-gray-200 rounded-xl p-5 text-center">
                    <p className="text-sm text-gray-400 mb-3">Add your work experience.</p>
                    <button onClick={() => setView('edit')} className="px-4 py-2 bg-[#0A0A0A] text-white text-xs font-semibold rounded-lg hover:bg-[#1a1a1a] transition-colors">
                      Add Experience
                    </button>
                  </div>
                )}
              </div>

              {/* Skills & Specialisms */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide">Skills &amp; Certifications</h3>
                  <button onClick={() => setView('edit')} className="text-xs text-[#C9A84C] font-medium hover:underline">Edit</button>
                </div>
                {profile.specialisms.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.specialisms.map(s => (
                      <span key={s} className="text-xs px-3 py-1.5 bg-[#F5F5F5] text-[#0A0A0A] rounded-full font-medium border border-gray-100">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-gray-200 rounded-xl p-5 text-center">
                    <p className="text-sm text-gray-400 mb-3">Add your compliance specialisms.</p>
                    <button onClick={() => setView('edit')} className="px-4 py-2 bg-[#0A0A0A] text-white text-xs font-semibold rounded-lg hover:bg-[#1a1a1a] transition-colors">
                      Add Skills
                    </button>
                  </div>
                )}
              </div>

              {/* Education + Resume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide">Education</h3>
                    <button onClick={() => setView('edit')} className="text-xs text-[#C9A84C] font-medium hover:underline">Edit</button>
                  </div>
                  {profile.education ? (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                        </svg>
                      </div>
                      <p className="text-sm text-[#0A0A0A]">{profile.education}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">Not added yet</p>
                  )}
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-[#0A0A0A] uppercase tracking-wide mb-4">Resume</h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    Your CV is private. Only shared with employers after you approve.
                  </p>
                  <button className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-200 rounded-lg hover:border-[#C9A84C] transition-colors group">
                    <span className="text-xs font-medium text-[#0A0A0A] group-hover:text-[#C9A84C]">View / Upload CV</span>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Edit Profile CTA */}
              <button
                onClick={() => setView('edit')}
                className="w-full py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white font-semibold rounded-xl transition-colors duration-200 text-sm"
              >
                Edit Profile
              </button>

              {/* Confidential footer */}
              <p className="text-center text-xs text-gray-400 pb-2">
                Confidential &amp; Secure · Managed by TalentX Market
              </p>
            </div>
          </div>
        )}

        {/* ── EDIT VIEW ── */}
        {view === 'edit' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#0A0A0A]">Edit Profile</h2>
                <p className="text-sm text-gray-500 mt-0.5">This information powers your candidate card.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setView('profile')} className="px-5 py-2.5 border border-gray-200 text-sm font-medium rounded-xl hover:border-gray-300 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={isSaving}
                  className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${saved ? 'bg-green-500 text-white' : 'bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white'} disabled:opacity-60`}>
                  {isSaving ? 'Saving…' : saved ? '✓ Saved' : 'Save Profile'}
                </button>
              </div>
            </div>

            <div className="space-y-5">

              {/* Role + Experience */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">Role Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Job Title <span className="text-[#C9A84C]">*</span></label>
                    <input type="text" placeholder="e.g. Senior MLRO" value={profile.title}
                      onChange={e => setProfile({ ...profile, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Years of Experience <span className="text-[#C9A84C]">*</span></label>
                    <select value={profile.experience} onChange={e => setProfile({ ...profile, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]">
                      <option value="">Select</option>
                      {experienceLevels.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Current / Most Recent Company</label>
                    <input type="text" placeholder="e.g. HSBC, Revolut" value={profile.currentCompany}
                      onChange={e => setProfile({ ...profile, currentCompany: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Previous Company</label>
                    <input type="text" placeholder="Optional" value={profile.previousCompany}
                      onChange={e => setProfile({ ...profile, previousCompany: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]" />
                  </div>
                </div>
              </div>

              {/* Location + Preference */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">Location &amp; Availability</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Location</label>
                    <select value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]">
                      <option value="">Select location</option>
                      {locationOptions.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Work Preference</label>
                    <div className="flex gap-2">
                      {['On-site', 'Remote', 'Both'].map(p => (
                        <button key={p} onClick={() => setProfile({ ...profile, workPreference: p })}
                          className={`flex-1 py-2.5 text-xs font-semibold rounded-lg border transition-all ${profile.workPreference === p ? 'bg-[#0A0A0A] border-[#0A0A0A] text-white' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialisms */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-1">Specialisms</h3>
                <p className="text-xs text-gray-400 mb-4">Select up to 5 areas of expertise</p>
                <div className="flex flex-wrap gap-2">
                  {specialisms.map(s => (
                    <button key={s} onClick={() => handleSpecialismToggle(s)}
                      disabled={!profile.specialisms.includes(s) && profile.specialisms.length >= 5}
                      className={`px-3.5 py-2 text-xs font-medium rounded-full border transition-all ${profile.specialisms.includes(s) ? 'bg-[#0A0A0A] border-[#0A0A0A] text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">Professional Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {certOptions.map(c => (
                    <button key={c} onClick={() => handleCertToggle(c)}
                      className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${profile.certifications.includes(c) ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0A0A0A]' : 'border-gray-200 text-gray-600 hover:border-[#C9A84C]'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">Salary Expectation</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Currency</label>
                    <select value={profile.salaryCurrency} onChange={e => setProfile({ ...profile, salaryCurrency: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]">
                      <option value="GBP">GBP £</option>
                      <option value="USD">USD $</option>
                      <option value="EUR">EUR €</option>
                      <option value="AED">AED د.إ</option>
                      <option value="SGD">SGD S$</option>
                      <option value="MYR">MYR RM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Amount</label>
                    <input type="number" placeholder="e.g. 120000" value={profile.salaryAmount}
                      onChange={e => setProfile({ ...profile, salaryAmount: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Period</label>
                    <select value={profile.salaryPeriod} onChange={e => setProfile({ ...profile, salaryPeriod: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C]">
                      <option value="Year">Per Year</option>
                      <option value="Month">Per Month</option>
                      <option value="Day">Per Day</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-4">Education</h3>
                <input type="text" placeholder="e.g. B.Sc. Finance, University of London"
                  value={profile.education} onChange={e => setProfile({ ...profile, education: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]" />
              </div>

              {/* Bio */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-1">Professional Summary</h3>
                <p className="text-xs text-gray-400 mb-4">Max 300 characters. Visible on your expanded profile.</p>
                <textarea rows={4} maxLength={300} placeholder="Brief overview of your compliance expertise…"
                  value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3.5 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] resize-none" />
                <p className="text-right text-xs text-gray-400 mt-1">{profile.bio.length}/300</p>
              </div>

              <div className="flex justify-end pb-6 gap-3">
                <button onClick={() => setView('profile')} className="px-5 py-3 border border-gray-200 text-sm font-medium rounded-xl hover:border-gray-300 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={isSaving}
                  className={`px-8 py-3 text-sm font-semibold rounded-xl transition-all ${saved ? 'bg-green-500 text-white' : 'bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white'} disabled:opacity-60`}>
                  {isSaving ? 'Saving…' : saved ? '✓ Saved' : 'Save Profile'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
