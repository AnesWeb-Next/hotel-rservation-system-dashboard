import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  getStatusVariant,
  getStatusLabel,
  type EntityType,
  type StatusType,
} from "./statusConfig";

interface StatusBadgeProps {
  status: StatusType;
  type?: EntityType;
  className?: string;
}

export function StatusBadge({
  status,
  type = "default",
  className,
}: StatusBadgeProps) {
  return (
    <Badge variant={getStatusVariant(status, type)} className={className}>
      {getStatusLabel(status)}
    </Badge>
  );
}
