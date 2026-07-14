import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Diagnostic endpoint. Visit /api/health on the deployment to see whether the
 * database is connected and populated. Exposes counts and (non-secret)
 * connection host/user only — never the password. Safe to remove later.
 */
export async function GET() {
  const out: {
    databaseUrlSet: boolean;
    databaseHost: string | null;
    databaseUser: string | null;
    appUrl: string | null;
    checks: Record<string, { ok: boolean; value?: unknown; error?: string }>;
  } = {
    databaseUrlSet: Boolean(process.env.DATABASE_URL),
    databaseHost: null,
    databaseUser: null,
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? null,
    checks: {},
  };

  try {
    const u = new URL(process.env.DATABASE_URL ?? "");
    out.databaseHost = u.host; // e.g. aws-0-us-east-1.pooler.supabase.com:6543
    out.databaseUser = u.username; // e.g. postgres.<project-ref> — no password
  } catch {
    // leave as null
  }

  async function check(name: string, fn: () => Promise<unknown>) {
    try {
      out.checks[name] = { ok: true, value: await fn() };
    } catch (e) {
      out.checks[name] = {
        ok: false,
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }

  await check("properties_count", () => prisma.property.count());
  await check("property_images_count", () => prisma.propertyImage.count());
  await check("documents_count", () => prisma.document.count());
  await check("sample_property", () =>
    prisma.property.findFirst({
      select: { postcode: true, city: true, addressLine1: true },
    }),
  );

  return NextResponse.json(out, { status: 200 });
}
