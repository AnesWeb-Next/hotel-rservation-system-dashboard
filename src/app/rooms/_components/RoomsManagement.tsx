"use client";

import Link from "next/link";
import {
  BedDouble,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Hotel,
  RefreshCw,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { LogoutButton } from "../../_components/LogoutButton";

type Room = {
  _id: string;
  title: string;
  hotel?: { name?: string; city?: string } | string;
  price?: { base?: number; discount?: number };
  maxPeople: number;
  amenities?: string[];
  isAvailable: boolean;
};

type PaginatedRooms = {
  data?: Room[];
  message?: string;
  pagination?: { page: number; totalPages: number };
};

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

function getAuthHeaders() {
  const token = sessionStorage.getItem("auth_token") ?? localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

function hotelName(hotel: Room["hotel"]) {
  return typeof hotel === "string" ? hotel : hotel?.name ?? "Unassigned hotel";
}

function roomPrice(price?: Room["price"]) {
  const base = price?.base ?? 0;
  const discount = price?.discount ?? 0;
  return new Intl.NumberFormat().format(Math.max(0, base - discount));
}

export function RoomsManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState<"" | "true" | "false">("");
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string>();
  const [message, setMessage] = useState("");

  const loadRooms = useCallback(async () => {
    if (!apiBaseUrl) {
      setMessage("Set NEXT_PUBLIC_API_URL in .env.local to connect to the backend.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setMessage("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (search.trim()) params.set("search", search.trim());
      if (availability) params.set("isAvailable", availability);
      const response = await fetch(`${apiBaseUrl}/room?${params}`, { credentials: "include" });
      const result = (await response.json()) as PaginatedRooms;
      if (!response.ok) throw new Error(result.message ?? "Could not load rooms.");
      setRooms(result.data ?? []);
      setTotalPages(Math.max(result.pagination?.totalPages ?? 1, 1));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load rooms.");
    } finally {
      setIsLoading(false);
    }
  }, [availability, page, search]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadRooms(), 0);
    return () => window.clearTimeout(timer);
  }, [loadRooms]);

  async function deleteRoom(room: Room) {
    if (!window.confirm(`Delete “${room.title}”? Rooms with active bookings cannot be deleted.`)) return;
    setRemovingId(room._id);
    setMessage("");
    try {
      const response = await fetch(`${apiBaseUrl}/room/${room._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Could not delete this room.");
      await loadRooms();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete this room.");
    } finally {
      setRemovingId(undefined);
    }
  }

  function resetToFirstPage() {
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 text-slate-900 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 rounded-3xl bg-slate-950 px-6 py-7 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4"><div className="rounded-2xl bg-white/10 p-3"><Hotel aria-hidden="true" className="size-7" /></div><div><p className="text-sm font-medium text-sky-300">Hotel reservation system</p><h1 className="text-2xl font-semibold tracking-tight">Room management</h1></div></div>
          <div className="flex flex-wrap gap-3"><Link href="/" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10">Dashboard</Link><Link href="/bookings" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10">Bookings</Link><LogoutButton /><button type="button" onClick={() => void loadRooms()} disabled={isLoading} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 disabled:opacity-70"><RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />Refresh</button></div>
        </header>

        {message && <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" /><p>{message}</p></div>}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between"><div className="flex items-center gap-3"><div className="rounded-xl bg-violet-100 p-2.5 text-violet-700"><BedDouble aria-hidden="true" className="size-5" /></div><div><h2 className="font-semibold">Rooms</h2><p className="text-sm text-slate-500">Availability, capacity, and pricing overview.</p></div></div><div className="flex flex-col gap-2 sm:flex-row"><label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600"><Search className="size-4" /><input value={search} onChange={(event) => { resetToFirstPage(); setSearch(event.target.value); }} placeholder="Search rooms" className="w-40 outline-none" /></label><select value={availability} onChange={(event) => { resetToFirstPage(); setAvailability(event.target.value as "" | "true" | "false"); }} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"><option value="">All availability</option><option value="true">Available</option><option value="false">Unavailable</option></select></div></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">Room</th><th className="px-5 py-4 font-semibold">Hotel</th><th className="px-5 py-4 font-semibold">Nightly price</th><th className="px-5 py-4 font-semibold">Capacity</th><th className="px-5 py-4 font-semibold">Availability</th><th className="px-5 py-4 font-semibold">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{isLoading ? <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">Loading rooms…</td></tr> : rooms.length === 0 ? <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">No rooms match this filter.</td></tr> : rooms.map((room) => <tr key={room._id} className="hover:bg-slate-50/70"><td className="px-5 py-4"><p className="font-medium">{room.title}</p><p className="mt-1 max-w-52 truncate text-xs text-slate-500">{room.amenities?.join(" · ") || "No amenities listed"}</p></td><td className="px-5 py-4">{hotelName(room.hotel)}</td><td className="px-5 py-4">{roomPrice(room.price)}</td><td className="px-5 py-4"><span className="inline-flex items-center gap-1"><Users className="size-4 text-slate-400" />{room.maxPeople}</span></td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${room.isAvailable ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>{room.isAvailable ? "Available" : "Unavailable"}</span></td><td className="px-5 py-4"><button type="button" onClick={() => void deleteRoom(room)} disabled={removingId === room._id} className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-50"><Trash2 className="size-3.5" />Delete</button></td></tr>)}</tbody></table></div>
          <div className="flex items-center justify-between border-t border-slate-200 p-4 text-sm"><p className="text-slate-500">Page {page} of {totalPages}</p><div className="flex gap-2"><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1 || isLoading} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 font-medium disabled:opacity-50"><ChevronLeft className="size-4" />Previous</button><button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages || isLoading} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 font-medium disabled:opacity-50">Next<ChevronRight className="size-4" /></button></div></div>
        </section>
      </div>
    </main>
  );
}
