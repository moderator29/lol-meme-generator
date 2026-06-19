"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, History } from "lucide-react";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "edp_recent_searches";

export function TrackingSearchBox({ initialValue = "" }: { initialValue?: string }) {
  const t = useTranslations("trackPage");
  const tHero = useTranslations("hero");
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setRecent(JSON.parse(stored));
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = value.trim().toUpperCase();
    if (!trimmed) return;
    const next = [trimmed, ...recent.filter((entry) => entry !== trimmed)].slice(0, 5);
    setRecent(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    router.push(`/track/${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="glass-card flex flex-col items-center gap-3 p-3 sm:flex-row">
        <div className="flex w-full items-center gap-2 px-3">
          <Search className="h-5 w-5 shrink-0 text-gold-dark" />
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={tHero("placeholder")}
            className="w-full bg-transparent py-2.5 text-body font-mono text-navy-deep outline-none placeholder:font-sans dark:text-ivory"
          />
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          {tHero("cta")}
        </Button>
      </form>

      {recent.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-caption uppercase text-navy-soft/55 dark:text-ivory/45">
            <History className="h-3.5 w-3.5" /> {t("recentSearches")}
          </span>
          {recent.map((entry) => (
            <button
              key={entry}
              onClick={() => router.push(`/track/${encodeURIComponent(entry)}`)}
              className="rounded-full border border-gold-primary/25 px-3 py-1 font-mono text-caption text-navy-deep transition-colors hover:bg-gold-mist dark:text-ivory"
            >
              {entry}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
