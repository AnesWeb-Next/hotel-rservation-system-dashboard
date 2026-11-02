import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground">Page not found</p>
        <Link to="/">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
