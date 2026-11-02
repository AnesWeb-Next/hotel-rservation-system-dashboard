import { formatDate } from "@/lib/utils";
import type { Category } from "@/types/category";

type CategoryWithCount = Category & { bookCount: number };

export function getCategoriesColumns() {
  return [
    { key: "name" as const, header: "Name", sortable: true },
    {
      key: "bookCount" as const,
      header: "Books",
      className: "w-25",
      render: (category: CategoryWithCount) => (
        <span className="font-medium">{category.bookCount}</span>
      ),
    },
    {
      key: "createdAt" as const,
      header: "Created",
      sortable: true,
      render: (category: Category) => formatDate(category.createdAt),
    },
  ];
}
