import { redirect } from "next/navigation";
import type { Role, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

/**
 * Auth is feature-flagged. When Clerk keys are present we use Clerk; otherwise
 * the app runs in a local "dev user" mode so public pages, the dashboard and
 * admin can be demoed end-to-end before Clerk is configured.
 */
export function authEnabled(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  );
}

export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return adminEmails().includes(email.toLowerCase());
}

const DEV_USER_EMAIL = "dev@local.test";

/**
 * Resolve the current user, syncing Clerk identity into the local DB.
 * Returns null when signed out (auth enabled) — never null in dev mode.
 */
export async function getCurrentUser(): Promise<User | null> {
  // DB access is wrapped so that a missing/unreachable database (e.g. during a
  // build before DATABASE_URL is set) degrades gracefully instead of crashing.
  try {
    if (!authEnabled()) {
      // Dev mode: a single persistent local user, promoted to admin so the
      // full product (including /admin) is explorable without Clerk.
      return await prisma.user.upsert({
        where: { email: DEV_USER_EMAIL },
        update: {},
        create: {
          email: DEV_USER_EMAIL,
          firstName: "Dev",
          lastName: "User",
          role: "ADMIN",
        },
      });
    }

    const { currentUser } = await import("@clerk/nextjs/server");
    const clerkUser = await currentUser();
    if (!clerkUser) return null;

    const email =
      clerkUser.primaryEmailAddress?.emailAddress ??
      clerkUser.emailAddresses[0]?.emailAddress ??
      null;
    if (!email) return null;

    const role: Role = isAdminEmail(email) ? "ADMIN" : "USER";

    return await prisma.user.upsert({
      where: { clerkId: clerkUser.id },
      update: {
        email,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
        // Promote to admin if the email is on the allow-list; never demote.
        ...(role === "ADMIN" ? { role } : {}),
      },
      create: {
        clerkId: clerkUser.id,
        email,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
        role,
      },
    });
  } catch (err) {
    console.error("getCurrentUser failed:", err);
    return null;
  }
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/dashboard");
  return user;
}
