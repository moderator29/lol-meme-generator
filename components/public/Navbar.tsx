"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { Logo } from "@/components/brand/Logo";
import { LanguageSelector } from "@/components/public/LanguageSelector";
import { ThemeToggle } from "@/components/public/ThemeToggle";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/track", label: t("track") },
    { href: "/services", label: t("services") },
    { href: "/about", label: t("about") },
    { href: "/faq", label: t("faq") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-3 max-w-7xl px-4">
        <nav className="glass-card flex items-center justify-between px-4 py-3 sm:px-6">
          <Logo />
          <div className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-sm font-medium text-navy-deep/80 transition-colors hover:text-gold-dark dark:text-ivory/80"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSelector />
            <ThemeToggle />
            <Link href="/admin/login">
              <Button variant="secondary" size="sm">
                {t("adminPortal")}
              </Button>
            </Link>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-primary/25 lg:hidden" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle menu">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
        {open ? (
          <div className="glass-card mt-2 flex flex-col gap-1 p-4 lg:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-body-sm font-medium hover:bg-gold-mist"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3 px-3">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            <Link href="/admin/login" onClick={() => setOpen(false)}>
              <Button variant="secondary" className="mt-2 w-full">
                {t("adminPortal")}
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
