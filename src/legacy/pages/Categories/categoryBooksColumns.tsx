import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency } from "@/lib/utils";
import type { Book } from "@/types/book";

export const categoryBooksColumns = [
  {
    key: "title" as const,
    header: "Title",
    sortable: true,
  },
  {
    key: "serialNumber" as const,
    header: "Serial #",
    className: "w-[120px]",
  },
  {
    key: "totalStock" as const,
    header: "Stock",
    className: "w-[100px]",
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
    className: "w-[120px]",
    render: (book: Book) => <StatusBadge status={book.status} type="book" />,
  },
];
