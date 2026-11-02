import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCircle, Calendar, Bell, Mail } from "lucide-react";

interface BorrowingActiveActionsProps {
  compact: boolean;
  isOverdue: boolean;
  onReturnOpen: () => void;
  onExtendOpen: () => void;
  onReminderOpen: () => void;
  onContactOpen: () => void;
}

export function BorrowingActiveActions({
  compact,
  isOverdue,
  onReturnOpen,
  onExtendOpen,
  onReminderOpen,
  onContactOpen,
}: BorrowingActiveActionsProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button
        size={compact ? "sm" : "default"}
        variant="default"
        className="gap-2 bg-green-600 hover:bg-green-700"
        onClick={onReturnOpen}
        type="button"
      >
        <CheckCircle className="h-4 w-4" />
        Mark as Returned
      </Button>
      {isOverdue && (
        <Button
          size={compact ? "sm" : "default"}
          variant="outline"
          className="gap-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950"
          onClick={onReminderOpen}
          type="button"
        >
          <Bell className="h-4 w-4" />
          Send Reminder
        </Button>
      )}
      <Button
        size={compact ? "sm" : "default"}
        variant="secondary"
        className="gap-2"
        onClick={onExtendOpen}
        type="button"
      >
        <Calendar className="h-4 w-4" />
        Extend Due Date
      </Button>
      {!isOverdue && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              onClick={onContactOpen}
              type="button"
              aria-label="Contact student"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Contact Student</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
