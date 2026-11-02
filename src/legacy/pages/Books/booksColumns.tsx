import { Link } from "react-router";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, getDisplayName, getIdFromRef } from "@/lib/utils";
import type { Book } from "@/types/book";
import type { Author } from "@/types/author";

export function getBooksColumns() {
  return [
    {
      key: "serialNumber" as const,
      header: "Serial #",
      sortable: true,
      className: "w-[120px]",
    },
    {
      key: "title" as const,
      header: "Title",
      sortable: true,
    },
    {
      key: "author" as const,
      header: "Author",
      className: "w-[150px]",
      render: (book: Book) => {
        const authorId = getIdFromRef(book.author as string | Author);
        const authorName = getDisplayName(book.author);
        return authorId ? (
          <Link
            to={`/authors/${authorId}`}
            className="hover:text-primary hover:underline transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {authorName}
          </Link>
        ) : (
          <span>{authorName}</span>
        );
      },
    },
    {
      key: "totalStock" as const,
      header: "Stock",
      sortable: true,
      className: "w-[80px]",
      render: (book: Book) => (
        <span>
          {book.availableStock}/{book.totalStock}
        </span>
      ),
    },
    {
      key: "price" as const,
      header: "Price",
      className: "w-[100px]",
      render: (book: Book) => formatCurrency(book.price.current),
    },
    {
      key: "status" as const,
      header: "Status",
      sortable: true,
      className: "w-[120px]",
      render: (book: Book) => <StatusBadge status={book.status} type="book" />,
    },
  ];
}
