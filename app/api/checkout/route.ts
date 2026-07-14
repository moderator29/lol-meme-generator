import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getStripe, stripeEnabled } from "@/lib/stripe";
import { getCheckoutDocuments, hasDocumentAccess } from "@/lib/orders";

const bodySchema = z.object({
  propertyId: z.string().min(1),
  documentIds: z.array(z.string().min(1)).min(1).max(10),
});

function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { propertyId, documentIds } = parsed.data;
  const documents = await getCheckoutDocuments(propertyId, documentIds);
  if (documents.length === 0) {
    return NextResponse.json(
      { error: "No valid documents selected" },
      { status: 400 },
    );
  }

  // Skip documents the user already owns.
  const toPurchase = [];
  for (const doc of documents) {
    if (!(await hasDocumentAccess(user.id, doc.id))) toPurchase.push(doc);
  }

  if (toPurchase.length === 0) {
    // Everything already owned — go straight to downloads.
    return NextResponse.json({ url: "/dashboard/documents?success=1" });
  }

  // Create PENDING orders.
  const orders = await Promise.all(
    toPurchase.map((doc) =>
      prisma.order.create({
        data: {
          userId: user.id,
          propertyId,
          documentId: doc.id,
          amountInPence: doc.priceInPence,
          status: "PENDING",
        },
      }),
    ),
  );
  const orderIds = orders.map((o) => o.id);

  // Demo mode: no Stripe configured — fulfil immediately.
  if (!stripeEnabled()) {
    await prisma.order.updateMany({
      where: { id: { in: orderIds } },
      data: { status: "PAID" },
    });
    const params = new URLSearchParams({ orders: orderIds.join(",") });
    return NextResponse.json({
      url: `/checkout/success?${params.toString()}`,
    });
  }

  // Stripe mode: create a Checkout Session.
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: user.email,
    line_items: toPurchase.map((doc) => ({
      quantity: 1,
      price_data: {
        currency: "gbp",
        unit_amount: doc.priceInPence,
        product_data: {
          name: doc.title,
          description: `${doc.property.addressLine1}, ${doc.property.postcode}`,
        },
      },
    })),
    metadata: { orderIds: orderIds.join(","), userId: user.id },
    success_url: `${appUrl()}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl()}/property/${propertyId}?canceled=1`,
  });

  await prisma.order.updateMany({
    where: { id: { in: orderIds } },
    data: { stripeSessionId: session.id },
  });

  return NextResponse.json({ url: session.url });
}
