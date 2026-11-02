import React from "react";
import { cn } from "@/lib/utils";
import { TablePagination } from "@/components/shared/TablePagination";
import { PageHeader } from "./PageHeader";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  breadcrumbs: readonly BreadcrumbItem[];
  title: string;
  description?: string;
  action?: React.ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  activeFiltersCount?: number;
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({
  breadcrumbs,
  title,
  description,
  action,
  searchPlaceholder = "Search...",
  searchValue,
  onSearch,
  onFilterClick,
  activeFiltersCount = 0,
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 5,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 25, 50, 100],
  children,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={title}
        description={description}
        action={action}
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        onSearch={onSearch}
        onFilterClick={onFilterClick}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-auto p-6">{children}</div>

      {/* Fixed Pagination at Bottom */}
      {showPagination && onPageChange && onPageSizeChange && (
        <div className="border-t bg-background px-6 py-2">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            pageSizeOptions={pageSizeOptions}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      )}
    </div>
  );
}
