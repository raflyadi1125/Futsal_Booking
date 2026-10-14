import { FALLBACK_BLUE, HERO_IMAGE } from "../../data/homeData";
import { withFallback } from "../../utils/backgroundImage";
import HighlightList from "../HighlightList";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-slate-950 bg-cover bg-center"
      style={{ backgroundImage: withFallback(HERO_IMAGE, FALLBACK_BLUE) }}
    >
      {/* Overlay gelap supaya teks tetap terbaca */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/70 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-400">
            Booking Lapangan Futsal
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Main Futsal Jadi
            <br />
            Lebih <span className="text-blue-500">Mudah!</span>
          </h1>
          <p className="mt-5 max-w-lg leading-7 text-slate-200">
            Cari, pilih, dan booking lapangan futsal favoritmu dengan cepat dan
            praktis. Nikmati pengalaman bermain yang lebih seru bersama
            teman-temanmu!
          </p>
        </div>

        <HighlightList />
      </div>
    </section>
  );
}