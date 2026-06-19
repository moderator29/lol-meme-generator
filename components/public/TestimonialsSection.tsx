"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "We moved our entire fulfillment operation onto EDP Courier and our delivery accuracy went from good to exceptional within a single quarter.",
    name: "Amara Chen",
    role: "Head of Operations, Northwind Retail",
  },
  {
    quote:
      "The tracking intelligence is the best we have used. Our support tickets about late packages dropped by more than half after switching.",
    name: "Diego Fernandez",
    role: "Logistics Director, Solaris Manufacturing",
  },
  {
    quote:
      "Cross border shipping used to be our biggest headache. EDP handled customs clearance so smoothly that it now feels effortless.",
    name: "Priya Nair",
    role: "Supply Chain Lead, Veridian Group",
  },
];

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-h2 font-bold text-navy-deep dark:text-ivory">{t("title")}</h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.1 }}
              className="glass-card p-7"
            >
              <Quote className="h-6 w-6 text-gold-primary/50" />
              <p className="mt-4 text-body-sm text-navy-soft/85 dark:text-ivory/75">{item.quote}</p>
              <div className="mt-5 border-t border-gold-primary/15 pt-4">
                <p className="font-semibold text-navy-deep dark:text-ivory">{item.name}</p>
                <p className="text-caption text-navy-soft/60 dark:text-ivory/50">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
