import Link from "next/link";
import { FileText, SearchCheck, ShoppingBag, Download } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DASHBOARD_NAV } from "./nav";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate, orderStatusLabel } from "@/lib/format";

export const metadata = { title: "Dashboard" };

export default async function DashboardOverview() {
  const user = await requireUser();

  const [paidCount, orderCount, searchCount, recentOrders] = await Promise.all([
    prisma.order.count({ where: { userId: user.id, status: "PAID" } }),
    prisma.order.count({ where: { userId: user.id } }),
    prisma.searchLog.count({ where: { userId: user.id } }),
    prisma.order.findMany({
      where: { userId: user.id },
      include: { document: true, property: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <DashboardShell
      title={`Welcome back${user.firstName ? `, ${user.firstName}` : ""}`}
      subtitle="Manage your documents, searches and account."
      nav={DASHBOARD_NAV}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Documents owned"
          value={paidCount}
          icon={<FileText className="h-5 w-5" />}
        />
        <StatCard
          label="Total orders"
          value={orderCount}
          icon={<ShoppingBag className="h-5 w-5" />}
        />
        <StatCard
          label="Searches"
          value={searchCount}
          icon={<SearchCheck className="h-5 w-5" />}
        />
      </div>

      <div className="mt-8 rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent orders</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/documents">View all</Link>
          </Button>
        </div>

        {recentOrders.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">
              You haven&apos;t purchased any documents yet.
            </p>
            <Button asChild className="mt-4">
              <Link href="/search">Search for a property</Link>
            </Button>
          </div>
        ) : (
          <ul className="mt-4 divide-y">
            {recentOrders.map((order) => (
              <li
                key={order.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{order.document.title}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {order.property.addressLine1}, {order.property.postcode} ·{" "}
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={order.status === "PAID" ? "success" : "warning"}
                  >
                    {orderStatusLabel(order.status)}
                  </Badge>
                  {order.status === "PAID" && (
                    <Button asChild size="sm" variant="outline">
                      <a href={`/api/documents/${order.documentId}/download`}>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardShell>
  );
}
