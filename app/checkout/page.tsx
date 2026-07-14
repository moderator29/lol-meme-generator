import Link from "next/link";
import { redirect } from "next/navigation";
import { MapPin, FileText } from "lucide-react";
import { StepIndicator } from "@/components/step-indicator";
import { CheckoutButton } from "@/components/checkout-button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { stripeEnabled } from "@/lib/stripe";
import { formatPence, documentTypeLabel } from "@/lib/format";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ property?: string; docs?: string }>;
}) {
  const user = await requireUser();
  const { property: propertyId, docs } = await searchParams;

  const documentIds = (docs ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!propertyId || documentIds.length === 0) {
    redirect("/search");
  }

  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    include: {
      documents: { where: { id: { in: documentIds } } },
    },
  });

  if (!property || property.documents.length === 0) {
    redirect("/search");
  }

  const documents = property.documents;
  const total = documents.reduce((sum, d) => sum + d.priceInPence, 0);
  const fullAddress = [property.addressLine1, property.city, property.postcode]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-secondary/30">
      <div className="container max-w-4xl py-10">
        <StepIndicator current={3} />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Summary */}
          <div className="space-y-6">
            <section className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Property</h2>
              <div className="mt-3 flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">{property.addressLine1}</p>
                  <p className="text-sm text-muted-foreground">{fullAddress}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    Registry no. {property.registryNumber}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Documents</h2>
              <ul className="mt-3 divide-y">
                {documents.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <span className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>
                        <span className="block font-medium">{doc.title}</span>
                        <Badge variant="secondary" className="mt-1">
                          {documentTypeLabel(doc.type)}
                        </Badge>
                      </span>
                    </span>
                    <span className="font-semibold">
                      {formatPence(doc.priceInPence)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Your details</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Documents will be delivered to:
              </p>
              <p className="mt-1 font-medium">{user.email}</p>
            </section>
          </div>

          {/* Payment */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Documents ({documents.length})
                  </dt>
                  <dd>{formatPence(total)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Processing fee</dt>
                  <dd>{formatPence(0)}</dd>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-bold">
                  <dt>Total</dt>
                  <dd className="text-primary">{formatPence(total)}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <CheckoutButton
                  propertyId={property.id}
                  documentIds={documents.map((d) => d.id)}
                  total={total}
                  demoMode={!stripeEnabled()}
                />
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                By continuing you agree to our{" "}
                <Link href="/legal/terms" className="underline">
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
