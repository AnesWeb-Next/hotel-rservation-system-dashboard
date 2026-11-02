import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationInfoProps {
  startItem: number;
  endItem: number;
  totalItems: number;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions: number[];
}

export function PaginationInfo({
  startItem,
  endItem,
  totalItems,
  pageSize,
  onPageSizeChange,
  pageSizeOptions,
}: PaginationInfoProps) {
  const validPageSizeOptions = pageSizeOptions.filter(
    (size) => size && typeof size === "number" && size > 0
  );

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <span>
        Showing {startItem}-{endItem} of {totalItems}
      </span>
      <div className="flex items-center gap-2">
        <span>Per page:</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="w-17.5 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {validPageSizeOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
