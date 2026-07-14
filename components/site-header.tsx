import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Stars } from "@/components/stars";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import { authEnabled, getCurrentUser } from "@/lib/auth";

const NAV_LINKS = [
  { href: "/search", label: "Search" },
  { href: "/#documents", label: "Title Documents" },
  { href: "/#faq", label: "FAQ" },
];

export async function SiteHeader() {
  const usingClerk = authEnabled();
  const user = await getCurrentUser();
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-40">
      {/* Trust strip */}
      <div className="bg-brand/95 text-brand-foreground">
        <div className="container flex items-center justify-center gap-2 py-1.5 text-xs sm:text-sm">
          <span className="font-semibold">Excellent</span>
          <Stars rating={4} size="h-3.5 w-3.5" />
          <span className="font-semibold">4.2/5</span>
          <span className="hidden text-brand-foreground/70 sm:inline">
            · 2,289 verified reviews
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-white/10 bg-brand text-brand-foreground shadow-sm">
        <div className="container flex h-16 items-center justify-between gap-4">
          <BrandLogo tone="light" />

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-brand-foreground/80 transition-colors hover:text-brand-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {usingClerk ? (
              <UserNav isAdmin={isAdmin} />
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                {isAdmin && (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/admin">Admin</Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
