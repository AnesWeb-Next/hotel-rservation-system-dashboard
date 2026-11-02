import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { BookForm } from "@/features/books/components/BookForm";
import { Pencil, Trash2, BookOpen } from "lucide-react";
import type { Author } from "@/types/author";
import { BookDetailMainCard } from "./BookDetailMainCard";
import { BookDetailSideCards } from "./BookDetailSideCards";
import { useBookDetailData, getAuthorName, getAuthorId } from "./useBookDetailData";

export function BookDetailPage() {
  const {
    book, isLoading, bookError, borrowings,
    formOpen, setFormOpen, deleteDialogOpen, setDeleteDialogOpen,
    handleDelete, invalidateBook,
  } = useBookDetailData();

  if (isLoading) {
    return (
      <DetailPageLayout
        breadcrumbs={[{ label: "Books", href: "/books" }, { label: "Loading..." }]}
        title="Loading..." backHref="/books" backLabel="Back to Books"
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
  if (bookError || !book) {
    return (
      <DetailPageLayout
        breadcrumbs={[{ label: "Books", href: "/books" }, { label: "Not Found" }]}
        title="Book Not Found" backHref="/books" backLabel="Back to Books"
        mainCard={
          <Card><CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">Book not found</h2>
          </CardContent></Card>
        }
      />
    );
  }

  const authorId = getAuthorId(book.author as Author);
  return (
    <>
      <DetailPageLayout
        breadcrumbs={[{ label: "Books", href: "/books" }, { label: book.title }]}
        title={book.title}
        subtitle={
          <span className="text-muted-foreground">
            by{" "}
            {authorId ? (
              <Link to={`/authors/${authorId}`} className="hover:text-primary hover:underline transition-colors">
                {getAuthorName(book.author as Author)}
              </Link>
            ) : getAuthorName(book.author as Author)}
          </span>
        }
        backHref="/books" backLabel="Back to Books"
        actions={
          <>
            <Button variant="outline" onClick={() => setFormOpen(true)} type="button" className="gap-2">
              <Pencil className="h-4 w-4" /><span className="hidden sm:inline">Edit</span>
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)} type="button" className="gap-2">
              <Trash2 className="h-4 w-4" /><span className="hidden sm:inline">Delete</span>
            </Button>
          </>
        }
        mainCard={<BookDetailMainCard book={book} />}
        sideCards={<BookDetailSideCards book={book} borrowings={borrowings} />}
      />
      <BookForm open={formOpen} onOpenChange={setFormOpen} book={book} onSuccess={invalidateBook} />
      <ConfirmDialog
        open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} title="Delete Book"
        description={`Are you sure you want to delete "${book.title}"?`}
        onConfirm={handleDelete} confirmLabel="Delete" variant="destructive"
      />
    </>
  );
}
