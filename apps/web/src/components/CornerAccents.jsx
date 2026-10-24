/* Aksen miring biru di sudut layar (dekoratif) */
export default function CornerAccents() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* kiri atas */}
      <div
        className="absolute -top-px -left-px h-28 w-44 bg-brand/90"
        style={{ clipPath: "polygon(0 0, 55% 0, 0 70%)" }}
      />
      <div
        className="absolute -top-px left-0 h-24 w-28 bg-brand/40"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
      />

      {/* kanan atas */}
      <div
        className="absolute -top-px -right-px h-24 w-44 bg-brand/80"
        style={{ clipPath: "polygon(35% 0, 100% 0, 100% 100%, 75% 100%)" }}
      />
      <div
        className="absolute top-0 right-24 hidden h-16 w-28 bg-brand/30 md:block"
        style={{ clipPath: "polygon(45% 0, 100% 0, 55% 100%, 0 100%)" }}
      />

      {/* kanan bawah */}
      <div
        className="absolute -right-px -bottom-px h-56 w-72 bg-brand/90"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 20% 100%)" }}
      />
      <div
        className="absolute -right-px -bottom-px h-40 w-56 bg-navy-950"
        style={{ clipPath: "polygon(100% 25%, 100% 100%, 45% 100%)" }}
      />
      <div
        className="absolute -right-px -bottom-px h-24 w-44 bg-brand"
        style={{ clipPath: "polygon(100% 20%, 100% 100%, 35% 100%)" }}
      />
    </div>
  );
}