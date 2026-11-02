import React from "react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SearchBar } from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs: readonly BreadcrumbItem[];
  title: string;
  description?: string;
  action?: React.ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  activeFiltersCount?: number;
}

export function PageHeader({
  breadcrumbs,
  title,
  description,
  action,
  searchPlaceholder = "Search...",
  searchValue,
  onSearch,
  onFilterClick,
  activeFiltersCount = 0,
}: PageHeaderProps) {
  return (
    <div className="p-6 pb-0 space-y-4">
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {action && <div className="flex items-center gap-2">{action}</div>}
      </div>

      {(onSearch || onFilterClick) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {onSearch && (
            <SearchBar
              value={searchValue}
              onChange={onSearch}
              placeholder={searchPlaceholder}
              className="flex-1 max-w-md"
            />
          )}
          {onFilterClick && (
            <Button
              variant={activeFiltersCount > 0 ? "default" : "outline"}
              onClick={onFilterClick}
              className="gap-2"
              type="button"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary-foreground text-primary"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
