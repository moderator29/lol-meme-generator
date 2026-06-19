import type { ShipmentStatus } from "@/lib/types/shipment";

export interface StatusConfigEntry {
  label: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  progress: number;
  isTerminal: boolean;
  isPulse: boolean;
}

const INDIGO = "#6366F1";
const SKY = "#0EA5E9";
const AMBER = "#F59E0B";
const EMERALD = "#10B981";
const GREEN = "#059669";
const RED = "#EF4444";
const GRAY = "#6B7280";

function tint(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function entry(
  color: string,
  label: string,
  description: string,
  icon: string,
  progress: number,
  isTerminal: boolean,
  isPulse: boolean
): StatusConfigEntry {
  return {
    label,
    description,
    icon,
    color,
    bgColor: tint(color, 0.1),
    borderColor: tint(color, 0.3),
    progress,
    isTerminal,
    isPulse,
  };
}

export const STATUS_CONFIG: Record<ShipmentStatus, StatusConfigEntry> = {
  shipment_created: entry(
    INDIGO,
    "Shipment Created",
    "Your shipment has been registered in our system and assigned a tracking number.",
    "PackagePlus",
    5,
    false,
    false
  ),
  package_collected: entry(
    INDIGO,
    "Package Collected",
    "Our courier has collected the package from the sender and it is now in our network.",
    "PackageCheck",
    12,
    false,
    true
  ),
  received_at_origin_facility: entry(
    INDIGO,
    "Received at Origin Facility",
    "The package has arrived at our origin processing facility for sorting.",
    "Warehouse",
    20,
    false,
    false
  ),
  quality_inspection: entry(
    INDIGO,
    "Quality Inspection",
    "The package is undergoing a routine quality and safety inspection before onward processing.",
    "SearchCheck",
    27,
    false,
    false
  ),
  sorting_facility: entry(
    INDIGO,
    "Sorting Facility",
    "The package is being sorted and routed for the next leg of its journey.",
    "Boxes",
    33,
    false,
    false
  ),
  awaiting_dispatch: entry(
    AMBER,
    "Awaiting Dispatch",
    "The package is staged and waiting to be dispatched on the next available route.",
    "Clock",
    40,
    false,
    true
  ),
  departed_origin_hub: entry(
    SKY,
    "Departed Origin Hub",
    "The package has left the origin hub and is now moving toward its destination.",
    "Plane",
    47,
    false,
    true
  ),
  in_transit: entry(
    SKY,
    "In Transit",
    "Your shipment is actively moving through our logistics network toward its destination.",
    "Truck",
    55,
    false,
    true
  ),
  international_transit: entry(
    SKY,
    "International Transit",
    "Your shipment has crossed a border and is travelling between countries.",
    "Globe",
    62,
    false,
    true
  ),
  customs_clearance: entry(
    AMBER,
    "Customs Clearance",
    "The package is being processed by customs authorities at the destination country.",
    "ShieldCheck",
    70,
    false,
    true
  ),
  arrived_at_destination_country: entry(
    SKY,
    "Arrived at Destination Country",
    "The package has arrived in the destination country and is being prepared for local delivery.",
    "MapPinned",
    77,
    false,
    false
  ),
  destination_processing_center: entry(
    INDIGO,
    "Destination Processing Center",
    "The package is being processed at a local facility near the delivery address.",
    "Building2",
    83,
    false,
    false
  ),
  out_for_delivery: entry(
    EMERALD,
    "Out for Delivery",
    "A courier is on the way to deliver your package today.",
    "Truck",
    92,
    false,
    true
  ),
  delivery_attempted: entry(
    AMBER,
    "Delivery Attempted",
    "Our courier attempted delivery but could not complete it. Another attempt will follow.",
    "AlertTriangle",
    93,
    false,
    false
  ),
  delivered_successfully: entry(
    GREEN,
    "Delivered Successfully",
    "The package has been delivered successfully and the journey is complete.",
    "CheckCircle2",
    100,
    true,
    false
  ),
  returned_to_sender: entry(
    RED,
    "Returned to Sender",
    "The package could not be delivered and has been returned to the original sender.",
    "Undo2",
    100,
    true,
    false
  ),
  shipment_closed: entry(
    GRAY,
    "Shipment Closed",
    "This shipment record has been closed and archived in our system.",
    "Lock",
    100,
    true,
    false
  ),
};

export const STATUS_ORDER: ShipmentStatus[] = [
  "shipment_created",
  "package_collected",
  "received_at_origin_facility",
  "quality_inspection",
  "sorting_facility",
  "awaiting_dispatch",
  "departed_origin_hub",
  "in_transit",
  "international_transit",
  "customs_clearance",
  "arrived_at_destination_country",
  "destination_processing_center",
  "out_for_delivery",
  "delivery_attempted",
  "delivered_successfully",
  "returned_to_sender",
  "shipment_closed",
];
