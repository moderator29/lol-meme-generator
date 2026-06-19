"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { Hash, Search, MapPin } from "lucide-react";

const STEPS = [
  { key: "step1", icon: Hash },
  { key: "step2", icon: Search },
  { key: "step3", icon: MapPin },
] as const;

export function HowItWorksSection() {
  const t = useTranslations("how");

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-h2 font-bold text-navy-deep dark:text-ivory">{t("title")}</h2>
          <p className="mt-4 text-body-lg text-navy-soft/75 dark:text-ivory/65">{t("subtitle")}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-light to-gold-dark text-navy-deep shadow-gold">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-3 font-display text-h3 font-bold text-gold-primary/25">
                  {index + 1}
                </span>
                <h3 className="mt-5 font-display text-h4 font-semibold text-navy-deep dark:text-ivory">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="mt-2 text-body-sm text-navy-soft/70 dark:text-ivory/60">
                  {t(`${step.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
