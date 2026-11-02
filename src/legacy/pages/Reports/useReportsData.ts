import { useQuery } from "@tanstack/react-query";
import { getAllBooks } from "@/api/endpoints/books";
import { getAllBorrowings } from "@/api/endpoints/borrowings";
import { getAllOrders } from "@/api/endpoints/orders";
import { getAllCategories } from "@/api/endpoints/categories";

export function useReportsData() {
  const { data: booksResponse, isLoading: booksLoading } = useQuery({
    queryKey: ["books"],
    queryFn: () => getAllBooks(),
  });
  const books = booksResponse?.data ?? [];

  const { data: borrowingsResponse, isLoading: borrowingsLoading } = useQuery({
    queryKey: ["borrowings"],
    queryFn: () => getAllBorrowings(),
  });
  const borrowings = borrowingsResponse?.data ?? [];

  const { data: ordersResponse, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getAllOrders(),
  });
  const orders = ordersResponse?.data ?? [];

  const { data: categoriesResponse, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });
  const categories = categoriesResponse?.data ?? [];

  const loading =
    booksLoading || borrowingsLoading || ordersLoading || categoriesLoading;

  const categoryData = categories.map((cat) => ({
    name: cat.name,
    value: books.filter((b) => {
      const catId =
        typeof b.category === "object" && b.category !== null
          ? (b.category as { _id?: string })._id
          : String(b.category);
      return catId === cat._id;
    }).length,
  }));

  const borrowingTrends = [
    { month: "Jan", borrowings: 45 },
    { month: "Feb", borrowings: 52 },
    { month: "Mar", borrowings: 48 },
    { month: "Apr", borrowings: 61 },
    { month: "May", borrowings: 55 },
    { month: "Jun", borrowings: borrowings.length * 8 },
  ];

  const statusData = [
    {
      name: "In Shelf",
      value: books.filter((b) => b.status === "in-shelf").length,
    },
    {
      name: "Out of Stock",
      value: books.filter((b) => b.status === "out-of-stock").length,
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 1450 },
    { month: "Mar", revenue: 1320 },
    { month: "Apr", revenue: 1680 },
    { month: "May", revenue: 1520 },
    { month: "Jun", revenue: orders.reduce((acc, o) => acc + o.totalPrice, 0) },
  ];

  const topBooks = [...books]
    .sort((a, b) => b.totalStock - a.totalStock)
    .slice(0, 5)
    .map((book) => ({
      name:
        book.title.length > 20 ? `${book.title.slice(0, 20)}...` : book.title,
      borrowed: book.totalStock,
    }));

  return {
    loading,
    categoryData,
    borrowingTrends,
    statusData,
    revenueData,
    topBooks,
  };
}
