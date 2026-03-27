'use client';
import { useState } from 'react';
const proSteps = [
  { n: '01', title: 'Create Your Profile', desc: 'Tell us about your compliance specialism — AML, Risk, MLRO, Trust & Safety and more. Highlight your qualifications and the roles you are open to.' },
  { n: '02', title: 'Post Your Availability', desc: 'Set your status to Open to Work and let employers know your preferred role type — contract, permanent, or interim — and your location preferences.' },
  { n: '03', title: 'Get Matched & Hired', desc: 'Employers find you directly. Receive enquiries from verified compliance-hiring organisations and move forward with the right opportunity on your terms.' },
];
const empSteps = [
  { n: '01', title: 'Post Your Vacancy', desc: 'Describe the compliance role you need filled — from MLRO and CCO to AML Analyst and Risk Manager. Set your requirements, location, and timeline.' },
  { n: '02', title: 'Browse Available Talent', desc: 'Access a curated pool of compliance professionals actively looking for their next role. Filter by specialism, experience level, and availability.' },
  { n: '03', title: 'Connect & Hire', desc: 'Reach out directly to candidates. No middlemen, no inflated fees. Build your compliance team with specialists who are ready to make a move.' },
];
export default function HowItWorks() {
  const [tab, setTab] = useState('pro');
  const steps = tab === 'pro' ? proSteps : empSteps;
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-16 h-1 bg-[#C9A84C] rounded-full mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">How TalentX Works</h2>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">Whether you are a compliance professional ready for your next move, or an employer seeking specialist talent — TalentX makes the connection simple.</p>
        </div>
        <div className="flex justify-center mb-14">
          <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm">
            <button onClick={() => setTab('pro')} className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${tab === 'pro' ? 'bg-[#0A0A0A] text-white shadow-md' : 'text-gray-500'}`}>For Professionals</button>
            <button onClick={() => setTab('emp')} className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${tab === 'emp' ? 'bg-[#C9A84C] text-black shadow-md' : 'text-gray-500'}`}>For Employers</button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg mb-6 ${tab === 'pro' ? 'bg-[#0A0A0A] text-white' : 'bg-[#C9A84C] text-black'}`}>{s.n}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-14">
          {tab === 'pro'
            ? <a href="#open-to-work" className="inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] text-white font-semibold rounded-lg hover:bg-gray-800 transition-all">Post My Availability</a>
            : <a href="#hiring" className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] text-black font-semibold rounded-lg hover:bg-[#E8C96A] transition-all shadow-lg">Post a Vacancy</a>
          }
        </div>
      </div>
    </section>
  );
}
