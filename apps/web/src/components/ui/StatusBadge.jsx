
const statusStyles = {
  Menunggu: 'bg-amber-400/10 text-amber-300 ring-amber-400/20',
  Dikonfirmasi: 'bg-blue-400/10 text-blue-300 ring-blue-400/20',
  Selesai: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/20',
  Dibatalkan: 'bg-rose-400/10 text-rose-300 ring-rose-400/20',
  Aktif: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/20',
  Nonaktif: 'bg-slate-400/10 text-slate-400 ring-slate-400/20',
};

export default function StatusBadge({ status }) {
  const style =
    statusStyles[status] ??
    'bg-slate-400/10 text-slate-300 ring-slate-400/20';

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium ring-1 ${style}`}
    >
      {status}
    </span>
  );
}
