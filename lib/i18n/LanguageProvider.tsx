"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useCountryDetect } from "@/lib/hooks/useCountryDetect";
import { SUPPORTED_LOCALES, type SupportedLocale } from "@/lib/utils/countryLanguageMap";
import en from "@/messages/en.json";

interface LanguageContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  isDetecting: boolean;
  messages: Record<string, unknown>;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
  isDetecting: false,
  messages: en,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

function resolveMessage(messages: Record<string, unknown>, namespace: string, key: string): string | undefined {
  const parts = [...namespace.split("."), ...key.split(".")];
  let current: unknown = messages;
  for (const part of parts) {
    if (typeof current !== "object" || current === null) return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

export function useTranslations(namespace: string) {
  const { messages } = useLanguage();
  return (key: string, values?: Record<string, string | number>) => {
    const template = resolveMessage(messages, namespace, key) ?? key;
    if (!values) return template;
    return Object.entries(values).reduce(
      (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
      template
    );
  };
}

const messageLoaders: Record<SupportedLocale, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import("@/messages/en.json"),
  fr: () => import("@/messages/fr.json"),
  es: () => import("@/messages/es.json"),
  ar: () => import("@/messages/ar.json"),
  pt: () => import("@/messages/pt.json"),
  de: () => import("@/messages/de.json"),
  zh: () => import("@/messages/zh.json"),
  ja: () => import("@/messages/ja.json"),
  ru: () => import("@/messages/ru.json"),
  it: () => import("@/messages/it.json"),
  nl: () => import("@/messages/nl.json"),
  ko: () => import("@/messages/ko.json"),
  tr: () => import("@/messages/tr.json"),
  hi: () => import("@/messages/hi.json"),
  sw: () => import("@/messages/sw.json"),
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { locale: detectedLocale, isDetecting, setLocale: persistLocale } = useCountryDetect();
  const [activeLocale, setActiveLocale] = useState<SupportedLocale>("en");
  const [messages, setMessages] = useState<Record<string, unknown>>(en);

  useEffect(() => {
    setActiveLocale(detectedLocale);
  }, [detectedLocale]);

  useEffect(() => {
    let cancelled = false;
    messageLoaders[activeLocale]().then((mod) => {
      if (!cancelled) setMessages(mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, [activeLocale]);

  useEffect(() => {
    const config = SUPPORTED_LOCALES.find((entry) => entry.code === activeLocale);
    document.documentElement.lang = activeLocale;
    document.documentElement.dir = config?.rtl ? "rtl" : "ltr";
  }, [activeLocale]);

  function setLocale(next: SupportedLocale) {
    setActiveLocale(next);
    persistLocale(next);
  }

  return (
    <LanguageContext.Provider value={{ locale: activeLocale, setLocale, isDetecting, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}
