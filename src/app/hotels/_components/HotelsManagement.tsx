"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Hotel as HotelIcon,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { LogoutButton } from "../../_components/LogoutButton";

type Hotel = {
  _id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  distance?: string;
  description?: string;
  images?: string[];
  featured?: boolean;
};
type ApiResult<T> = {
  data?: T;
  message?: string;
  pagination?: { page: number; totalPages: number };
};
type HotelForm = {
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  description: string;
  images: string;
  featured: boolean;
};

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const emptyForm: HotelForm = {
  name: "",
  type: "",
  city: "",
  address: "",
  distance: "",
  description: "",
  images: "",
  featured: false,
};

function getAuthHeaders(): Record<string, string> {
  const token =
    sessionStorage.getItem("auth_token") ??
    localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function HotelsManagement() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string>();
  const [isSaving, setIsSaving] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel>();
  const [form, setForm] = useState<HotelForm>(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState("");

  const loadHotels = useCallback(async () => {
    if (!apiBaseUrl) {
      setMessage("Set NEXT_PUBLIC_API_URL to connect to the backend.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setMessage("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (search.trim()) params.set("search", search.trim());
      const response = await fetch(`${apiBaseUrl}/hotel?${params}`);
      const result = (await response.json()) as ApiResult<Hotel[]>;
      if (!response.ok) throw new Error(result.message ?? "Could not load hotels.");
      setHotels(result.data ?? []);
      setTotalPages(Math.max(result.pagination?.totalPages ?? 1, 1));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load hotels.");
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadHotels(), 0);
    return () => window.clearTimeout(timer);
  }, [loadHotels]);

  function openCreateForm() {
    setEditingHotel(undefined);
    setForm(emptyForm);
    setIsFormOpen(true);
    setMessage("");
  }

  function openEditForm(hotel: Hotel) {
    setEditingHotel(hotel);
    setForm({
      name: hotel.name,
      type: hotel.type,
      city: hotel.city,
      address: hotel.address,
      distance: hotel.distance ?? "",
      description: hotel.description ?? "",
      images: hotel.images?.join(", ") ?? "",
      featured: hotel.featured ?? false,
    });
    setIsFormOpen(true);
    setMessage("");
  }

  function updateForm<K extends keyof HotelForm>(key: K, value: HotelForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function saveHotel(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!apiBaseUrl) {
      setMessage("Set NEXT_PUBLIC_API_URL to connect to the backend.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      type: form.type.trim(),
      city: form.city.trim(),
      address: form.address.trim(),
      ...(form.distance.trim() ? { distance: form.distance.trim() } : {}),
      ...(form.description.trim() ? { description: form.description.trim() } : {}),
      images: splitList(form.images),
      featured: form.featured,
    };

    setIsSaving(true);
    setMessage("");
    try {
      const response = await fetch(
        `${apiBaseUrl}/hotel${editingHotel ? `/${editingHotel._id}` : ""}`,
        {
          method: editingHotel ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify(payload),
        },
      );
      const result = (await response.json()) as ApiResult<Hotel>;
      if (!response.ok) throw new Error(result.message ?? "Could not save this hotel.");
      setIsFormOpen(false);
      await loadHotels();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save this hotel.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteHotel(hotel: Hotel) {
    if (!window.confirm(`Delete "${hotel.name}"? Hotels with rooms cannot be deleted.`)) return;
    setRemovingId(hotel._id);
    setMessage("");
    try {
      const response = await fetch(`${apiBaseUrl}/hotel/${hotel._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      const result = (await response.json()) as ApiResult<null>;
      if (!response.ok) throw new Error(result.message ?? "Could not delete this hotel.");
      await loadHotels();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete this hotel.");
    } finally {
      setRemovingId(undefined);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 text-slate-900 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 rounded-3xl bg-slate-950 px-6 py-7 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4"><div className="rounded-2xl bg-white/10 p-3"><HotelIcon aria-hidden="true" className="size-7" /></div><div><p className="text-sm font-medium text-sky-300">Hotel reservation system</p><h1 className="text-2xl font-semibold tracking-tight">Hotel management</h1></div></div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">Dashboard</Link>
            <Link href="/bookings" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">Bookings</Link>
            <Link href="/rooms" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">Rooms</Link>
            <Link href="/ratings" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">Ratings</Link>
            <LogoutButton />
            <button type="button" onClick={() => void loadHotels()} disabled={isLoading} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 disabled:opacity-70"><RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />Refresh</button>
          </div>
        </header>

        {message && <div role="alert" className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" /><p>{message}</p></div>}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="font-semibold">Hotels</h2><p className="text-sm text-slate-500">Manage the properties and locations available for rooms.</p></div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600"><Search className="size-4" /><input value={search} onChange={(event) => { setPage(1); setSearch(event.target.value); }} placeholder="Search hotels" className="w-40 outline-none" /></label>
              <button type="button" onClick={openCreateForm} className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"><Plus className="size-4" />Add hotel</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">Hotel</th><th className="px-5 py-4 font-semibold">Type</th><th className="px-5 py-4 font-semibold">City</th><th className="px-5 py-4 font-semibold">Address</th><th className="px-5 py-4 font-semibold">Featured</th><th className="px-5 py-4 font-semibold">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">Loading hotels…</td></tr> : hotels.length === 0 ? <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">No hotels found.</td></tr> : hotels.map((hotel) => (
                  <tr key={hotel._id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4"><p className="font-medium">{hotel.name}</p><p className="mt-1 max-w-64 truncate text-xs text-slate-500">{hotel.description}</p></td>
                    <td className="px-5 py-4">{hotel.type}</td><td className="px-5 py-4">{hotel.city}</td>
                    <td className="px-5 py-4"><span className="block max-w-56 truncate">{hotel.address}</span></td>
                    <td className="px-5 py-4">{hotel.featured ? "Yes" : "No"}</td>
                    <td className="px-5 py-4"><div className="flex gap-2"><button type="button" onClick={() => openEditForm(hotel)} className="inline-flex items-center gap-1 rounded-lg bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100"><Pencil className="size-3.5" />Edit</button><button type="button" onClick={() => void deleteHotel(hotel)} disabled={removingId === hotel._id} className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-50"><Trash2 className="size-3.5" />Delete</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 p-4 text-sm"><p className="text-slate-500">Page {page} of {totalPages}</p><div className="flex gap-2"><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1 || isLoading} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 font-medium disabled:opacity-50"><ChevronLeft className="size-4" />Previous</button><button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages || isLoading} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 font-medium disabled:opacity-50">Next<ChevronRight className="size-4" /></button></div></div>
        </section>

        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
            <section role="dialog" aria-modal="true" aria-labelledby="hotel-form-title" className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
              <div className="mb-5 flex items-center justify-between"><div><h2 id="hotel-form-title" className="text-xl font-semibold">{editingHotel ? "Edit hotel" : "Add hotel"}</h2><p className="mt-1 text-sm text-slate-500">Enter the required hotel name, type, city, and address.</p></div><button type="button" onClick={() => setIsFormOpen(false)} aria-label="Close form" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="size-5" /></button></div>
              <form onSubmit={(event) => void saveHotel(event)} className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">Hotel name<input required minLength={2} value={form.name} onChange={(event) => updateForm("name", event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700">Type<input required minLength={2} value={form.type} onChange={(event) => updateForm("type", event.target.value)} placeholder="Hotel, resort, apartment…" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700">City<input required minLength={2} value={form.city} onChange={(event) => updateForm("city", event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700">Address<input required minLength={5} value={form.address} onChange={(event) => updateForm("address", event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700">Distance<input value={form.distance} onChange={(event) => updateForm("distance", event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                <label className="flex items-center gap-2 self-end pb-2 text-sm font-medium text-slate-700"><input type="checkbox" checked={form.featured} onChange={(event) => updateForm("featured", event.target.checked)} className="size-4 rounded border-slate-300" />Featured hotel</label>
                <label className="text-sm font-medium text-slate-700 sm:col-span-2">Description<textarea value={form.description} onChange={(event) => updateForm("description", event.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700 sm:col-span-2">Image URLs <span className="font-normal text-slate-500">(comma-separated)</span><textarea value={form.images} onChange={(event) => updateForm("images", event.target.value)} rows={2} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                <div className="flex justify-end gap-3 sm:col-span-2"><button type="button" onClick={() => setIsFormOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold">Cancel</button><button type="submit" disabled={isSaving} className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{isSaving ? "Saving…" : editingHotel ? "Save changes" : "Create hotel"}</button></div>
              </form>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
