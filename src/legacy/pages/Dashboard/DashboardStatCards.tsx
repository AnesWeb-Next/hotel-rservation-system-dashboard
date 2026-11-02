import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  Book as BookIcon,
  Users,
  ShoppingCart,
  Clock,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import type { DashboardStats } from "@/types/dashboard";

interface DashboardStatCardsProps {
  stats: DashboardStats;
}

export function DashboardStatCards({ stats }: DashboardStatCardsProps) {
  const statCards = [
    {
      label: "Total Books",
      value: stats.books.total,
      icon: BookIcon,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Available Books",
      value: stats.books.active,
      icon: BookOpen,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Active Users",
      value: stats.users.active,
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Active Borrowings",
      value: stats.borrows.active,
      icon: Clock,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      label: "Overdue",
      value: stats.borrows.overdue,
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      label: "Pending Orders",
      value: stats.orders.pending,
      icon: ShoppingCart,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Total Orders",
      value: stats.orders.total,
      icon: TrendingUp,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(stats.orders.revenue),
      icon: DollarSign,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
