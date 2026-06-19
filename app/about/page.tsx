"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { Globe2, ShieldCheck, Users, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

const VALUES = [
  { icon: ShieldCheck, title: "Integrity First", description: "Every shipment is handled with the same care and transparency we would expect for our own packages." },
  { icon: Globe2, title: "Global Reach", description: "A logistics network spanning more than one hundred and eighty countries, built for businesses that think globally." },
  { icon: Users, title: "People Powered", description: "Behind every tracking update is a team of operators, drivers, and engineers committed to getting it right." },
  { icon: TrendingUp, title: "Always Improving", description: "We invest continuously in routing intelligence and infrastructure to make delivery faster every year." },
];

export default function AboutPage() {
  const t = useTranslations("nav");

  return (
    <>
      <Navbar />
      <main className="px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-h1 font-bold text-navy-deep dark:text-ivory">{t("about")}</h1>
          <p className="mt-4 text-body-lg text-navy-soft/75 dark:text-ivory/65">
            EDP Courier was founded to bring enterprise grade visibility to private courier logistics, combining a
            global delivery network with intelligence that was previously reserved for the largest carriers in the world.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.08 }}
                className="glass-card p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-light to-gold-dark text-navy-deep shadow-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-h4 font-semibold text-navy-deep dark:text-ivory">{value.title}</h3>
                <p className="mt-2 text-body-sm text-navy-soft/70 dark:text-ivory/60">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
