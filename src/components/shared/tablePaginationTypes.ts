export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  maxVisiblePages?: number;
  showPageSizeSelector?: boolean;
  showItemsCount?: boolean;
  className?: string;
}
