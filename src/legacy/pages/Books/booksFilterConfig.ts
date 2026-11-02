import { useMemo } from "react";
import type {
  FilterOption,
  FilterValue,
} from "@/components/shared/FilterSheet";
import type { Author } from "@/types/author";
import type { Category } from "@/types/category";
import type { ParsedSearchParams } from "@/utils/searchParams";

export function useBooksFilterConfig(
  categories: Category[],
  authors: Author[],
) {
  const categoryOptions = useMemo(
    () => categories.map((cat) => ({ value: cat._id, label: cat.name })),
    [categories],
  );

  const authorOptions = useMemo(
    () => authors.map((auth) => ({ value: auth._id, label: auth.name })),
    [authors],
  );

  const filterConfig: FilterOption[] = useMemo(
    () => [
      {
        key: "category",
        label: "Category",
        type: "select" as const,
        options: [{ value: "", label: "All Categories" }, ...categoryOptions],
        placeholder: "Select category",
      },
      {
        key: "author",
        label: "Author",
        type: "select" as const,
        options: [{ value: "", label: "All Authors" }, ...authorOptions],
        placeholder: "Select author",
      },
      {
        key: "status",
        label: "Availability",
        type: "select" as const,
        options: [
          { value: "", label: "All" },
          { value: "in-shelf", label: "Available" },
          { value: "out-of-stock", label: "Out of Stock" },
        ],
        placeholder: "Select status",
      },
      {
        key: "minPrice",
        label: "Min Price (DZD)",
        type: "number" as const,
        placeholder: "0",
      },
      {
        key: "maxPrice",
        label: "Max Price (DZD)",
        type: "number" as const,
        placeholder: "100",
      },
    ],
    [categoryOptions, authorOptions],
  );

  return filterConfig;
}

export function getFilterValues(parsedParams: ParsedSearchParams): FilterValue {
  return {
    category: parsedParams.category || "",
    author: parsedParams.author || "",
    status: parsedParams.status || "",
    minPrice: parsedParams.minPrice ?? "",
    maxPrice: parsedParams.maxPrice ?? "",
  };
}
