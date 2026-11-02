import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, BookOpen, User } from "lucide-react";

interface BorrowingSecondaryActionsProps {
  onView: () => void;
  onViewBook: () => void;
  onViewUser: () => void;
}

export function BorrowingSecondaryActions({
  onView,
  onViewBook,
  onViewUser,
}: BorrowingSecondaryActionsProps) {
  return (
    <div className="flex items-center gap-1 ml-auto">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={onView}
            type="button"
            aria-label="View details"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>View Details</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={onViewBook}
            type="button"
            aria-label="View book"
          >
            <BookOpen className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>View Book</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={onViewUser}
            type="button"
            aria-label="View student"
          >
            <User className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>View Student</TooltipContent>
      </Tooltip>
    </div>
  );
}
