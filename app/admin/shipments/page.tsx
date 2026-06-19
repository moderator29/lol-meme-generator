export const dynamic = "force-dynamic";

import Link from "next/link";
import { Plus } from "lucide-react";
import { TopBar } from "@/components/admin/TopBar";
import { ShipmentTable } from "@/components/admin/ShipmentTable";
import { Button } from "@/components/ui/Button";
import { listShipments } from "@/lib/actions/shipments";

export default async function AdminShipmentsPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const page = Number(searchParams.page ?? "1");
  const { shipments, total } = await listShipments({ search: searchParams.q, page, pageSize: 20 });
  const totalPages = Math.max(1, Math.ceil(total / 20));

  return (
    <div>
      <TopBar title="Shipments" subtitle={`${total} total shipments`} />
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <form className="w-full max-w-sm">
            <input
              name="q"
              defaultValue={searchParams.q}
              placeholder="Search by tracking number or name"
              className="input-field"
            />
          </form>
          <Link href="/admin/shipments/new">
            <Button>
              <Plus className="h-4 w-4" /> New Shipment
            </Button>
          </Link>
        </div>
        <ShipmentTable shipments={shipments} />
        {totalPages > 1 ? (
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <Link
                key={pageNumber}
                href={`/admin/shipments?page=${pageNumber}${searchParams.q ? `&q=${searchParams.q}` : ""}`}
                className={`rounded-full px-3 py-1 text-body-sm ${pageNumber === page ? "bg-gold-primary text-navy-deep" : "border border-gold-primary/25"}`}
              >
                {pageNumber}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
