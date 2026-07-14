import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { ADMIN_NAV } from "../nav";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Users" };

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
    take: 200,
  });

  return (
    <DashboardShell
      title="Users"
      subtitle={`${users.length} registered user${users.length === 1 ? "" : "s"}.`}
      nav={ADMIN_NAV}
    >
      <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-muted-foreground">
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Role</th>
              <th className="p-3 font-medium">Orders</th>
              <th className="p-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const name = [u.firstName, u.lastName].filter(Boolean).join(" ");
              return (
                <tr key={u.id} className="border-b last:border-0">
                  <td className="p-3">{name || "—"}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <Badge variant={u.role === "ADMIN" ? "default" : "secondary"}>
                      {u.role === "ADMIN" ? "Admin" : "User"}
                    </Badge>
                  </td>
                  <td className="p-3">{u._count.orders}</td>
                  <td className="whitespace-nowrap p-3 text-muted-foreground">
                    {formatDate(u.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
