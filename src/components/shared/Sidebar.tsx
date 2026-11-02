import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navItems } from "./sidebarNavItems";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative w-64 h-full bg-sidebar-background border-r border-sidebar-border transition-transform duration-300 z-40 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-linear-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center text-white font-bold">
              📚
            </div>
            <h1 className="text-xl font-bold text-sidebar-foreground">
              LibAdmin
            </h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start gap-3"
                    type="button"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsOpen(false);
          }}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />
      )}
    </>
  );
}
