import React from "react";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="text-muted-foreground mb-4">
          {icon || <Package className="h-12 w-12" />}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground text-center mb-6 max-w-xs">
          {description}
        </p>
        {action && (
          <Button onClick={action.onClick} size="sm">
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
