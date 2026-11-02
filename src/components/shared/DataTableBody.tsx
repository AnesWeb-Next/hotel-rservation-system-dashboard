import {
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Column } from "./dataTableTypes";

interface DataTableBodyProps<T extends { _id: string }> {
  loading: boolean;
  paginatedData: T[];
  columns: Column<T>[];
  actions?: (item: T) => React.ReactNode;
  onRowClick?: (item: T) => void;
  emptyMessage: string;
}

function getCellValue<T>(item: T, column: Column<T>): React.ReactNode {
  if (column.render) return column.render(item);
  const value = (item as Record<string, unknown>)[column.key as string];
  if (value === null || value === undefined) return "-";
  return String(value);
}

export function DataTableBody<T extends { _id: string }>({
  loading,
  paginatedData,
  columns,
  actions,
  onRowClick,
  emptyMessage,
}: DataTableBodyProps<T>) {
  if (loading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={columns.length + (actions ? 1 : 0)}
            className="h-24 text-center text-muted-foreground"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              Loading...
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (paginatedData.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={columns.length + (actions ? 1 : 0)}
            className="h-24 text-center text-muted-foreground"
          >
            {emptyMessage}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {paginatedData.map((item) => (
        <TableRow
          key={item._id}
          className={cn(onRowClick && "cursor-pointer hover:bg-muted/50")}
          onClick={() => onRowClick?.(item)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onRowClick?.(item);
          }}
          tabIndex={onRowClick ? 0 : undefined}
        >
          {columns.map((column) => (
            <TableCell key={String(column.key)} className={column.className}>
              {getCellValue(item, column)}
            </TableCell>
          ))}
          {actions ? (
            <TableCell onClick={(e) => e.stopPropagation()}>
              {actions(item)}
            </TableCell>
          ) : null}
        </TableRow>
      ))}
    </TableBody>
  );
}
