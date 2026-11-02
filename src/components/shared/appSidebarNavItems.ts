import {
  BarChart3,
  Book,
  FileText,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Tags,
  UserCircle,
  Users,
} from "lucide-react";

export const mainNavItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Books", href: "/books", icon: Book },
  { label: "Borrowings", href: "/borrowings", icon: FileText },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
];

export const managementNavItems = [
  { label: "Categories", href: "/categories", icon: Tags },
  { label: "Authors", href: "/authors", icon: UserCircle },
  { label: "Users", href: "/users", icon: Users },
];

export const otherNavItems = [
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];
