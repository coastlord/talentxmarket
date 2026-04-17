import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Use | TalentX Market',
  description: 'Terms of Use for TalentX Market — the compliance talent marketplace.',
};

const LAST_UPDATED = '17 April 2026';
const EFFECTIVE_DATE = '17 April 2026';
const CONTACT_EMAIL = 'hello@talentxmarket.com';

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="bg-brand-black pt-24 pb-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-gold/20 mb-5">
            Legal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Terms of Use</h1>
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
            These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of the TalentX Market
            platform, website, and services (collectively, the &ldquo;Platform&rdquo;), operated by
            TalentX Market (&ldquo;TalentX&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
            By accessing or using the Platform, you agree to be bound by these Terms. If you do not
            agree, you must not use the Platform.
          </p>

          <Section number="1" title="About TalentX Market">
            <p>
              TalentX Market is a specialist talent marketplace connecting compliance, AML, Risk,
              MLRO, Trust &amp; Safety, KYC, Sanctions, and Financial Crime professionals
              (&ldquo;Candidates&rdquo;) with organisations seeking to hire such professionals
              (&ldquo;Employers&rdquo;). TalentX does not act as a recruitment agency, staffing
              company, or employer of record. We provide a platform through which Candidates and
              Employers can connect. Any employment, engagement, or contractual relationship formed
              through the Platform is solely between the Candidate and the Employer.
            </p>
          </Section>

          <Section number="2" title="Eligibility">
            <p>You must be at least 18 years of age to use the Platform. By using the Platform, you represent and warrant that:</p>
            <ul>
              <li>You are at least 18 years old;</li>
              <li>You have the legal capacity to enter into binding agreements;</li>
              <li>You are using the Platform for lawful purposes only;</li>
              <li>All information you provide is accurate, current, and complete; and</li>
              <li>
                If registering on behalf of an organisation, you have authority to bind that
                organisation to these Terms.
              </li>
            </ul>
          </Section>

          <Section number="3" title="Candidate Accounts">
            <SubSection title="3.1 Registration">
              <p>
                Candidates may register for a free account on the Platform. Registration requires
                you to provide accurate professional information including your name, email address,
                job title, years of experience, specialisms, and availability status. Upon
                registration, your profile will be submitted for review by the TalentX team.
                Your profile will not be visible to Employers until it has been approved by TalentX.
              </p>
            </SubSection>
            <SubSection title="3.2 Profile Visibility and Anonymity">
              <p>
                By default, your profile is displayed on the Platform in an anonymised format.
                Your full name, contact details (email address, phone number), LinkedIn URL, and
                other identifying information are withheld from public view until an Employer
                unlocks your profile. You consent to this anonymised display by registering as a
                Candidate. You may withdraw your profile from public visibility at any time via
                your dashboard.
              </p>
            </SubSection>
            <SubSection title="3.3 Profile Accuracy">
              <p>
                You are solely responsible for the accuracy, completeness, and legality of
                all information you submit to your profile. TalentX does not verify professional
                qualifications, certifications, employment history, or any other information
                submitted by Candidates. Providing false, misleading, or fraudulent information
                is grounds for immediate account suspension.
              </p>
            </SubSection>
            <SubSection title="3.4 Profile Approval and Moderation">
              <p>
                TalentX reserves the right to approve, reject, or remove any Candidate profile
                at its sole discretion, including but not limited to profiles that contain
                inaccurate information, violate these Terms, or do not meet the professional
                standards of the Platform. We are not obligated to provide reasons for any
                moderation decision.
              </p>
            </SubSection>
            <SubSection title="3.5 Candidate Consent to Contact">
              <p>
                By making your profile visible on the Platform, you consent to being contacted
                by Employers who have lawfully unlocked your profile via the Platform&apos;s credit
                system. You may update your availability status or remove your profile at any
                time to stop receiving outreach.
              </p>
            </SubSection>
          </Section>

          <Section number="4" title="Employer Access">
            <SubSection title="4.1 Employer Use">
              <p>
                Employers may access anonymised Candidate profiles without registration. To unlock
                a Candidate&apos;s full profile and contact details, Employers must complete the
                verification process, which includes providing a valid work email address from a
                verified business domain, and using unlock credits as described below.
              </p>
            </SubSection>
            <SubSection title="4.2 Work Email Requirement">
              <p>
                TalentX requires Employers to use a valid work email address (i.e. an email
                address issued by a registered business domain) to unlock Candidate profiles.
                Free webmail addresses (including but not limited to Gmail, Yahoo, Hotmail,
                Outlook.com, and similar services) are not accepted. This requirement exists
                to protect Candidates from unsolicited contact by unverified individuals.
              </p>
            </SubSection>
            <SubSection title="4.3 Unlock Credits">
              <p>
                Employer accounts are issued a number of unlock credits upon creation. Each
                credit permits the unlocking of one Candidate&apos;s full profile. Credits are
                non-transferable, non-refundable (unless required by applicable law), and expire
                as specified at the time of purchase or issuance. Additional credits may be
                purchased as made available by TalentX.
              </p>
            </SubSection>
            <SubSection title="4.4 Permitted Use of Candidate Information">
              <p>
                Employer access to a Candidate&apos;s contact information is granted solely for the
                purpose of making a genuine employment or engagement enquiry related to a
                legitimate vacancy. Employers must not:
              </p>
              <ul>
                <li>Use Candidate information for any purpose other than direct recruitment outreach;</li>
                <li>Share, sell, resell, or transfer Candidate contact details to any third party;</li>
                <li>Contact Candidates for purposes unrelated to employment or professional engagement;</li>
                <li>Add Candidates to marketing lists or automated email sequences without explicit consent;</li>
                <li>Use Candidate data to build or enrich any database, CRM, or contact list beyond the specific hire process.</li>
              </ul>
            </SubSection>
            <SubSection title="4.5 Employer Responsibility">
              <p>
                Employers are solely responsible for ensuring their hiring practices comply with
                all applicable employment laws, anti-discrimination legislation, data protection
                regulations (including the UK GDPR and Data Protection Act 2018), and any other
                relevant legal requirements. TalentX is not responsible for any hiring decisions,
                outcomes, or disputes arising between Employers and Candidates.
              </p>
            </SubSection>
          </Section>

          <Section number="5" title="Prohibited Conduct">
            <p>You must not use the Platform to:</p>
            <ul>
              <li>Violate any applicable law, regulation, or third-party rights;</li>
              <li>Submit false, misleading, inaccurate, or fraudulent information;</li>
              <li>Impersonate any person, organisation, or entity;</li>
              <li>Scrape, crawl, harvest, or systematically extract data from the Platform by any automated means;</li>
              <li>Interfere with, disrupt, or compromise the integrity or security of the Platform;</li>
              <li>Attempt to gain unauthorised access to any part of the Platform or its infrastructure;</li>
              <li>Use the Platform for any purpose that could damage the reputation of TalentX or its users;</li>
              <li>Post or transmit any content that is defamatory, discriminatory, obscene, or otherwise unlawful;</li>
              <li>Use Candidate or Employer data obtained through the Platform for any purpose not expressly permitted by these Terms; or</li>
              <li>Circumvent any technical measures implemented to protect the Platform or its users.</li>
            </ul>
          </Section>

          <Section number="6" title="Intellectual Property">
            <p>
              All content on the Platform, including but not limited to text, design, graphics,
              logos, trademarks, software, and functionality, is owned by or licensed to TalentX
              and is protected by applicable intellectual property laws. You are granted a limited,
              non-exclusive, non-transferable licence to access and use the Platform solely for
              its intended purposes as described in these Terms. No other rights are granted.
            </p>
            <p>
              By submitting content to the Platform (including profile information), you grant
              TalentX a worldwide, royalty-free licence to use, store, display, and reproduce
              that content solely for the purpose of operating and improving the Platform. This
              licence terminates when you delete your account or remove the relevant content.
            </p>
          </Section>

          <Section number="7" title="Disclaimer of Warranties">
            <p>
              The Platform is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without
              warranties of any kind, express or implied. TalentX does not warrant that:
            </p>
            <ul>
              <li>The Platform will be uninterrupted, error-free, or secure;</li>
              <li>Any Candidate profile information is accurate, complete, or current;</li>
              <li>The Platform will meet your specific requirements; or</li>
              <li>Any vacancy, position, or professional opportunity listed will result in a placement.</li>
            </ul>
            <p>
              TalentX does not verify the credentials, qualifications, identity, right to work,
              or suitability of any Candidate or Employer. All verification and due diligence
              is the sole responsibility of the party relying on such information.
            </p>
          </Section>

          <Section number="8" title="Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, TalentX and its directors,
              employees, agents, and affiliates shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including but not limited to loss of
              profits, data, goodwill, or business opportunities, arising from your use of or
              inability to use the Platform.
            </p>
            <p>
              In no event shall TalentX&apos;s total liability to you for all claims arising from
              your use of the Platform exceed the greater of (a) the total amount paid by you
              to TalentX in the twelve months preceding the claim, or (b) one hundred pounds
              sterling (£100).
            </p>
            <p>
              Nothing in these Terms excludes or limits TalentX&apos;s liability for death or
              personal injury caused by negligence, fraud or fraudulent misrepresentation, or
              any other liability that cannot be excluded or limited by English law.
            </p>
          </Section>

          <Section number="9" title="Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless TalentX and its directors,
              employees, agents, and affiliates from and against any claims, liabilities, damages,
              losses, costs, and expenses (including reasonable legal fees) arising from your
              use of the Platform, your breach of these Terms, or your violation of any applicable
              law or third-party right.
            </p>
          </Section>

          <Section number="10" title="Account Suspension and Termination">
            <p>
              TalentX reserves the right to suspend, restrict, or terminate your access to the
              Platform at any time, with or without notice, for any reason, including but not
              limited to breach of these Terms, suspected fraudulent activity, or behaviour
              harmful to other users. Upon termination, your right to access the Platform
              ceases immediately. Provisions of these Terms that by their nature should survive
              termination shall do so.
            </p>
          </Section>

          <Section number="11" title="Third-Party Services">
            <p>
              The Platform integrates with third-party services including Clerk (authentication),
              Supabase (database), Vercel (hosting), and Resend (email delivery). Your use of
              the Platform is also subject to the terms and privacy policies of these providers.
              TalentX is not responsible for the practices or content of any third-party services.
            </p>
            <p>
              The Platform may contain links to external websites. Such links do not constitute
              endorsement by TalentX of those sites, and TalentX is not responsible for their
              content or practices.
            </p>
          </Section>

          <Section number="12" title="Changes to These Terms">
            <p>
              TalentX reserves the right to modify these Terms at any time. We will notify
              registered users of material changes by email or via a notice on the Platform.
              Your continued use of the Platform after the effective date of any changes
              constitutes your acceptance of the revised Terms. If you do not agree to the
              revised Terms, you must stop using the Platform.
            </p>
          </Section>

          <Section number="13" title="Governing Law and Jurisdiction">
            <p>
              These Terms are governed by and construed in accordance with the laws of England
              and Wales. Any dispute arising from or in connection with these Terms or the
              Platform shall be subject to the exclusive jurisdiction of the courts of England
              and Wales, unless you are a consumer resident in another jurisdiction with
              mandatory local law protections.
            </p>
          </Section>

          <Section number="14" title="Contact">
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mt-3 not-prose">
              <p className="text-sm font-semibold text-gray-800 mb-1">TalentX Market</p>
              <p className="text-sm text-gray-600">
                Email:{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-gold hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="text-sm text-gray-600">Website:{' '}
                <a href="https://talentxmarket.com" className="text-brand-gold hover:underline">
                  talentxmarket.com
                </a>
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
            href="/privacy"
            className="text-xs text-brand-gold hover:underline underline-offset-2"
          >
            View Privacy Policy →
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
