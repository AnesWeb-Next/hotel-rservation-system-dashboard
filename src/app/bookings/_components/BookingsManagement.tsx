"use client";

import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ClipboardList,
  Hotel,
  LogIn,
  LogOut,
  RefreshCw,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { LogoutButton } from "../../_components/LogoutButton";

type BookingStatus =
  | "pending"
  | "confirmed"
  | "checked_in"
  | "checked_out"
  | "cancelled"
  | "no_show";

type Guest = { fullName?: string; displayName?: string; email?: string };
type Room = { title?: string; hotel?: string; price?: { base?: number; discount?: number } };

type Booking = {
  _id: string;
  status: BookingStatus;
  user?: Guest;
  room?: Room;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  totalPrice: number;
  paymentStatus?: string;
};

type PaginatedBookings = {
  data?: Booking[];
  message?: string;
  pagination?: { page: number; limit: number; total: number; totalPages: number };
};

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

const statusLabels: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  checked_in: "Checked in",
  checked_out: "Checked out",
  cancelled: "Cancelled",
  no_show: "No show",
};

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-sky-100 text-sky-800",
  checked_in: "bg-emerald-100 text-emerald-800",
  checked_out: "bg-slate-200 text-slate-700",
  cancelled: "bg-rose-100 text-rose-800",
  no_show: "bg-violet-100 text-violet-800",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value));
}

function getAuthHeaders() {
  const token = sessionStorage.getItem("auth_token") ?? localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

export function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<BookingStatus | "">("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState<string>();
  const [message, setMessage] = useState("");

  const loadBookings = useCallback(async () => {
    if (!apiBaseUrl) {
      setMessage("Set NEXT_PUBLIC_API_URL in .env.local to connect to the backend.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (status) params.set("status", status);

      const response = await fetch(`${apiBaseUrl}/bookings?${params}`, {
        credentials: "include",
        headers: getAuthHeaders(),
      });
      const result = (await response.json()) as PaginatedBookings;

      if (!response.ok) throw new Error(result.message ?? "Could not load bookings.");

      setBookings(result.data ?? []);
      setTotalPages(Math.max(result.pagination?.totalPages ?? 1, 1));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load bookings.");
    } finally {
      setIsLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadBookings(), 0);
    return () => window.clearTimeout(timer);
  }, [loadBookings]);

  async function updateBooking(id: string, action: "confirm" | "reject" | "check-in" | "check-out") {
    let body: string | undefined;

    if (action === "reject") {
      const reason = window.prompt("Optional reason for rejecting this booking:");
      if (reason === null) return;
      body = JSON.stringify(reason ? { reason } : {});
    }

    setIsMutating(id);
    setMessage("");
    try {
      const response = await fetch(`${apiBaseUrl}/bookings/${id}/${action}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body,
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Could not update this booking.");
      await loadBookings();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update this booking.");
    } finally {
      setIsMutating(undefined);
    }
  }

  function changeStatus(nextStatus: BookingStatus | "") {
    setPage(1);
    setStatus(nextStatus);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 text-slate-900 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 rounded-3xl bg-slate-950 px-6 py-7 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/10 p-3"><Hotel aria-hidden="true" className="size-7" /></div>
            <div><p className="text-sm font-medium text-sky-300">Hotel reservation system</p><h1 className="text-2xl font-semibold tracking-tight">Booking management</h1></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10">Dashboard</Link>
            <LogoutButton />
            <button type="button" onClick={() => void loadBookings()} disabled={isLoading} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 disabled:opacity-70"><RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />Refresh</button>
          </div>
        </header>

        {message && <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" /><p>{message}</p></div>}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3"><div className="rounded-xl bg-sky-100 p-2.5 text-sky-700"><ClipboardList aria-hidden="true" className="size-5" /></div><div><h2 className="font-semibold">All bookings</h2><p className="text-sm text-slate-500">Admin-only booking operations.</p></div></div>
            <label className="text-sm font-medium text-slate-700">Status <select value={status} onChange={(event) => changeStatus(event.target.value as BookingStatus | "")} className="ml-2 rounded-lg border border-slate-300 bg-white px-3 py-2"><option value="">All</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">Guest</th><th className="px-5 py-4 font-semibold">Room</th><th className="px-5 py-4 font-semibold">Stay</th><th className="px-5 py-4 font-semibold">Guests</th><th className="px-5 py-4 font-semibold">Status</th><th className="px-5 py-4 font-semibold">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">Loading bookings…</td></tr> : bookings.length === 0 ? <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">No bookings match this filter.</td></tr> : bookings.map((booking) => {
                  const isBusy = isMutating === booking._id;
                  return <tr key={booking._id} className="hover:bg-slate-50/70"><td className="px-5 py-4"><p className="font-medium text-slate-900">{booking.user?.displayName ?? booking.user?.fullName ?? "Unknown guest"}</p><p className="mt-1 text-xs text-slate-500">{booking.user?.email ?? "—"}</p></td><td className="px-5 py-4"><p className="font-medium">{booking.room?.title ?? "Unknown room"}</p><p className="mt-1 text-xs text-slate-500">{booking.room?.hotel ?? "—"}</p></td><td className="px-5 py-4 whitespace-nowrap text-slate-600">{formatDate(booking.checkInDate)}<span className="mx-1">–</span>{formatDate(booking.checkOutDate)}</td><td className="px-5 py-4">{booking.guestsCount}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[booking.status]}`}>{statusLabels[booking.status]}</span></td><td className="px-5 py-4"><div className="flex gap-2">{booking.status === "pending" && <><button type="button" disabled={isBusy} onClick={() => void updateBooking(booking._id, "confirm")} className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-50"><Check className="size-3.5" />Confirm</button><button type="button" disabled={isBusy} onClick={() => void updateBooking(booking._id, "reject")} className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-50"><X className="size-3.5" />Reject</button></>}{booking.status === "confirmed" && <button type="button" disabled={isBusy} onClick={() => void updateBooking(booking._id, "check-in")} className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-50"><LogIn className="size-3.5" />Check in</button>}{booking.status === "checked_in" && <button type="button" disabled={isBusy} onClick={() => void updateBooking(booking._id, "check-out")} className="inline-flex items-center gap-1 rounded-lg bg-slate-700 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-50"><LogOut className="size-3.5" />Check out</button>}</div></td></tr>;
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 p-4 text-sm"><p className="text-slate-500">Page {page} of {totalPages}</p><div className="flex gap-2"><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1 || isLoading} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 font-medium disabled:opacity-50"><ChevronLeft className="size-4" />Previous</button><button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages || isLoading} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 font-medium disabled:opacity-50">Next<ChevronRight className="size-4" /></button></div></div>
        </section>
      </div>
    </main>
  );
}
