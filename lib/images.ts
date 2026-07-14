/**
 * Image URL resolution.
 *
 * The seed data ships with sample Unsplash URLs, some of which don't resolve
 * reliably. Rather than editing every row in the database, we swap those
 * (and only those) for a reliable, deterministic house photo at render time.
 * Admin-uploaded local files (/api/storage/...) and any other URLs are kept.
 */

export const FALLBACK_IMAGE = "/property-fallback.svg";

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/** A deterministic, real house photo for a given seed (no API key needed). */
function housePhoto(seed: string): string {
  const lock = hashString(seed) % 1000;
  return `https://loremflickr.com/800/600/house,home,exterior/all?lock=${lock}`;
}

export function resolveImageSrc(
  url: string | null | undefined,
  seed: string,
): string {
  if (!url) return housePhoto(seed);
  // Local uploads and app assets are served as-is.
  if (url.startsWith("/")) return url;
  // Replace the unreliable sample photos with a dependable house image.
  if (url.includes("images.unsplash.com")) return housePhoto(seed);
  return url;
}
