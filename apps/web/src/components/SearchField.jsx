import Icon from "./ui/Icon";

export const FIELD_CLASS =
  "w-full appearance-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400";

export default function SearchField({ icon, label, children }) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Icon name={icon} className="h-3.5 w-3.5" />
        {label}
      </span>
      <span className="relative mt-1.5 block">{children}</span>
    </label>
  );
}