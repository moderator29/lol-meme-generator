"use client";

import Link from "next/link";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const t = useTranslations("footer");

  const columns = [
    {
      title: t("company"),
      links: [
        { href: "/about", label: t("about") },
        { href: "/services", label: t("services") },
        { href: "/careers", label: t("careers") },
        { href: "/press", label: t("press") },
      ],
    },
    {
      title: t("support"),
      links: [
        { href: "/track", label: t("trackShipment") },
        { href: "/faq", label: t("faq") },
        { href: "/contact", label: t("contact") },
        { href: "/status", label: t("statusPage") },
      ],
    },
    {
      title: t("legal"),
      links: [
        { href: "/privacy", label: t("privacy") },
        { href: "/terms", label: t("terms") },
        { href: "/cookies", label: t("cookies") },
        { href: "/compliance", label: t("compliance") },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-gold-primary/15 bg-navy-deep text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-body-sm text-ivory/60">{t("tagline")}</p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-label uppercase text-gold-light">{column.title}</h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-body-sm text-ivory/70 transition-colors hover:text-gold-light">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-ivory/10 pt-6 text-body-sm text-ivory/50">
          EDP Courier {new Date().getFullYear()}. {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
