import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookOpen, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { User } from "@/types/user";

interface UserQuickBadgesProps {
  user: User;
  activeBorrowingsCount: number;
  overdueBorrowingsCount: number;
  onReminderClick: () => void;
}

export function UserQuickBadges({
  user,
  activeBorrowingsCount,
  overdueBorrowingsCount,
  onReminderClick,
}: UserQuickBadgesProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 mr-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className="cursor-pointer hover:bg-accent"
            onClick={() => navigate(`/users/${user._id}?tab=active`)}
          >
            <BookOpen className="h-3 w-3 mr-1" />
            {activeBorrowingsCount}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Active Borrowings</TooltipContent>
      </Tooltip>

      {overdueBorrowingsCount > 0 && (
        <TooltipContent>
          <TooltipTrigger asChild>
            <Badge
              variant="destructive"
              className="cursor-pointer animate-pulse"
              onClick={onReminderClick}
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              {overdueBorrowingsCount} overdue
            </Badge>
          </TooltipTrigger>
          <TooltipContent>Click to send reminder</TooltipContent>
        </TooltipContent>
      )}

      {user.fines > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="text-destructive">
              {formatCurrency(user.fines)} fines
            </Badge>
          </TooltipTrigger>
          <TooltipContent>Outstanding fines</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
