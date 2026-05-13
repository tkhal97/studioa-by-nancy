"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Service } from "@/lib/content";
import { useConcierge } from "@/components/intake/ConciergeProvider";

type Props = {
  service: Service | null;
  onClose: () => void;
};

export function ServiceModal({ service, onClose }: Props) {
  const reduce = useReducedMotion();
  const open = service !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const { openConcierge } = useConcierge();

  // body scroll lock + Lenis stop + ESC, matching ConciergeProvider
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
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && service && (
        <motion.div
          key="service-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100]"
          aria-modal
          role="dialog"
          aria-label={service.title}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onClose}
            className="absolute inset-0 bg-obsidian/55 backdrop-blur-xl"
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            initial={
              reduce ? { opacity: 0 } : { y: "6%", opacity: 0, scale: 0.98 }
            }
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={
              reduce ? { opacity: 0 } : { y: "6%", opacity: 0, scale: 0.98 }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="glass-deep absolute inset-x-0 bottom-0 top-4 mx-auto flex w-full max-w-[1180px] flex-col overflow-hidden rounded-t-[14px] pt-[env(safe-area-inset-top)] sm:inset-6 sm:rounded-[12px] sm:pt-0"
          >
            {/* Warm point-light gradient */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 45% at 90% 0%, color-mix(in srgb, var(--color-accent) 28%, transparent), transparent 60%)",
              }}
            />

            {/* Header bar */}
            <div className="relative flex items-center justify-between border-b border-stone/40 px-6 py-5 sm:px-10">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-clay">
                  {service.n}
                </span>
                <span className="h-px w-8 bg-stone/60" />
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-clay">
                  Services
                </span>
              </div>
              <button
                ref={closeRef}
                aria-label="Close"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone/60 text-ink transition-colors hover:bg-canvas/80"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div
              data-lenis-prevent
              className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >
              {/* Image hero */}
              <div className="relative h-[42svh] min-h-[280px] w-full overflow-hidden bg-linen sm:h-[48svh]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  sizes="(min-width: 1180px) 1180px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/55 via-obsidian/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-6 pb-8 sm:px-10 sm:pb-10">
                  <h2 className="max-w-[20ch] font-display text-[2rem] leading-[1.05] text-canvas sm:text-[2.75rem] lg:text-[3.25rem]">
                    {service.title}
                  </h2>
                </div>
              </div>

              {/* Body */}
              <div className="grid gap-12 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7">
                  <p className="drop-cap max-w-[58ch] text-body">
                    {service.intro}
                  </p>

                  <div className="mt-12">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
                        What's included
                      </span>
                      <span className="h-px flex-1 bg-stone/50" />
                    </div>
                    <ul className="mt-6 divide-y divide-stone/40 border-y border-stone/40">
                      {service.includes.map((line) => (
                        <li
                          key={line}
                          className="grid grid-cols-[auto_1fr] gap-4 py-4 text-body"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.55em] h-px w-5 bg-accent"
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <aside className="lg:col-span-5">
                  <div className="rounded-[6px] border border-stone/50 bg-canvas/60 p-7">
                    <div className="text-caption text-clay">Ideal for</div>
                    <p className="mt-3 text-body">{service.idealFor}</p>

                    <div className="mt-8 text-caption text-clay">
                      Deliverables
                    </div>
                    <ul className="mt-4 space-y-3">
                      {service.deliverables.map((d) => (
                        <li
                          key={d}
                          className="grid grid-cols-[auto_1fr] gap-3 text-[0.95rem] leading-relaxed text-ink/85"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.55em] h-1.5 w-1.5 rounded-full bg-accent"
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      // give the close animation a beat before reopening
                      setTimeout(
                        () =>
                          openConcierge({
                            source: "inquiry-cta",
                            intent: "inquire",
                          }),
                        420,
                      );
                    }}
                    className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full border border-ink bg-ink px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-canvas transition-all duration-500 hover:bg-obsidian hover:tracking-[0.26em]"
                  >
                    <span>Start a project</span>
                    <svg
                      width="16"
                      height="10"
                      viewBox="0 0 18 10"
                      fill="none"
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    >
                      <path
                        d="M1 5h16M12 1l5 4-5 4"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </button>
                </aside>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
