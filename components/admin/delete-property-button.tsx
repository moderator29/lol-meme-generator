"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProperty } from "@/app/admin/actions";

export function DeletePropertyButton({ propertyId }: { propertyId: string }) {
  return (
    <form
      action={deleteProperty}
      onSubmit={(e) => {
        if (
          !confirm(
            "Delete this property? This will remove its images, documents and cannot be undone.",
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={propertyId} />
      <Button type="submit" variant="destructive" size="sm">
        <Trash2 className="h-4 w-4" /> Delete property
      </Button>
    </form>
  );
}
