"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SUPPORTED_LOCALES } from "@/lib/utils/countryLanguageMap";
import { cn } from "@/lib/utils/cn";

export function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = SUPPORTED_LOCALES.find((entry) => entry.code === locale);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-full border border-gold-primary/25 px-3 py-1.5 text-body-sm font-medium transition-colors hover:bg-gold-mist"
        aria-label="Select language"
      >
        <span>{active?.flag}</span>
        <span className="hidden sm:inline">{active?.label}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open ? (
        <div className="absolute right-0 z-50 mt-2 max-h-80 w-56 overflow-y-auto rounded-2xl border border-gold-primary/20 bg-white/95 p-1.5 shadow-glass-lg backdrop-blur-glass dark:bg-navy-mid/95">
          {SUPPORTED_LOCALES.map((entry) => (
            <button
              key={entry.code}
              onClick={() => {
                setLocale(entry.code);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-body-sm transition-colors hover:bg-gold-mist",
                entry.code === locale && "bg-gold-mist font-semibold"
              )}
            >
              <span className="flex items-center gap-2">
                <span>{entry.flag}</span>
                <span>{entry.label}</span>
              </span>
              {entry.code === locale ? <Check className="h-3.5 w-3.5 text-gold-dark" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
