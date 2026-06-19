"use client";

import { useEffect, useState } from "react";
import { localeForCountry, isSupportedLocale, type SupportedLocale } from "@/lib/utils/countryLanguageMap";

interface IpApiResponse {
  country_code?: string;
  country_name?: string;
}

const STORAGE_KEY = "edp_language";
const IPAPI_URL = process.env.NEXT_PUBLIC_IPAPI_URL ?? "https://ipapi.co/json/";

export function useCountryDetect(): { locale: SupportedLocale; isDetecting: boolean; setLocale: (locale: SupportedLocale) => void } {
  const [locale, setLocaleState] = useState<SupportedLocale>("en");
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;

    if (stored && isSupportedLocale(stored)) {
      setLocaleState(stored);
      setIsDetecting(false);
      return;
    }

    let cancelled = false;

    fetch(IPAPI_URL)
      .then((response) => response.json())
      .then((data: IpApiResponse) => {
        if (cancelled) return;
        const detected = localeForCountry(data.country_code);
        setLocaleState(detected);
      })
      .catch(() => {
        if (!cancelled) setLocaleState("en");
      })
      .finally(() => {
        if (!cancelled) setIsDetecting(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function setLocale(next: SupportedLocale) {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }

  return { locale, isDetecting, setLocale };
}
