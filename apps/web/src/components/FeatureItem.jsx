export default function FeatureItem({ icon: Icon, title, children }) {
  return (
    <li className="flex items-start gap-4">
      <Icon className="mt-0.5 h-9 w-9 shrink-0 text-brand" strokeWidth={1.5} />
      <div>
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-0.5 max-w-[17rem] text-sm leading-snug text-slate-300">
          {children}
        </p>
      </div>
    </li>
  );
}