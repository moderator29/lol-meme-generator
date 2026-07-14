import { storage } from "@/lib/storage";

/**
 * Public file server for NON-sensitive assets only (property images).
 * Document PDFs live under the "documents/" prefix and are intentionally
 * excluded here — they are only reachable through the gated download route.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key: segments } = await params;
  const key = segments.join("/");

  if (!key.startsWith("images/")) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await storage().get(key);
    return new Response(new Uint8Array(file.body), {
      headers: {
        "Content-Type": file.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
