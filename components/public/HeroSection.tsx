"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ShieldCheck, Globe2, Zap } from "lucide-react";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const t = useTranslations("hero");
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = value.trim();
    if (trimmed) router.push(`/track/${encodeURIComponent(trimmed)}`);
  }

  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-24 sm:pt-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(201,168,76,0.16),_transparent_60%)]" />
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold-primary/30 bg-gold-mist px-4 py-1.5 text-label uppercase text-gold-dark"
        >
          {t("badge")}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
          className="font-display text-h1 font-bold text-navy-deep sm:text-display-lg dark:text-ivory"
        >
          {t("headline")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-body-lg text-navy-soft/80 dark:text-ivory/70"
        >
          {t("subheadline")}
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
          className="glass-card mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 p-3 sm:flex-row"
        >
          <div className="flex w-full items-center gap-2 px-3">
            <Search className="h-5 w-5 shrink-0 text-gold-dark" />
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={t("placeholder")}
              className="w-full bg-transparent py-2.5 text-body font-mono text-navy-deep outline-none placeholder:font-sans placeholder:text-navy-soft/45 dark:text-ivory"
            />
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            {t("cta")}
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-body-sm text-navy-soft/70 dark:text-ivory/60"
        >
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-gold-dark" /> {t("trust1")}</span>
          <span className="flex items-center gap-1.5"><Globe2 className="h-4 w-4 text-gold-dark" /> {t("trust2")}</span>
          <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-gold-dark" /> {t("trust3")}</span>
        </motion.div>
      </div>
    </section>
  );
}
