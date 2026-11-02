export function formatCurrency(
  value: number,
  currency: string = "DZD",
): string {
  return new Intl.NumberFormat("fr-DZ", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-DZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(dateObj);
}

export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-DZ", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function pluralize(
  word: string,
  count: number,
  plural?: string,
): string {
  if (count === 1) return word;
  return plural ?? `${word}s`;
}
