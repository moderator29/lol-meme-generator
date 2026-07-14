import { requireUser } from "@/lib/auth";

// Authenticated, per-user data — never statically cache.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Gate the whole dashboard; middleware also protects these routes.
  await requireUser();
  return children;
}
