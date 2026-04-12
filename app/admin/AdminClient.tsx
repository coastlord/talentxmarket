'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Employer types ───────────────────────────────────────────────────────────
interface UnlockedCandidate {
  id: string;
  unlocked_at: string;
  candidates: {
    id: string;
    job_title: string;
    location: string;
    years_experience: string;
    specialisms: string[];
    certifications: string[];
  } | null;
}

interface JobRequest {
  role_title: string;
  urgency: string;
  status: string;
  created_at: string;
}

interface Employer {
  id: string;
  email: string;
  company_name: string;
  contact_name: string;
  status: string;
  subscription_status: string;
  unlock_credits: number;
  created_at: string;
  unlocks: UnlockedCandidate[];
  job_requests: JobRequest[];
}

interface Candidate {
  id: string;
  full_name: string;
  email: string;
  job_title: string;
  location: string;
  years_experience: string;
  specialisms: string[];
  certifications: string[];
  bio: string;
  salary_amount: string;
  salary_currency: string;
  salary_period: string;
  work_preference: string;
  availability_status: string;
  is_visible: boolean;
  is_anonymous: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  profile_completion: number;
  created_at: string;
  approved_at: string;
}

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected' | 'suspended';

const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-800 border-amber-200',
  approved:  'bg-green-100 text-green-800 border-green-200',
  rejected:  'bg-red-100 text-red-800 border-red-200',
  suspended: 'bg-gray-100 text-gray-600 border-gray-200',
};

export default function AdminClient() {
  const [activeTab, setActiveTab] = useState<'candidates' | 'employers'>('candidates');

  // ── Candidates state ──
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // ── Employers state ──
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [empError, setEmpError] = useState('');
  const [empSearch, setEmpSearch] = useState('');
  const [empExpanded, setEmpExpanded] = useState<string | null>(null);
  const [empActionLoading, setEmpActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchCandidates();
    fetchEmployers();
  }, []);

  async function fetchCandidates() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/candidates');
      if (res.status === 403) {
        setError('Access denied. Admin only.');
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) setCandidates(data);
      else setError(data.error || 'Failed to load candidates');
    } catch (e) {
      setError('Network error: ' + String(e));
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(candidateId: string, action: string) {
    setActionLoading(candidateId + action);
    try {
      const res = await fetch('/api/admin/candidates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateId, action }),
      });
      if (res.ok) {
        await fetchCandidates();
      }
    } finally {
      setActionLoading(null);
    }
  }

  async function fetchEmployers() {
    setEmpLoading(true);
    try {
      const res = await fetch('/api/admin/employers');
      const data = await res.json();
      if (Array.isArray(data)) setEmployers(data);
      else setEmpError(data.error || 'Failed to load employers');
    } catch (e) {
      setEmpError('Network error: ' + String(e));
    } finally {
      setEmpLoading(false);
    }
  }

  async function handleEmployerAction(employerId: string, action: string, credits?: number) {
    setEmpActionLoading(employerId + action);
    try {
      const res = await fetch('/api/admin/employers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employerId, action, credits }),
      });
      if (res.ok) await fetchEmployers();
    } finally {
      setEmpActionLoading(null);
    }
  }

  const filteredEmployers = employers.filter(e => {
    const q = empSearch.toLowerCase();
    return !q ||
      e.company_name?.toLowerCase().includes(q) ||
      e.email?.toLowerCase().includes(q) ||
      e.contact_name?.toLowerCase().includes(q);
  });

  const empCounts = {
    total: employers.length,
    active: employers.filter(e => e.status === 'active').length,
    pending: employers.filter(e => e.status === 'pending').length,
    unlocks: employers.reduce((sum, e) => sum + (e.unlocks?.length || 0), 0),
  };

  const filtered = candidates.filter(c => {
    const matchStatus = filter === 'all' || c.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      c.full_name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.job_title?.toLowerCase().includes(q) ||
      c.location?.toLowerCase().includes(q) ||
      c.specialisms?.some(s => s.toLowerCase().includes(q));
    return matchStatus && matchSearch;
  });

  const counts = {
    all:       candidates.length,
    pending:   candidates.filter(c => c.status === 'pending').length,
    approved:  candidates.filter(c => c.status === 'approved').length,
    rejected:  candidates.filter(c => c.status === 'rejected').length,
    suspended: candidates.filter(c => c.status === 'suspended').length,
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Nav */}
      <nav className="bg-[#0A0A0A] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/logo-light.png" alt="TalentX" width={110} height={32} className="h-6 w-auto object-contain" />
            </Link>
            <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest border border-[#C9A84C]/30 px-2 py-0.5 rounded">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/talent" className="text-xs text-white/50 hover:text-white transition-colors">Talent Page</Link>
            <Link href="/" className="text-xs text-white/50 hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Header + Tabs */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0A0A0A] mb-1">Admin Panel</h1>
          <p className="text-sm text-gray-500 mb-5">Manage candidates, employers, and unlock activity</p>
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
            {(['candidates', 'employers'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-semibold rounded-lg capitalize transition-all ${
                  activeTab === tab ? 'bg-white text-[#0A0A0A] shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'candidates' ? `Candidates (${candidates.length})` : `Employers (${employers.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* ══ EMPLOYERS TAB ══ */}
        {activeTab === 'employers' && (
          <div>
            {/* Employer stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Total', value: empCounts.total },
                { label: 'Active', value: empCounts.active },
                { label: 'Pending', value: empCounts.pending },
                { label: 'Total Unlocks', value: empCounts.unlocks },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <p className="text-2xl font-bold text-[#0A0A0A]">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <input
                type="text"
                placeholder="Search by company, name, or email…"
                value={empSearch}
                onChange={e => setEmpSearch(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]"
              />
            </div>

            {empError && <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-700">{empError}</div>}
            {empLoading && <div className="flex items-center justify-center py-16"><div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" /></div>}

            {!empLoading && (
              <div className="space-y-3">
                {filteredEmployers.length === 0 && (
                  <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                    <p className="text-gray-400 text-sm">No employer registrations yet.</p>
                  </div>
                )}
                {filteredEmployers.map(emp => {
                  const isExpanded = empExpanded === emp.id;
                  const statusStyle =
                    emp.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' :
                    emp.status === 'pending' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                    'bg-gray-100 text-gray-600 border-gray-200';

                  return (
                    <div key={emp.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                      <div className="p-5 flex items-start gap-4">

                        {/* Avatar */}
                        <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] flex items-center justify-center flex-shrink-0">
                          <span className="text-[#C9A84C] text-sm font-bold">
                            {(emp.company_name || 'TX').slice(0, 2).toUpperCase()}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-sm font-bold text-[#0A0A0A]">{emp.company_name || 'Unknown Company'}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold capitalize ${statusStyle}`}>
                              {emp.status || 'pending'}
                            </span>
                            <span className="text-xs bg-[#C9A84C]/10 text-[#0A0A0A] border border-[#C9A84C]/20 px-2 py-0.5 rounded-full font-semibold">
                              {emp.unlock_credits ?? 0} credits left
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">{emp.contact_name} · {emp.email}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-400">
                            <span>🔓 {emp.unlocks?.length || 0} profiles unlocked</span>
                            <span>📋 {emp.job_requests?.length || 0} role requests</span>
                            <span>🕐 Registered {new Date(emp.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>

                          {/* Interest summary — roles they unlocked */}
                          {emp.unlocks?.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {emp.unlocks.slice(0, 3).map(u => u.candidates && (
                                <span key={u.id} className="text-[10px] bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                                  {u.candidates.job_title || 'Unknown role'}{u.candidates.location ? ` · ${u.candidates.location}` : ''}
                                </span>
                              ))}
                              {emp.unlocks.length > 3 && (
                                <span className="text-[10px] text-gray-400 px-2 py-0.5">+{emp.unlocks.length - 3} more</span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          {emp.status !== 'active' && (
                            <button
                              onClick={() => handleEmployerAction(emp.id, 'approve')}
                              disabled={empActionLoading === emp.id + 'approve'}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                            >
                              {empActionLoading === emp.id + 'approve' ? '…' : '✓ Approve'}
                            </button>
                          )}
                          {emp.status === 'active' && (
                            <button
                              onClick={() => handleEmployerAction(emp.id, 'suspend')}
                              disabled={empActionLoading === emp.id + 'suspend'}
                              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                            >
                              {empActionLoading === emp.id + 'suspend' ? '…' : 'Suspend'}
                            </button>
                          )}
                          <button
                            onClick={() => handleEmployerAction(emp.id, 'add_credits', 5)}
                            disabled={empActionLoading === emp.id + 'add_credits'}
                            className="px-4 py-2 bg-[#C9A84C] hover:bg-[#b8963e] text-[#0A0A0A] text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                          >
                            {empActionLoading === emp.id + 'add_credits' ? '…' : '+5 Credits'}
                          </button>
                          <button
                            onClick={() => setEmpExpanded(isExpanded ? null : emp.id)}
                            className="px-4 py-2 border border-gray-200 hover:border-gray-300 text-gray-500 text-xs font-medium rounded-lg transition-colors"
                          >
                            {isExpanded ? 'Less ↑' : 'Details ↓'}
                          </button>
                        </div>
                      </div>

                      {/* Expanded: full unlock history */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 px-5 py-4 bg-[#FAFAFA]">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                            <div>
                              <p className="font-semibold text-[#0A0A0A] mb-2">Unlocked Profiles ({emp.unlocks?.length || 0})</p>
                              {!emp.unlocks?.length ? (
                                <p className="text-gray-400">No profiles unlocked yet.</p>
                              ) : (
                                <div className="space-y-2">
                                  {emp.unlocks.map(u => (
                                    <div key={u.id} className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                                      <p className="font-semibold text-[#0A0A0A]">{u.candidates?.job_title || 'Unknown role'}</p>
                                      <p className="text-gray-500 mt-0.5">
                                        {u.candidates?.location || '—'}
                                        {u.candidates?.years_experience ? ` · ${u.candidates.years_experience}` : ''}
                                      </p>
                                      {u.candidates?.certifications?.length ? (
                                        <p className="text-[#C9A84C] font-semibold mt-0.5">{u.candidates.certifications.join(', ')}</p>
                                      ) : null}
                                      <p className="text-gray-400 mt-0.5">
                                        Unlocked {new Date(u.unlocked_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-[#0A0A0A] mb-2">Role Requests ({emp.job_requests?.length || 0})</p>
                              {!emp.job_requests?.length ? (
                                <p className="text-gray-400">No role requests submitted.</p>
                              ) : (
                                <div className="space-y-2">
                                  {emp.job_requests.map((jr, i) => (
                                    <div key={i} className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                                      <p className="font-semibold text-[#0A0A0A]">{jr.role_title}</p>
                                      {jr.urgency && <p className="text-gray-500 mt-0.5">Urgency: {jr.urgency}</p>}
                                      <p className="text-gray-400 mt-0.5">
                                        {new Date(jr.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══ CANDIDATES TAB ══ */}
        {activeTab === 'candidates' && <>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {(['all', 'pending', 'approved', 'rejected', 'suspended'] as FilterStatus[]).map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`bg-white rounded-xl p-4 text-left border-2 transition-all ${filter === s ? 'border-[#C9A84C]' : 'border-transparent hover:border-gray-200'}`}>
                <p className="text-2xl font-bold text-[#0A0A0A]">{counts[s]}</p>
                <p className="text-xs text-gray-500 capitalize mt-0.5 font-medium">{s === 'all' ? 'Total' : s}</p>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl p-4 mb-4 flex flex-col sm:flex-row gap-3 shadow-sm">
            <input
              type="text"
              placeholder="Search by name, email, role, location, skill…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]"
            />
            <div className="flex gap-2 flex-wrap">
              {(['all', 'pending', 'approved', 'rejected', 'suspended'] as FilterStatus[]).map(s => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg capitalize transition-all ${
                    filter === s ? 'bg-[#0A0A0A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                  {s === 'all' ? 'All' : s} {s !== 'all' && `(${counts[s]})`}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-700">{error}</div>}
          {loading && <div className="flex items-center justify-center py-16"><div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" /></div>}

          {!loading && !error && (
            <div className="space-y-3">
              {filtered.length === 0 && (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                  <p className="text-gray-400 text-sm">No candidates match this filter.</p>
                </div>
              )}
              {filtered.map(c => {
                const isExpanded = expandedId === c.id;
                const initials = (() => {
                  const parts = (c.full_name || '').trim().split(' ').filter(Boolean);
                  if (parts.length === 0) return 'TX';
                  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
                  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
                })();

                return (
                  <div key={c.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="p-5 flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#C9A84C] text-sm font-bold">{initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold text-[#0A0A0A]">{c.full_name || 'No name'}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold capitalize ${STATUS_STYLES[c.status] || ''}`}>
                            {c.status}
                          </span>
                          {c.profile_completion > 0 && (
                            <span className="text-xs text-gray-400">{c.profile_completion}% complete</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{c.email}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500">
                          {c.job_title && <span>🧑‍💼 {c.job_title}</span>}
                          {c.location && <span>📍 {c.location}</span>}
                          {c.years_experience && <span>⏱ {c.years_experience}</span>}
                          {c.work_preference && <span>🏢 {c.work_preference}</span>}
                        </div>
                        {c.specialisms?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {c.specialisms.slice(0, 4).map(s => (
                              <span key={s} className="text-xs px-2 py-0.5 bg-[#F5F5F5] text-[#0A0A0A] rounded-full border border-gray-200 font-medium">{s}</span>
                            ))}
                            {c.specialisms.length > 4 && (
                              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">+{c.specialisms.length - 4} more</span>
                            )}
                          </div>
                        )}
                        {c.certifications?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {c.certifications.map(cert => (
                              <span key={cert} className="text-xs px-2 py-0.5 bg-[#C9A84C]/10 text-[#0A0A0A] border border-[#C9A84C]/30 rounded-full font-semibold">{cert}</span>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          Signed up {new Date(c.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          {c.approved_at && ` · Approved ${new Date(c.approved_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        {c.status === 'pending' && (
                          <>
                            <button onClick={() => handleAction(c.id, 'approve')}
                              disabled={actionLoading === c.id + 'approve'}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50">
                              {actionLoading === c.id + 'approve' ? '…' : '✓ Approve'}
                            </button>
                            <button onClick={() => handleAction(c.id, 'reject')}
                              disabled={actionLoading === c.id + 'reject'}
                              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50">
                              {actionLoading === c.id + 'reject' ? '…' : '✕ Reject'}
                            </button>
                          </>
                        )}
                        {c.status === 'approved' && (
                          <button onClick={() => handleAction(c.id, 'suspend')}
                            disabled={actionLoading === c.id + 'suspend'}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50">
                            {actionLoading === c.id + 'suspend' ? '…' : 'Suspend'}
                          </button>
                        )}
                        {(c.status === 'rejected' || c.status === 'suspended') && (
                          <button onClick={() => handleAction(c.id, 'restore')}
                            disabled={actionLoading === c.id + 'restore'}
                            className="px-4 py-2 bg-[#C9A84C] hover:bg-[#b8963e] text-[#0A0A0A] text-xs font-semibold rounded-lg transition-colors disabled:opacity-50">
                            {actionLoading === c.id + 'restore' ? '…' : 'Restore'}
                          </button>
                        )}
                        <button onClick={() => setExpandedId(isExpanded ? null : c.id)}
                          className="px-4 py-2 border border-gray-200 hover:border-gray-300 text-gray-500 text-xs font-medium rounded-lg transition-colors">
                          {isExpanded ? 'Less ↑' : 'More ↓'}
                        </button>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="border-t border-gray-100 px-5 py-4 bg-[#FAFAFA]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <p className="font-semibold text-[#0A0A0A] mb-1">Professional Summary</p>
                            <p className="text-gray-600 leading-relaxed">{c.bio || 'Not provided'}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#0A0A0A] mb-1">Salary Expectation</p>
                            <p className="text-gray-600">
                              {c.salary_amount
                                ? `${c.salary_currency} ${Number(c.salary_amount).toLocaleString()} / ${c.salary_period}`
                                : 'Not provided'}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#0A0A0A] mb-1">Visibility</p>
                            <p className="text-gray-600">
                              {c.is_visible ? '🟢 Visible on talent page' : '🔴 Hidden from talent page'}
                              {' · '}
                              {c.is_anonymous ? '🔒 Anonymous' : '👤 Not anonymous'}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#0A0A0A] mb-1">Supabase Record ID</p>
                            <p className="text-gray-400 font-mono text-xs break-all">{c.id}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>}

      </div>
    </div>
  );
}
