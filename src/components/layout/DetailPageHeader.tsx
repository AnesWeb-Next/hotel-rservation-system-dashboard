import React from "react";
import { Link } from "react-router";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DetailPageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: React.ReactNode;
  backHref: string;
  backLabel?: string;
  actions?: React.ReactNode;
}

export function DetailPageHeader({
  breadcrumbs,
  title,
  subtitle,
  backHref,
  backLabel = "Back",
  actions,
}: DetailPageHeaderProps) {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link to={backHref}>
            <Button variant="ghost" size="sm" className="gap-2" type="button">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{backLabel}</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <div className="text-muted-foreground mt-0.5">{subtitle}</div>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-2 ml-12 sm:ml-0">{actions}</div>
        )}
      </div>
    </>
  );
}
