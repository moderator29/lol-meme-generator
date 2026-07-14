import Link from "next/link";
import { CheckCircle2, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { getStripe, stripeEnabled } from "@/lib/stripe";
import { fulfillOrdersBySession } from "@/lib/orders";
import { documentTypeLabel, formatPence } from "@/lib/format";

export const metadata = { title: "Order complete" };

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; orders?: string }>;
}) {
  const user = await requireUser();
  const { session_id: sessionId, orders } = await searchParams;

  // Stripe flow: verify the session and fulfil as a fallback to the webhook.
  if (sessionId && stripeEnabled()) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        await fulfillOrdersBySession(
          session.id,
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : null,
        );
      }
    } catch {
      // ignore — orders will still be fulfilled by the webhook
    }
  }

  // Resolve the paid orders to show downloads.
  const orderIds = (orders ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const paidOrders = await prisma.order.findMany({
    where: {
      userId: user.id,
      status: "PAID",
      ...(sessionId ? { stripeSessionId: sessionId } : {}),
      ...(orderIds.length ? { id: { in: orderIds } } : {}),
    },
    include: { document: true, property: true },
    orderBy: { createdAt: "desc" },
  });

  const total = paidOrders.reduce((sum, o) => sum + o.amountInPence, 0);

  return (
    <div className="container max-w-2xl py-16">
      <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
        <h1 className="mt-4 text-2xl font-bold">Payment successful</h1>
        <p className="mt-2 text-muted-foreground">
          Thank you. Your documents are ready to download and a copy has been
          sent to <span className="font-medium">{user.email}</span>.
        </p>

        {paidOrders.length > 0 ? (
          <ul className="mt-8 space-y-3 text-left">
            {paidOrders.map((order) => (
              <li
                key={order.id}
                className="flex items-center justify-between gap-3 rounded-lg border p-4"
              >
                <span className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>
                    <span className="block font-medium">
                      {order.document.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {order.property.addressLine1}, {order.property.postcode}
                    </span>
                    <Badge variant="secondary" className="mt-1">
                      {documentTypeLabel(order.document.type)}
                    </Badge>
                  </span>
                </span>
                <Button asChild size="sm">
                  <a href={`/api/documents/${order.documentId}/download`}>
                    <Download className="h-4 w-4" /> Download
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
            Your payment is being confirmed. Your documents will appear in your
            dashboard momentarily.
          </p>
        )}

        {total > 0 && (
          <p className="mt-6 text-sm">
            Total paid:{" "}
            <span className="font-semibold">{formatPence(total)}</span>
          </p>
        )}

        <div className="mt-8 flex justify-center gap-3">
          <Button asChild variant="outline">
            <Link href="/dashboard/documents">Go to my documents</Link>
          </Button>
          <Button asChild>
            <Link href="/search">Search another property</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
