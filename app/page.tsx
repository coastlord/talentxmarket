import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import ComplianceRoles from '@/components/ComplianceRoles';
import WhyTalentX from '@/components/WhyTalentX';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import SignUp from '@/components/SignUp';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <ComplianceRoles />
      <WhyTalentX />
      <Testimonials />
      <About />
      <SignUp />
      <Footer />
    </main>
  );
}
