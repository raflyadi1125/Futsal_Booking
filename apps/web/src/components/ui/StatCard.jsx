
import {
  CalendarDays,
  Wallet,
  Clock3,
  Trophy,
} from 'lucide-react';

const icons = {
  calendar: CalendarDays,
  wallet: Wallet,
  clock: Clock3,
  trophy: Trophy,
};

const colors = {
  blue: 'bg-blue-500/10 text-blue-400',
  green: 'bg-emerald-500/10 text-emerald-400',
  yellow: 'bg-amber-500/10 text-amber-400',
  purple: 'bg-violet-500/10 text-violet-400',
};

export default function StatCard({ stat }) {
  const Icon = icons[stat.icon] ?? CalendarDays;

  return (
    <article className="rounded-xl border border-slate-800 bg-[#111C30] p-5 transition-colors hover:border-slate-700">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{stat.title}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-100">
            {stat.value}
          </h3>
        </div>

        <div className={`rounded-lg p-2.5 ${colors[stat.color]}`}>
          <Icon size={21} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        {stat.description}
      </p>
    </article>
  );
}
