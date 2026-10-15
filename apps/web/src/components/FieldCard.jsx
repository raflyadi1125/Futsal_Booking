import { Link } from "react-router-dom";
import { formatRupiah } from "../utils/formatRupiah";
import { withFallback } from "../utils/backgroundImage";
import Icon from "./ui/Icon";

export default function FieldCard({ field }) {
  const { id, name, address, rating, price, facilities, image, fallback } = field;

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
      <div
        className="relative h-40 bg-slate-800 bg-cover bg-center"
        style={{ backgroundImage: withFallback(image, fallback) }}
      >
        <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-slate-900/80 px-2 py-1 text-xs font-semibold text-white">
          <Icon name="star" filled className="h-3 w-3 text-yellow-400" />
          {rating}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{name}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
          <Icon name="pin" className="h-3 w-3 shrink-0" />
          {address}
        </p>

        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
          {facilities.map(({ icon, label }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon name={icon} className="h-3.5 w-3.5" />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm">
            <span className="font-bold text-blue-600">{formatRupiah(price)}</span>
            <span className="text-xs text-slate-500"> /jam</span>
          </p>
          <Link
            to={`/booking?fieldId=${id}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white! transition hover:bg-blue-700"
          >
            <Icon name="calendar" className="h-3.5 w-3.5" />
            Booking
          </Link>
        </div>
      </div>
    </article>
  );
}