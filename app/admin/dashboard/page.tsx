export const dynamic = "force-dynamic";

import { Package, Truck, CheckCircle2, Globe2 } from "lucide-react";
import { TopBar } from "@/components/admin/TopBar";
import { KPICard } from "@/components/admin/KPICard";
import { ShipmentTable } from "@/components/admin/ShipmentTable";
import { getDashboardStats, listShipments } from "@/lib/actions/shipments";
import { formatCount } from "@/lib/utils/formatters";

export default async function AdminDashboardPage() {
  const [stats, { shipments }] = await Promise.all([getDashboardStats(), listShipments({ pageSize: 8 })]);

  return (
    <div>
      <TopBar title="Dashboard" subtitle="Overview of your courier network" />
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard label="Total Shipments" value={formatCount(stats?.total_shipments)} icon={Package} />
          <KPICard label="Active Shipments" value={formatCount(stats?.active_shipments)} icon={Truck} />
          <KPICard label="Delivered" value={formatCount(stats?.total_delivered)} icon={CheckCircle2} />
          <KPICard label="Countries Served" value={formatCount(stats?.countries_served)} icon={Globe2} />
        </div>

        <div className="mt-8">
          <h2 className="mb-4 font-display text-h4 font-semibold text-navy-deep dark:text-ivory">Recent Shipments</h2>
          <ShipmentTable shipments={shipments} />
        </div>
      </div>
    </div>
  );
}
