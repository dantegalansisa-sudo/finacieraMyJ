import { SiteConfigProvider } from './providers/SiteConfigProvider';
import UrgencyBanner from './components/UrgencyBanner';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import HeroSection from './sections/HeroSection';

import ProcessSection from './sections/ProcessSection';
import RequirementsSection from './sections/RequirementsSection';
import ServicesSection from './sections/ServicesSection';
import StatsSection from './sections/StatsSection';
import CalculatorSection from './sections/CalculatorSection';
import SolicitudSection from './sections/SolicitudSection';
import SignatureSection from './sections/SignatureSection';
import CEOSection from './sections/CEOSection';
import InversionistasSection from './sections/InversionistasSection';
import LoansSection from './sections/LoansSection';
import WhyUsSection from './sections/WhyUsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import HistoriasClientesSection from './sections/HistoriasClientesSection';
import EquipoSection from './sections/EquipoSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

function App() {
  return (
    <SiteConfigProvider>
      <UrgencyBanner />
      <Navbar />
      <HeroSection />
      <ProcessSection />
      <RequirementsSection />
      <ServicesSection />
      <StatsSection />
      <CalculatorSection />
      <SolicitudSection />
      <SignatureSection />
      <CEOSection />
      <InversionistasSection />
      <LoansSection />
      <WhyUsSection />
      <TestimonialsSection />
      <HistoriasClientesSection />
      <EquipoSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </SiteConfigProvider>
  );
}

export default App;
