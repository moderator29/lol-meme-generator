function hashKey(text: string, targetLang: string): string {
  let hash = 0;
  const input = `${targetLang}:${text}`;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return `edp_translate_${hash}`;
}

export async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text || targetLang === "en") return text;

  const cacheKey = hashKey(text, targetLang);

  if (typeof window !== "undefined") {
    const cached = window.sessionStorage.getItem(cacheKey);
    if (cached) return cached;
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);

    if (!response.ok) return text;

    const data: unknown = await response.json();
    if (!Array.isArray(data) || !Array.isArray(data[0]) || !Array.isArray(data[0][0])) return text;

    const translated = (data as string[][][])[0]
      .filter(Boolean)
      .map((chunk) => chunk[0] ?? "")
      .join("");

    if (!translated) return text;

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(cacheKey, translated);
    }

    return translated;
  } catch {
    return text;
  }
}
