export default function InputField({ icon: Icon, rightSlot, className = "", ...props }) {
  return (
    <div
      className={`flex h-14 items-center gap-3 rounded-xl border border-line/70 bg-navy-800/60 px-4 transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/40 ${className}`}
    >
      <Icon className="h-5 w-5 shrink-0 text-slate-300" strokeWidth={1.75} />
      <input
        {...props}
        className="h-full w-full bg-transparent text-[0.95rem] text-white placeholder:text-slate-400 focus:outline-none"
      />
      {rightSlot}
    </div>
  );
}