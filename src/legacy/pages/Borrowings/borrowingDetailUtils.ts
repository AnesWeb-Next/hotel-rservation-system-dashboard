import type { Book } from "@/types/book";
import type { User } from "@/types/user";

export function getBookTitle(book: string | Book | undefined): string {
  if (!book) return "Unknown Book";
  return typeof book === "string" ? book : book.title;
}

export function getUserName(user: string | User | undefined): string {
  if (!user) return "Unknown User";
  return typeof user === "string" ? user : `${user.firstName} ${user.lastName}`;
}
