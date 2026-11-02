import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface PaginationPageListProps {
  visiblePages: (number | "ellipsis-start" | "ellipsis-end")[];
  currentPage: number;
  onPageClick: (page: number) => void;
}

export function PaginationPageList({
  visiblePages,
  currentPage,
  onPageClick,
}: PaginationPageListProps) {
  return (
    <>
      {visiblePages.map((page, index) => (
        <PaginationItem
          key={typeof page === "number" ? page : `${page}-${index}`}
        >
          {page === "ellipsis-start" || page === "ellipsis-end" ? (
            <PaginationEllipsis />
          ) : (
            <PaginationLink
              onClick={() => onPageClick(page)}
              isActive={currentPage === page}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          )}
        </PaginationItem>
      ))}
    </>
  );
}
