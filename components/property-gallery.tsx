"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { SafeImage } from "@/components/safe-image";
import { cn } from "@/lib/utils";
import { resolveImageSrc } from "@/lib/images";
import type { PropertyImage } from "@prisma/client";

export function PropertyGallery({
  images,
  alt,
}: {
  images: PropertyImage[];
  alt: string;
}) {
  const ordered = [...images].sort(
    (a, b) => Number(b.isPrimary) - Number(a.isPrimary) || a.sortOrder - b.sortOrder,
  );
  const [active, setActive] = useState(0);

  if (ordered.length === 0) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border bg-muted text-muted-foreground">
        <ImageIcon className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border bg-muted">
        <SafeImage
          src={resolveImageSrc(ordered[active].url, ordered[active].id)}
          alt={ordered[active].alt ?? alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </div>
      {ordered.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {ordered.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition",
                i === active
                  ? "border-accent"
                  : "border-transparent opacity-80 hover:opacity-100",
              )}
            >
              <SafeImage
                src={resolveImageSrc(img.url, img.id)}
                alt={img.alt ?? alt}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
