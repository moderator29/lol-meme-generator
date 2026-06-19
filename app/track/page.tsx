"use client";

import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { TrackingSearchBox } from "@/components/tracking/TrackingSearchBox";

export default function TrackPage() {
  const t = useTranslations("trackPage");

  return (
    <>
      <Navbar />
      <main className="px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-h1 font-bold text-navy-deep dark:text-ivory">{t("title")}</h1>
          <p className="mt-4 text-body-lg text-navy-soft/75 dark:text-ivory/65">{t("subtitle")}</p>
        </div>
        <div className="mt-10">
          <TrackingSearchBox />
        </div>
      </main>
      <Footer />
    </>
  );
}
