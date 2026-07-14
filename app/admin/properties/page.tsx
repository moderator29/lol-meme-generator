import Link from "next/link";
import { Plus, Pencil, ImageIcon } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { SafeImage } from "@/components/safe-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ADMIN_NAV } from "../nav";
import { prisma } from "@/lib/prisma";
import { formatGBP, propertyTypeLabel } from "@/lib/format";
import { resolveImageSrc } from "@/lib/images";

export const metadata = { title: "Manage properties" };

export default async function AdminPropertiesPage() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      _count: { select: { documents: true, orders: true } },
    },
  });

  return (
    <DashboardShell
      title="Properties"
      subtitle={`${properties.length} propert${properties.length === 1 ? "y" : "ies"} in the registry.`}
      nav={ADMIN_NAV}
    >
      <div className="mb-4 flex justify-end">
        <Button asChild>
          <Link href="/admin/properties/new">
            <Plus className="h-4 w-4" /> Add property
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {properties.map((p) => {
          const img = p.images[0];
          return (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm"
            >
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                {img ? (
                  <SafeImage
                    src={resolveImageSrc(img.url, img.id)}
                    alt={p.addressLine1}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-semibold">{p.addressLine1}</p>
                  {!p.published && (
                    <Badge variant="warning">Unpublished</Badge>
                  )}
                </div>
                <p className="truncate text-sm text-muted-foreground">
                  {p.city}, {p.postcode} · {propertyTypeLabel(p.propertyType)} ·{" "}
                  {formatGBP(p.estimatedValue)}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {p._count.documents} document
                  {p._count.documents === 1 ? "" : "s"} · {p._count.orders}{" "}
                  order{p._count.orders === 1 ? "" : "s"} · Reg.{" "}
                  {p.registryNumber}
                </p>
              </div>

              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/properties/${p.id}`}>
                  <Pencil className="h-4 w-4" /> Edit
                </Link>
              </Button>
            </div>
          );
        })}

        {properties.length === 0 && (
          <div className="rounded-xl border border-dashed p-12 text-center">
            <p className="text-sm text-muted-foreground">
              No properties yet. Add your first one.
            </p>
            <Button asChild className="mt-4">
              <Link href="/admin/properties/new">Add property</Link>
            </Button>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
