import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useMobileMenu() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((value) => !value), []);
  const close = useCallback(() => setOpen(false), []);

  // Tutup saat pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Tutup saat tekan Escape
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return { open, toggle, close };
}