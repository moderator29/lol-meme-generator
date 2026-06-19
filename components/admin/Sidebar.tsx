"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, BarChart3, Activity, Settings, LogOut } from "lucide-react";
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-gold-primary/15 bg-white/60 p-5 backdrop-blur-glass dark:bg-navy-mid/60 lg:flex">
      <Logo />
      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
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
      <form action={logoutAdmin}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-body-sm font-medium text-status-red transition-colors hover:bg-status-red/10"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </form>
    </aside>
  );
}
