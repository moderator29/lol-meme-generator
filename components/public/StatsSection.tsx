"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/LanguageProvider";

const STATS = [
  { key: "shipments", value: "2.4M+" },
  { key: "countries", value: "180+" },
  { key: "onTime", value: "99.4%" },
  { key: "partners", value: "50,000+" },
];

export function StatsSection() {
  const t = useTranslations("stats");

  return (
    <section className="px-4 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.1 }}
            className="glass-card flex flex-col items-center p-6 text-center"
          >
            <span className="font-display text-h2 font-bold text-gold-dark">{stat.value}</span>
            <span className="mt-2 text-body-sm text-navy-soft/70 dark:text-ivory/60">{t(stat.key)}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
