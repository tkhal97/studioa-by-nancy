"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import dynamic from "next/dynamic";

const ConciergeShell = dynamic(
  () => import("./ConciergeShell").then((m) => m.ConciergeShell),
  { ssr: false },
);

export type ConciergeSource =
  | "header"
  | "hero"
  | "inquiry-cta"
  | "schedule"
  | "footer"
  | "portfolio"
  | "first-visit"
  | "mobile-menu"
  | "services"
  | "direct";

type OpenOptions = {
  source?: ConciergeSource;
  intent?: "inquire" | "schedule" | "pricing";
};

type Ctx = {
  open: boolean;
  source: ConciergeSource;
  intent: "inquire" | "schedule" | "pricing";
  openConcierge: (opts?: OpenOptions) => void;
  closeConcierge: () => void;
};

const Context = createContext<Ctx | null>(null);

export function useConcierge() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useConcierge must be used inside ConciergeProvider");
  return ctx;
}

export function ConciergeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<ConciergeSource>("direct");
  const [intent, setIntent] = useState<"inquire" | "schedule" | "pricing">(
    "inquire",
  );

  const openConcierge = useCallback((opts?: OpenOptions) => {
    if (opts?.source) setSource(opts.source);
    if (opts?.intent) setIntent(opts.intent);
    setOpen(true);
  }, []);

  const closeConcierge = useCallback(() => setOpen(false), []);

  // lock body scroll when open (iOS-safe: position fixed + preserved scrollY)
  // also pause Lenis so it stops capturing wheel events at the document level
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    window.__lenis?.stop();
    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
      window.__lenis?.start();
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const value = useMemo(
    () => ({ open, source, intent, openConcierge, closeConcierge }),
    [open, source, intent, openConcierge, closeConcierge],
  );

  return (
    <Context.Provider value={value}>
      {children}
      <ConciergeShell />
    </Context.Provider>
  );
}
