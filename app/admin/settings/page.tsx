export const dynamic = "force-dynamic";

import { TopBar } from "@/components/admin/TopBar";
import { getCurrentAdminEmail } from "@/lib/actions/auth";

export default async function AdminSettingsPage() {
  const email = await getCurrentAdminEmail();

  return (
    <div>
      <TopBar title="Settings" subtitle="Account and platform preferences" />
      <div className="p-6">
        <div className="glass-card max-w-md p-6">
          <h3 className="font-display text-h4 font-semibold text-navy-deep dark:text-ivory">Signed In As</h3>
          <p className="mt-2 text-body-sm text-navy-soft/70 dark:text-ivory/60">{email ?? "Not signed in"}</p>
        </div>
      </div>
    </div>
  );
}
