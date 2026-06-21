"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { Radar, Globe, ShieldCheck, Zap, BarChart3, Route } from "lucide-react";

const ITEMS = [
  { key: "tracking", icon: Radar },
  { key: "global", icon: Globe },
  { key: "secure", icon: ShieldCheck },
  { key: "express", icon: Zap },
  { key: "enterprise", icon: BarChart3 },
  { key: "routing", icon: Route },
] as const;

export function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-label uppercase text-gold-dark">{t("eyebrow")}</span>
          <h2 className="mt-3 font-display text-h2 font-bold text-navy-deep dark:text-ivory">
            {t("titlePrefix")}
            <span className="bg-gradient-to-r from-gold-light to-gold-dark bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
          </h2>
          <p className="mt-4 text-body-lg text-navy-soft/75 dark:text-ivory/65">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.08 }}
                className="glass-card p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-light to-gold-dark text-navy-deep shadow-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-h4 font-semibold text-navy-deep dark:text-ivory">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="mt-2 text-body-sm text-navy-soft/70 dark:text-ivory/60">
                  {t(`items.${item.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
