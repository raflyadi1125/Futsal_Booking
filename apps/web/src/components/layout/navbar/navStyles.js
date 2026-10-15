export const desktopLinkClass = ({ isActive }) =>
  `relative py-1 text-sm font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:bg-blue-600 after:transition-all after:duration-300 ${
    isActive
      ? "text-blue-600 after:w-full"
      : "text-slate-600 hover:text-blue-600 after:w-0 hover:after:w-full"
  }`;

export const mobileLinkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-50 text-blue-700"
      : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
  }`;

export const barClass =
  "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8";

export const mobilePanelClass = (open) =>
  `grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none md:hidden ${
    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
  }`;