import { StatusActions } from "@/components/shared/StatusActions";
import { ActionsDropdown } from "@/components/shared/ActionsDropdown";
import { getBorrowActions } from "@/lib/status-transitions";
import { Eye, Calendar, Bell, Mail } from "lucide-react";
import type { Borrow } from "@/types/borrow";

interface BorrowingActionsHandlers {
  onView: (borrowing: Borrow) => void;
  onStatusChange: (borrowing: Borrow, newStatus: string) => Promise<void>;
  onExtend: (borrowing: Borrow) => void;
  onSendReminder: () => void;
  onContact: () => void;
}

export function renderBorrowingActions(
  borrowing: Borrow,
  handlers: BorrowingActionsHandlers,
) {
  const extraActions = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: () => handlers.onView(borrowing),
    },
  ];

  if (borrowing.status === "approved" || borrowing.status === "active") {
    extraActions.push(
      {
        label: "Extend Due Date",
        icon: <Calendar className="h-4 w-4" />,
        onClick: () => handlers.onExtend(borrowing),
      },
      {
        label: "Contact Student",
        icon: <Mail className="h-4 w-4" />,
        onClick: () => handlers.onContact(),
      },
    );
  }

  if (borrowing.status === "overdue") {
    extraActions.push(
      {
        label: "Send Reminder",
        icon: <Bell className="h-4 w-4" />,
        onClick: () => handlers.onSendReminder(),
      },
      {
        label: "Extend Due Date",
        icon: <Calendar className="h-4 w-4" />,
        onClick: () => handlers.onExtend(borrowing),
      },
      {
        label: "Contact Student",
        icon: <Mail className="h-4 w-4" />,
        onClick: () => handlers.onContact(),
      },
    );
  }

  return (
    <div className="flex items-center gap-2">
      <StatusActions
        actions={getBorrowActions(borrowing.status)}
        onStatusChange={async (newStatus) => {
          await handlers.onStatusChange(borrowing, newStatus);
        }}
      />
      <ActionsDropdown actions={extraActions} />
    </div>
  );
}
