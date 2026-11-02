import React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DetailPageHeader } from "./DetailPageHeader";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface DetailPageLayoutProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: React.ReactNode;
  backHref: string;
  backLabel?: string;
  actions?: React.ReactNode;
  mainCard: React.ReactNode;
  sideCards?: React.ReactNode;
  tabs?: TabItem[];
  defaultTab?: string;
  children?: React.ReactNode;
  className?: string;
}

export function DetailPageLayout({
  breadcrumbs,
  title,
  subtitle,
  backHref,
  backLabel = "Back",
  actions,
  mainCard,
  sideCards,
  tabs,
  defaultTab,
  children,
  className,
}: DetailPageLayoutProps) {
  return (
    <div className={cn("p-6 space-y-6", className)}>
      <DetailPageHeader
        breadcrumbs={breadcrumbs}
        title={title}
        subtitle={subtitle}
        backHref={backHref}
        backLabel={backLabel}
        actions={actions}
      />

      {/* Main Content: Card Grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Main Card - Takes 3 columns (60%) */}
        <div className="lg:col-span-3 space-y-6">{mainCard}</div>

        {/* Side Cards - Takes 2 columns (40%) */}
        {sideCards && (
          <div className="lg:col-span-2 space-y-6">{sideCards}</div>
        )}
      </div>

      {/* Tabs Section */}
      {tabs && tabs.length > 0 && (
        <Tabs defaultValue={defaultTab || tabs[0].value} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-4 py-3"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* Alternative: Children content (if no tabs) */}
      {!tabs && children && <div className="mt-6">{children}</div>}
    </div>
  );
}
