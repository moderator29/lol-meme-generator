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

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) return text;

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, target: targetLang, format: "text" }),
      }
    );

    if (!response.ok) return text;

    const data = await response.json();
    const translated: string | undefined = data?.data?.translations?.[0]?.translatedText;

    if (!translated) return text;

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(cacheKey, translated);
    }

    return translated;
  } catch {
    return text;
  }
}
