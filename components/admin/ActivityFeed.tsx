import { Activity } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils/formatters";
import type { ActivityLogEntry } from "@/lib/types/admin";

interface ActivityFeedProps {
  logs: ActivityLogEntry[];
}

export function ActivityFeed({ logs }: ActivityFeedProps) {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-h4 font-semibold text-navy-deep dark:text-ivory">Recent Activity</h3>
      <div className="mt-5 space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3 border-b border-gold-primary/10 pb-4 last:border-0 last:pb-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-mist text-gold-dark">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <p className="text-body-sm text-navy-deep dark:text-ivory">
                <span className="font-semibold">{log.admin_name ?? "System"}</span> {log.action}
                {log.entity_label ? ` ${log.entity_label}` : ""}
              </p>
              <p className="text-caption text-navy-soft/55 dark:text-ivory/45">{formatTimeAgo(log.created_at)}</p>
            </div>
          </div>
        ))}
        {logs.length === 0 ? (
          <p className="text-body-sm text-navy-soft/60 dark:text-ivory/50">No activity recorded yet.</p>
        ) : null}
      </div>
    </div>
  );
}
