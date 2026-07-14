import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ChevronRight,
  MapPin,
  Home,
  BedDouble,
  Bath,
  Landmark,
  Map as MapIcon,
} from "lucide-react";
import { PropertyGallery } from "@/components/property-gallery";
import { DocumentPurchase } from "@/components/document-purchase";
import { Badge } from "@/components/ui/badge";
import { getPropertyById } from "@/lib/data";
import { formatGBP, propertyTypeLabel } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) return { title: "Property not found" };
  return {
    title: `${property.addressLine1}, ${property.postcode}`,
    description: property.description.slice(0, 150),
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property || !property.published) notFound();

  const fullAddress = [
    property.addressLine1,
    property.addressLine2,
    property.city,
    property.postcode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-secondary/30">
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/search" className="hover:text-foreground">
            Search
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="truncate text-foreground">
            {property.addressLine1}
          </span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Left column */}
          <div className="space-y-8">
            <PropertyGallery images={property.images} alt={fullAddress} />

            <div>
              <Badge variant="secondary">
                {propertyTypeLabel(property.propertyType)}
              </Badge>
              <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
                {property.addressLine1}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {fullAddress}
              </p>
            </div>

            {/* Key facts */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  label: "Estimated value",
                  value: formatGBP(property.estimatedValue),
                  icon: Landmark,
                },
                {
                  label: "Tenure",
                  value: property.tenure,
                  icon: Home,
                },
                {
                  label: "Bedrooms",
                  value: property.bedrooms?.toString() ?? "—",
                  icon: BedDouble,
                },
                {
                  label: "Bathrooms",
                  value: property.bathrooms?.toString() ?? "—",
                  icon: Bath,
                },
              ].map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border bg-card p-4 shadow-sm"
                >
                  <f.icon className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {f.label}
                  </p>
                  <p className="font-semibold">{f.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <section className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {property.description || "No description available."}
              </p>
              <dl className="mt-4 grid grid-cols-1 gap-2 border-t pt-4 text-sm sm:grid-cols-2">
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Registry number</dt>
                  <dd className="font-mono font-medium">
                    {property.registryNumber}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Property type</dt>
                  <dd className="font-medium">
                    {propertyTypeLabel(property.propertyType)}
                  </dd>
                </div>
              </dl>
            </section>

            {/* Boundary map placeholder */}
            <section className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Boundary map</h2>
              <div className="mt-3 flex aspect-[16/9] items-center justify-center rounded-lg border border-dashed bg-muted/50 text-center">
                <div className="text-muted-foreground">
                  <MapIcon className="mx-auto h-10 w-10" />
                  <p className="mt-2 text-sm font-medium">
                    Title plan boundary map
                  </p>
                  <p className="text-xs">
                    The general boundary plan is included in the Title Plan
                    document.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right column — purchase */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                Select the title deeds you require
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose the official-style documents to download for this
                property.
              </p>
              <div className="mt-5">
                <DocumentPurchase
                  propertyId={property.id}
                  documents={property.documents}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
