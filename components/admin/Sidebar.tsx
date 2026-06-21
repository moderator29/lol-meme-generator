"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, BarChart3, Activity, Settings, LogOut, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { logoutAdmin } from "@/lib/actions/auth";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/shipments", label: "Shipments", icon: Package },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/activity", label: "Activity", icon: Activity },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1">
      {LINKS.map((link) => {
        const Icon = link.icon;
        const isActive = pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-body-sm font-medium transition-colors",
              isActive ? "bg-gold-mist text-gold-dark" : "text-navy-soft/75 hover:bg-gold-mist/50 dark:text-ivory/70"
            )}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-gold-primary/15 bg-white/60 p-5 backdrop-blur-glass dark:bg-navy-mid/60 lg:flex">
        <Logo />
        <div className="mt-10 flex flex-1 flex-col">
          <NavLinks pathname={pathname} />
        </div>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-body-sm font-medium text-status-red transition-colors hover:bg-status-red/10"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </form>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-gold-primary/15 bg-white/80 px-4 py-3 backdrop-blur-glass dark:bg-navy-mid/80 lg:hidden">
        <Logo />
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-primary/25"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-navy-deep/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile slide-out panel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gold-primary/15 bg-white p-5 dark:bg-navy-mid transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-primary/25"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-8 flex flex-1 flex-col">
          <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
        </div>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-body-sm font-medium text-status-red transition-colors hover:bg-status-red/10"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </form>
      </aside>
    </>
  );
}
