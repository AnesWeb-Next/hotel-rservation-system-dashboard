export function getDaysUntil(date: string | Date): number {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dateObj.setHours(0, 0, 0, 0);

  const diffTime = dateObj.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function isOverdue(dueDate: string | Date): boolean {
  return getDaysUntil(dueDate) < 0;
}

export function getDaysOverdue(dueDate: string | Date): number {
  const days = getDaysUntil(dueDate);
  return days < 0 ? Math.abs(days) : 0;
}

export function getRelativeTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const diffInSeconds = Math.floor((dateObj.getTime() - Date.now()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (Math.abs(diffInDays) >= 1) {
    return rtf.format(diffInDays, "day");
  }
  if (Math.abs(diffInHours) >= 1) {
    return rtf.format(diffInHours, "hour");
  }
  if (Math.abs(diffInMinutes) >= 1) {
    return rtf.format(diffInMinutes, "minute");
  }
  return rtf.format(diffInSeconds, "second");
}
