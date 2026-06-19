import { User, MapPinned } from "lucide-react";
import type { PublicShipment } from "@/lib/types/publicShipment";

interface SenderReceiverCardProps {
  shipment: PublicShipment;
}

export function SenderReceiverCard({ shipment }: SenderReceiverCardProps) {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-h4 font-semibold text-navy-deep dark:text-ivory">Route</h3>
      <div className="mt-5 space-y-5">
        <div className="flex items-start gap-3">
          <User className="mt-0.5 h-4 w-4 text-gold-dark" />
          <div>
            <p className="text-caption uppercase text-navy-soft/55 dark:text-ivory/45">From</p>
            <p className="font-semibold text-navy-deep dark:text-ivory">{shipment.sender_first_name}</p>
            <p className="text-body-sm text-navy-soft/65 dark:text-ivory/55">
              {shipment.sender_city ? `${shipment.sender_city}, ` : ""}
              {shipment.origin_country}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPinned className="mt-0.5 h-4 w-4 text-gold-dark" />
          <div>
            <p className="text-caption uppercase text-navy-soft/55 dark:text-ivory/45">To</p>
            <p className="font-semibold text-navy-deep dark:text-ivory">{shipment.receiver_first_name}</p>
            <p className="text-body-sm text-navy-soft/65 dark:text-ivory/55">
              {shipment.receiver_city ? `${shipment.receiver_city}, ` : ""}
              {shipment.destination_country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
