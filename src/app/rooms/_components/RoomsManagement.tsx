"use client";

import Link from "next/link";
import {
  BedDouble,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Hotel,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { LogoutButton } from "../../_components/LogoutButton";

type RoomNumber = { number: number; unavailableDates?: string[] };
type Room = {
  _id: string;
  title: string;
  hotel?: { _id?: string; name?: string; city?: string } | string;
  price?: { base?: number; discount?: number };
  maxPeople: number;
  description?: string;
  roomNumbers?: RoomNumber[];
  amenities?: string[];
  images?: string[];
  isAvailable: boolean;
};
type HotelOption = { _id: string; name: string; city?: string };
type ApiResult<T> = {
  data?: T;
  message?: string;
  pagination?: { page: number; totalPages: number };
};
type RoomForm = {
  title: string;
  hotel: string;
  basePrice: string;
  discount: string;
  maxPeople: string;
  description: string;
  roomNumbers: string;
  amenities: string;
  images: string;
  isAvailable: boolean;
};

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const emptyForm: RoomForm = {
  title: "",
  hotel: "",
  basePrice: "",
  discount: "",
  maxPeople: "1",
  description: "",
  roomNumbers: "",
  amenities: "",
  images: "",
  isAvailable: true,
};

function getAuthHeaders(): Record<string, string> {
  const token =
    sessionStorage.getItem("auth_token") ??
    localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function hotelName(hotel: Room["hotel"]) {
  return typeof hotel === "string" ? hotel : hotel?.name ?? "Unassigned hotel";
}

function hotelId(hotel: Room["hotel"]) {
  return typeof hotel === "string" ? hotel : hotel?._id ?? "";
}

function roomPrice(price?: Room["price"]) {
  const base = price?.base ?? 0;
  const discount = price?.discount ?? 0;
  return new Intl.NumberFormat().format(Math.max(0, base - discount));
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function RoomsManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotels, setHotels] = useState<HotelOption[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState<"" | "true" | "false">("");
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string>();
  const [isSaving, setIsSaving] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room>();
  const [form, setForm] = useState<RoomForm>(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState("");

  const loadRooms = useCallback(async () => {
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
      if (availability) params.set("isAvailable", availability);
      const response = await fetch(`${apiBaseUrl}/room?${params}`);
      const result = (await response.json()) as ApiResult<Room[]>;
      if (!response.ok) throw new Error(result.message ?? "Could not load rooms.");
      setRooms(result.data ?? []);
      setTotalPages(Math.max(result.pagination?.totalPages ?? 1, 1));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load rooms.");
    } finally {
      setIsLoading(false);
    }
  }, [availability, page, search]);

  const loadHotels = useCallback(async () => {
    if (!apiBaseUrl) return;
    try {
      const response = await fetch(`${apiBaseUrl}/hotel?limit=100`);
      const result = (await response.json()) as ApiResult<HotelOption[]>;
      if (!response.ok) throw new Error(result.message ?? "Could not load hotels.");
      setHotels(result.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load hotels.");
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadRooms(), 0);
    return () => window.clearTimeout(timer);
  }, [loadRooms]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadHotels(), 0);
    return () => window.clearTimeout(timer);
  }, [loadHotels]);

  function openCreateForm() {
    setEditingRoom(undefined);
    setForm({ ...emptyForm, hotel: hotels[0]?._id ?? "" });
    setIsFormOpen(true);
    setMessage("");
  }

  function openEditForm(room: Room) {
    setEditingRoom(room);
    setForm({
      title: room.title,
      hotel: hotelId(room.hotel),
      basePrice: String(room.price?.base ?? ""),
      discount: room.price?.discount ? String(room.price.discount) : "",
      maxPeople: String(room.maxPeople),
      description: room.description ?? "",
      roomNumbers: room.roomNumbers?.map(({ number }) => number).join(", ") ?? "",
      amenities: room.amenities?.join(", ") ?? "",
      images: room.images?.join(", ") ?? "",
      isAvailable: room.isAvailable,
    });
    setIsFormOpen(true);
    setMessage("");
  }

  async function saveRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!apiBaseUrl) {
      setMessage("Set NEXT_PUBLIC_API_URL to connect to the backend.");
      return;
    }

    const numbers = splitList(form.roomNumbers).map(Number);
    if (
      numbers.length === 0 ||
      numbers.some((number) => !Number.isInteger(number) || number < 1) ||
      new Set(numbers).size !== numbers.length
    ) {
      setMessage("Enter unique positive room numbers, separated by commas.");
      return;
    }

    const priceBase = Number(form.basePrice);
    const discount = form.discount === "" ? undefined : Number(form.discount);
    if (
      !Number.isFinite(priceBase) ||
      priceBase < 0 ||
      (discount !== undefined &&
        (!Number.isFinite(discount) || discount < 0 || discount > priceBase))
    ) {
      setMessage("Enter a valid base price and a discount no greater than the base price.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      hotel: form.hotel,
      price: {
        base: priceBase,
        ...(discount === undefined ? {} : { discount }),
      },
      maxPeople: Number(form.maxPeople),
      description: form.description.trim(),
      roomNumbers: editingRoom
        ? editingRoom.roomNumbers ?? []
        : numbers.map((number) => ({ number })),
      amenities: splitList(form.amenities),
      images: splitList(form.images),
      isAvailable: form.isAvailable,
    };

    setIsSaving(true);
    setMessage("");
    try {
      const response = await fetch(
        `${apiBaseUrl}/room${editingRoom ? `/${editingRoom._id}` : ""}`,
        {
          method: editingRoom ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify(payload),
        },
      );
      const result = (await response.json()) as ApiResult<Room>;
      if (!response.ok) throw new Error(result.message ?? "Could not save this room.");
      setIsFormOpen(false);
      await loadRooms();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save this room.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteRoom(room: Room) {
    if (!window.confirm(`Delete "${room.title}"? Rooms with active bookings cannot be deleted.`)) return;
    setRemovingId(room._id);
    setMessage("");
    try {
      const response = await fetch(`${apiBaseUrl}/room/${room._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders(),
      });
      const result = (await response.json()) as ApiResult<null>;
      if (!response.ok) throw new Error(result.message ?? "Could not delete this room.");
      await loadRooms();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete this room.");
    } finally {
      setRemovingId(undefined);
    }
  }

  function updateForm<K extends keyof RoomForm>(key: K, value: RoomForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 text-slate-900 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 rounded-3xl bg-slate-950 px-6 py-7 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/10 p-3"><Hotel aria-hidden="true" className="size-7" /></div>
            <div><p className="text-sm font-medium text-sky-300">Hotel reservation system</p><h1 className="text-2xl font-semibold tracking-tight">Room management</h1></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10">Dashboard</Link>
            <Link href="/bookings" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10">Bookings</Link>
            <Link href="/hotels" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10">Hotels</Link>
            <Link href="/ratings" className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10">Ratings</Link>
            <LogoutButton />
            <button type="button" onClick={() => void loadRooms()} disabled={isLoading} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 disabled:opacity-70"><RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />Refresh</button>
          </div>
        </header>

        {message && <div role="alert" className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" /><p>{message}</p></div>}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3"><div className="rounded-xl bg-violet-100 p-2.5 text-violet-700"><BedDouble aria-hidden="true" className="size-5" /></div><div><h2 className="font-semibold">Rooms</h2><p className="text-sm text-slate-500">Availability, capacity, and pricing overview.</p></div></div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600"><Search className="size-4" /><input value={search} onChange={(event) => { setPage(1); setSearch(event.target.value); }} placeholder="Search rooms" className="w-40 outline-none" /></label>
              <select value={availability} onChange={(event) => { setPage(1); setAvailability(event.target.value as "" | "true" | "false"); }} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"><option value="">All availability</option><option value="true">Available</option><option value="false">Unavailable</option></select>
              <button type="button" onClick={openCreateForm} className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-800"><Plus className="size-4" />Add room</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">Room</th><th className="px-5 py-4 font-semibold">Hotel</th><th className="px-5 py-4 font-semibold">Nightly price</th><th className="px-5 py-4 font-semibold">Capacity</th><th className="px-5 py-4 font-semibold">Availability</th><th className="px-5 py-4 font-semibold">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">Loading rooms…</td></tr> : rooms.length === 0 ? <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">No rooms match this filter.</td></tr> : rooms.map((room) => (
                  <tr key={room._id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4"><p className="font-medium">{room.title}</p><p className="mt-1 max-w-52 truncate text-xs text-slate-500">{room.amenities?.join(" · ") || "No amenities listed"}</p></td>
                    <td className="px-5 py-4">{hotelName(room.hotel)}</td>
                    <td className="px-5 py-4">{roomPrice(room.price)}</td>
                    <td className="px-5 py-4"><span className="inline-flex items-center gap-1"><Users className="size-4 text-slate-400" />{room.maxPeople}</span></td>
                    <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${room.isAvailable ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>{room.isAvailable ? "Available" : "Unavailable"}</span></td>
                    <td className="px-5 py-4"><div className="flex gap-2"><button type="button" onClick={() => openEditForm(room)} className="inline-flex items-center gap-1 rounded-lg bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100"><Pencil className="size-3.5" />Edit</button><button type="button" onClick={() => void deleteRoom(room)} disabled={removingId === room._id} className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-50"><Trash2 className="size-3.5" />Delete</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 p-4 text-sm"><p className="text-slate-500">Page {page} of {totalPages}</p><div className="flex gap-2"><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1 || isLoading} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 font-medium disabled:opacity-50"><ChevronLeft className="size-4" />Previous</button><button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages || isLoading} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 font-medium disabled:opacity-50">Next<ChevronRight className="size-4" /></button></div></div>
        </section>

        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
            <section role="dialog" aria-modal="true" aria-labelledby="room-form-title" className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
              <div className="mb-5 flex items-center justify-between"><div><h2 id="room-form-title" className="text-xl font-semibold">{editingRoom ? "Edit room" : "Add room"}</h2><p className="mt-1 text-sm text-slate-500">Set the room details and link it to a hotel.</p></div><button type="button" onClick={() => setIsFormOpen(false)} aria-label="Close form" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="size-5" /></button></div>
              {hotels.length === 0 ? <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">Create a hotel before adding rooms. <Link href="/hotels" className="font-semibold underline">Go to hotels</Link></div> : (
                <form onSubmit={(event) => void saveRoom(event)} className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">Room title<input required minLength={1} value={form.title} onChange={(event) => updateForm("title", event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                  <label className="text-sm font-medium text-slate-700">Hotel<select required value={form.hotel} onChange={(event) => updateForm("hotel", event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2">{hotels.map((hotel) => <option key={hotel._id} value={hotel._id}>{hotel.name}{hotel.city ? ` — ${hotel.city}` : ""}</option>)}</select></label>
                  <label className="text-sm font-medium text-slate-700">Base price<input required type="number" min="0" step="0.01" value={form.basePrice} onChange={(event) => updateForm("basePrice", event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                  <label className="text-sm font-medium text-slate-700">Discount<input type="number" min="0" step="0.01" value={form.discount} onChange={(event) => updateForm("discount", event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                  <label className="text-sm font-medium text-slate-700">Maximum guests<input required type="number" min="1" step="1" value={form.maxPeople} onChange={(event) => updateForm("maxPeople", event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                  <label className="text-sm font-medium text-slate-700">Room numbers<input required disabled={Boolean(editingRoom)} value={form.roomNumbers} onChange={(event) => updateForm("roomNumbers", event.target.value)} placeholder="101, 102, 103" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 disabled:bg-slate-100" />{editingRoom && <span className="mt-1 block text-xs font-normal text-slate-500">Room numbers are locked while editing to preserve booking availability dates.</span>}</label>
                  <label className="text-sm font-medium text-slate-700 sm:col-span-2">Description<textarea required minLength={10} value={form.description} onChange={(event) => updateForm("description", event.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                  <label className="text-sm font-medium text-slate-700 sm:col-span-2">Amenities <span className="font-normal text-slate-500">(comma-separated)</span><input value={form.amenities} onChange={(event) => updateForm("amenities", event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                  <label className="text-sm font-medium text-slate-700 sm:col-span-2">Image URLs <span className="font-normal text-slate-500">(comma-separated)</span><input value={form.images} onChange={(event) => updateForm("images", event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" checked={form.isAvailable} onChange={(event) => updateForm("isAvailable", event.target.checked)} className="size-4 rounded border-slate-300" />Available for booking</label>
                  <div className="flex justify-end gap-3 sm:col-span-2"><button type="button" onClick={() => setIsFormOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold">Cancel</button><button type="submit" disabled={isSaving} className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{isSaving ? "Saving…" : editingRoom ? "Save changes" : "Create room"}</button></div>
                </form>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
