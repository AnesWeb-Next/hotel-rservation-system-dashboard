import type { FilterOption } from "@/components/shared/FilterSheet";
import type { FilterValue } from "@/components/shared/filterTypes";
import type { Author } from "@/types/author";

export const authorsFilterConfig: FilterOption[] = [
  {
    key: "hasBooks",
    label: "Has Books",
    type: "select" as const,
    options: [
      { value: "", label: "All" },
      { value: "yes", label: "With Books" },
      { value: "no", label: "No Books" },
    ],
    placeholder: "Select...",
  },
];

export function filterAuthors(
  authors: Author[],
  searchQuery: string,
  filters: FilterValue,
  getAuthorBooksCount: (id: string) => number,
): Author[] {
  return authors.filter((author) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = author.name.toLowerCase().includes(query);
      const matchesBio = author.bio?.toLowerCase().includes(query);
      if (!matchesName && !matchesBio) return false;
    }
    if (filters.hasBooks) {
      const booksCount = getAuthorBooksCount(author._id);
      if (filters.hasBooks === "yes" && booksCount === 0) return false;
      if (filters.hasBooks === "no" && booksCount > 0) return false;
    }
    return true;
  });
}
