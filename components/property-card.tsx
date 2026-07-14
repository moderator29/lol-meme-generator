import Link from "next/link";
import { ArrowRight, BedDouble, Bath, MapPin } from "lucide-react";
import { SafeImage } from "@/components/safe-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatGBP, propertyTypeLabel } from "@/lib/format";
import { resolveImageSrc } from "@/lib/images";
import type { Property, PropertyImage } from "@prisma/client";

type PropertyWithImages = Property & { images: PropertyImage[] };

export function PropertyCard({ property }: { property: PropertyWithImages }) {
  const primary =
    property.images.find((i) => i.isPrimary) ?? property.images[0];

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/property/${property.id}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {primary ? (
            <SafeImage
              src={resolveImageSrc(primary.url, primary.id)}
              alt={primary.alt ?? property.addressLine1}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <MapPin className="h-8 w-8" />
            </div>
          )}
          <Badge className="absolute left-3 top-3" variant="secondary">
            {propertyTypeLabel(property.propertyType)}
          </Badge>
        </div>
      </Link>

      <div className="space-y-3 p-5">
        <div>
          <h3 className="font-semibold leading-tight">
            {property.addressLine1}
          </h3>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {property.city}, {property.postcode}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" /> {property.bedrooms}
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" /> {property.bathrooms}
            </span>
          )}
          <span className="ml-auto text-xs font-medium uppercase tracking-wide">
            {property.tenure}
          </span>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <div>
            <p className="text-xs text-muted-foreground">Estimated value</p>
            <p className="text-lg font-bold text-primary">
              {formatGBP(property.estimatedValue)}
            </p>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href={`/property/${property.id}`}>
              View Details <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
