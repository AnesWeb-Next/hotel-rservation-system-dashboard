import React from "react";
import { Link } from "react-router";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumbs Component
 *
 * A flexible, reusable breadcrumb navigation component that works with any depth.
 * Features:
 * - Uses orange as accent color for active/hover states
 * - Responsive: collapses on mobile to show only last 2 items
 * - Interactive: all items except last are clickable
 * - Accessible: proper aria labels and navigation semantics
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  // On mobile, show only the last 2 items with ellipsis
  // Safety check: ensure items is always an array
  const visibleItems = Array.isArray(items) ? items : [];

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center gap-1.5 text-sm flex-wrap">
        {/* Home icon link */}
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center justify-center h-7 w-7 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>

        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {/* Separator */}
              <ChevronRight className="h-4 w-4 text-muted-foreground/60" />

              {/* Breadcrumb item */}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-1 rounded-md",
                    "text-muted-foreground hover:text-primary hover:bg-primary/10",
                    "transition-colors duration-150",
                    // Hide middle items on very small screens
                    index > 0 &&
                      index < visibleItems.length - 1 &&
                      "hidden sm:flex",
                  )}
                >
                  {item.icon}
                  <span className="max-w-[150px] truncate">{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-1 rounded-md",
                    isLast
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                    // Always show last item
                    !isLast &&
                      index > 0 &&
                      index < visibleItems.length - 1 &&
                      "hidden sm:flex",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon}
                  <span className="max-w-50 truncate">{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
