import { getDaysUntil } from "@/lib/utils";

export function getDueDateInfo(dueDate: string) {
  const days = getDaysUntil(dueDate);
  return { days: Math.abs(days), isOverdue: days < 0 };
}
