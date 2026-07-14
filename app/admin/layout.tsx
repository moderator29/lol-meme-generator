import { requireAdmin } from "@/lib/auth";

// Admin views must reflect live data and re-check access on every request.
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Gate the whole admin area; middleware also protects these routes.
  await requireAdmin();
  return children;
}
