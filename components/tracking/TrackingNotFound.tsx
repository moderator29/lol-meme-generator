"use client";

import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface TrackingNotFoundProps {
  id: string;
}

export function TrackingNotFound({ id }: TrackingNotFoundProps) {
  const t = useTranslations("notFound");

  return (
    <div className="glass-card mx-auto max-w-xl p-10 text-center">
      <PackageSearch className="mx-auto h-12 w-12 text-gold-primary/60" />
      <h2 className="mt-5 font-display text-h3 font-bold text-navy-deep dark:text-ivory">{t("heading")}</h2>
      <p className="mt-3 text-body-sm text-navy-soft/70 dark:text-ivory/60">{t("body", { id })}</p>
      <p className="mt-1 text-body-sm text-navy-soft/70 dark:text-ivory/60">{t("help")}</p>
      <Link href="/contact">
        <Button className="mt-6">Contact Support</Button>
      </Link>
    </div>
  );
}
