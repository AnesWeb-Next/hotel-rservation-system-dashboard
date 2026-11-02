import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CardSkeletonProps {
  count?: number;
  className?: string;
}

export function CardSkeleton({ count = 3, className }: CardSkeletonProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`card-${i}`}
          className="rounded-lg border bg-card p-4 space-y-3"
        >
          <Skeleton className="h-40 w-full rounded-md" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface DetailSkeletonProps {
  rows?: number;
  className?: string;
}

export function DetailSkeleton({ rows = 5, className }: DetailSkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={`detail-row-${i}`}
          className="flex items-center justify-between py-2 border-b last:border-0"
        >
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-36" />
        </div>
      ))}
    </div>
  );
}
