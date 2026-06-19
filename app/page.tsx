import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { HeroSection } from "@/components/public/HeroSection";
import { StatsSection } from "@/components/public/StatsSection";
import { FeaturesSection } from "@/components/public/FeaturesSection";
import { HowItWorksSection } from "@/components/public/HowItWorksSection";
import { ServicesSection } from "@/components/public/ServicesSection";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { FAQSection } from "@/components/public/FAQSection";
import { CTASection } from "@/components/public/CTASection";
import { ContactSection } from "@/components/public/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ServicesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
