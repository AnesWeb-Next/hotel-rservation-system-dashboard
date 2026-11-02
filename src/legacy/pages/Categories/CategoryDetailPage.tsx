import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { CategoryDetailMainContent } from "@/pages/Categories/CategoryDetailMainContent";
import { CategoryDetailInfoCard } from "@/pages/Categories/CategoryDetailInfoCard";
import { useCategoryDetailData } from "@/pages/Categories/useCategoryDetailData";
import { Pencil, Book, Loader2 } from "lucide-react";

export function CategoryDetailPage() {
  const { category, isLoading, categoryBooks, stats, navigate } = useCategoryDetailData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!category) {
    return (
      <DetailPageLayout
        breadcrumbs={[{ label: "Categories", href: "/categories" }, { label: "Not Found" }]}
        title="Category not found" backHref="/categories"
        mainCard={
          <Card><CardContent className="p-8 text-center">
            <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">Category Not Found</h2>
            <p className="text-muted-foreground mt-2">
              The category you're looking for doesn't exist.
            </p>
            <Button type="button" className="mt-4" onClick={() => navigate("/categories")}>
              Back to Categories
            </Button>
          </CardContent></Card>
        }
      />
    );
  }

  return (
    <DetailPageLayout
      breadcrumbs={[{ label: "Categories", href: "/categories" }, { label: category.name }]}
      title={category.name} subtitle="Category Details" backHref="/categories"
      actions={
        <Button type="button" variant="outline" className="gap-2" onClick={() => navigate("/categories")}>
          <Pencil className="h-4 w-4" />Edit Category
        </Button>
      }
      mainCard={
        <CategoryDetailMainContent
          categoryBooks={categoryBooks} stats={stats}
          onBookClick={(id) => navigate(`/books/${id}`)}
          onAddBooks={() => navigate("/books")}
        />
      }
      sideCards={[<CategoryDetailInfoCard key="info" category={category} />]}
    />
  );
}
