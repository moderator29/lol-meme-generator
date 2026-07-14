import Link from "next/link";
import { SearchX } from "lucide-react";
import { SearchForm } from "@/components/search-form";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { searchProperties } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Search property records" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = await searchProperties(query);

  // Record the search against the signed-in user for their dashboard history.
  if (query) {
    const user = await getCurrentUser();
    if (user) {
      await prisma.searchLog
        .create({
          data: { userId: user.id, query, results: results.length },
        })
        .catch(() => undefined);
    }
  }

  return (
    <div className="bg-secondary/30">
      {/* Search bar band */}
      <div className="border-b bg-brand text-brand-foreground">
        <div className="container py-8">
          <h1 className="text-xl font-bold sm:text-2xl">
            {query ? (
              <>
                Results for{" "}
                <span className="text-accent">“{query}”</span>
              </>
            ) : (
              "Browse property records"
            )}
          </h1>
          <div className="mt-4 max-w-2xl rounded-xl bg-white p-2 shadow">
            <SearchForm defaultValue={query} size="default" />
          </div>
          <p className="mt-3 text-sm text-brand-foreground/70">
            {results.length} propert{results.length === 1 ? "y" : "ies"} found
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="container py-10">
        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-xl border bg-card p-10 text-center shadow-sm">
            <SearchX className="mx-auto h-10 w-10 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">No properties found</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We couldn&apos;t find any registered properties matching{" "}
              <span className="font-medium">“{query}”</span>. Try a different
              postcode, street or town.
            </p>
            <Button asChild variant="outline" className="mt-5">
              <Link href="/search">Clear search</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
