import Link from "next/link";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DASHBOARD_NAV } from "../nav";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { documentTypeLabel, formatDate, formatPence } from "@/lib/format";

export const metadata = { title: "My documents" };

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const user = await requireUser();
  const { success } = await searchParams;

  const orders = await prisma.order.findMany({
    where: { userId: user.id, status: "PAID" },
    include: { document: true, property: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardShell
      title="My documents"
      subtitle="Download the title documents you have purchased."
      nav={DASHBOARD_NAV}
    >
      {success && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 p-4 text-sm text-success">
          <CheckCircle2 className="h-5 w-5" />
          Your purchase is complete. Your documents are ready below.
        </div>
      )}

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-card p-12 text-center">
          <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold">No documents yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Purchase a title document to see it here.
          </p>
          <Button asChild className="mt-5">
            <Link href="/search">Search for a property</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{order.document.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.property.addressLine1}, {order.property.postcode}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">
                      {documentTypeLabel(order.document.type)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Purchased {formatDate(order.createdAt)} ·{" "}
                      {formatPence(order.amountInPence)}
                    </span>
                  </div>
                </div>
              </div>
              <Button asChild>
                <a href={`/api/documents/${order.documentId}/download`}>
                  <Download className="h-4 w-4" /> Download PDF
                </a>
              </Button>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
