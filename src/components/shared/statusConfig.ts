import type { BorrowStatus } from "@/types/borrow";
import type { BookStatus } from "@/types/book";
import type { OrderStatus, PaymentStatus } from "@/types/order";

export type EntityType = "book" | "borrow" | "order" | "payment" | "default";
export type StatusVariant = "pending" | "success" | "destructive" | "warning" | "default" | "info" | "secondary";
export type StatusType = BorrowStatus | BookStatus | OrderStatus | PaymentStatus | string;

export function getStatusVariant(
  s: string,
  entityType: EntityType,
): StatusVariant {
  if (entityType === "book") {
    switch (s) {
      case "available":
      case "in-shelf":
        return "success";
      case "out-of-stock":
        return "destructive";
      case "reserved":
        return "warning";
      default:
        return "default";
    }
  }

  if (entityType === "borrow") {
    switch (s) {
      case "active":
      case "returned":
        return "success";
      case "pending":
      case "approved":
        return "pending";
      case "overdue":
        return "destructive";
      case "rejected":
        return "destructive";
      default:
        return "default";
    }
  }

  if (entityType === "order") {
    switch (s) {
      case "completed":
      case "delivered":
        return "success";
      case "pending":
        return "pending";
      case "processing":
      case "shipped":
        return "info";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  }

  switch (s) {
    case "pending":
    case "processing":
      return "pending";
    case "active":
    case "approved":
    case "delivered":
    case "completed":
    case "paid":
    case "in-shelf":
    case "available":
      return "success";
    case "rejected":
    case "cancelled":
    case "failed":
    case "out-of-stock":
      return "destructive";
    case "overdue":
      return "warning";
    case "returned":
    case "refunded":
    case "shipped":
      return "info";
    default:
      return "default";
  }
}

export function getStatusLabel(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).replaceAll("-", " ");
}
