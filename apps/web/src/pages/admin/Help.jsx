
const faqs = [
  {
    question: "Bagaimana cara menambah lapangan baru?",
    answer:
      "Buka menu Manajemen Lapangan, lalu klik tombol Tambah Lapangan dan lengkapi informasi lapangan.",
  },
  {
    question: "Bagaimana cara mengonfirmasi booking?",
    answer:
      "Buka menu Manajemen Booking, cari pesanan berstatus Menunggu, lalu klik ikon centang untuk mengonfirmasi.",
  },
  {
    question: "Bagaimana cara memverifikasi pembayaran?",
    answer:
      "Buka menu Pembayaran, pilih transaksi berstatus Menunggu Verifikasi, lalu klik Verifikasi atau Tolak.",
  },
  {
    question: "Bagaimana cara mengekspor laporan?",
    answer:
      "Buka menu Laporan, atur filter yang diinginkan, lalu klik tombol Ekspor CSV untuk mengunduh data.",
  },
];

export default function Help() {
  return (
    <div className="min-w-0 space-y-6 text-slate-100">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Pusat Bantuan
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Pertanyaan yang sering diajukan seputar pengelolaan admin.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-xl border border-slate-800 bg-slate-900/70 p-5"
          >
            <summary className="cursor-pointer list-none font-medium text-slate-100">
              {faq.question}
            </summary>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        Masih butuh bantuan? Hubungi pengembang aplikasi.
      </p>
    </div>
  );
}
