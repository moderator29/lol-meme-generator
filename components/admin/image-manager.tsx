"use client";

import { useRef } from "react";
import { Trash2, Star, Plus } from "lucide-react";
import { SafeImage } from "@/components/safe-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addImage, deleteImage } from "@/app/admin/actions";
import { resolveImageSrc } from "@/lib/images";
import type { PropertyImage } from "@prisma/client";

export function ImageManager({
  propertyId,
  images,
}: {
  propertyId: string;
  images: PropertyImage[];
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="space-y-5">
      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted"
            >
              <SafeImage
                src={resolveImageSrc(img.url, img.id)}
                alt={img.alt ?? ""}
                fill
                sizes="200px"
                className="object-cover"
              />
              {img.isPrimary && (
                <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
                  <Star className="h-3 w-3 fill-gold text-gold" /> Primary
                </span>
              )}
              <form action={deleteImage} className="absolute right-1.5 top-1.5">
                <input type="hidden" name="id" value={img.id} />
                <input type="hidden" name="propertyId" value={propertyId} />
                <button
                  type="submit"
                  className="rounded bg-black/60 p-1.5 text-white opacity-0 transition group-hover:opacity-100"
                  aria-label="Delete image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No images yet.</p>
      )}

      <form
        ref={formRef}
        action={async (fd) => {
          await addImage(fd);
          formRef.current?.reset();
        }}
        className="space-y-3 rounded-lg border border-dashed p-4"
      >
        <input type="hidden" name="propertyId" value={propertyId} />
        <p className="text-sm font-medium">Add an image</p>
        <div className="space-y-2">
          <Label htmlFor="image-file">Upload a file</Label>
          <Input id="image-file" name="file" type="file" accept="image/*" />
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image-url">Paste an image URL</Label>
          <Input
            id="image-url"
            name="url"
            type="url"
            placeholder="https://…"
          />
        </div>
        <Button type="submit" size="sm" variant="outline">
          <Plus className="h-4 w-4" /> Add image
        </Button>
      </form>
    </div>
  );
}
