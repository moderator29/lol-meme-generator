export type ShipmentStatus =
  | "shipment_created"
  | "package_collected"
  | "received_at_origin_facility"
  | "quality_inspection"
  | "sorting_facility"
  | "awaiting_dispatch"
  | "departed_origin_hub"
  | "in_transit"
  | "international_transit"
  | "customs_clearance"
  | "arrived_at_destination_country"
  | "destination_processing_center"
  | "out_for_delivery"
  | "delivery_attempted"
  | "delivered_successfully"
  | "returned_to_sender"
  | "shipment_closed";

export type PackageType =
  | "document"
  | "parcel"
  | "fragile"
  | "freight"
  | "pallet"
  | "oversized"
  | "liquid"
  | "perishable"
  | "electronics"
  | "medical";

export type ShippingMethod =
  | "economy"
  | "standard"
  | "express"
  | "overnight"
  | "same_day"
  | "freight"
  | "charter";

export type PriorityLevel = "low" | "normal" | "high" | "critical" | "emergency";

export type PaymentStatus = "unpaid" | "pending" | "paid" | "refunded" | "waived";

export interface Shipment {
  id: string;
  tracking_id: string;
  sender_name: string;
  sender_phone: string | null;
  sender_email: string | null;
  sender_address: string | null;
  sender_postal_code: string | null;
  origin_country: string;
  origin_country_code: string | null;
  origin_state: string | null;
  origin_city: string | null;
  receiver_name: string;
  receiver_phone: string | null;
  receiver_email: string | null;
  receiver_address: string | null;
  receiver_postal_code: string | null;
  destination_country: string;
  destination_country_code: string | null;
  destination_state: string | null;
  destination_city: string | null;
  package_type: PackageType;
  package_description: string | null;
  weight_kg: number | null;
  length_cm: number | null;
  width_cm: number | null;
  height_cm: number | null;
  declared_value: number | null;
  currency: string;
  item_count: number;
  shipping_method: ShippingMethod;
  priority_level: PriorityLevel;
  insurance_enabled: boolean;
  insurance_value: number | null;
  payment_status: PaymentStatus;
  shipping_fee: number | null;
  current_location: string | null;
  current_latitude: number | null;
  current_longitude: number | null;
  current_status: ShipmentStatus;
  expected_delivery_date: string | null;
  actual_delivery_date: string | null;
  delivery_signature: string | null;
  delivery_photo_url: string | null;
  special_instructions: string | null;
  internal_notes: string | null;
  public_notes: string | null;
  created_by: string | null;
  last_updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ShipmentTimelineEvent {
  id: string;
  shipment_id: string;
  status: ShipmentStatus;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  note: string | null;
  internal_note: string | null;
  is_public: boolean;
  created_by: string | null;
  created_at: string;
}

export interface DashboardStats {
  total_shipments: number;
  active_shipments: number;
  total_delivered: number;
  out_for_delivery: number;
  pending: number;
  returned: number;
  created_today: number;
  delivered_today: number;
  countries_served: number;
  delivery_success_rate: number | null;
}

export interface ShipmentFormInput {
  sender_name: string;
  sender_phone?: string;
  sender_email?: string;
  sender_address?: string;
  sender_postal_code?: string;
  origin_country: string;
  origin_country_code?: string;
  origin_state?: string;
  origin_city?: string;
  receiver_name: string;
  receiver_phone?: string;
  receiver_email?: string;
  receiver_address?: string;
  receiver_postal_code?: string;
  destination_country: string;
  destination_country_code?: string;
  destination_state?: string;
  destination_city?: string;
  package_type: PackageType;
  package_description?: string;
  weight_kg?: number;
  length_cm?: number;
  width_cm?: number;
  height_cm?: number;
  declared_value?: number;
  currency?: string;
  item_count?: number;
  shipping_method: ShippingMethod;
  priority_level: PriorityLevel;
  insurance_enabled?: boolean;
  insurance_value?: number;
  shipping_fee?: number;
  expected_delivery_date?: string;
  special_instructions?: string;
  internal_notes?: string;
  public_notes?: string;
}
