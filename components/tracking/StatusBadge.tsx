import * as Icons from "lucide-react";
import { STATUS_CONFIG } from "@/lib/utils/statusConfig";
import type { ShipmentStatus } from "@/lib/types/shipment";

interface StatusBadgeProps {
  status: ShipmentStatus;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const IconComponent = (Icons[config.icon as keyof typeof Icons] ?? Icons.Package) as Icons.LucideIcon;

  return (
    <span
      className={`badge border ${size === "sm" ? "text-[10px]" : ""} ${config.isPulse ? "animate-pulse-soft" : ""}`}
      style={{ color: config.color, backgroundColor: config.bgColor, borderColor: config.borderColor }}
    >
      <IconComponent className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {config.label}
    </span>
  );
}
