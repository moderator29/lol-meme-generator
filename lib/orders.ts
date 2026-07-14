import { prisma } from "@/lib/prisma";

/** Does this user already have a completed (PAID) order for the document? */
export async function hasDocumentAccess(
  userId: string,
  documentId: string,
): Promise<boolean> {
  const order = await prisma.order.findFirst({
    where: { userId, documentId, status: "PAID" },
    select: { id: true },
  });
  return Boolean(order);
}

/** Fetch the purchasable documents for a property, validating membership. */
export async function getCheckoutDocuments(
  propertyId: string,
  documentIds: string[],
) {
  if (documentIds.length === 0) return [];
  return prisma.document.findMany({
    where: {
      id: { in: documentIds },
      propertyId,
      property: { published: true },
    },
    include: { property: true },
  });
}

/** Mark the given orders PAID (idempotent). */
export async function fulfillOrders(orderIds: string[]) {
  if (orderIds.length === 0) return;
  await prisma.order.updateMany({
    where: { id: { in: orderIds }, status: { not: "PAID" } },
    data: { status: "PAID" },
  });
}

/** Fulfil all orders attached to a Stripe checkout session. */
export async function fulfillOrdersBySession(
  sessionId: string,
  paymentIntentId?: string | null,
) {
  await prisma.order.updateMany({
    where: { stripeSessionId: sessionId, status: { not: "PAID" } },
    data: {
      status: "PAID",
      ...(paymentIntentId ? { stripePaymentIntentId: paymentIntentId } : {}),
    },
  });
}
