import { Button } from "@/components/ui/button";
import { Eye, BookOpen, Bell } from "lucide-react";

interface UserPrimaryButtonsProps {
  compact: boolean;
  isActive: boolean;
  hasOverdue: boolean;
  onViewProfile: () => void;
  onNewBorrowing: () => void;
  onSendReminder: () => void;
}

export function UserPrimaryButtons({
  compact,
  isActive,
  hasOverdue,
  onViewProfile,
  onNewBorrowing,
  onSendReminder,
}: UserPrimaryButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        size={compact ? "sm" : "default"}
        variant="default"
        className="gap-2"
        onClick={onViewProfile}
        type="button"
      >
        <Eye className="h-4 w-4" />
        {!compact && "View Profile"}
      </Button>

      {isActive && (
        <Button
          size={compact ? "sm" : "default"}
          variant="secondary"
          className="gap-2"
          onClick={onNewBorrowing}
          type="button"
        >
          <BookOpen className="h-4 w-4" />
          {!compact && "New Borrowing"}
        </Button>
      )}

      {hasOverdue && (
        <Button
          size={compact ? "sm" : "default"}
          variant="outline"
          className="gap-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950"
          onClick={onSendReminder}
          type="button"
        >
          <Bell className="h-4 w-4" />
          {!compact && "Send Reminder"}
        </Button>
      )}
    </div>
  );
}
