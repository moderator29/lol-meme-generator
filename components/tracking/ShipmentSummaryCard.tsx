import { Hash, MapPin, Calendar } from "lucide-react";
import { StatusBadge } from "@/components/tracking/StatusBadge";
import { StatusProgressBar } from "@/components/tracking/StatusProgressBar";
import { formatTrackingDate } from "@/lib/utils/formatters";
import { STATUS_CONFIG } from "@/lib/utils/statusConfig";
import type { PublicShipment } from "@/lib/types/publicShipment";

interface ShipmentSummaryCardProps {
  shipment: PublicShipment;
}

export function ShipmentSummaryCard({ shipment }: ShipmentSummaryCardProps) {
  const config = STATUS_CONFIG[shipment.current_status];

  return (
    <div className="glass-card-gold p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 font-mono text-body-sm font-semibold text-gold-dark">
            <Hash className="h-4 w-4" /> {shipment.tracking_id}
          </p>
          <h2 className="mt-2 font-display text-h3 font-bold text-navy-deep dark:text-ivory">{config.label}</h2>
          <p className="mt-1 text-body-sm text-navy-soft/70 dark:text-ivory/60">{config.description}</p>
        </div>
        <StatusBadge status={shipment.current_status} />
      </div>

      <div className="mt-6">
        <StatusProgressBar status={shipment.current_status} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-2xl bg-white/40 p-4 dark:bg-white/5">
          <MapPin className="h-5 w-5 text-gold-dark" />
          <div>
            <p className="text-caption uppercase text-navy-soft/55 dark:text-ivory/45">Current Location</p>
            <p className="font-semibold text-navy-deep dark:text-ivory">{shipment.current_location ?? "In Network"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white/40 p-4 dark:bg-white/5">
          <Calendar className="h-5 w-5 text-gold-dark" />
          <div>
            <p className="text-caption uppercase text-navy-soft/55 dark:text-ivory/45">Estimated Delivery</p>
            <p className="font-semibold text-navy-deep dark:text-ivory">
              {shipment.actual_delivery_date
                ? formatTrackingDate(shipment.actual_delivery_date)
                : formatTrackingDate(shipment.expected_delivery_date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
