"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectNative } from "@/components/ui/select-native";
import { PROPERTY_TYPE_OPTIONS } from "@/lib/format";
import {
  createProperty,
  updateProperty,
  type FormState,
} from "@/app/admin/actions";
import type { Property } from "@prisma/client";

export function PropertyForm({ property }: { property?: Property }) {
  const isEdit = Boolean(property);
  const [state, action, pending] = useActionState<FormState, FormData>(
    isEdit ? updateProperty : createProperty,
    {},
  );

  useEffect(() => {
    if (state.ok) toast.success("Property saved");
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <form action={action} className="space-y-5">
      {property && <input type="hidden" name="id" value={property.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Registry number" htmlFor="registryNumber">
          <Input
            id="registryNumber"
            name="registryNumber"
            defaultValue={property?.registryNumber}
            placeholder="Leave blank to auto-generate"
          />
        </Field>
        <Field label="Property type" htmlFor="propertyType" required>
          <SelectNative
            id="propertyType"
            name="propertyType"
            defaultValue={property?.propertyType ?? "DETACHED"}
          >
            {PROPERTY_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </SelectNative>
        </Field>
      </div>

      <Field label="Address line 1" htmlFor="addressLine1" required>
        <Input
          id="addressLine1"
          name="addressLine1"
          defaultValue={property?.addressLine1}
          placeholder="e.g. 14 Oakfield Gardens"
          required
        />
      </Field>

      <Field label="Address line 2" htmlFor="addressLine2">
        <Input
          id="addressLine2"
          name="addressLine2"
          defaultValue={property?.addressLine2 ?? ""}
          placeholder="Optional"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="City / Town" htmlFor="city" required>
          <Input
            id="city"
            name="city"
            defaultValue={property?.city}
            placeholder="e.g. Manchester"
            required
          />
        </Field>
        <Field label="Postcode" htmlFor="postcode" required>
          <Input
            id="postcode"
            name="postcode"
            defaultValue={property?.postcode}
            placeholder="e.g. M1 4AE"
            required
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Estimated value (£)" htmlFor="estimatedValue" required>
          <Input
            id="estimatedValue"
            name="estimatedValue"
            type="number"
            min={0}
            defaultValue={property?.estimatedValue}
            placeholder="385000"
            required
          />
        </Field>
        <Field label="Tenure" htmlFor="tenure">
          <Input
            id="tenure"
            name="tenure"
            defaultValue={property?.tenure ?? "Freehold"}
          />
        </Field>
        <Field label="Bedrooms" htmlFor="bedrooms">
          <Input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min={0}
            defaultValue={property?.bedrooms ?? ""}
          />
        </Field>
        <Field label="Bathrooms" htmlFor="bathrooms">
          <Input
            id="bathrooms"
            name="bathrooms"
            type="number"
            min={0}
            defaultValue={property?.bathrooms ?? ""}
          />
        </Field>
      </div>

      <Field label="Description" htmlFor="description">
        <Textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={property?.description}
          placeholder="A short description of the property…"
        />
      </Field>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={property?.published ?? true}
          className="h-4 w-4 accent-[hsl(var(--primary))]"
        />
        Published (visible in search results)
      </label>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : isEdit ? "Save changes" : "Create property"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
    </div>
  );
}
