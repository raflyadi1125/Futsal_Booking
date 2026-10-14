import { HIGHLIGHTS } from "../data/homeData";
import Icon from "./ui/Icon";

export default function HighlightList() {
  return (
    <ul className="grid gap-5 py-18 sm:grid-cols-2 lg:grid-cols-4">
      {HIGHLIGHTS.map(({ icon, title, text }) => (
        <li key={title} className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-950/80 text-blue-400 ring-1 ring-blue-500/30">
            <Icon name={icon} className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="mt-0.5 text-xs text-slate-300">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}