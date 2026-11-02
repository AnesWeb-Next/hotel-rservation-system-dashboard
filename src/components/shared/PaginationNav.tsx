import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { PageJumpInput } from "./PageJumpInput";

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationNav({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationNavProps) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(1)}
        disabled={!canGoPrevious}
        aria-label="Go to first page"
        type="button"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        aria-label="Go to previous page"
        type="button"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <PageJumpInput
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        aria-label="Go to next page"
        type="button"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(totalPages)}
        disabled={!canGoNext}
        aria-label="Go to last page"
        type="button"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
