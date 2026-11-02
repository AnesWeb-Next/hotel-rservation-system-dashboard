import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { TableSkeleton } from "./TableSkeleton";

interface PageSkeletonProps {
  className?: string;
  variant?: "table" | "detail" | "dashboard";
}

export function PageSkeleton({
  className,
  variant = "table",
}: PageSkeletonProps) {
  if (variant === "detail") {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-lg border p-6 space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={`detail-${i}`} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border p-4 space-y-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "dashboard") {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`stat-${i}`} className="rounded-lg border p-4 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4 space-y-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="rounded-lg border p-4 space-y-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-64" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <TableSkeleton rows={5} columns={5} />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={`page-${i}`} className="h-8 w-8" />
          ))}
        </div>
      </div>
    </div>
  );
}
