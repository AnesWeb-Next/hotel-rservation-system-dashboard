import type { ComponentType } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { History, Pencil, Mail, UserX, UserCheck } from "lucide-react";

function IconAction({
  icon: Icon,
  label,
  tooltip,
  onClick,
  className,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  tooltip: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          onClick={onClick}
          type="button"
          aria-label={label}
          className={className}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

interface UserSecondaryButtonsProps {
  isActive: boolean;
  onViewHistory: () => void;
  onEdit: () => void;
  onContact: () => void;
  onSuspend: () => void;
  onReactivate: () => void;
}

export function UserSecondaryButtons({
  isActive,
  onViewHistory,
  onEdit,
  onContact,
  onSuspend,
  onReactivate,
}: UserSecondaryButtonsProps) {
  return (
    <div className="flex items-center gap-1 ml-auto">
      <IconAction
        icon={History}
        label="View history"
        tooltip="View History"
        onClick={onViewHistory}
      />
      <IconAction
        icon={Pencil}
        label="Edit user"
        tooltip="Edit Details"
        onClick={onEdit}
      />
      <IconAction
        icon={Mail}
        label="Contact user"
        tooltip="Contact"
        onClick={onContact}
      />
      {isActive ? (
        <IconAction
          icon={UserX}
          label="Suspend account"
          tooltip="Suspend Account"
          onClick={onSuspend}
          className="text-destructive hover:text-destructive"
        />
      ) : (
        <IconAction
          icon={UserCheck}
          label="Reactivate account"
          tooltip="Reactivate Account"
          onClick={onReactivate}
          className="text-green-600 hover:text-green-700"
        />
      )}
    </div>
  );
}
