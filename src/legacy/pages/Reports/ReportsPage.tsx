import { PageLayout } from "@/components/layout/PageLayout";
import { Loader2 } from "lucide-react";
import { useReportsData } from "@/pages/Reports/useReportsData";
import { BorrowingTrendsChart } from "@/pages/Reports/BorrowingTrendsChart";
import { CategoryDistributionChart } from "@/pages/Reports/CategoryDistributionChart";
import { PopularBooksChart } from "@/pages/Reports/PopularBooksChart";
import { MonthlyRevenueChart } from "@/pages/Reports/MonthlyRevenueChart";
import { BookAvailabilityChart } from "@/pages/Reports/BookAvailabilityChart";

const breadcrumbs = [{ label: "Reports" }];

export function ReportsPage() {
  const {
    loading,
    categoryData,
    borrowingTrends,
    statusData,
    revenueData,
    topBooks,
  } = useReportsData();

  if (loading) {
    return (
      <PageLayout
        breadcrumbs={breadcrumbs}
        title="Reports & Analytics"
        description="View library statistics and trends"
      >
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      breadcrumbs={breadcrumbs}
      title="Reports & Analytics"
      description="View library statistics and trends"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BorrowingTrendsChart data={borrowingTrends} />
        <CategoryDistributionChart data={categoryData} />
        <PopularBooksChart data={topBooks} />
        <MonthlyRevenueChart data={revenueData} />
        <BookAvailabilityChart data={statusData} />
      </div>
    </PageLayout>
  );
}
