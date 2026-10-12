
import { useMemo, useState } from 'react';
import { formatRupiah } from '../../data/mockData';

const statusStyles = {
  'Menunggu Verifikasi': 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
  Terverifikasi: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  Ditolak: 'bg-red-500/10 text-red-400 ring-red-500/20',
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex max-w-full rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset sm:text-xs ${
        statusStyles[status] ||
        'bg-gray-500/10 text-gray-400 ring-gray-500/20'
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
          <h3 className="mt-3 break-words text-xl font-bold text-slate-100 sm:text-2xl">
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

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-700/70 py-3 last:border-0">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="max-w-[60%] break-words text-right text-sm font-medium text-slate-100">
        {value}
      </span>
    </div>
  );
}

export default function Payments({
  payments = [],
  setPayments = () => {},
}) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selectedPayment, setSelectedPayment] = useState(null);

  const summary = useMemo(() => {
    const verified = payments.filter(
      (payment) => payment.status === 'Terverifikasi'
    );
    const pending = payments.filter(
      (payment) => payment.status === 'Menunggu Verifikasi'
    );
    const rejected = payments.filter(
      (payment) => payment.status === 'Ditolak'
    );

    return {
      total: payments.length,
      verified: verified.length,
      pending: pending.length,
      rejected: rejected.length,
      revenue: verified.reduce(
        (total, payment) => total + payment.amount,
        0
      ),
    };
  }, [payments]);

  const filteredPayments = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return payments.filter((payment) => {
      const searchableValues = [
        payment.id,
        payment.bookingId,
        payment.customer,
        payment.field,
        payment.method,
      ];

      const matchesSearch = searchableValues.some((value) =>
        String(value ?? '').toLowerCase().includes(keyword)
      );

      const matchesStatus =
        filterStatus === 'Semua' || payment.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, filterStatus]);

  function updatePayment(paymentId, newStatus) {
    const payment = payments.find((item) => item.id === paymentId);

    if (!payment || payment.status !== 'Menunggu Verifikasi') return;

    const message =
      newStatus === 'Terverifikasi'
        ? `Verifikasi pembayaran ${paymentId}?`
        : `Tolak pembayaran ${paymentId}?`;

    if (!window.confirm(message)) return;

    setPayments((currentPayments) =>
      currentPayments.map((item) =>
        item.id === paymentId
          ? { ...item, status: newStatus }
          : item
      )
    );

    setSelectedPayment(null);
  }

  return (
    <div className="min-w-0 space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Manajemen Pembayaran
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Kelola transaksi dan verifikasi pembayaran booking.
          </p>
        </div>

        <div className="w-fit rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-400">
          {summary.pending} pembayaran perlu diperiksa
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Transaksi"
          value={summary.total}
          description="Seluruh transaksi pembayaran"
          icon="▤"
          accent="bg-blue-500/10 text-blue-400"
        />

        <SummaryCard
          title="Terverifikasi"
          value={summary.verified}
          description="Pembayaran yang disetujui"
          icon="✓"
          accent="bg-emerald-500/10 text-emerald-400"
        />

        <SummaryCard
          title="Menunggu Verifikasi"
          value={summary.pending}
          description="Perlu ditinjau oleh admin"
          icon="◷"
          accent="bg-amber-500/10 text-amber-400"
        />

        <SummaryCard
          title="Total Pendapatan"
          value={formatRupiah(summary.revenue)}
          description={`${summary.rejected} pembayaran ditolak`}
          icon="Rp"
          accent="bg-violet-500/10 text-violet-400"
        />
      </div>

      {/* Transaction list */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
        <div className="flex flex-col gap-4 border-b border-slate-700 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold text-white">
              Daftar Transaksi
            </h2>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Cari transaksi atau pilih status pembayaran.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-[440px]">
            <div className="relative min-w-0">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                ⌕
              </span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari transaksi..."
                aria-label="Cari transaksi"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(event) => setFilterStatus(event.target.value)}
              aria-label="Filter status pembayaran"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-blue-500"
            >
              <option value="Semua">Semua Status</option>
              <option value="Menunggu Verifikasi">
                Menunggu Verifikasi
              </option>
              <option value="Terverifikasi">Terverifikasi</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
        </div>

        {/* Desktop table: no horizontal scrolling */}
        <div className="hidden md:block">
          <table className="w-full table-fixed text-left text-sm">
            <colgroup>
              <col className="w-[18%]" />
              <col className="w-[25%]" />
              <col className="w-[19%]" />
              <col className="w-[20%]" />
              <col className="w-[18%]" />
            </colgroup>

            <thead className="bg-slate-800/70 text-xs text-slate-400">
              <tr>
                <th className="px-4 py-4 font-medium lg:px-5">
                  Transaksi
                </th>
                <th className="px-4 py-4 font-medium lg:px-5">
                  Pelanggan
                </th>
                <th className="px-4 py-4 font-medium lg:px-5">
                  Nominal
                </th>
                <th className="px-4 py-4 font-medium lg:px-5">
                  Status
                </th>
                <th className="px-4 py-4 font-medium lg:px-5">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="transition hover:bg-slate-800/40">
                  <td className="px-4 py-4 lg:px-5">
                    <p className="truncate font-semibold text-slate-100">
                      {payment.id}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      Booking: {payment.bookingId}
                    </p>
                  </td>

                  <td className="px-4 py-4 lg:px-5">
                    <p className="truncate font-medium text-slate-200">
                      {payment.customer}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {payment.field}
                    </p>
                  </td>

                  <td className="px-4 py-4 font-semibold text-slate-100 lg:px-5">
                    <span className="block break-words">
                      {formatRupiah(payment.amount)}
                    </span>
                    <span className="mt-1 block text-xs font-normal text-slate-500">
                      {payment.method}
                    </span>
                  </td>

                  <td className="px-4 py-4 lg:px-5">
                    <StatusBadge status={payment.status} />
                  </td>

                  <td className="px-4 py-4 lg:px-5">
                    <button
                      type="button"
                      onClick={() => setSelectedPayment(payment)}
                      className="rounded-lg border border-slate-600 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-slate-400"
                  >
                    Tidak ada transaksi yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile view: cards instead of a wide table */}
        <div className="space-y-3 p-3 md:hidden">
          {filteredPayments.map((payment) => (
            <article
              key={payment.id}
              className="rounded-lg border border-slate-700 bg-slate-950 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-words text-sm font-semibold text-white">
                    {payment.customer}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {payment.id} · {payment.bookingId}
                  </p>
                </div>
                <StatusBadge status={payment.status} />
              </div>

              <div className="mt-4 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">
                    {payment.field} · {payment.method}
                  </p>
                  <p className="mt-1 break-words text-base font-bold text-white">
                    {formatRupiah(payment.amount)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {payment.date}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPayment(payment)}
                  className="shrink-0 rounded-lg border border-slate-600 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800"
                >
                  Detail
                </button>
              </div>
            </article>
          ))}

          {filteredPayments.length === 0 && (
            <p className="px-3 py-10 text-center text-sm text-slate-400">
              Tidak ada transaksi yang cocok.
            </p>
          )}
        </div>

        <div className="border-t border-slate-700 px-4 py-3 text-xs text-slate-500 sm:px-5 sm:text-sm">
          Menampilkan {filteredPayments.length} dari {payments.length} transaksi
        </div>
      </section>

      {/* Transaction detail modal */}
      {selectedPayment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPayment(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-detail-title"
            className="my-auto w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="payment-detail-title"
                  className="text-lg font-bold text-white"
                >
                  Detail Pembayaran
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {selectedPayment.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                aria-label="Tutup detail"
                className="rounded-lg px-2 py-1 text-xl text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-slate-700 bg-slate-950 p-4">
              <p className="text-xs text-slate-400">
                Nominal Pembayaran
              </p>
              <p className="mt-2 break-words text-2xl font-bold text-white">
                {formatRupiah(selectedPayment.amount)}
              </p>
              <div className="mt-3">
                <StatusBadge status={selectedPayment.status} />
              </div>
            </div>

            <div className="mt-4">
              <DetailRow label="ID Booking" value={selectedPayment.bookingId} />
              <DetailRow label="Pelanggan" value={selectedPayment.customer} />
              <DetailRow label="Lapangan" value={selectedPayment.field} />
              <DetailRow label="Tanggal" value={selectedPayment.date} />
              <DetailRow
                label="Metode Pembayaran"
                value={selectedPayment.method}
              />
            </div>

            {selectedPayment.status === 'Menunggu Verifikasi' && (
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    updatePayment(selectedPayment.id, 'Ditolak')
                  }
                  className="rounded-lg border border-red-500/30 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                >
                  Tolak
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updatePayment(selectedPayment.id, 'Terverifikasi')
                  }
                  className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Verifikasi
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setSelectedPayment(null)}
              className="mt-3 w-full rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
