import Link from "next/link";
import { Pencil, Eye } from "lucide-react";
import { StatusBadge } from "@/components/tracking/StatusBadge";
import { formatTrackingDate } from "@/lib/utils/formatters";
import type { Shipment } from "@/lib/types/shipment";

interface ShipmentTableProps {
  shipments: Shipment[];
}

export function ShipmentTable({ shipments }: ShipmentTableProps) {
  return (
    <div className="glass-card overflow-x-auto p-0">
      <table className="w-full min-w-[720px] text-left">
        <thead>
          <tr className="border-b border-gold-primary/15 text-caption uppercase text-navy-soft/55 dark:text-ivory/45">
            <th className="px-5 py-4">Tracking ID</th>
            <th className="px-5 py-4">Sender</th>
            <th className="px-5 py-4">Receiver</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Created</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="border-b border-gold-primary/8 text-body-sm last:border-0">
              <td className="px-5 py-4 font-mono font-semibold text-navy-deep dark:text-ivory">{shipment.tracking_id}</td>
              <td className="px-5 py-4 text-navy-soft/75 dark:text-ivory/65">{shipment.sender_name}</td>
              <td className="px-5 py-4 text-navy-soft/75 dark:text-ivory/65">{shipment.receiver_name}</td>
              <td className="px-5 py-4">
                <StatusBadge status={shipment.current_status} size="sm" />
              </td>
              <td className="px-5 py-4 text-navy-soft/65 dark:text-ivory/55">{formatTrackingDate(shipment.created_at)}</td>
              <td className="px-5 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/track/${shipment.tracking_id}`} target="_blank" className="rounded-lg p-2 hover:bg-gold-mist">
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link href={`/admin/shipments/${shipment.id}/edit`} className="rounded-lg p-2 hover:bg-gold-mist">
                    <Pencil className="h-4 w-4" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
          {shipments.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-5 py-10 text-center text-body-sm text-navy-soft/60 dark:text-ivory/50">
                No shipments found.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
