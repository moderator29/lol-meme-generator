export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { TopBar } from "@/components/admin/TopBar";
import { ShipmentForm } from "@/components/admin/ShipmentForm";
import { getShipmentById } from "@/lib/actions/shipments";

export default async function EditShipmentPage({ params }: { params: { id: string } }) {
  const shipment = await getShipmentById(params.id);
  if (!shipment) notFound();

  return (
    <div>
      <TopBar title={`Edit ${shipment.tracking_id}`} subtitle="Update shipment details and status" />
      <div className="p-6">
        <ShipmentForm shipment={shipment} />
      </div>
    </div>
  );
}
