import { cookies } from "next/headers";
import { createHash } from "crypto";

/**
 * Lightweight password gate for the admin panel when Clerk auth is NOT
 * configured (demo mode). Not a substitute for real auth — it's a single
 * shared password so the admin panel isn't wide open on a public demo.
 */
export const ADMIN_COOKIE = "pr_admin";

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "23456789";
}

/** The value stored in the cookie: a hash of the password (never the raw one). */
export function adminCookieToken(): string {
  return createHash("sha256")
    .update(`property-registry:${adminPassword()}`)
    .digest("hex");
}

export async function hasAdminAccess(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === adminCookieToken();
}
