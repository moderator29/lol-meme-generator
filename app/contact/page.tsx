import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { ContactSection } from "@/components/public/ContactSection";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-10">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
