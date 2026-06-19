export const dynamic = "force-dynamic";

import { TopBar } from "@/components/admin/TopBar";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { getActivityLogs } from "@/lib/actions/analytics";
import type { ActivityLogEntry } from "@/lib/types/admin";

export default async function AdminActivityPage() {
  const logs = (await getActivityLogs(50)) as ActivityLogEntry[];

  return (
    <div>
      <TopBar title="Activity" subtitle="A full audit trail of administrative actions" />
      <div className="p-6">
        <ActivityFeed logs={logs} />
      </div>
    </div>
  );
}
