
import { useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  Clock3,
  ClipboardList,
  CheckCircle2,
  XCircle,
  Check,
  Ban,
} from "lucide-react";

import { formatRupiah, recentBookings } from "../../data/mockData";
import StatusBadge from "../../components/ui/StatusBadge";

const statusOptions = [
  "Semua",
  "Menunggu",
  "Dikonfirmasi",
  "Selesai",
  "Dibatalkan",
];

export default function Booking({ bookings = recentBookings, setBookings }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const waitingCount = bookings.filter(
    (booking) => booking.status === "Menunggu",
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Dikonfirmasi",
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "Selesai",
  ).length;

  const filteredBookings = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        booking.id.toLowerCase().includes(keyword) ||
        booking.customer.toLowerCase().includes(keyword) ||
        booking.field.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "Semua" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  function updateStatus(booking, nextStatus) {
    if (typeof setBookings !== "function") return;

    if (nextStatus === "Dibatalkan") {
      const confirmed = window.confirm(
        `Yakin ingin membatalkan booking ${booking.id} milik ${booking.customer}?`,
      );

      if (!confirmed) return;
    }

    setBookings((previous) =>
      previous.map((item) =>
        item.id === booking.id
          ? { ...item, status: nextStatus }
          : item,
      ),
    );
  }

  const summaryCards = [
    {
      label: "Total Booking",
      value: bookings.length,
      icon: ClipboardList,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
    },
    {
      label: "Menunggu Konfirmasi",
      value: waitingCount,
      icon: Clock3,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10",
    },
    {
      label: "Dikonfirmasi",
      value: confirmedCount,
      icon: CheckCircle2,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
    },
    {
      label: "Selesai",
      value: completedCount,
      icon: CalendarDays,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Manajemen Booking
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Kelola pemesanan lapangan dan konfirmasi booking pelanggan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {card.value}
                  </p>
                </div>

                <div className={`rounded-xl p-3 ${card.iconBg}`}>
                  <Icon size={22} className={card.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70">
        <div className="flex flex-col gap-4 border-b border-slate-800 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold text-white">Daftar Booking</h2>
            <p className="mt-1 text-sm text-slate-400">
              {filteredBookings.length} booking ditemukan
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari ID, pelanggan, lapangan..."
                aria-label="Cari booking"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 sm:w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter status booking"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "Semua" ? "Semua Status" : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <ClipboardList
              size={32}
              className="mx-auto text-slate-600"
            />
            <h3 className="mt-3 font-medium text-white">
              Booking tidak ditemukan
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Coba kata kunci lain atau ubah filter status.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-950/70 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-4 font-medium">ID Booking</th>
                  <th className="px-5 py-4 font-medium">Pelanggan</th>
                  <th className="px-5 py-4 font-medium">Lapangan</th>
                  <th className="px-5 py-4 font-medium">Jadwal</th>
                  <th className="px-5 py-4 font-medium">Total</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="transition hover:bg-slate-800/30"
                  >
                    <td className="px-5 py-4 font-medium text-blue-400">
                      {booking.id}
                    </td>

                    <td className="px-5 py-4 text-slate-200">
                      {booking.customer}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {booking.field}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-slate-200">{booking.date}</p>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock3 size={13} />
                        {booking.time}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-200">
                      {formatRupiah(booking.amount)}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={booking.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {booking.status === "Menunggu" && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(booking, "Dikonfirmasi")
                              }
                              title="Konfirmasi booking"
                              aria-label={`Konfirmasi ${booking.id}`}
                              className="rounded-lg border border-emerald-500/30 p-2 text-emerald-400 transition hover:bg-emerald-500/10"
                            >
                              <Check size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(booking, "Dibatalkan")
                              }
                              title="Batalkan booking"
                              aria-label={`Batalkan ${booking.id}`}
                              className="rounded-lg border border-rose-500/30 p-2 text-rose-400 transition hover:bg-rose-500/10"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}

                        {booking.status === "Dikonfirmasi" && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(booking, "Selesai")
                              }
                              title="Tandai booking selesai"
                              aria-label={`Selesaikan ${booking.id}`}
                              className="rounded-lg border border-emerald-500/30 p-2 text-emerald-400 transition hover:bg-emerald-500/10"
                            >
                              <CheckCircle2 size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(booking, "Dibatalkan")
                              }
                              title="Batalkan booking"
                              aria-label={`Batalkan ${booking.id}`}
                              className="rounded-lg border border-rose-500/30 p-2 text-rose-400 transition hover:bg-rose-500/10"
                            >
                              <Ban size={16} />
                            </button>
                          </>
                        )}

                        {(booking.status === "Selesai" ||
                          booking.status === "Dibatalkan") && (
                          <span className="text-xs text-slate-500">
                            Tidak ada aksi
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
