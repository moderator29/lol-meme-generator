"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ShieldCheck, Globe2, Zap, Package, Ship, Clock, Plane } from "lucide-react";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";

const SERVICE_TILES = [
  { icon: Zap, key: "serviceExpress" },
  { icon: Ship, key: "serviceFreight" },
  { icon: Clock, key: "serviceSameDay" },
  { icon: Plane, key: "serviceIntl" },
] as const;

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
    <section className="relative isolate overflow-hidden px-4 pt-20 pb-28 sm:pt-28 sm:pb-36">
      {/* Aurora background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob aurora-1 absolute left-[-10%] top-[-5%] h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(201,168,76,0.55),transparent_70%)]" />
        <div className="aurora-blob aurora-2 absolute right-[-8%] top-[10%] h-[600px] w-[600px] bg-[radial-gradient(circle,rgba(99,102,241,0.35),transparent_70%)]" />
        <div className="aurora-blob aurora-3 absolute bottom-[-10%] left-[30%] h-[450px] w-[450px] bg-[radial-gradient(circle,rgba(20,184,166,0.3),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.09),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-5xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-primary/30 bg-gold-mist px-5 py-1.5 text-label uppercase tracking-widest text-gold-dark">
            <Package className="h-3.5 w-3.5" />
            {t("badge")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.1 }}
          className="mt-7 text-center font-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-navy-deep dark:text-ivory"
        >
          {t("headline")}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.18 }}
          className="mx-auto mt-6 max-w-2xl text-center text-body-lg text-navy-soft/75 dark:text-ivory/65"
        >
          {t("subheadline")}
        </motion.p>

        {/* Tracking search */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.26 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="glass-card flex flex-col items-stretch gap-3 p-2.5 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-3 px-4 py-1">
              <Search className="h-5 w-5 shrink-0 text-gold-dark" />
              <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={t("placeholder")}
                className="w-full bg-transparent py-2.5 font-mono text-[13px] text-navy-deep outline-none placeholder:font-sans placeholder:text-[13px] placeholder:text-navy-soft/45 dark:text-ivory dark:placeholder:text-ivory/35"
              />
            </div>
            <Button type="submit" className="shrink-0">
              {t("cta")}
            </Button>
          </div>
        </motion.form>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-6 text-body-sm text-navy-soft/65 dark:text-ivory/55"
        >
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-gold-dark" />{t("trust1")}</span>
          <span className="flex items-center gap-1.5"><Globe2 className="h-4 w-4 text-gold-dark" />{t("trust2")}</span>
          <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-gold-dark" />{t("trust3")}</span>
        </motion.div>

        {/* Service quick tiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.46 }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {SERVICE_TILES.map((tile, i) => {
            const Icon = tile.icon;
            return (
              <motion.div
                key={tile.key}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.5 + i * 0.07 }}
                className="glass-card flex flex-col items-center gap-2.5 py-5 px-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-gold cursor-default"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-light to-gold-dark text-navy-deep shadow-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-label font-semibold uppercase tracking-wide text-navy-deep dark:text-ivory">
                  {t(tile.key)}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
