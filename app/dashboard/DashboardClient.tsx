'use client';

import { useState, useEffect, useRef } from 'react';
import { UserButton, useClerk, useUser } from '@clerk/nextjs';
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

const currentYear = new Date().getFullYear();
const graduationYears = Array.from({ length: currentYear - 1974 }, (_, i) => String(currentYear - i));
const workStartYears = Array.from({ length: currentYear - 1989 }, (_, i) => String(currentYear - i));

type View = 'profile' | 'edit';

export default function DashboardClient({ firstName, lastName, email, imageUrl }: DashboardClientProps) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const isAdmin = user?.emailAddresses[0]?.emailAddress === 'soa.tidjani@gmail.com';

  const [view, setView] = useState<View>('profile');
  const [isVisible, setIsVisible] = useState(true);
  const [isVisibilityUpdating, setIsVisibilityUpdating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use live Clerk imageUrl (updates after upload)
  const liveImageUrl = user?.imageUrl || imageUrl;

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
    // Experience – current
    currentCompany: '',
    currentStartYear: '',
    // Experience – previous
    previousRole: '',
    previousCompany: '',
    previousStartYear: '',
    previousEndYear: '',
    // Education
    degreeType: '',
    school: '',
    graduationYear: '',
    // Contact
    phone: '',
    linkedinUrl: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/candidate/profile');
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setProfile({
              title:            data.job_title          || '',
              experience:       data.years_experience   || '',
              location:         data.location           || '',
              specialisms:      data.specialisms         || [],
              certifications:   data.certifications      || [],
              salaryAmount:     data.salary_amount       || '',
              salaryCurrency:   data.salary_currency     || 'GBP',
              salaryPeriod:     data.salary_period       || 'Year',
              workPreference:   data.work_preference     || 'Both',
              bio:              data.bio                 || '',
              currentCompany:   data.current_company     || '',
              currentStartYear: data.current_start_year  || '',
              previousRole:     data.previous_role       || '',
              previousCompany:  data.previous_company    || '',
              previousStartYear:data.previous_start_year || '',
              previousEndYear:  data.previous_end_year   || '',
              degreeType:       data.degree_type         || '',
              school:           data.school_name         || '',
              graduationYear:   data.graduation_year     || '',
              phone:            data.phone_number        || '',
              linkedinUrl:      data.linkedin_url        || '',
            });
            setIsVisible(data.is_visible ?? true);
          }
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Your Name';
  const initials = [firstName?.[0], lastName?.[0]].filter(Boolean).join('').toUpperCase() || 'TX';

  const handleSpecialismToggle = (s: string) => {
    setProfile(p => ({
      ...p,
      specialisms: p.specialisms.includes(s)
        ? p.specialisms.filter(x => x !== s)
        : [...p.specialisms, s],
    }));
  };

  const handleCertToggle = (c: string) => {
    setProfile(p => ({
      ...p,
      certifications: p.certifications.includes(c)
        ? p.certifications.filter(x => x !== c)
        : [...p.certifications, c],
    }));
  };

  const handleVisibilityToggle = async () => {
    const newValue = !isVisible;
    setIsVisible(newValue);
    setIsVisibilityUpdating(true);
    try {
      const res = await fetch('/api/candidate/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: newValue }),
      });
      if (!res.ok) setIsVisible(!newValue);
    } catch {
      setIsVisible(!newValue);
    } finally {
      setIsVisibilityUpdating(false);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5 MB.');
      return;
    }
    setIsUploadingPhoto(true);
    try {
      await user.setProfileImage({ file });
      await new Promise(r => setTimeout(r, 1200));
      window.location.reload();
    } catch (err) {
      console.error('Photo upload failed:', err);
      alert('Failed to upload photo. Please try again.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');
    try {
      const res = await fetch('/api/candidate/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profile, isVisible }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveError(data?.error || 'Save failed. Please try again.');
        return;
      }
      setSaved(true);
      setView('profile');
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Profile save error:', err);
      setSaveError('Network error. Please check your connection.');
    } finally {
      setIsSaving(false);
    }
  };

  const profileComplete = [
    profile.title, profile.experience, profile.location,
    profile.specialisms.length > 0, profile.bio,
  ].filter(Boolean).length;
  const completePct = Math.round((profileComplete / 5) * 100);

  const linkedinHref = profile.linkedinUrl
    ? (profile.linkedinUrl.startsWith('http') ? profile.linkedinUrl : `https://${profile.linkedinUrl}`)
    : null;

  const hasCurrentExp = profile.currentCompany || profile.title;
  const hasPreviousExp = profile.previousCompany || profile.previousRole;
  const hasEducation = profile.degreeType || profile.school;

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500 font-medium">Loading your profile…</p>
        </div>
      </div>
    );
  }

  // ── Shared file input (used in both views) ────────────────────────────────────
  const photoInput = (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/jpeg,image/png,image/webp"
      className="hidden"
      onChange={handlePhotoChange}
    />
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {photoInput}

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
            <button onClick={() => signOut({ redirectUrl: '/' })} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
              Sign Out
            </button>
            <UserButton afterSignOutUrl="/" appearance={{ variables: { colorPrimary: '#C9A84C' }, elements: { avatarBox: 'w-8 h-8' } }}>
              {isAdmin && (
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Admin Panel"
                    labelIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    }
                    href="/admin"
                  />
                </UserButton.MenuItems>
              )}
            </UserButton>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* ════════════════════════════════════════════════════
            PROFILE VIEW
        ════════════════════════════════════════════════════ */}
        {view === 'profile' && (
          <div>
            {/* Demand signal banner */}
            <div className="bg-[#0A0A0A] rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                  <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">Live Demand</span>
                </div>
                <p className="text-white text-sm font-semibold leading-snug">
                  14 employers visited TalentX this month — actively hiring compliance professionals.
                </p>
                <p className="text-white/50 text-xs mt-1">Complete your profile to appear in employer searches.</p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                <div className="flex gap-2">
                  {[{ label: 'AML / FinCrime', hot: true }, { label: 'MLRO', hot: true }, { label: 'KYC', hot: false }].map(role => (
                    <span key={role.label} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${role.hot ? 'bg-[#C9A84C] text-[#0A0A0A]' : 'bg-white/10 text-white/60'}`}>
                      {role.hot ? '🔥 ' : ''}{role.label}
                    </span>
                  ))}
                </div>
                <p className="text-white/40 text-[10px]">Roles in demand right now</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* ── LEFT COLUMN ── */}
              <div className="lg:col-span-1 space-y-4">

                {/* Identity + Photo Card */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  {/* Gold top strip */}
                  <div className="h-1.5 bg-gradient-to-r from-[#C9A84C] to-[#e8c96a]" />
                  <div className="p-6">
                    {/* Avatar */}
                    <div className="flex flex-col items-center text-center mb-5">
                      <div className="relative mb-4 group">
                        {liveImageUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={liveImageUrl}
                            alt={fullName}
                            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-[#C9A84C]/20"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-2xl bg-[#0A0A0A] flex items-center justify-center">
                            <span className="text-[#C9A84C] text-3xl font-bold">{initials}</span>
                          </div>
                        )}
                        {/* Hover overlay to change photo */}
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploadingPhoto}
                          className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer"
                        >
                          {isUploadingPhoto ? (
                            <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                          ) : (
                            <>
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="text-white text-[10px] font-semibold">Change</span>
                            </>
                          )}
                        </button>
                      </div>
                      <h2 className="text-lg font-bold text-[#0A0A0A] leading-tight">{fullName}</h2>
                      <p className="text-sm text-[#C9A84C] font-medium mt-0.5">{profile.title || 'Compliance Professional'}</p>
                      {profile.location && (
                        <div className="flex items-center gap-1 mt-1.5">
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-xs text-gray-400">{profile.location}</span>
                        </div>
                      )}
                      {profile.experience && (
                        <span className="mt-2 text-xs bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full font-medium">
                          {profile.experience}
                        </span>
                      )}
                    </div>

                    {/* Certifications */}
                    {profile.certifications.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                        {profile.certifications.map(c => (
                          <span key={c} className="text-[11px] px-2.5 py-1 bg-[#C9A84C]/10 text-[#8a6d25] border border-[#C9A84C]/30 rounded-full font-bold tracking-wide">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Visibility toggle */}
                    <div className="border border-gray-100 rounded-xl p-3 flex items-center justify-between bg-gray-50/50">
                      <div>
                        <p className="text-xs font-semibold text-[#0A0A0A]">Visibility</p>
                        <p className={`text-xs mt-0.5 font-medium ${isVisible ? 'text-green-600' : 'text-gray-400'}`}>
                          {isVisible ? '● Open to Opportunities' : '○ Not Visible'}
                        </p>
                      </div>
                      <button
                        onClick={handleVisibilityToggle}
                        disabled={isVisibilityUpdating}
                        className={`relative w-11 h-6 rounded-full transition-all duration-300 ${isVisible ? 'bg-[#C9A84C]' : 'bg-gray-200'} ${isVisibilityUpdating ? 'opacity-60 cursor-not-allowed' : ''}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${isVisible ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest">Contact</p>
                    <button onClick={() => setView('edit')} className="text-xs text-[#C9A84C] font-medium hover:underline">Edit</button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Email</p>
                        <p className="text-xs text-[#0A0A0A] font-medium truncate">{email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Phone</p>
                        {profile.phone
                          ? <p className="text-xs text-[#0A0A0A] font-medium">{profile.phone}</p>
                          : <button onClick={() => setView('edit')} className="text-xs text-gray-400 hover:text-[#C9A84C]">Add phone →</button>
                        }
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#0077B5]/10 border border-[#0077B5]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">LinkedIn</p>
                        {linkedinHref
                          ? <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className="text-xs text-[#0077B5] font-medium hover:underline">View Profile →</a>
                          : <button onClick={() => setView('edit')} className="text-xs text-gray-400 hover:text-[#C9A84C]">Add LinkedIn →</button>
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Strength */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest">Profile Strength</p>
                    <span className="text-sm font-bold text-[#C9A84C]">{completePct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#C9A84C] to-[#e8c96a] rounded-full transition-all duration-500" style={{ width: `${completePct}%` }} />
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
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Salary Expectation</p>
                    <p className="text-xl font-bold text-[#0A0A0A]">
                      {profile.salaryCurrency} {Number(profile.salaryAmount).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">per {profile.salaryPeriod.toLowerCase()}</p>
                  </div>
                )}
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div className="lg:col-span-2 space-y-4">

                {/* Professional Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest">Professional Summary</h3>
                    <button onClick={() => setView('edit')} className="text-xs text-[#C9A84C] font-medium hover:underline">Edit</button>
                  </div>
                  {profile.bio ? (
                    <p className="text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
                  ) : (
                    <div className="border border-dashed border-gray-200 rounded-xl p-5 text-center">
                      <p className="text-sm text-gray-400 mb-3">Add a professional summary to stand out to employers.</p>
                      <button onClick={() => setView('edit')} className="px-4 py-2 bg-[#0A0A0A] text-white text-xs font-semibold rounded-lg hover:bg-[#1a1a1a] transition-colors">Add Summary</button>
                    </div>
                  )}
                </div>

                {/* Experience — CV style */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest">Experience</h3>
                    <button onClick={() => setView('edit')} className="text-xs text-[#C9A84C] font-medium hover:underline">Edit</button>
                  </div>
                  {hasCurrentExp || hasPreviousExp ? (
                    <div className="space-y-5">
                      {hasCurrentExp && (
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-9 h-9 rounded-xl bg-[#0A0A0A] flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            {hasPreviousExp && <div className="w-px flex-1 bg-gray-100 mt-2" />}
                          </div>
                          <div className="flex-1 pb-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-bold text-[#0A0A0A] leading-tight">{profile.title || 'Compliance Professional'}</p>
                                <p className="text-sm text-gray-600 mt-0.5 font-medium">{profile.currentCompany}</p>
                              </div>
                              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-100 whitespace-nowrap">Current</span>
                                <span className="text-xs text-gray-400 whitespace-nowrap">
                                  {profile.currentStartYear ? `${profile.currentStartYear} – Present` : 'Present'}
                                </span>
                              </div>
                            </div>
                            {profile.experience && (
                              <p className="text-xs text-gray-400 mt-1">{profile.experience} in compliance</p>
                            )}
                          </div>
                        </div>
                      )}

                      {hasPreviousExp && (
                        <div className="flex gap-4">
                          <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-bold text-[#0A0A0A] leading-tight">{profile.previousRole || 'Previous Role'}</p>
                                <p className="text-sm text-gray-600 mt-0.5 font-medium">{profile.previousCompany}</p>
                              </div>
                              {(profile.previousStartYear || profile.previousEndYear) && (
                                <span className="text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">
                                  {[profile.previousStartYear, profile.previousEndYear].filter(Boolean).join(' – ')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-200 rounded-xl p-5 text-center">
                      <p className="text-sm text-gray-400 mb-3">Add your work history so employers understand your background.</p>
                      <button onClick={() => setView('edit')} className="px-4 py-2 bg-[#0A0A0A] text-white text-xs font-semibold rounded-lg hover:bg-[#1a1a1a] transition-colors">Add Experience</button>
                    </div>
                  )}
                </div>

                {/* Education — CV style */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest">Education</h3>
                    <button onClick={() => setView('edit')} className="text-xs text-[#C9A84C] font-medium hover:underline">Edit</button>
                  </div>
                  {hasEducation ? (
                    <div className="flex gap-4">
                      <div className="w-9 h-9 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      </div>
                      <div>
                        {profile.degreeType && (
                          <p className="text-sm font-bold text-[#0A0A0A] leading-tight">{profile.degreeType}</p>
                        )}
                        {profile.school && (
                          <p className="text-sm text-gray-600 mt-0.5 font-medium">{profile.school}</p>
                        )}
                        {profile.graduationYear && (
                          <p className="text-xs text-gray-400 mt-1">Graduated {profile.graduationYear}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-200 rounded-xl p-5 text-center">
                      <p className="text-sm text-gray-400 mb-3">Add your academic background.</p>
                      <button onClick={() => setView('edit')} className="px-4 py-2 bg-[#0A0A0A] text-white text-xs font-semibold rounded-lg hover:bg-[#1a1a1a] transition-colors">Add Education</button>
                    </div>
                  )}
                </div>

                {/* Skills & Specialisms */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest">Skills &amp; Specialisms</h3>
                    <button onClick={() => setView('edit')} className="text-xs text-[#C9A84C] font-medium hover:underline">Edit</button>
                  </div>
                  {profile.specialisms.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.specialisms.map(s => (
                        <span key={s} className="text-xs px-3 py-1.5 bg-[#F5F5F5] text-[#0A0A0A] rounded-full font-medium border border-gray-100 hover:border-[#C9A84C]/30 transition-colors">
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-200 rounded-xl p-5 text-center">
                      <p className="text-sm text-gray-400 mb-3">Add your compliance specialisms.</p>
                      <button onClick={() => setView('edit')} className="px-4 py-2 bg-[#0A0A0A] text-white text-xs font-semibold rounded-lg hover:bg-[#1a1a1a] transition-colors">Add Skills</button>
                    </div>
                  )}
                </div>

                {/* Edit CTA */}
                <button
                  onClick={() => setView('edit')}
                  className="w-full py-3.5 bg-[#0A0A0A] hover:bg-[#C9A84C] hover:text-[#0A0A0A] text-white font-semibold rounded-xl transition-all duration-200 text-sm"
                >
                  Edit Profile
                </button>
                <p className="text-center text-xs text-gray-400 pb-2">
                  Confidential &amp; Secure · Managed by TalentX Market
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════
            EDIT VIEW
        ════════════════════════════════════════════════════ */}
        {view === 'edit' && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#0A0A0A]">Edit Profile</h2>
                <p className="text-sm text-gray-500 mt-0.5">This information powers your candidate profile.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setView('profile')} className="px-5 py-2.5 border border-gray-200 text-sm font-medium rounded-xl hover:border-gray-300 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={isSaving}
                  className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${saved ? 'bg-green-500 text-white' : 'bg-[#0A0A0A] hover:bg-[#C9A84C] hover:text-[#0A0A0A] text-white'} disabled:opacity-60`}>
                  {isSaving ? 'Saving…' : saved ? '✓ Saved' : 'Save Profile'}
                </button>
              </div>
            </div>
            {saveError && <p className="text-red-500 text-sm mb-4 text-right">{saveError}</p>}

            <div className="space-y-5">

              {/* ── Profile Photo ── */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-4">Profile Photo</h3>
                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0">
                    {liveImageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={liveImageUrl} alt={fullName} className="w-16 h-16 rounded-xl object-cover ring-2 ring-[#C9A84C]/20" />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-[#0A0A0A] flex items-center justify-center">
                        <span className="text-[#C9A84C] text-xl font-bold">{initials}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0A0A0A] mb-0.5">
                      {liveImageUrl ? 'Change your profile picture' : 'Add a profile picture'}
                    </p>
                    <p className="text-xs text-gray-400 mb-3">JPG, PNG or WebP · Max 5 MB · Square images work best</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingPhoto}
                      className="px-4 py-2 border border-gray-200 text-xs font-semibold rounded-lg hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors disabled:opacity-60 flex items-center gap-2"
                    >
                      {isUploadingPhoto ? (
                        <><svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Uploading…</>
                      ) : liveImageUrl ? 'Change Photo' : 'Upload Photo'}
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Contact Details ── */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-1">Contact Details</h3>
                <p className="text-xs text-gray-400 mb-4">Shared with employers only after they unlock your profile.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Email Address</label>
                    <input type="email" value={email} readOnly
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-100 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed" />
                    <p className="text-xs text-gray-400 mt-1">Managed by your account</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Phone Number</label>
                    <input type="tel" placeholder="+44 7700 900000" value={profile.phone}
                      onChange={e => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">LinkedIn Profile URL</label>
                    <input type="url" placeholder="https://linkedin.com/in/your-name" value={profile.linkedinUrl}
                      onChange={e => setProfile({ ...profile, linkedinUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]" />
                  </div>
                </div>
              </div>

              {/* ── Role & Experience ── */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-1">Role &amp; Seniority</h3>
                <p className="text-xs text-gray-400 mb-4">Your current job title and total years in compliance.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Job Title <span className="text-[#C9A84C]">*</span></label>
                    <input type="text" placeholder="e.g. Senior MLRO" value={profile.title}
                      onChange={e => setProfile({ ...profile, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Total Years of Experience <span className="text-[#C9A84C]">*</span></label>
                    <select value={profile.experience} onChange={e => setProfile({ ...profile, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]">
                      <option value="">Select</option>
                      {experienceLevels.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Current Position ── */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-1">Current Position</h3>
                <p className="text-xs text-gray-400 mb-4">Your most recent or current employer.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Company Name</label>
                    <input type="text" placeholder="e.g. HSBC, Revolut, Barclays" value={profile.currentCompany}
                      onChange={e => setProfile({ ...profile, currentCompany: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Year Started</label>
                    <select value={profile.currentStartYear} onChange={e => setProfile({ ...profile, currentStartYear: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]">
                      <option value="">Select year</option>
                      {workStartYears.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Previous Position ── */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-1">Previous Position</h3>
                <p className="text-xs text-gray-400 mb-4">Optional — adds depth to your compliance track record.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Role / Job Title</label>
                    <input type="text" placeholder="e.g. AML Compliance Officer" value={profile.previousRole}
                      onChange={e => setProfile({ ...profile, previousRole: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Company Name</label>
                    <input type="text" placeholder="e.g. Standard Chartered" value={profile.previousCompany}
                      onChange={e => setProfile({ ...profile, previousCompany: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Year Started</label>
                    <select value={profile.previousStartYear} onChange={e => setProfile({ ...profile, previousStartYear: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]">
                      <option value="">Select year</option>
                      {workStartYears.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Year Ended</label>
                    <select value={profile.previousEndYear} onChange={e => setProfile({ ...profile, previousEndYear: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]">
                      <option value="">Select year</option>
                      {workStartYears.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Education ── */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-1">Education</h3>
                <p className="text-xs text-gray-400 mb-4">Your highest qualification or most relevant academic achievement.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Degree Type</label>
                    <input type="text" placeholder="e.g. M.Sc., MBA, LLB, PhD" value={profile.degreeType}
                      onChange={e => setProfile({ ...profile, degreeType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]" />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Course / Subject</label>
                    <input type="text" placeholder="e.g. Financial Crime Prevention" value={profile.school}
                      onChange={e => setProfile({ ...profile, school: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]" />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Year of Graduation</label>
                    <select value={profile.graduationYear} onChange={e => setProfile({ ...profile, graduationYear: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]">
                      <option value="">Select year</option>
                      {graduationYears.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Location & Availability ── */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-4">Location &amp; Availability</h3>
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

              {/* ── Specialisms ── */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-1">Specialisms</h3>
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

              {/* ── Certifications ── */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-4">Professional Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {certOptions.map(c => (
                    <button key={c} onClick={() => handleCertToggle(c)}
                      className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${profile.certifications.includes(c) ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0A0A0A]' : 'border-gray-200 text-gray-600 hover:border-[#C9A84C]'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Salary ── */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-4">Salary Expectation</h3>
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
                    <input type="number" placeholder="120000" value={profile.salaryAmount}
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

              {/* ── Professional Summary ── */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-widest mb-1">Professional Summary</h3>
                <p className="text-xs text-gray-400 mb-4">Up to 600 characters. Visible on your expanded profile.</p>
                <textarea rows={5} maxLength={600}
                  placeholder="Briefly describe your compliance background, key strengths, and what you bring to a potential employer…"
                  value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3.5 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] resize-none leading-relaxed"
                />
                <p className="text-right text-xs text-gray-400 mt-1">{profile.bio.length}/600</p>
              </div>

              {/* ── Save ── */}
              <div className="flex justify-end pb-6 gap-3">
                <button onClick={() => setView('profile')} className="px-5 py-3 border border-gray-200 text-sm font-medium rounded-xl hover:border-gray-300 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={isSaving}
                  className="px-8 py-3 bg-[#0A0A0A] text-white text-sm font-bold rounded-xl hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-200 disabled:opacity-50 flex items-center gap-2">
                  {isSaving ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Saving…</>
                  ) : saved ? '✓ Saved' : 'Save Profile'}
                </button>
              </div>
              {saveError && <p className="text-red-500 text-xs text-right pb-4">{saveError}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
