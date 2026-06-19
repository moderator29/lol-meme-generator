export const dynamic = "force-dynamic";

import { TopBar } from "@/components/admin/TopBar";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";
import { getShipmentsByDay, getStatusBreakdown } from "@/lib/actions/analytics";

export default async function AdminAnalyticsPage() {
  const [byDay, byStatus] = await Promise.all([getShipmentsByDay(14), getStatusBreakdown()]);

  return (
    <div>
      <TopBar title="Analytics" subtitle="Shipment volume and status distribution" />
      <div className="p-6">
        <AnalyticsCharts byDay={byDay} byStatus={byStatus} />
      </div>
    </div>
  );
}
