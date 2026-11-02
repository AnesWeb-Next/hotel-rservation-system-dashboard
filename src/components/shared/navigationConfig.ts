import {
  LayoutDashboard,
  Book,
  Users,
  FileText,
  ShoppingCart,
  Tags,
  BarChart3,
  Settings,
  UserCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Books", href: "/books", icon: Book },
  { label: "Authors", href: "/authors", icon: UserCircle },
  { label: "Borrowings", href: "/borrowings", icon: FileText },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Users", href: "/users", icon: Users },
  { label: "Categories", href: "/categories", icon: Tags },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];
