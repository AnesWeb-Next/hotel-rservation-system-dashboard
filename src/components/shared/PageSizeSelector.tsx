import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PageSizeSelectorProps {
  pageSize: number;
  pageSizeOptions: number[];
  onPageSizeChange: (value: string) => void;
}

export function PageSizeSelector({
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
}: PageSizeSelectorProps) {
  return (
    <div className="flex items-center gap-2 min-w-fit">
      <span>Per page:</span>
      <Select
        value={pageSize.toString()}
        onValueChange={onPageSizeChange}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {pageSizeOptions.map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
