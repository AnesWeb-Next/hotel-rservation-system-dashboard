import type { BookingStatus } from "@/types/booking";

export type StatusAction = {
  label: string;
  newStatus: string;
  variant: "default" | "outline" | "destructive";
  requiresConfirmation?: boolean;
  confirmMessage?: string;
};

export function getBookingActions(status: BookingStatus): StatusAction[] {
  switch (status) {
    case "pending":
      return [
        { label: "Approve", newStatus: "approved", variant: "default" },
        {
          label: "Reject",
          newStatus: "rejected",
          variant: "destructive",
          requiresConfirmation: true,
          confirmMessage:
            "Are you sure you want to reject this borrowing request?",
        },
      ];
    case "approved":
    case "active":
      return [
        {
          label: "Mark as Returned",
          newStatus: "returned",
          variant: "outline",
        },
      ];
    case "overdue":
      return [
        {
          label: "Mark as Returned",
          newStatus: "returned",
          variant: "outline",
        },
      ];
    default:
      return [];
  }
}
