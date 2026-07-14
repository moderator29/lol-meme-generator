import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { PropertyForm } from "@/components/property-form";
import { ImageManager } from "@/components/admin/image-manager";
import { DocumentManager } from "@/components/admin/document-manager";
import { DeletePropertyButton } from "@/components/admin/delete-property-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ADMIN_NAV } from "../../nav";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Edit property" };

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      documents: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!property) notFound();

  return (
    <DashboardShell
      title="Edit property"
      subtitle={`${property.addressLine1}, ${property.postcode}`}
      nav={ADMIN_NAV}
    >
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back to properties
        </Link>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/property/${property.id}`} target="_blank">
            View public page <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6">
          <h2 className="mb-5 text-lg font-semibold">Property details</h2>
          <PropertyForm property={property} />
          <div className="mt-8 border-t pt-6">
            <h3 className="text-sm font-semibold text-destructive">
              Danger zone
            </h3>
            <p className="mb-3 mt-1 text-sm text-muted-foreground">
              Permanently delete this property and all its documents.
            </p>
            <DeletePropertyButton propertyId={property.id} />
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Images</h2>
            <ImageManager
              propertyId={property.id}
              images={property.images}
            />
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Documents</h2>
            <DocumentManager
              propertyId={property.id}
              documents={property.documents}
            />
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
