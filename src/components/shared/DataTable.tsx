import { useState, useMemo } from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/shared/TablePagination";
import { useDataTableSort } from "./useDataTableSort";
import { DataTableBody } from "./DataTableBody";
import type { Column, DataTableProps } from "./dataTableTypes";

export type { Column, DataTableProps };

export function DataTable<T extends { _id: string }>({
  data,
  columns,
  pageSize = 10,
  onRowClick,
  emptyMessage = "No data found.",
  actions,
  loading = false,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const { sortedData, handleSort, getSortIcon } = useDataTableSort(data);
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, i) => (
              <TableHead
                key={String(column.key) + i}
                className={column.className}
              >
                {column.sortable ? (
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => handleSort(String(column.key))}
                    className="h-8 p-0 font-medium hover:bg-transparent"
                  >
                    {column.header}
                    {getSortIcon(String(column.key))}
                  </Button>
                ) : (
                  column.header
                )}
              </TableHead>
            ))}
            {actions ? (
              <TableHead className="w-25">Actions</TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <DataTableBody
          loading={loading}
          paginatedData={paginatedData}
          columns={columns}
          actions={actions}
          onRowClick={onRowClick}
          emptyMessage={emptyMessage}
        />
      </Table>
      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedData.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          showPageSizeSelector={false}
          showItemsCount={true}
        />
      )}
    </div>
  );
}
