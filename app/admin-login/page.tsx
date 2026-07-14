import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "@/components/admin-login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authEnabled } from "@/lib/auth";
import { hasAdminAccess } from "@/lib/admin-gate";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin sign in" };

export default async function AdminLoginPage() {
  // If Clerk is configured, this password gate isn't used.
  if (authEnabled()) redirect("/admin");
  // Already unlocked? Go straight in.
  if (await hasAdminAccess()) redirect("/admin");

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <CardTitle>Admin access</CardTitle>
          <CardDescription>
            Enter the admin password to manage properties, images and orders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
