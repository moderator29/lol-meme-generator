export type SupportedLocale =
  | "en"
  | "fr"
  | "es"
  | "ar"
  | "pt"
  | "de"
  | "zh"
  | "ja"
  | "ru"
  | "it"
  | "nl"
  | "ko"
  | "tr"
  | "hi"
  | "sw";

export const SUPPORTED_LOCALES: { code: SupportedLocale; label: string; flag: string; rtl?: boolean }[] = [
  { code: "en", label: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "fr", label: "Francais", flag: "\u{1F1EB}\u{1F1F7}" },
  { code: "es", label: "Espanol", flag: "\u{1F1EA}\u{1F1F8}" },
  { code: "ar", label: "Arabic", flag: "\u{1F1F8}\u{1F1E6}", rtl: true },
  { code: "pt", label: "Portugues", flag: "\u{1F1E7}\u{1F1F7}" },
  { code: "de", label: "Deutsch", flag: "\u{1F1E9}\u{1F1EA}" },
  { code: "zh", label: "Chinese", flag: "\u{1F1E8}\u{1F1F3}" },
  { code: "ja", label: "Japanese", flag: "\u{1F1EF}\u{1F1F5}" },
  { code: "ru", label: "Russian", flag: "\u{1F1F7}\u{1F1FA}" },
  { code: "it", label: "Italiano", flag: "\u{1F1EE}\u{1F1F9}" },
  { code: "nl", label: "Nederlands", flag: "\u{1F1F3}\u{1F1F1}" },
  { code: "ko", label: "Korean", flag: "\u{1F1F0}\u{1F1F7}" },
  { code: "tr", label: "Turkce", flag: "\u{1F1F9}\u{1F1F7}" },
  { code: "hi", label: "Hindi", flag: "\u{1F1EE}\u{1F1F3}" },
  { code: "sw", label: "Swahili", flag: "\u{1F1F9}\u{1F1FF}" },
];

const COUNTRY_TO_LOCALE: Record<string, SupportedLocale> = {
  NG: "en", GH: "en", US: "en", GB: "en", AU: "en", CA: "en", ZA: "en", KE: "en",
  FR: "fr", BE: "fr", CI: "fr", SN: "fr",
  ES: "es", MX: "es", AR: "es", CO: "es", PE: "es", CL: "es",
  SA: "ar", AE: "ar", EG: "ar", MA: "ar", JO: "ar",
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt",
  DE: "de", AT: "de", CH: "de",
  CN: "zh",
  JP: "ja",
  RU: "ru",
  IT: "it",
  NL: "nl",
  KR: "ko",
  TR: "tr",
  IN: "hi",
  TZ: "sw", UG: "sw",
};

export function localeForCountry(countryCode: string | null | undefined): SupportedLocale {
  if (!countryCode) return "en";
  return COUNTRY_TO_LOCALE[countryCode.toUpperCase()] ?? "en";
}

export function isSupportedLocale(value: string): value is SupportedLocale {
  return SUPPORTED_LOCALES.some((locale) => locale.code === value);
}
