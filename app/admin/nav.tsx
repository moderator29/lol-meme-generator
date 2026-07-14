import { LayoutDashboard, Building2, ShoppingBag, Users } from "lucide-react";
import type { NavItem } from "@/components/dashboard-nav";

export const ADMIN_NAV: NavItem[] = [
  {
    href: "/admin",
    label: "Overview",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    href: "/admin/properties",
    label: "Properties",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: <Users className="h-4 w-4" />,
  },
];
