"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";
import type { StatusUpdateInput } from "@/lib/utils/validators";
import type { ShipmentTimelineEvent, ShipmentStatus } from "@/lib/types/shipment";

export async function addTimelineEvent(shipmentId: string, input: StatusUpdateInput, createdBy: string | null) {
  const supabase = createServiceClient();
  const status = input.status as ShipmentStatus;

  const { data: event, error } = await supabase
    .from("shipment_timeline")
    .insert({
      shipment_id: shipmentId,
      status,
      location: input.location ?? null,
      note: input.public_note ?? null,
      internal_note: input.internal_note ?? null,
      is_public: true,
      created_by: createdBy,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await supabase
    .from("shipments")
    .update({ current_status: status, current_location: input.location ?? null, last_updated_by: createdBy })
    .eq("id", shipmentId);

  revalidatePath("/admin/shipments");
  revalidatePath(`/admin/shipments/${shipmentId}/edit`);
  return event as ShipmentTimelineEvent;
}

export async function getTimelineForShipment(shipmentId: string): Promise<ShipmentTimelineEvent[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("shipment_timeline")
    .select("*")
    .eq("shipment_id", shipmentId)
    .order("created_at", { ascending: true });
  if (error) return [];
  return data as ShipmentTimelineEvent[];
}
