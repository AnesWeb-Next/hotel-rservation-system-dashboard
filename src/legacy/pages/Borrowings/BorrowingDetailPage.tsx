import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { StatusActions } from "@/components/shared/StatusActions";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { getBorrowingById } from "@/api/endpoints/borrowings";
import { getBorrowActions } from "@/lib/status-transitions";
import type { Book } from "@/types/book";
import { BookOpen, Loader2 } from "lucide-react";
import { useBorrowingDetailMutations } from "./useBorrowingDetailMutations";
import { BorrowingDetailMainCard } from "./BorrowingDetailMainCard";
import { getBookTitle } from "./borrowingDetailUtils";
import { buildBorrowingSideCards } from "./BorrowingDetailSideCards";
import { executeBorrowStatusAction } from "./borrowingStatusAction";

export function BorrowingDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: borrowingResponse, isLoading: loading } = useQuery({
    queryKey: ["borrowings", id],
    queryFn: () => getBorrowingById(id!),
    enabled: Boolean(id),
  });
  const borrowing = borrowingResponse?.data ?? null;

  const { approveAsync, rejectAsync, returnAsync } =
    useBorrowingDetailMutations(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!borrowing) {
    return (
      <DetailPageLayout
        breadcrumbs={[
          { label: "Borrowings", href: "/borrowings" },
          { label: "Not Found" },
        ]}
        title="Borrowing not found"
        backHref="/borrowings"
        mainCard={
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">Borrowing not found</h2>
              <p className="text-muted-foreground mt-2">
                The borrowing record you&apos;re looking for doesn&apos;t exist.
              </p>
            </CardContent>
          </Card>
        }
      />
    );
  }

  const handleBorrowStatusChange = (newStatus: string) =>
    executeBorrowStatusAction(
      newStatus,
      borrowing._id,
      approveAsync,
      rejectAsync,
      returnAsync,
    );

  const isOverdue =
    borrowing.status === "active" && new Date(borrowing.dueDate) < new Date();

  const borrowActions = getBorrowActions(borrowing.status);

  const actions =
    borrowActions.length > 0 ? (
      <StatusActions
        actions={borrowActions}
        onStatusChange={handleBorrowStatusChange}
      />
    ) : undefined;

  return (
    <DetailPageLayout
      breadcrumbs={[
        { label: "Borrowings", href: "/borrowings" },
        { label: `#${borrowing._id.slice(-6)}` },
      ]}
      title="Borrowing Details"
      subtitle={getBookTitle(borrowing.book as Book)}
      backHref="/borrowings"
      actions={actions}
      mainCard={
        <BorrowingDetailMainCard borrowing={borrowing} isOverdue={isOverdue} />
      }
      sideCards={buildBorrowingSideCards(borrowing, isOverdue)}
    />
  );
}
