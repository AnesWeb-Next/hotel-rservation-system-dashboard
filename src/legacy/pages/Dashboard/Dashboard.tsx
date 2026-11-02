import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { getDashboardStats } from "@/api/endpoints/admin";
import { Loader2 } from "lucide-react";
import { DashboardStatCards } from "./DashboardStatCards";

export function Dashboard() {
  const { data: statsResponse, isLoading: loading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboardStats(),
  });
  const stats = statsResponse?.data ?? null;

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageLayout
      breadcrumbs={[{ label: "Dashboard" }]}
      title="Dashboard"
      description="Welcome to the Library Management Admin Dashboard"
    >
      <div className="space-y-8">
        <DashboardStatCards stats={stats} />
      </div>
    </PageLayout>
  );
}
