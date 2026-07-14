import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { ADMIN_NAV } from "../nav";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPence, orderStatusLabel } from "@/lib/format";

export const metadata = { title: "Orders" };

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { document: true, property: true, user: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <DashboardShell
      title="Orders"
      subtitle={`${orders.length} order${orders.length === 1 ? "" : "s"} placed.`}
      nav={ADMIN_NAV}
    >
      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">
          No orders yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left text-muted-foreground">
                <th className="p-3 font-medium">Date</th>
                <th className="p-3 font-medium">Customer</th>
                <th className="p-3 font-medium">Property</th>
                <th className="p-3 font-medium">Document</th>
                <th className="p-3 font-medium">Amount</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b last:border-0">
                  <td className="whitespace-nowrap p-3 text-muted-foreground">
                    {formatDate(o.createdAt)}
                  </td>
                  <td className="p-3">{o.user.email}</td>
                  <td className="p-3">
                    <span className="block">{o.property.addressLine1}</span>
                    <span className="text-xs text-muted-foreground">
                      {o.property.postcode}
                    </span>
                  </td>
                  <td className="p-3">{o.document.title}</td>
                  <td className="whitespace-nowrap p-3">
                    {formatPence(o.amountInPence)}
                  </td>
                  <td className="p-3">
                    <Badge
                      variant={
                        o.status === "PAID"
                          ? "success"
                          : o.status === "FAILED"
                            ? "destructive"
                            : "warning"
                      }
                    >
                      {orderStatusLabel(o.status)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardShell>
  );
}
