import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { PropertyForm } from "@/components/property-form";
import { Card } from "@/components/ui/card";
import { ADMIN_NAV } from "../../nav";

export const metadata = { title: "Add property" };

export default function NewPropertyPage() {
  return (
    <DashboardShell
      title="Add property"
      subtitle="Create a new registry entry. You can add images and documents after saving."
      nav={ADMIN_NAV}
    >
      <Link
        href="/admin/properties"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Back to properties
      </Link>
      <Card className="p-6">
        <PropertyForm />
      </Card>
    </DashboardShell>
  );
}
