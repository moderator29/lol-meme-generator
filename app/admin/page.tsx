import Link from "next/link";
import { Building2, ShoppingBag, Users, Banknote, Plus } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ADMIN_NAV } from "./nav";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPence, orderStatusLabel } from "@/lib/format";

export const metadata = { title: "Admin" };

export default async function AdminOverview() {
  const [propertyCount, orderCount, userCount, revenue, recentOrders] =
    await Promise.all([
      prisma.property.count(),
      prisma.order.count(),
      prisma.user.count(),
      prisma.order.aggregate({
        where: { status: "PAID" },
        _sum: { amountInPence: true },
      }),
      prisma.order.findMany({
        include: { document: true, property: true, user: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
    ]);

  return (
    <DashboardShell
      title="Admin dashboard"
      subtitle="Manage properties, orders and users."
      nav={ADMIN_NAV}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Properties"
          value={propertyCount}
          icon={<Building2 className="h-5 w-5" />}
        />
        <StatCard
          label="Orders"
          value={orderCount}
          icon={<ShoppingBag className="h-5 w-5" />}
        />
        <StatCard
          label="Users"
          value={userCount}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          label="Revenue (paid)"
          value={formatPence(revenue._sum.amountInPence ?? 0)}
          icon={<Banknote className="h-5 w-5" />}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/admin/properties/new">
            <Plus className="h-4 w-4" /> Add property
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/properties">Manage properties</Link>
        </Button>
      </div>

      <div className="mt-8 rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Recent orders</h2>
        {recentOrders.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Customer</th>
                  <th className="pb-2 pr-4 font-medium">Document</th>
                  <th className="pb-2 pr-4 font-medium">Amount</th>
                  <th className="pb-2 pr-4 font-medium">Status</th>
                  <th className="pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">{o.user.email}</td>
                    <td className="py-3 pr-4">
                      <span className="block">{o.document.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {o.property.postcode}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      {formatPence(o.amountInPence)}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        variant={o.status === "PAID" ? "success" : "warning"}
                      >
                        {orderStatusLabel(o.status)}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {formatDate(o.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
