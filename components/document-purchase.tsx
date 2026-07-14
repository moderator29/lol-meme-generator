"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPence, documentTypeLabel } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Document } from "@prisma/client";

export function DocumentPurchase({
  propertyId,
  documents,
}: {
  propertyId: string;
  documents: Document[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Record<string, boolean>>(
    // Pre-select the first document to mirror the reference UX.
    documents[0] ? { [documents[0].id]: true } : {},
  );

  const selectedIds = useMemo(
    () => documents.filter((d) => selected[d.id]).map((d) => d.id),
    [documents, selected],
  );

  const total = useMemo(
    () =>
      documents
        .filter((d) => selected[d.id])
        .reduce((sum, d) => sum + d.priceInPence, 0),
    [documents, selected],
  );

  function toggle(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  function checkout() {
    if (selectedIds.length === 0) return;
    const params = new URLSearchParams({
      property: propertyId,
      docs: selectedIds.join(","),
    });
    router.push(`/checkout?${params.toString()}`);
  }

  if (documents.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No documents are currently available for this property.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {documents.map((doc) => {
          const isOn = !!selected[doc.id];
          return (
            <li key={doc.id}>
              <label
                className={cn(
                  "flex cursor-pointer gap-3 rounded-lg border p-4 transition",
                  isOn
                    ? "border-accent bg-accent/5 ring-1 ring-accent/40"
                    : "hover:border-primary/40",
                )}
              >
                <input
                  type="checkbox"
                  checked={isOn}
                  onChange={() => toggle(doc.id)}
                  className="mt-1 h-5 w-5 shrink-0 accent-[hsl(var(--accent))]"
                />
                <span className="flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-semibold">
                      {doc.title}
                    </span>
                    <span className="font-bold text-primary">
                      {formatPence(doc.priceInPence)}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {documentTypeLabel(doc.type)}
                  </span>
                  {doc.description && (
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {doc.description}
                    </span>
                  )}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between rounded-lg bg-secondary/60 px-4 py-3">
        <span className="text-sm text-muted-foreground">
          {selectedIds.length} selected
        </span>
        <span className="text-lg font-bold text-primary">
          {formatPence(total)}
        </span>
      </div>

      <Button
        onClick={checkout}
        disabled={selectedIds.length === 0}
        variant="accent"
        size="lg"
        className="w-full"
      >
        <FileText className="h-5 w-5" />
        Purchase document{selectedIds.length > 1 ? "s" : ""}
      </Button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="h-3.5 w-3.5" /> Secure checkout powered by Stripe
      </p>
    </div>
  );
}
