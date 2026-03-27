'use client';
import { useEffect } from 'react';
const PRO_FORM = 'D4VGWb';
const EMP_FORM = 'GxLk2O';
export default function SignUp() {
  useEffect(() => {
    const load = () => {
      if (typeof (window as any).Tally !== 'undefined') {
        (window as any).Tally.loadEmbeds();
      } else {
        document.querySelectorAll<HTMLIFrameElement>('iframe[data-tally-src]:not([src])').forEach(el => { el.src = el.dataset.tallySrc || ''; });
      }
    };
    if (document.getElementById('tally-js')) { load(); }
    else {
      const s = document.createElement('script');
      s.id = 'tally-js';
      s.src = 'https://tally.so/widgets/embed.js';
      s.onload = load;
      document.body.appendChild(s);
    }
  }, []);
  return (
    <div>
      <section id="open-to-work" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full border border-green-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500" />For Compliance Professionals
              </span>
              <h2 className="text-4xl font-black text-gray-900 leading-tight mb-6">Post Your<span className="block text-[#C9A84C]">Availability</span></h2>
              <p className="text-gray-500 leading-relaxed mb-8">Let compliance-focused employers know you are open to the right opportunity. Register your availability in minutes.</p>
              <ul className="space-y-3">
                {['Visible to compliance-specific employers only','Control your availability status at any time','Specify role type: permanent, contract, or interim','Set your preferred location and remote preferences','Completely free for compliance professionals'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <iframe data-tally-src={`https://tally.so/embed/${PRO_FORM}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`} loading="lazy" width="100%" height="500" frameBorder={0} title="Open to Work Form" />
            </div>
          </div>
        </div>
      </section>
      <section id="hiring" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-semibold px-4 py-2 rounded-full border border-[#C9A84C]/30 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />For Employers & Hiring Teams
              </span>
              <h2 className="text-4xl font-black text-white leading-tight mb-6">Find Your Next<span className="block text-[#C9A84C]">Compliance Hire</span></h2>
              <p className="text-white/60 leading-relaxed mb-8">Post your vacancy or browse available compliance talent directly. Connect with professionals without the agency markup.</p>
              <ul className="space-y-3">
                {['Post unlimited vacancies with no listing fees','Browse professionals actively open to new roles','Direct contact — no recruiters or intermediaries','Cover permanent, contract, interim, and advisory roles','Reach compliance talent across 30+ countries'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <iframe data-tally-src={`https://tally.so/embed/${EMP_FORM}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`} loading="lazy" width="100%" height="500" frameBorder={0} title="Post a Job Form" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
