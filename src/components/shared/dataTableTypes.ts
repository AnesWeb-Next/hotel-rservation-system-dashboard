export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: Array<keyof T>;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  actions?: (item: T) => React.ReactNode;
  loading?: boolean;
}
