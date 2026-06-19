"use client";

import { motion } from "framer-motion";
import { STATUS_CONFIG } from "@/lib/utils/statusConfig";
import type { ShipmentStatus } from "@/lib/types/shipment";

interface StatusProgressBarProps {
  status: ShipmentStatus;
}

export function StatusProgressBar({ status }: StatusProgressBarProps) {
  const config = STATUS_CONFIG[status];
  const isReturned = status === "returned_to_sender";

  return (
    <div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-navy-deep/8 dark:bg-ivory/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${config.progress}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="h-full rounded-full"
          style={{ background: isReturned ? "#EF4444" : "linear-gradient(90deg, #E8C96B, #C9A84C)" }}
        />
      </div>
      <div className="mt-2 flex justify-between text-caption text-navy-soft/60 dark:text-ivory/50">
        <span>Created</span>
        <span>{config.progress}%</span>
        <span>{isReturned ? "Returned" : "Delivered"}</span>
      </div>
    </div>
  );
}
