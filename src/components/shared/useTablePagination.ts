import { useMemo, useCallback } from "react";
interface UseTablePaginationOptions {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  maxVisiblePages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}
export function useTablePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  maxVisiblePages,
  onPageChange,
  onPageSizeChange,
}: UseTablePaginationOptions) {
  const visiblePages = useMemo(() => {
    const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const sidePages = Math.floor((maxVisiblePages - 3) / 2);
      const startPage = Math.max(2, currentPage - sidePages);
      const endPage = Math.min(totalPages - 1, currentPage + sidePages);

      pages.push(1);

      if (startPage > 2) {
        pages.push("ellipsis-start");
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePageClick = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        onPageChange(page);
      }
    },
    [currentPage, onPageChange]
  );

  const handlePageSizeChange = useCallback(
    (value: string) => {
      const newSize = Number(value);
      if (onPageSizeChange && newSize !== pageSize) {
        onPageSizeChange(newSize);
        onPageChange(1);
      }
    },
    [onPageSizeChange, pageSize, onPageChange]
  );

  return {
    visiblePages,
    startItem,
    endItem,
    handlePrevious,
    handleNext,
    handlePageClick,
    handlePageSizeChange,
  };
}
