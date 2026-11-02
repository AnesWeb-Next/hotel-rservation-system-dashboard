export function getDueDateInfo(dueDate: string): {
  days: number;
  isOverdue: boolean;
} {
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    days: Math.abs(diffDays),
    isOverdue: diffDays < 0,
  };
}
