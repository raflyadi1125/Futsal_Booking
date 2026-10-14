import { BOOKING_STEPS } from "../../data/homeData";
import Icon from "../ui/Icon";

export default function BookingSteps() {
  const lastIndex = BOOKING_STEPS.length - 1;

  return (
    <section className="bg-blue-50/70">
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Cara Booking</h2>
          <p className="mt-1 text-sm text-slate-600">
            Hanya {BOOKING_STEPS.length} langkah mudah untuk mulai bermain.
          </p>
        </div>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BOOKING_STEPS.map(({ icon, title, text }, index) => (
            <li key={title} className="relative flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {index + 1}
              </span>
              <div>
                <Icon name={icon} className="h-5 w-5 text-slate-700" />
                <p className="mt-2 text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
              </div>

              {index < lastIndex && (
                <Icon
                  name="arrow"
                  className="absolute -right-5 top-3 hidden h-4 w-4 text-slate-300 lg:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}