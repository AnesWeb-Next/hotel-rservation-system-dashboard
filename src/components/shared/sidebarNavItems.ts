import {
  LayoutDashboard,
  Book,
  Users,
  FileText,
  ShoppingCart,
  Tags,
  BarChart3,
  Settings,
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Books", href: "/books", icon: Book },
  { label: "Borrowings", href: "/borrowings", icon: FileText },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Users", href: "/users", icon: Users },
  { label: "Categories", href: "/categories", icon: Tags },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];
