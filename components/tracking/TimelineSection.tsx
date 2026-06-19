"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { STATUS_CONFIG } from "@/lib/utils/statusConfig";
import { formatTrackingDateTime, formatTimeAgo } from "@/lib/utils/formatters";
import type { ShipmentTimelineEvent } from "@/lib/types/shipment";

interface TimelineSectionProps {
  events: ShipmentTimelineEvent[];
}

export function TimelineSection({ events }: TimelineSectionProps) {
  const sorted = [...events].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-h4 font-semibold text-navy-deep dark:text-ivory">Shipment Journey</h3>
      <div className="mt-6 space-y-6">
        {sorted.map((event, index) => {
          const config = STATUS_CONFIG[event.status];
          const IconComponent = (Icons[config.icon as keyof typeof Icons] ?? Icons.Package) as Icons.LucideIcon;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative flex gap-4 pl-1"
            >
              {index !== sorted.length - 1 ? (
                <span className="absolute left-[19px] top-9 h-full w-px bg-gold-primary/20" />
              ) : null}
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: config.bgColor, color: config.color }}
              >
                <IconComponent className="h-4 w-4" />
              </div>
              <div className="pb-2">
                <p className="font-semibold text-navy-deep dark:text-ivory">{config.label}</p>
                {event.location ? (
                  <p className="text-body-sm text-navy-soft/70 dark:text-ivory/60">{event.location}</p>
                ) : null}
                {event.note ? (
                  <p className="mt-1 text-body-sm text-navy-soft/60 dark:text-ivory/50">{event.note}</p>
                ) : null}
                <p className="mt-1 text-caption text-navy-soft/50 dark:text-ivory/40">
                  {formatTrackingDateTime(event.created_at)} · {formatTimeAgo(event.created_at)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
