import { LayoutDashboard, FileText, SearchCheck, UserCog } from "lucide-react";
import type { NavItem } from "@/components/dashboard-nav";

export const DASHBOARD_NAV: NavItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    href: "/dashboard/documents",
    label: "My Documents",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    href: "/dashboard/searches",
    label: "My Searches",
    icon: <SearchCheck className="h-4 w-4" />,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: <UserCog className="h-4 w-4" />,
  },
];
