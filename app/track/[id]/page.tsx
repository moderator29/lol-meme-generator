export const dynamic = "force-dynamic";

import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { ShipmentSummaryCard } from "@/components/tracking/ShipmentSummaryCard";
import { PackageDetailsCard } from "@/components/tracking/PackageDetailsCard";
import { SenderReceiverCard } from "@/components/tracking/SenderReceiverCard";
import { TimelineSection } from "@/components/tracking/TimelineSection";
import { TrackingNotFound } from "@/components/tracking/TrackingNotFound";
import { TrackingSearchBox } from "@/components/tracking/TrackingSearchBox";
import { getShipmentByTrackingId } from "@/lib/actions/shipments";

export default async function TrackResultPage({ params }: { params: { id: string } }) {
  const decodedId = decodeURIComponent(params.id);
  const shipment = await getShipmentByTrackingId(decodedId);

  return (
    <>
      <Navbar />
      <main className="px-4 py-12">
        <div className="mx-auto mb-8 max-w-2xl">
          <TrackingSearchBox initialValue={decodedId} />
        </div>

        {shipment ? (
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <ShipmentSummaryCard shipment={shipment} />
              <TimelineSection events={shipment.timeline} />
            </div>
            <div className="space-y-6">
              <SenderReceiverCard shipment={shipment} />
              <PackageDetailsCard shipment={shipment} />
            </div>
          </div>
        ) : (
          <TrackingNotFound id={decodedId} />
        )}
      </main>
      <Footer />
    </>
  );
}
