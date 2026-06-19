"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  const t = useTranslations("hero");

  return (
    <section className="px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="glass-card-gold mx-auto flex max-w-4xl flex-col items-center gap-6 p-10 text-center sm:flex-row sm:justify-between sm:text-left"
      >
        <div>
          <h3 className="font-display text-h3 font-bold text-navy-deep dark:text-ivory">{t("headline")}</h3>
          <p className="mt-2 text-body-sm text-navy-soft/70 dark:text-ivory/60">{t("subheadline")}</p>
        </div>
        <Link href="/track">
          <Button size="lg" className="whitespace-nowrap">
            {t("cta")}
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
