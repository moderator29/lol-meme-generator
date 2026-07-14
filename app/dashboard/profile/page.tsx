import { DashboardShell } from "@/components/dashboard-shell";
import { ProfileForm } from "@/components/profile-form";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DASHBOARD_NAV } from "../nav";
import { requireUser } from "@/lib/auth";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const user = await requireUser();

  return (
    <DashboardShell
      title="Profile"
      subtitle="Update your account details."
      nav={DASHBOARD_NAV}
    >
      <div className="max-w-2xl space-y-6">
        <Card className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your details</h2>
            {user.role === "ADMIN" && <Badge>Admin</Badge>}
          </div>
          <ProfileForm
            firstName={user.firstName ?? ""}
            lastName={user.lastName ?? ""}
            email={user.email}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Account</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Member since</dt>
              <dd>{formatDate(user.createdAt)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Account type</dt>
              <dd className="font-medium">
                {user.role === "ADMIN" ? "Administrator" : "Standard"}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </DashboardShell>
  );
}
