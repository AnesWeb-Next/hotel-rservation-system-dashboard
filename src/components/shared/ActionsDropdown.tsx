import React from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive";
  disabled?: boolean;
}

interface ActionsDropdownProps {
  actions: ActionItem[];
  className?: string;
  align?: "start" | "center" | "end";
}

export function ActionsDropdown({
  actions,
  className,
  align = "end",
}: ActionsDropdownProps) {
  if (actions.length === 0) return null;

  // Separate destructive and non-destructive actions
  const normalActions = actions.filter((a) => a.variant !== "destructive");
  const destructiveActions = actions.filter((a) => a.variant === "destructive");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", className)}
          type="button"
          aria-label="Open actions menu"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-48">
        {normalActions.map((action, index) => (
          <DropdownMenuItem
            key={`action-${index}-${action.label}`}
            onClick={(e) => {
              e.stopPropagation();
              action.onClick();
            }}
            disabled={action.disabled}
            className="cursor-pointer"
          >
            {action.icon && (
              <span className="mr-2 h-4 w-4 flex items-center justify-center">
                {action.icon}
              </span>
            )}
            {action.label}
          </DropdownMenuItem>
        ))}

        {normalActions.length > 0 && destructiveActions.length > 0 && (
          <DropdownMenuSeparator />
        )}

        {destructiveActions.map((action, index) => (
          <DropdownMenuItem
            key={`destructive-${index}-${action.label}`}
            onClick={(e) => {
              e.stopPropagation();
              action.onClick();
            }}
            disabled={action.disabled}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            {action.icon && (
              <span className="mr-2 h-4 w-4 flex items-center justify-center">
                {action.icon}
              </span>
            )}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
