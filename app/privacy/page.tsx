import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | TalentX Market',
  description: 'How TalentX Market collects, uses, and protects your personal data.',
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-white min-h-screen">
      <div className="bg-brand-black py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-brand-gold text-sm mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to TalentX Market
          </Link>
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-gold/20 mb-4">Legal Document</div>
          <h1 className="text-4xl font-black text-white mb-4">Privacy Policy</h1>
          <p className="text-white/50 text-sm">Last updated: March 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-12">
        <p className="text-brand-gray leading-relaxed">TalentX Market (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates talentxmarket.com (the &ldquo;Platform&rdquo;). This Privacy Policy explains how we collect, use, and protect your information when you use our Platform.</p>
        <hr className="border-brand-light-gray" />
        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-4">1. Who We Are</h2>
          <p className="text-brand-gray leading-relaxed">TalentX Market is a specialist compliance talent marketplace connecting AML, KYC, MLRO, Financial Crime, Sanctions, Risk, and Trust &amp; Safety professionals with employers globally. We are the data controller for personal data collected through this Platform.</p>
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-brand-light-gray text-sm text-brand-gray space-y-1">
            <p><span className="font-semibold text-brand-dark">Company:</span> TalentX Market</p>
            <p><span className="font-semibold text-brand-dark">Website:</span> talentxmarket.com</p>
            <p><span className="font-semibold text-brand-dark">Contact:</span> <a href="mailto:hello@talentxmarket.com" className="text-brand-gold hover:underline">hello@talentxmarket.com</a></p>
          </div>
        </section>
        <hr className="border-brand-light-gray" />
        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-4">2. Information We Collect</h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl border border-brand-light-gray bg-gray-50">
              <h3 className="font-semibold text-brand-dark mb-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" />Compliance Professionals</h3>
              <ul className="text-brand-gray text-sm space-y-1 list-disc list-inside">
                <li>Full name and email address</li>
                <li>Job title, specialism, and years of experience</li>
                <li>Employment preference (permanent, contract, interim)</li>
                <li>Location and remote working preferences</li>
                <li>LinkedIn profile URL (optional)</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-brand-light-gray bg-gray-50">
              <h3 className="font-semibold text-brand-dark mb-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand-gold" />Employers &amp; Hiring Teams</h3>
              <ul className="text-brand-gray text-sm space-y-1 list-disc list-inside">
                <li>Company name, contact name, work email, and phone number</li>
                <li>Job title, role description, specialism required</li>
                <li>Employment type, work location, and remote policy</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-brand-light-gray bg-gray-50">
              <h3 className="font-semibold text-brand-dark mb-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400" />Automatically Collected Data</h3>
              <ul className="text-brand-gray text-sm space-y-1 list-disc list-inside">
                <li>IP address and approximate location</li>
                <li>Browser type and device information</li>
                <li>Pages visited and referring URL</li>
              </ul>
            </div>
          </div>
        </section>
        <hr className="border-brand-light-gray" />
        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-4">3. How We Use Your Information</h2>
          <ul className="text-brand-gray space-y-3">
            {[["Matching","To connect compliance professionals with relevant employers based on specialism, location, and availability."],["Communication","To send relevant opportunities or platform updates. You may opt out at any time."],["Platform improvement","To understand how users interact with the Platform and improve it."],["Legal compliance","To fulfil legal obligations and enforce our terms where necessary."]].map(([t,b])=>(<li key={t} className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0 mt-2"/><p><span className="font-semibold text-brand-dark">{t}: </span>{b}</p></li>))}
          </ul>
        </section>
        <hr className="border-brand-light-gray" />
        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-4">4. Legal Basis for Processing</h2>
          <ul className="text-brand-gray space-y-2 text-sm">
            <li className="flex gap-3"><span className="font-semibold text-brand-dark w-36 flex-shrink-0">Consent:</span>Where you have opted in or submitted a registration form.</li>
            <li className="flex gap-3"><span className="font-semibold text-brand-dark w-36 flex-shrink-0">Contract:</span>Where processing is necessary to deliver our matching service.</li>
            <li className="flex gap-3"><span className="font-semibold text-brand-dark w-36 flex-shrink-0">Legitimate interest:</span>To improve our Platform and market our services.</li>
            <li className="flex gap-3"><span className="font-semibold text-brand-dark w-36 flex-shrink-0">Legal obligation:</span>Where required by law to process or retain your data.</li>
          </ul>
        </section>
        <hr className="border-brand-light-gray" />
        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-4">5. Data Sharing &amp; Third Parties</h2>
          <p className="text-brand-gray leading-relaxed mb-4">We do not sell your personal data. We may share it in limited circumstances:</p>
          <ul className="text-brand-gray space-y-3 text-sm">
            <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0 mt-2"/><p><span className="font-semibold text-brand-dark">Tally.so:</span> Our forms are powered by Tally.so, a GDPR-compliant processor. See <a href="https://tally.so/privacy" className="text-brand-gold hover:underline" target="_blank" rel="noopener noreferrer">tally.so/privacy</a>.</p></li>
            <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0 mt-2"/><p><span className="font-semibold text-brand-dark">Vercel:</span> Our hosting provider processes limited technical data. See <a href="https://vercel.com/legal/privacy-policy" className="text-brand-gold hover:underline" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a>.</p></li>
            <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0 mt-2"/><p><span className="font-semibold text-brand-dark">Employers (with consent):</span> Professional profiles may be shared with vetted employers as the core matching service you signed up for.</p></li>
            <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0 mt-2"/><p><span className="font-semibold text-brand-dark">Legal requirements:</span> We may disclose data where required by law.</p></li>
          </ul>
        </section>
        <hr className="border-brand-light-gray" />
        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-4">6. Data Retention</h2>
          <p className="text-brand-gray leading-relaxed">We retain your data for as long as necessary to provide our service — typically no longer than 24 months from your last interaction, unless legally required. You may request deletion at any time by emailing <a href="mailto:hello@talentxmarket.com" className="text-brand-gold hover:underline">hello@talentxmarket.com</a>.</p>
        </section>
        <hr className="border-brand-light-gray" />
        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-4">7. Your Rights</h2>
          <p className="text-brand-gray leading-relaxed mb-4">Under UK and EU data protection law, you have the following rights:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[["Right of access","Request a copy of the data we hold about you."],["Right to rectification","Ask us to correct inaccurate or incomplete data."],["Right to erasure","Request deletion where there is no legal reason to retain it."],["Right to restrict processing","Ask us to pause processing in certain circumstances."],["Right to data portability","Receive your data in a structured, machine-readable format."],["Right to object","Object to processing based on legitimate interests or for direct marketing."]].map(([r,d])=>(<div key={r} className="p-4 rounded-xl border border-brand-light-gray bg-gray-50"><p className="font-semibold text-brand-dark text-sm mb-1">{r}</p><p className="text-brand-gray text-xs leading-relaxed">{d}</p></div>))}
          </div>
          <p className="text-brand-gray text-sm leading-relaxed mt-4">To exercise any right, email <a href="mailto:hello@talentxmarket.com" className="text-brand-gold hover:underline">hello@talentxmarket.com</a>. We will respond within 30 days. You may also complain to the ICO at <a href="https://ico.org.uk" className="text-brand-gold hover:underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.</p>
        </section>
        <hr className="border-brand-light-gray" />
        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-4">8. Cookies</h2>
          <p className="text-brand-gray leading-relaxed">We use essential cookies only to ensure basic functionality and security. We do not use tracking or advertising cookies without your consent.</p>
        </section>
        <hr className="border-brand-light-gray" />
        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-4">9. Data Security</h2>
          <p className="text-brand-gray leading-relaxed">We take reasonable technical and organisational measures to protect your data. All data in transit is encrypted via HTTPS. However, no internet transmission is 100% secure.</p>
        </section>
        <hr className="border-brand-light-gray" />
        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-4">10. International Transfers</h2>
          <p className="text-brand-gray leading-relaxed">Your data may be processed outside the UK or EEA by our service providers. Where this occurs, appropriate safeguards such as Standard Contractual Clauses (SCCs) are in place.</p>
        </section>
        <hr className="border-brand-light-gray" />
        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-4">11. Changes to This Policy</h2>
          <p className="text-brand-gray leading-relaxed">We may update this policy from time to time. We will post the updated version on this page with a revised &ldquo;Last updated&rdquo; date.</p>
        </section>
        <hr className="border-brand-light-gray" />
        <section>
          <h2 className="text-xl font-bold text-brand-dark mb-4">12. Contact Us</h2>
          <div className="p-5 rounded-xl border border-brand-gold/20 bg-brand-gold/5">
            <p className="font-semibold text-brand-dark mb-1">TalentX Market</p>
            <p className="text-brand-gray text-sm">Email: <a href="mailto:hello@talentxmarket.com" className="text-brand-gold hover:underline">hello@talentxmarket.com</a></p>
            <p className="text-brand-gray text-sm">Website: <a href="https://talentxmarket.com" className="text-brand-gold hover:underline">talentxmarket.com</a></p>
          </div>
        </section>
        <div className="pt-4">
          <Link href="/" className="inline-flex items-center gap-2 text-brand-gold hover:underline text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Return to TalentX Market
          </Link>
        </div>
      </div>
    </main>
  );
}
