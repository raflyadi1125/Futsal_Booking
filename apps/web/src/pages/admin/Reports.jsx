
import { useMemo, useState } from 'react';
import { formatRupiah } from '../../data/mockData';

const monthNames = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  Mei: 4,
  Jun: 5,
  Jul: 6,
  Agu: 7,
  Sep: 8,
  Okt: 9,
  Nov: 10,
  Des: 11,
};

function parseIndonesianDate(value) {
  if (!value) return null;

  const parts = value.trim().split(/\s+/);
  if (parts.length !== 3) return null;

  const [day, month, year] = parts;
  const monthIndex = monthNames[month];

  if (monthIndex === undefined) return null;

  const date = new Date(Number(year), monthIndex, Number(day));
  return Number.isNaN(date.getTime()) ? null : date;
}

function StatusBadge({ status }) {
  const styles = {
    Menunggu: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
    Dikonfirmasi: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
    Selesai: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    Dibatalkan: 'bg-red-500/10 text-red-400 ring-red-500/20',
    Terverifikasi: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    'Menunggu Verifikasi':
      'bg-amber-500/10 text-amber-400 ring-amber-500/20',
    Ditolak: 'bg-red-500/10 text-red-400 ring-red-500/20',
    'Belum Ada Data': 'bg-slate-500/10 text-slate-400 ring-slate-500/20',
  };

  return (
    <span
      className={`inline-flex max-w-full rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${
        styles[status] ||
        'bg-slate-500/10 text-slate-400 ring-slate-500/20'
      }`}
    >
      {status}
    </span>
  );
}

function SummaryCard({ title, value, description, icon, accent }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-slate-400">{title}</p>
          <h3 className="mt-3 break-words text-xl font-bold text-white sm:text-2xl">
            {value}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            {description}
          </p>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${accent}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function escapeCsv(value) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

export default function Reports({
  bookings = [],
  payments = [],
  fields = [],
}) {
  const [period, setPeriod] = useState('all');
  const [bookingStatus, setBookingStatus] = useState('Semua');
  const [search, setSearch] = useState('');

  const filteredBookings = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return bookings.filter((booking) => {
      const bookingDate = parseIndonesianDate(booking.date);

      let matchesPeriod = true;

      if (period === 'month') {
        matchesPeriod =
          bookingDate &&
          bookingDate.getMonth() === today.getMonth() &&
          bookingDate.getFullYear() === today.getFullYear();
      } else if (period === '7days') {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);

        matchesPeriod =
          bookingDate &&
          bookingDate >= sevenDaysAgo &&
          bookingDate <= today;
      }

      const matchesStatus =
        bookingStatus === 'Semua' || booking.status === bookingStatus;

      const keyword = search.toLowerCase().trim();
      const matchesSearch = [
        booking.id,
        booking.customer,
        booking.field,
        booking.date,
      ].some((value) =>
        String(value ?? '').toLowerCase().includes(keyword)
      );

      return matchesPeriod && matchesStatus && matchesSearch;
    });
  }, [bookings, period, bookingStatus, search]);

  const paymentByBooking = useMemo(() => {
    const map = new Map();

    payments.forEach((payment) => {
      map.set(payment.bookingId, payment);
    });

    return map;
  }, [payments]);

  const summary = useMemo(() => {
    const bookingIds = new Set(filteredBookings.map((booking) => booking.id));

    const relatedPayments = payments.filter((payment) =>
      bookingIds.has(payment.bookingId)
    );

    const verifiedPayments = relatedPayments.filter(
      (payment) => payment.status === 'Terverifikasi'
    );

    return {
      totalBookings: filteredBookings.length,
      waiting: filteredBookings.filter(
        (booking) => booking.status === 'Menunggu'
      ).length,
      completed: filteredBookings.filter(
        (booking) => booking.status === 'Selesai'
      ).length,
      verifiedPayments: verifiedPayments.length,
      revenue: verifiedPayments.reduce(
        (total, payment) => total + payment.amount,
        0
      ),
    };
  }, [filteredBookings, payments]);

  function exportCsv() {
    const rows = [
      [
        'ID Booking',
        'Pelanggan',
        'Lapangan',
        'Tanggal',
        'Waktu',
        'Nominal Booking',
        'Status Booking',
        'Metode Pembayaran',
        'Status Pembayaran',
        'Nominal Terverifikasi',
      ],
      ...filteredBookings.map((booking) => {
        const payment = paymentByBooking.get(booking.id);

        return [
          booking.id,
          booking.customer,
          booking.field,
          booking.date,
          booking.time,
          booking.amount,
          booking.status,
          payment?.method ?? '-',
          payment?.status ?? 'Belum Ada Data',
          payment?.status === 'Terverifikasi' ? payment.amount : 0,
        ];
      }),
    ];

    const csv = '\uFEFF' + rows
      .map((row) => row.map(escapeCsv).join(','))
      .join('\r\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'laporan-futsal-booking.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  const activeFields = fields.filter(
    (field) => field.status === 'Aktif'
  ).length;

  return (
    <div className="min-w-0 space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Manajemen Laporan
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Pantau aktivitas booking dan rekap pembayaran lapangan.
          </p>
        </div>

        <button
          type="button"
          onClick={exportCsv}
          disabled={filteredBookings.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span aria-hidden="true">↓</span>
          Ekspor CSV
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Booking"
          value={summary.totalBookings}
          description="Sesuai filter laporan"
          icon="▤"
          accent="bg-blue-500/10 text-blue-400"
        />
        <SummaryCard
          title="Booking Menunggu"
          value={summary.waiting}
          description="Perlu konfirmasi admin"
          icon="◷"
          accent="bg-amber-500/10 text-amber-400"
        />
        <SummaryCard
          title="Booking Selesai"
          value={summary.completed}
          description="Status booking selesai"
          icon="✓"
          accent="bg-emerald-500/10 text-emerald-400"
        />
        <SummaryCard
          title="Pendapatan Terverifikasi"
          value={formatRupiah(summary.revenue)}
          description={`${summary.verifiedPayments} transaksi terverifikasi`}
          icon="Rp"
          accent="bg-violet-500/10 text-violet-400"
        />
      </div>

      {/* Additional information */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 lg:col-span-2">
          <h2 className="font-semibold text-white">Ringkasan Aktivitas</h2>
          <p className="mt-1 text-sm text-slate-400">
            Ringkasan status booking sesuai filter yang dipilih.
          </p>

          <div className="mt-5 space-y-5">
            {[
              {
                label: 'Menunggu',
                count: filteredBookings.filter(
                  (item) => item.status === 'Menunggu'
                ).length,
                color: 'bg-amber-400',
              },
              {
                label: 'Dikonfirmasi',
                count: filteredBookings.filter(
                  (item) => item.status === 'Dikonfirmasi'
                ).length,
                color: 'bg-blue-400',
              },
              {
                label: 'Selesai',
                count: filteredBookings.filter(
                  (item) => item.status === 'Selesai'
                ).length,
                color: 'bg-emerald-400',
              },
              {
                label: 'Dibatalkan',
                count: filteredBookings.filter(
                  (item) => item.status === 'Dibatalkan'
                ).length,
                color: 'bg-red-400',
              },
            ].map((item) => {
              const percentage =
                summary.totalBookings > 0
                  ? (item.count / summary.totalBookings) * 100
                  : 0;

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="font-semibold text-white">
                      {item.count} booking
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <h2 className="font-semibold text-white">Informasi Lapangan</h2>
          <p className="mt-1 text-sm text-slate-400">
            Kondisi lapangan saat ini.
          </p>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-400">
                Total lapangan
              </span>
              <span className="font-semibold text-white">
                {fields.length}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-400">
                Lapangan aktif
              </span>
              <span className="font-semibold text-emerald-400">
                {activeFields}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-400">
                Lapangan nonaktif
              </span>
              <span className="font-semibold text-slate-200">
                {fields.length - activeFields}
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
            <p className="text-xs leading-relaxed text-slate-400">
              Pendapatan dihitung dari pembayaran yang berstatus
              terverifikasi, bukan dari seluruh nilai booking.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and report table */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
        <div className="flex flex-col gap-4 border-b border-slate-700 p-4 sm:p-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="font-semibold text-white">Detail Laporan</h2>
            <p className="mt-1 text-sm text-slate-400">
              Data booking dan status pembayarannya.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:w-[600px]">
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              aria-label="Filter periode laporan"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-blue-500"
            >
              <option value="all">Semua Periode</option>
              <option value="month">Bulan Ini</option>
              <option value="7days">7 Hari Terakhir</option>
            </select>

            <select
              value={bookingStatus}
              onChange={(event) => setBookingStatus(event.target.value)}
              aria-label="Filter status booking"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-blue-500"
            >
              <option value="Semua">Semua Status</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Dikonfirmasi">Dikonfirmasi</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari booking..."
              aria-label="Cari laporan booking"
              className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="hidden md:block">
          <table className="w-full table-fixed text-left text-sm">
            <colgroup>
              <col className="w-[16%]" />
              <col className="w-[25%]" />
              <col className="w-[19%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
            </colgroup>

            <thead className="bg-slate-800/70 text-xs text-slate-400">
              <tr>
                <th className="px-4 py-4 font-medium">ID Booking</th>
                <th className="px-4 py-4 font-medium">Pelanggan</th>
                <th className="px-4 py-4 font-medium">Nominal</th>
                <th className="px-4 py-4 font-medium">Status Booking</th>
                <th className="px-4 py-4 font-medium">Pembayaran</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredBookings.map((booking) => {
                const payment = paymentByBooking.get(booking.id);

                return (
                  <tr
                    key={booking.id}
                    className="transition hover:bg-slate-800/40"
                  >
                    <td className="px-4 py-4">
                      <p className="truncate font-semibold text-slate-100">
                        {booking.id}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {booking.date}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <p className="truncate font-medium text-slate-200">
                        {booking.customer}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {booking.field}
                      </p>
                    </td>

                    <td className="break-words px-4 py-4 font-semibold text-slate-100">
                      {formatRupiah(booking.amount)}
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={booking.status} />
                    </td>

                    <td className="px-4 py-4">
                      {payment ? (
                        <div className="space-y-2">
                          <StatusBadge status={payment.status} />
                          <p className="truncate text-xs text-slate-500">
                            {payment.method}
                          </p>
                        </div>
                      ) : (
                        <StatusBadge status="Belum Ada Data" />
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredBookings.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-slate-400"
                  >
                    Tidak ada laporan yang sesuai dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 p-3 md:hidden">
          {filteredBookings.map((booking) => {
            const payment = paymentByBooking.get(booking.id);

            return (
              <article
                key={booking.id}
                className="rounded-lg border border-slate-700 bg-slate-950 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-white">
                      {booking.customer}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {booking.id} · {booking.date}
                    </p>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs text-slate-500">Lapangan</span>
                    <span className="text-right text-sm text-slate-200">
                      {booking.field}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs text-slate-500">Nominal</span>
                    <span className="text-right text-sm font-semibold text-white">
                      {formatRupiah(booking.amount)}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs text-slate-500">Pembayaran</span>
                    <span className="text-right">
                      {payment ? (
                        <StatusBadge status={payment.status} />
                      ) : (
                        <StatusBadge status="Belum Ada Data" />
                      )}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}

          {filteredBookings.length === 0 && (
            <p className="px-3 py-10 text-center text-sm text-slate-400">
              Tidak ada laporan yang sesuai dengan filter.
            </p>
          )}
        </div>

        <div className="border-t border-slate-700 px-4 py-3 text-xs text-slate-500 sm:px-5 sm:text-sm">
          Menampilkan {filteredBookings.length} dari {bookings.length} booking
        </div>
      </section>
    </div>
  );
}
