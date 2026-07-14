"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { FileText, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";
import { Badge } from "@/components/ui/badge";
import { DOCUMENT_TYPE_OPTIONS, documentTypeLabel, formatPence } from "@/lib/format";
import { addDocument, deleteDocument, type FormState } from "@/app/admin/actions";
import type { Document } from "@prisma/client";

export function DocumentManager({
  propertyId,
  documents,
}: {
  propertyId: string;
  documents: Document[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState<FormState, FormData>(
    addDocument,
    {},
  );

  useEffect(() => {
    if (state.ok) {
      toast.success("Document added");
      formRef.current?.reset();
    }
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <div className="space-y-5">
      {documents.length > 0 ? (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center justify-between gap-3 rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{doc.title}</p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <Badge variant="secondary">
                      {documentTypeLabel(doc.type)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatPence(doc.priceInPence)}
                    </span>
                  </div>
                </div>
              </div>
              <form action={deleteDocument}>
                <input type="hidden" name="id" value={doc.id} />
                <input type="hidden" name="propertyId" value={propertyId} />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  aria-label="Delete document"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No documents yet.</p>
      )}

      <form
        ref={formRef}
        action={action}
        className="space-y-3 rounded-lg border border-dashed p-4"
      >
        <input type="hidden" name="propertyId" value={propertyId} />
        <p className="text-sm font-medium">Add a document</p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="doc-type">Type</Label>
            <SelectNative id="doc-type" name="type" defaultValue="TITLE_REGISTER">
              {DOCUMENT_TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SelectNative>
          </div>
          <div className="space-y-2">
            <Label htmlFor="doc-price">Price (pence)</Label>
            <Input
              id="doc-price"
              name="priceInPence"
              type="number"
              min={0}
              defaultValue={300}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="doc-title">Title</Label>
          <Input
            id="doc-title"
            name="title"
            placeholder="e.g. Official Copy — Title Register"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="doc-desc">Description</Label>
          <Textarea id="doc-desc" name="description" rows={2} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="doc-file">PDF file</Label>
          <Input
            id="doc-file"
            name="file"
            type="file"
            accept="application/pdf"
            required
          />
        </div>

        <Button type="submit" size="sm" variant="outline" disabled={pending}>
          <Plus className="h-4 w-4" /> {pending ? "Uploading…" : "Add document"}
        </Button>
      </form>
    </div>
  );
}
