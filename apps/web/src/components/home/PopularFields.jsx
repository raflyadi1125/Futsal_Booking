import { Link } from "react-router-dom";
import { POPULAR_FIELDS } from "../../data/homeData";
import Icon from "../ui/Icon";
import FieldCard from "../FieldCard";

export default function PopularFields() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Lapangan Populer</h2>
            <p className="mt-1 text-sm text-slate-600">
              Rekomendasi lapangan terbaik dengan fasilitas lengkap dan harga
              bersaing.
            </p>
          </div>
          <Link
            to="/fields"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Lihat Semua
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR_FIELDS.map((field) => (
            <FieldCard key={field.id} field={field} />
          ))}
        </div>
      </div>
    </section>
  );
}