import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { ServicesSection } from "@/components/public/ServicesSection";
import { HowItWorksSection } from "@/components/public/HowItWorksSection";
import { CTASection } from "@/components/public/CTASection";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-10">
        <ServicesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
