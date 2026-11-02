import React from "react";
import { PaginationInfo } from "./PaginationInfo";
import { PaginationNav } from "./PaginationNav";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 25, 50, 100],
}: PaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      <PaginationInfo
        startItem={startItem}
        endItem={endItem}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        pageSizeOptions={pageSizeOptions}
      />
      <PaginationNav
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
