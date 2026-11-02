"use client";

import Link from "next/link";
import {
  CircleAlert,
  Hotel,
  RefreshCw,
  Star,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { LogoutButton } from "../../_components/LogoutButton";

type RatedUser = {
  fullName?: string;
  displayName?: string;
  email?: string;
};
type RatedRoom = { _id?: string; title?: string };
type Rating = {
  _id: string;
  rating: number;
  createdAt: string;
  ratedBy?: RatedUser;
  roomId?: RatedRoom | string;
};
type ApiResult = {
  data?: Rating[];
  message?: string;
  pagination?: { page: number; totalPages: number };
};

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

function getAuthHeaders(): Record<string, string> {
  const token =
    sessionStorage.getItem("auth_token") ??
    localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function roomId(room: Rating["roomId"]) {
  return typeof room === "string" ? room : room?._id ?? "";
}

export function RatingsManagement() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string>();
  const [message, setMessage] = useState("");

  const loadRatings = useCallback(async () => {
    if (!apiBaseUrl) {
      setMessage("Set NEXT_PUBLIC_API_URL to connect to the backend.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `${apiBaseUrl}/admin/ratings?page=${page}&limit=10`,
        {
        credentials: "include",
        headers: getAuthHeaders(),
        },
      );
      const result = (await response.json()) as ApiResult;
      if (!response.ok) throw new Error(result.message ?? "Could not load ratings.");
      const nextTotalPages = Math.max(result.pagination?.totalPages ?? 1, 1);
      setTotalPages(nextTotalPages);
      if (page > nextTotalPages) {
        setPage(nextTotalPages);
        return;
      }
      setRatings(result.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load ratings.");
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadRatings(), 0);
    return () => window.clearTimeout(timer);
  }, [loadRatings]);

  async function deleteRating(rating: Rating) {
    const id = roomId(rating.roomId);
    if (!id) {
      setMessage("This rating is missing its room information and cannot be deleted.");
      return;
    }
    if (!window.confirm("Delete this rating? This cannot be undone.")) return;

    setRemovingId(rating._id);
    setMessage("");
    try {
      const response = await fetch(
        `${apiBaseUrl}/room/${id}/ratings/${rating._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: getAuthHeaders(),
        },
      );
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Could not delete this rating.");
      await loadRatings();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete this rating.");
    } finally {
      setRemovingId(undefined);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 text-slate-900 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 rounded-3xl bg-slate-950 px-6 py-7 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4"><div className="rounded-2xl bg-white/10 p-3"><Hotel aria-hidden="true" className="size-7" /></div><div><p className="text-sm font-medium text-sky-300">Hotel reservation system</p><h1 className="text-2xl font-semibold tracking-tight">Ratings</h1></div></div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">Dashboard</Link>
            <Link href="/bookings" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">Bookings</Link>
            <Link href="/rooms" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">Rooms</Link>
            <Link href="/hotels" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">Hotels</Link>
            <LogoutButton />
            <button type="button" onClick={() => void loadRatings()} disabled={isLoading} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 disabled:opacity-70"><RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />Refresh</button>
          </div>
        </header>

        {message && <div role="alert" className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" /><p>{message}</p></div>}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5"><h2 className="font-semibold">Guest ratings</h2><p className="text-sm text-slate-500">Review and manage guest ratings.</p></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">Guest</th><th className="px-5 py-4 font-semibold">Room</th><th className="px-5 py-4 font-semibold">Rating</th><th className="px-5 py-4 font-semibold">Date</th><th className="px-5 py-4 font-semibold">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? <tr><td colSpan={5} className="px-5 py-12 text-center text-slate-500">Loading ratings…</td></tr> : ratings.length === 0 ? <tr><td colSpan={5} className="px-5 py-12 text-center text-slate-500">No guest ratings yet.</td></tr> : ratings.map((rating) => (
                  <tr key={rating._id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4"><p className="font-medium">{rating.ratedBy?.fullName ?? rating.ratedBy?.displayName ?? "Guest"}</p><p className="mt-1 text-xs text-slate-500">{rating.ratedBy?.email}</p></td>
                    <td className="px-5 py-4">{typeof rating.roomId === "string" ? "Room" : rating.roomId?.title ?? "Room unavailable"}</td>
                    <td className="px-5 py-4"><span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 font-semibold text-amber-800"><Star aria-hidden="true" className="size-4 fill-current" />{rating.rating} / 5</span></td>
                    <td className="px-5 py-4">{new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(rating.createdAt))}</td>
                    <td className="px-5 py-4"><button type="button" onClick={() => void deleteRating(rating)} disabled={removingId === rating._id} className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-50"><Trash2 className="size-3.5" />Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 p-4 text-sm"><p className="text-slate-500">Page {page} of {totalPages}</p><div className="flex gap-2"><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1 || isLoading} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 font-medium disabled:opacity-50"><ChevronLeft className="size-4" />Previous</button><button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages || isLoading} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 font-medium disabled:opacity-50">Next<ChevronRight className="size-4" /></button></div></div>
        </section>
      </div>
    </main>
  );
}
