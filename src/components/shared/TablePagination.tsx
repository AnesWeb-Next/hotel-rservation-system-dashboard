import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useTablePagination } from "./useTablePagination";
import { PageSizeSelector } from "./PageSizeSelector";
import { PaginationPageList } from "./PaginationPageList";
import type { TablePaginationProps } from "./tablePaginationTypes";

export type { TablePaginationProps };

export function TablePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  onPageChange,
  onPageSizeChange,
  maxVisiblePages = 5,
  showPageSizeSelector = true,
  showItemsCount = true,
  className,
}: TablePaginationProps) {
  const {
    visiblePages,
    startItem,
    endItem,
    handlePrevious,
    handleNext,
    handlePageClick,
    handlePageSizeChange,
  } = useTablePagination({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    maxVisiblePages,
    onPageChange,
    onPageSizeChange,
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full py-4",
        className
      )}
    >
      {showItemsCount && (
        <span className="min-w-fit">
          Showing {startItem}-{endItem} of {totalItems}
        </span>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              aria-disabled={currentPage === 1}
              className={cn(
                currentPage === 1 && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
          <PaginationPageList
            visiblePages={visiblePages}
            currentPage={currentPage}
            onPageClick={handlePageClick}
          />
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              aria-disabled={currentPage === totalPages}
              className={cn(
                currentPage === totalPages && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {showPageSizeSelector && onPageSizeChange && (
        <PageSizeSelector
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
