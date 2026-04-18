import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import TrustSignals from '@/components/TrustSignals';
import WhyTalentX from '@/components/WhyTalentX';
import About from '@/components/About';
import SignUp from '@/components/SignUp';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <TrustSignals />
      <WhyTalentX />
      <About />
      <SignUp />
      <Footer />
    </main>
  );
}
