"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { shipmentFormSchema, type ShipmentFormSchema } from "@/lib/utils/validators";
import { createShipment, updateShipment } from "@/lib/actions/shipments";
import type { Shipment } from "@/lib/types/shipment";

const PACKAGE_TYPES = ["document", "parcel", "fragile", "freight", "pallet", "oversized", "liquid", "perishable", "electronics", "medical"];
const SHIPPING_METHODS = ["economy", "standard", "express", "overnight", "same_day", "freight", "charter"];
const PRIORITY_LEVELS = ["low", "normal", "high", "critical", "emergency"];

interface ShipmentFormProps {
  shipment?: Shipment;
}

export function ShipmentForm({ shipment }: ShipmentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<Partial<ShipmentFormSchema>>({
    sender_name: shipment?.sender_name ?? "",
    sender_phone: shipment?.sender_phone ?? "",
    sender_email: shipment?.sender_email ?? "",
    sender_address: shipment?.sender_address ?? "",
    origin_country: shipment?.origin_country ?? "",
    origin_city: shipment?.origin_city ?? "",
    receiver_name: shipment?.receiver_name ?? "",
    receiver_phone: shipment?.receiver_phone ?? "",
    receiver_email: shipment?.receiver_email ?? "",
    receiver_address: shipment?.receiver_address ?? "",
    destination_country: shipment?.destination_country ?? "",
    destination_city: shipment?.destination_city ?? "",
    package_type: shipment?.package_type ?? "parcel",
    package_description: shipment?.package_description ?? "",
    weight_kg: shipment?.weight_kg ?? undefined,
    item_count: shipment?.item_count ?? 1,
    shipping_method: shipment?.shipping_method ?? "standard",
    priority_level: shipment?.priority_level ?? "normal",
    expected_delivery_date: shipment?.expected_delivery_date ?? "",
    special_instructions: shipment?.special_instructions ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof ShipmentFormSchema>(key: K, value: ShipmentFormSchema[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = shipmentFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Please correct the highlighted fields.");
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      if (shipment) {
        await updateShipment(shipment.id, result.data);
        toast.success("Shipment updated successfully.");
      } else {
        const created = await createShipment(result.data);
        toast.success(`Shipment created with tracking number ${created.tracking_id}.`);
        router.push(`/admin/shipments/${created.id}/edit`);
        return;
      }
      router.push("/admin/shipments");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="glass-card p-6">
        <h3 className="font-display text-h4 font-semibold text-navy-deep dark:text-ivory">Sender</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input placeholder="Full name" value={form.sender_name ?? ""} onChange={(e) => update("sender_name", e.target.value)} error={errors.sender_name} />
          <Input placeholder="Phone" value={form.sender_phone ?? ""} onChange={(e) => update("sender_phone", e.target.value)} />
          <Input placeholder="Email" value={form.sender_email ?? ""} onChange={(e) => update("sender_email", e.target.value)} error={errors.sender_email} />
          <Input placeholder="Address" value={form.sender_address ?? ""} onChange={(e) => update("sender_address", e.target.value)} />
          <Input placeholder="Origin country" value={form.origin_country ?? ""} onChange={(e) => update("origin_country", e.target.value)} error={errors.origin_country} />
          <Input placeholder="Origin city" value={form.origin_city ?? ""} onChange={(e) => update("origin_city", e.target.value)} />
        </div>
      </section>

      <section className="glass-card p-6">
        <h3 className="font-display text-h4 font-semibold text-navy-deep dark:text-ivory">Receiver</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input placeholder="Full name" value={form.receiver_name ?? ""} onChange={(e) => update("receiver_name", e.target.value)} error={errors.receiver_name} />
          <Input placeholder="Phone" value={form.receiver_phone ?? ""} onChange={(e) => update("receiver_phone", e.target.value)} />
          <Input placeholder="Email" value={form.receiver_email ?? ""} onChange={(e) => update("receiver_email", e.target.value)} error={errors.receiver_email} />
          <Input placeholder="Address" value={form.receiver_address ?? ""} onChange={(e) => update("receiver_address", e.target.value)} />
          <Input placeholder="Destination country" value={form.destination_country ?? ""} onChange={(e) => update("destination_country", e.target.value)} error={errors.destination_country} />
          <Input placeholder="Destination city" value={form.destination_city ?? ""} onChange={(e) => update("destination_city", e.target.value)} />
        </div>
      </section>

      <section className="glass-card p-6">
        <h3 className="font-display text-h4 font-semibold text-navy-deep dark:text-ivory">Package</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <select
            value={form.package_type}
            onChange={(e) => update("package_type", e.target.value as ShipmentFormSchema["package_type"])}
            className="input-field"
          >
            {PACKAGE_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={form.shipping_method}
            onChange={(e) => update("shipping_method", e.target.value as ShipmentFormSchema["shipping_method"])}
            className="input-field"
          >
            {SHIPPING_METHODS.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
          <select
            value={form.priority_level}
            onChange={(e) => update("priority_level", e.target.value as ShipmentFormSchema["priority_level"])}
            className="input-field"
          >
            {PRIORITY_LEVELS.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <Input
            type="number"
            placeholder="Weight (kg)"
            value={form.weight_kg ?? ""}
            onChange={(e) => update("weight_kg", e.target.value as unknown as number)}
          />
          <Input
            type="number"
            placeholder="Item count"
            value={form.item_count ?? 1}
            onChange={(e) => update("item_count", e.target.value as unknown as number)}
          />
          <Input
            type="date"
            value={form.expected_delivery_date ?? ""}
            onChange={(e) => update("expected_delivery_date", e.target.value)}
          />
        </div>
        <textarea
          placeholder="Package description"
          rows={2}
          value={form.package_description ?? ""}
          onChange={(e) => update("package_description", e.target.value)}
          className="input-field mt-4 resize-none"
        />
        <textarea
          placeholder="Special instructions"
          rows={2}
          value={form.special_instructions ?? ""}
          onChange={(e) => update("special_instructions", e.target.value)}
          className="input-field mt-4 resize-none"
        />
      </section>

      <Button type="submit" isLoading={isSubmitting} size="lg">
        {shipment ? "Save Changes" : "Create Shipment"}
      </Button>
    </form>
  );
}
