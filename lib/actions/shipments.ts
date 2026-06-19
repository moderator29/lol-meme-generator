"use server";

import { revalidatePath } from "next/cache";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { firstNameOnly } from "@/lib/utils/formatters";
import type { PublicShipment } from "@/lib/types/publicShipment";
import type { Shipment, ShipmentFormInput, ShipmentStatus } from "@/lib/types/shipment";

export async function getShipmentByTrackingId(trackingId: string): Promise<PublicShipment | null> {
  const supabase = createClient();
  const { data: shipment, error } = await supabase
    .from("shipments")
    .select("*")
    .eq("tracking_id", trackingId.toUpperCase())
    .maybeSingle();

  if (error || !shipment) return null;

  const { data: timeline } = await supabase
    .from("shipment_timeline")
    .select("*")
    .eq("shipment_id", shipment.id)
    .eq("is_public", true)
    .order("created_at", { ascending: true });

  return {
    tracking_id: shipment.tracking_id,
    sender_first_name: firstNameOnly(shipment.sender_name),
    sender_city: shipment.origin_city,
    origin_country: shipment.origin_country,
    receiver_first_name: firstNameOnly(shipment.receiver_name),
    receiver_city: shipment.destination_city,
    destination_country: shipment.destination_country,
    package_type: shipment.package_type,
    package_description: shipment.package_description,
    weight_kg: shipment.weight_kg,
    item_count: shipment.item_count,
    shipping_method: shipment.shipping_method,
    priority_level: shipment.priority_level,
    current_location: shipment.current_location,
    current_status: shipment.current_status,
    expected_delivery_date: shipment.expected_delivery_date,
    actual_delivery_date: shipment.actual_delivery_date,
    public_notes: shipment.public_notes,
    created_at: shipment.created_at,
    updated_at: shipment.updated_at,
    timeline: timeline ?? [],
  };
}

export async function listShipments(params: { search?: string; status?: ShipmentStatus; page?: number; pageSize?: number } = {}) {
  const supabase = createClient();
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;
  let query = supabase.from("shipments").select("*", { count: "exact" }).order("created_at", { ascending: false });

  if (params.status) query = query.eq("current_status", params.status);
  if (params.search) {
    query = query.or(
      `tracking_id.ilike.%${params.search}%,sender_name.ilike.%${params.search}%,receiver_name.ilike.%${params.search}%`
    );
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, count, error } = await query.range(from, to);

  if (error) throw new Error(error.message);
  return { shipments: (data ?? []) as Shipment[], total: count ?? 0 };
}

export async function getShipmentById(id: string): Promise<Shipment | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("shipments").select("*").eq("id", id).maybeSingle();
  if (error) return null;
  return data as Shipment | null;
}

export async function createShipment(input: ShipmentFormInput) {
  const supabase = createServiceClient();
  const { data, error } = await supabase.from("shipments").insert(input).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/shipments");
  return data as Shipment;
}

export async function updateShipment(id: string, input: Partial<ShipmentFormInput>) {
  const supabase = createServiceClient();
  const { data, error } = await supabase.from("shipments").update(input).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/shipments");
  revalidatePath(`/admin/shipments/${id}/edit`);
  return data as Shipment;
}

export async function deleteShipment(id: string) {
  const supabase = createServiceClient();
  const { error } = await supabase.from("shipments").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/shipments");
}

export async function getDashboardStats() {
  const supabase = createClient();
  const { data, error } = await supabase.from("dashboard_stats").select("*").maybeSingle();
  if (error) return null;
  return data;
}
