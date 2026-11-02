import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-4 px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <p>© {currentYear} GMC. All rights reserved.</p>
        <p>Library Management Dashboard</p>
      </div>
    </footer>
  );
}
