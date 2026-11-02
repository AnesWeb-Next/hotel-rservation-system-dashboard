export function sortBy<T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc",
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    const comparison = aVal < bVal ? -1 : 1;
    return order === "asc" ? comparison : -comparison;
  });
}

export function filterBy<T>(
  array: T[],
  filters: Partial<Record<keyof T, unknown>>,
): T[] {
  return array.filter((item) =>
    Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === "") return true;
      return item[key as keyof T] === value;
    }),
  );
}

export function paginate<T>(
  array: T[],
  page: number,
  pageSize: number,
): { data: T[]; totalPages: number; totalItems: number } {
  const totalItems = array.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const data = array.slice(startIndex, startIndex + pageSize);

  return { data, totalPages, totalItems };
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const groupKey = String(item[key]);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<string, T[]>,
  );
}
