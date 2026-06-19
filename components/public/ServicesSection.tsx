"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { Zap, Ship, Clock, Building2, ArrowRight } from "lucide-react";

const ITEMS = [
  { key: "express", icon: Zap },
  { key: "freight", icon: Ship },
  { key: "sameDay", icon: Clock },
  { key: "enterprise", icon: Building2 },
] as const;

export function ServicesSection() {
  const t = useTranslations("services");

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-h2 font-bold text-navy-deep dark:text-ivory">{t("title")}</h2>
          <p className="mt-4 text-body-lg text-navy-soft/75 dark:text-ivory/65">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.08 }}
                className="glass-card flex items-start gap-5 p-7"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-deep text-gold-light">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-h4 font-semibold text-navy-deep dark:text-ivory">
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p className="mt-2 text-body-sm text-navy-soft/70 dark:text-ivory/60">
                    {t(`items.${item.key}.description`)}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-body-sm font-semibold text-gold-dark">
                    {t("learnMore")} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
