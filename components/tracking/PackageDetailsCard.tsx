import { Package, Weight, Boxes, Zap, Flag } from "lucide-react";
import { formatWeight, titleCase } from "@/lib/utils/formatters";
import type { PublicShipment } from "@/lib/types/publicShipment";

interface PackageDetailsCardProps {
  shipment: PublicShipment;
}

export function PackageDetailsCard({ shipment }: PackageDetailsCardProps) {
  const rows = [
    { icon: Package, label: "Package Type", value: titleCase(shipment.package_type) },
    { icon: Weight, label: "Weight", value: formatWeight(shipment.weight_kg) },
    { icon: Boxes, label: "Item Count", value: String(shipment.item_count) },
    { icon: Zap, label: "Shipping Method", value: titleCase(shipment.shipping_method) },
    { icon: Flag, label: "Priority", value: titleCase(shipment.priority_level) },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-h4 font-semibold text-navy-deep dark:text-ivory">Package Details</h3>
      <div className="mt-5 space-y-3">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <div key={row.label} className="flex items-center justify-between border-b border-gold-primary/10 pb-3 last:border-0 last:pb-0">
              <span className="flex items-center gap-2 text-body-sm text-navy-soft/70 dark:text-ivory/60">
                <Icon className="h-4 w-4 text-gold-dark" /> {row.label}
              </span>
              <span className="font-semibold text-navy-deep dark:text-ivory">{row.value}</span>
            </div>
          );
        })}
        {shipment.package_description ? (
          <p className="pt-2 text-body-sm text-navy-soft/65 dark:text-ivory/55">{shipment.package_description}</p>
        ) : null}
      </div>
    </div>
  );
}
