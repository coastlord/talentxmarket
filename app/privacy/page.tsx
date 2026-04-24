import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | TalentX Market',
  description: 'Privacy Policy for TalentX Market — how we collect, use, and protect your personal data.',
};

const LAST_UPDATED = '17 April 2026';
const EFFECTIVE_DATE = '17 April 2026';
const CONTACT_EMAIL = 'hello@talentxmarket.com';

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="bg-brand-black pt-24 pb-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-gold/20 mb-5">
            Legal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Privacy Policy</h1>
          <p className="text-white/40 text-sm">
            Last updated: {LAST_UPDATED} &nbsp;·&nbsp; Effective: {EFFECTIVE_DATE}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose prose-gray max-w-none">

          {/* Intro */}
          <p className="text-gray-600 leading-relaxed mb-10">
            TalentX Market (&ldquo;TalentX&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to
            protecting your privacy and handling your personal data with transparency, care, and
            in full compliance with the UK General Data Protection Regulation (UK GDPR) and the
            Data Protection Act 2018. This Privacy Policy explains what personal data we collect,
            why we collect it, how we use it, and your rights in relation to it. Please read this
            policy carefully before using the TalentX Market platform.
          </p>

          <Section number="1" title="Who We Are">
            <p>
              TalentX Market is the data controller responsible for the personal data processed
              through this Platform. We operate the compliance talent marketplace available at
              talentxmarket.com. For all data protection enquiries, please contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-gold hover:underline">
                {CONTACT_EMAIL}
              </a>.
            </p>
          </Section>

          <Section number="2" title="Data We Collect">
            <SubSection title="2.1 Candidates">
              <p>When you register as a Candidate, we collect and store the following:</p>
              <ul>
                <li><strong>Identity data:</strong> Full name, professional headline, current job title, current employer</li>
                <li><strong>Contact data:</strong> Email address, phone number, LinkedIn profile URL</li>
                <li><strong>Professional data:</strong> Years of experience, compliance specialisms, certifications and qualifications, professional biography, work preferences, salary expectations, availability status</li>
                <li><strong>Account data:</strong> Clerk user ID, account creation date, profile approval status, profile visibility settings</li>
                <li><strong>Usage data:</strong> Log-in activity, profile update history, dashboard interactions</li>
              </ul>
              <p>
                Your contact data and identifying information (full name, email, phone, LinkedIn URL)
                are withheld from Employers until your profile is explicitly unlocked by an Employer
                using the Platform&apos;s credit system. Until that point, only your anonymised
                professional information is visible.
              </p>
            </SubSection>
            <SubSection title="2.2 Employers">
              <p>When you access the Platform as an Employer, we collect:</p>
              <ul>
                <li><strong>Identity data:</strong> Contact name, job title</li>
                <li><strong>Organisation data:</strong> Company name, business email address, company website</li>
                <li><strong>Transaction data:</strong> Unlock credits used, profiles unlocked, unlock history</li>
                <li><strong>Account data:</strong> Account creation date, subscription status, account activity</li>
                <li><strong>Usage data:</strong> Pages visited, search queries, profiles viewed</li>
              </ul>
            </SubSection>
            <SubSection title="2.3 All Users">
              <p>When any user accesses the Platform, we may automatically collect:</p>
              <ul>
                <li><strong>Technical data:</strong> IP address, browser type, device type, operating system</li>
                <li><strong>Log data:</strong> Access times, pages viewed, referring URLs, session duration</li>
                <li><strong>Cookie data:</strong> As described in Section 9 below</li>
              </ul>
            </SubSection>
          </Section>

          <Section number="3" title="How We Use Your Data">
            <p>We process your personal data for the following purposes and on the following legal bases:</p>

            <div className="overflow-x-auto mt-4 mb-4 not-prose">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-700 uppercase tracking-wide border border-gray-200 w-2/5">Purpose</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-gray-700 uppercase tracking-wide border border-gray-200 w-3/5">Legal Basis</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {[
                    ['To create and manage your account', 'Performance of a contract (Article 6(1)(b) UK GDPR)'],
                    ['To display your anonymised profile to Employers', 'Performance of a contract / Legitimate interests'],
                    ['To reveal your contact details to Employers who unlock your profile', 'Consent (by opting to make your profile available)'],
                    ['To send OTP verification emails to Employers', 'Performance of a contract'],
                    ['To send transactional emails (account notifications, profile status updates)', 'Performance of a contract'],
                    ['To review and approve Candidate profiles', 'Legitimate interests (platform quality and safety)'],
                    ['To prevent fraud, abuse, and misuse of the Platform', 'Legitimate interests / Legal obligation'],
                    ['To improve the Platform and understand usage patterns', 'Legitimate interests'],
                    ['To comply with legal obligations', 'Legal obligation (Article 6(1)(c) UK GDPR)'],
                  ].map(([purpose, basis], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 border border-gray-200 align-top">{purpose}</td>
                      <td className="px-4 py-3 border border-gray-200 align-top text-gray-500">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              We will not use your personal data for automated decision-making that produces
              legal or similarly significant effects on you without your explicit consent.
            </p>
          </Section>

          <Section number="4" title="The Anonymity Model">
            <p>
              TalentX is built on the principle that compliance professionals should be able to
              signal their availability without exposing their identity to all visitors. This is
              how our anonymity model works:
            </p>
            <ul>
              <li>
                <strong>Before unlock:</strong> Employers browsing the Platform see only your
                professional title, years of experience, specialism areas, certifications,
                availability status, work preferences, and salary expectations. Your name,
                employer, email address, phone number, LinkedIn URL, and any other identifying
                information is hidden.
              </li>
              <li>
                <strong>After unlock:</strong> When an Employer uses a credit to unlock your
                profile, your full name, email address, phone number, LinkedIn URL, and current
                employer are revealed to that specific Employer only. This constitutes your
                consent to that Employer contacting you for recruitment purposes.
              </li>
              <li>
                <strong>Your control:</strong> You may set your profile to hidden or remove it
                entirely from your dashboard at any time. Doing so will prevent any further
                Employers from unlocking your profile. Employers who have already unlocked your
                profile prior to removal retain the data they received at the point of unlock,
                subject to their own data retention obligations.
              </li>
            </ul>
          </Section>

          <Section number="5" title="Data Sharing and Third Parties">
            <SubSection title="5.1 Service Providers (Data Processors)">
              <p>
                We share personal data with the following trusted third-party service providers
                who process data on our behalf and are bound by data processing agreements:
              </p>
              <ul>
                <li><strong>Clerk (clerk.com)</strong> — Authentication and identity management. Stores credentials and manages sign-in sessions for Candidates.</li>
                <li><strong>Supabase (supabase.com)</strong> — Cloud database hosting. Stores all Candidate profile data, Employer account data, and unlock records.</li>
                <li><strong>Vercel (vercel.com)</strong> — Website hosting and deployment. Processes server logs and request data.</li>
                <li><strong>Resend (resend.com)</strong> — Transactional email delivery. Used to send OTP verification emails and account notifications.</li>
              </ul>
              <p>
                All providers are reputable, GDPR-compliant services. Supabase and Vercel
                infrastructure is hosted within the European Economic Area or on servers with
                appropriate adequacy decisions or safeguards in place.
              </p>
            </SubSection>
            <SubSection title="5.2 Employers">
              <p>
                When an Employer unlocks your profile, your contact data is shared with that
                Employer for the sole purpose of making a legitimate recruitment enquiry.
                Employers are bound by our Terms of Use regarding the permitted use of your data.
                TalentX is not responsible for how Employers handle your data after disclosure,
                and we encourage you to review our Terms of Use for details of Employer obligations.
              </p>
            </SubSection>
            <SubSection title="5.3 Legal Disclosures">
              <p>
                We may disclose personal data to law enforcement, regulatory authorities, or
                other third parties where required to do so by law, court order, or other legal
                process, or where we believe in good faith that disclosure is necessary to
                protect the rights, property, or safety of TalentX, our users, or the public.
              </p>
            </SubSection>
            <SubSection title="5.4 We Do Not Sell Your Data">
              <p>
                TalentX does not sell, rent, or trade your personal data to any third party
                for their own marketing or commercial purposes. We do not share your data
                with advertisers. Your profile is only disclosed to Employers who have
                legitimately unlocked it through the Platform.
              </p>
            </SubSection>
          </Section>

          <Section number="6" title="Data Retention">
            <p>We retain your personal data for as long as necessary for the purposes set out in this policy:</p>
            <ul>
              <li><strong>Candidate profiles:</strong> Retained for the duration of your account and for up to 2 years following account deletion, to resolve any disputes and comply with legal obligations.</li>
              <li><strong>Employer accounts and unlock records:</strong> Retained for 3 years following account closure for audit, compliance, and dispute resolution purposes.</li>
              <li><strong>Technical and log data:</strong> Retained for up to 12 months.</li>
              <li><strong>Email communications:</strong> Retained for up to 2 years.</li>
            </ul>
            <p>
              When data is no longer required, it is securely deleted or anonymised. You may
              request earlier deletion subject to our legal obligations as described in Section 7.
            </p>
          </Section>

          <Section number="7" title="Your Rights Under UK GDPR">
            <p>As a data subject under the UK GDPR, you have the following rights:</p>
            <ul>
              <li>
                <strong>Right of access:</strong> You may request a copy of the personal data
                we hold about you (a Subject Access Request).
              </li>
              <li>
                <strong>Right to rectification:</strong> You may request that inaccurate or
                incomplete data is corrected. You can update most profile data directly via
                your dashboard.
              </li>
              <li>
                <strong>Right to erasure (&ldquo;right to be forgotten&rdquo;):</strong> You may request
                deletion of your personal data where there is no compelling reason for its
                continued processing. This right is subject to certain exceptions, including
                where retention is required by law.
              </li>
              <li>
                <strong>Right to restriction of processing:</strong> You may ask us to pause
                processing of your data in certain circumstances, for example while a dispute
                is being resolved.
              </li>
              <li>
                <strong>Right to data portability:</strong> You may request a copy of your
                personal data in a structured, machine-readable format for transfer to another
                service.
              </li>
              <li>
                <strong>Right to object:</strong> You may object to processing based on
                legitimate interests, including profiling.
              </li>
              <li>
                <strong>Rights related to automated decision-making:</strong> You have the
                right not to be subject to decisions based solely on automated processing
                that produce significant legal or similar effects on you.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-gold hover:underline">
                {CONTACT_EMAIL}
              </a>. We will respond within 30 days. We may need to verify your identity before
              processing your request. There is no charge for exercising your rights, though
              we reserve the right to charge a reasonable fee for manifestly unfounded or
              excessive requests.
            </p>
          </Section>

          <Section number="8" title="Data Security">
            <p>
              We implement appropriate technical and organisational measures to protect your
              personal data against unauthorised access, accidental loss, alteration, or
              disclosure. These measures include:
            </p>
            <ul>
              <li>Encrypted data transmission (HTTPS/TLS) across the Platform;</li>
              <li>Access controls limiting data access to authorised personnel only;</li>
              <li>Separate handling of public profile data and contact data, with contact data only accessible post-unlock;</li>
              <li>Use of SOC 2 compliant infrastructure providers;</li>
              <li>Email verification (OTP) before any Employer can unlock a Candidate profile;</li>
              <li>Work email domain verification to prevent anonymous or fraudulent access.</li>
            </ul>
            <p>
              While we take all reasonable precautions, no internet-based service is completely
              secure. In the event of a data breach affecting your rights and freedoms, we will
              notify you and the relevant supervisory authority as required by law.
            </p>
          </Section>

          <Section number="9" title="Cookies">
            <p>
              TalentX uses essential cookies and similar technologies necessary for the Platform
              to function, including authentication session cookies managed by Clerk. We do not
              currently use advertising cookies, tracking pixels, or third-party analytics cookies.
            </p>
            <p>
              Essential cookies cannot be disabled as they are required for the Platform to operate.
              You may clear cookies via your browser settings, but doing so will end any active
              session and require you to sign in again.
            </p>
          </Section>

          <Section number="10" title="International Data Transfers">
            <p>
              TalentX is operated from the United Kingdom. Our service providers may process
              data in the European Economic Area (EEA) or other jurisdictions. Where personal
              data is transferred outside the UK or EEA, we ensure appropriate safeguards are
              in place, including Standard Contractual Clauses (SCCs) or reliance on adequacy
              decisions recognised under UK law.
            </p>
          </Section>

          <Section number="11" title="Children's Privacy">
            <p>
              The Platform is not directed at children under 18 years of age. We do not
              knowingly collect personal data from anyone under 18. If you believe we have
              inadvertently collected data from a minor, please contact us immediately at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-gold hover:underline">
                {CONTACT_EMAIL}
              </a>{' '}
              and we will delete it promptly.
            </p>
          </Section>

          <Section number="12" title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices, legal obligations, or Platform functionality. We will notify registered
              users of material changes by email or by a prominent notice on the Platform. The
              &ldquo;Last updated&rdquo; date at the top of this page will always reflect the most recent
              version. Continued use of the Platform after any update constitutes your acceptance
              of the revised policy.
            </p>
          </Section>

          <Section number="13" title="Contact Us">
            <p>
              For any questions, concerns, or requests relating to this Privacy Policy or the
              handling of your personal data, please contact our data protection team:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mt-3 not-prose">
              <p className="text-sm font-semibold text-gray-800 mb-1">TalentX Market — Data Protection</p>
              <p className="text-sm text-gray-600">
                Email:{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-gold hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="text-sm text-gray-600">
                Website:{' '}
                <a href="https://talentxmarket.com" className="text-brand-gold hover:underline">
                  talentxmarket.com
                </a>
              </p>
              <p className="text-sm text-gray-500 mt-3 text-xs">
                We aim to respond to all data protection enquiries within 5 business days
                and all Subject Access Requests within 30 days.
              </p>
            </div>
          </Section>

        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            Effective {EFFECTIVE_DATE} &nbsp;·&nbsp; TalentX Market
          </p>
          <Link
            href="/terms"
            className="text-xs text-brand-gold hover:underline underline-offset-2"
          >
            View Terms of Use →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// ─── Layout helpers ────────────────────────────────────────────────────────────
function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-baseline gap-3">
        <span className="text-brand-gold font-black text-base">{number}.</span>
        {title}
      </h2>
      <div className="text-gray-600 leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="text-gray-600 leading-relaxed space-y-2 text-sm">{children}</div>
    </div>
  );
}
