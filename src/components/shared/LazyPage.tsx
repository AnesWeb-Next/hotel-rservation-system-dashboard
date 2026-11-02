import React, { Suspense } from "react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

interface LazyPageProps {
  children: React.ReactNode;
}

export function LazyPage({ children }: LazyPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full min-h-100">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
