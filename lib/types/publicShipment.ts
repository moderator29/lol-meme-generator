import type {
  PackageType,
  PriorityLevel,
  ShipmentStatus,
  ShipmentTimelineEvent,
  ShippingMethod,
} from "@/lib/types/shipment";

export interface PublicShipment {
  tracking_id: string;
  sender_first_name: string;
  sender_city: string | null;
  origin_country: string;
  receiver_first_name: string;
  receiver_city: string | null;
  destination_country: string;
  package_type: PackageType;
  package_description: string | null;
  weight_kg: number | null;
  item_count: number;
  shipping_method: ShippingMethod;
  priority_level: PriorityLevel;
  current_location: string | null;
  current_status: ShipmentStatus;
  expected_delivery_date: string | null;
  actual_delivery_date: string | null;
  public_notes: string | null;
  created_at: string;
  updated_at: string;
  timeline: ShipmentTimelineEvent[];
}
