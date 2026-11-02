import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { AuthorForm } from "@/features/authors/components/AuthorForm";
import { AuthorDetailMainCard } from "@/pages/Authors/AuthorDetailMainCard";
import { AuthorDetailSideCards } from "@/pages/Authors/AuthorDetailSideCards";
import { AuthorBooksList } from "@/pages/Authors/AuthorBooksList";
import { useAuthorDetailData } from "@/pages/Authors/useAuthorDetailData";
import { Pencil, Trash2, User } from "lucide-react";

export function AuthorDetailPage() {
  const {
    author, isLoading, authorError, authorBooks, availableCount,
    formOpen, setFormOpen, deleteDialogOpen, setDeleteDialogOpen,
    handleDelete, handleAuthorUpdate,
  } = useAuthorDetailData();

  if (isLoading) {
    return (
      <DetailPageLayout
        breadcrumbs={[{ label: "Authors", href: "/authors" }, { label: "Loading..." }]}
        title="Loading..." backHref="/authors" backLabel="Back to Authors"
        mainCard={
          <Card><CardContent className="p-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-muted rounded w-1/2 mx-auto" />
              <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
            </div>
          </CardContent></Card>
        }
      />
    );
  }
  if (authorError || !author) {
    return (
      <DetailPageLayout
        breadcrumbs={[{ label: "Authors", href: "/authors" }, { label: "Not Found" }]}
        title="Author Not Found" backHref="/authors" backLabel="Back to Authors"
        mainCard={
          <Card><CardContent className="p-8 text-center">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">Author not found</h2>
            <p className="text-muted-foreground mt-2">
              The author you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
          </CardContent></Card>
        }
      />
    );
  }

  return (
    <DetailPageLayout
      breadcrumbs={[{ label: "Authors", href: "/authors" }, { label: author.name }]}
      title={author.name}
      subtitle={
        <span className="text-muted-foreground">
          {authorBooks.length} book{authorBooks.length !== 1 ? "s" : ""}
        </span>
      }
      backHref="/authors" backLabel="Back to Authors"
      actions={
        <>
          <Button variant="outline" className="gap-2" onClick={() => setFormOpen(true)} type="button">
            <Pencil className="h-4 w-4" />Edit
          </Button>
          <Button variant="destructive" className="gap-2" onClick={() => setDeleteDialogOpen(true)} type="button">
            <Trash2 className="h-4 w-4" />Delete
          </Button>
        </>
      }
      mainCard={<AuthorDetailMainCard author={author} />}
      sideCards={<AuthorDetailSideCards totalBooks={authorBooks.length} availableCount={availableCount} />}
      tabs={[{
        value: "books", label: `Books (${authorBooks.length})`,
        content: <AuthorBooksList books={authorBooks} />,
      }]}
      defaultTab="books"
    >
      <AuthorForm open={formOpen} onOpenChange={setFormOpen} author={author} onSuccess={handleAuthorUpdate} />
      <ConfirmDialog
        open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} title="Delete Author"
        description={`Are you sure you want to delete "${author.name}"? This action cannot be undone.`}
        confirmLabel="Delete" onConfirm={handleDelete} variant="destructive"
      />
    </DetailPageLayout>
  );
}
