import { BookPricingCard } from "./BookPricingCard";
import { BookInventoryCard } from "./BookInventoryCard";
import { BookBorrowingStatsCard } from "./BookBorrowingStatsCard";
import { BookDatesCard } from "./BookDatesCard";
import type { Book } from "@/types/book";
import type { Borrow } from "@/types/borrow";

interface BookDetailSideCardsProps {
  book: Book;
  borrowings: Borrow[];
}

export function BookDetailSideCards({ book, borrowings }: BookDetailSideCardsProps) {
  return (
    <>
      <BookPricingCard book={book} />
      <BookInventoryCard book={book} />
      <BookBorrowingStatsCard borrowings={borrowings} />
      <BookDatesCard book={book} />
    </>
  );
}
