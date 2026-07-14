import Link from "next/link";
import { SearchCheck, ArrowRight } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { DASHBOARD_NAV } from "../nav";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export const metadata = { title: "My searches" };

export default async function SearchesPage() {
  const user = await requireUser();

  const searches = await prisma.searchLog.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <DashboardShell
      title="My searches"
      subtitle="Your recent property searches."
      nav={DASHBOARD_NAV}
    >
      {searches.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-card p-12 text-center">
          <SearchCheck className="mx-auto h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold">No searches yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your property searches will be recorded here.
          </p>
          <Button asChild className="mt-5">
            <Link href="/search">Start searching</Link>
          </Button>
        </div>
      ) : (
        <ul className="divide-y rounded-xl border bg-card shadow-sm">
          {searches.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between gap-3 p-4"
            >
              <div>
                <p className="font-medium">“{s.query}”</p>
                <p className="text-sm text-muted-foreground">
                  {s.results} result{s.results === 1 ? "" : "s"} ·{" "}
                  {formatDate(s.createdAt)}
                </p>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/search?q=${encodeURIComponent(s.query)}`}>
                  Search again <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </DashboardShell>
  );
}
