export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { TopBar } from "@/components/admin/TopBar";
import { ShipmentForm } from "@/components/admin/ShipmentForm";
import { TrackingCodeBanner } from "@/components/admin/TrackingCodeBanner";
import { getShipmentById } from "@/lib/actions/shipments";

export default async function EditShipmentPage({ params }: { params: { id: string } }) {
  const shipment = await getShipmentById(params.id);
  if (!shipment) notFound();

  return (
    <div>
      <TopBar
        title={shipment.tracking_id}
        subtitle={`${shipment.sender_name} to ${shipment.receiver_name} · ${shipment.destination_country}`}
      />
      <TrackingCodeBanner trackingId={shipment.tracking_id} />
      <div className="p-6 pt-5">
        <ShipmentForm shipment={shipment} />
      </div>
    </div>
  );
}
