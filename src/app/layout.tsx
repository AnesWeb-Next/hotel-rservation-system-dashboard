import type { Metadata } from "next";
import { AdminAuthGuard } from "./_components/AdminAuthGuard";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotel Reservation Dashboard",
  description: "Administration dashboard for hotel reservations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AdminAuthGuard>{children}</AdminAuthGuard>
      </body>
    </html>
  );
}
