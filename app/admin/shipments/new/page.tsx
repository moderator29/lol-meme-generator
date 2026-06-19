export const dynamic = "force-dynamic";

import { TopBar } from "@/components/admin/TopBar";
import { ShipmentForm } from "@/components/admin/ShipmentForm";

export default function NewShipmentPage() {
  return (
    <div>
      <TopBar title="New Shipment" subtitle="Create a new shipment and generate a tracking number" />
      <div className="p-6">
        <ShipmentForm />
      </div>
    </div>
  );
}
