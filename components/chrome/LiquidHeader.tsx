"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Monogram, Wordmark } from "@/components/ui/Wordmark";
import { Magnetic } from "@/components/ui/Magnetic";
import { useConcierge } from "@/components/intake/ConciergeProvider";
import { MobileMenu } from "./MobileMenu";

const NAV = [
  { label: "Aesthetics", href: "/portfolio" },
  { label: "Studio", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export function LiquidHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduce = useReducedMotion();
  const { openConcierge } = useConcierge();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b backdrop-saturate-150 transition-[background-color,backdrop-filter,border-color,padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pt-[env(safe-area-inset-top)]",
          "shadow-[inset_0_1px_0_0_rgba(255,253,247,0.35)]",
          scrolled
            ? "border-stone/45 bg-canvas/85 backdrop-blur-2xl"
            : "border-stone/25 bg-canvas/55 backdrop-blur-2xl",
        )}
      >
        <div
          className={cn(
            "mx-auto grid w-full max-w-[1480px] grid-cols-[auto_1fr_auto] items-center gap-2 px-5 transition-[padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-4 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-10",
            scrolled ? "py-3" : "py-5",
          )}
        >
          {/* LEFT: monogram + Est + (lg+) Book Consultation + Start Your Project */}
          <div className="flex items-center gap-3 lg:gap-5">
            <Link
              href="/"
              aria-label="Studio A by Nancy - home"
              className="flex items-center gap-3 text-ink"
            >
              <Monogram className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
              <span className="hidden text-caption sm:inline-block">
                Est. 2018
              </span>
            </Link>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                onClick={() =>
                  openConcierge({ source: "header", intent: "schedule" })
                }
                className="whitespace-nowrap rounded-full border border-ink/30 bg-transparent px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-ink transition-all duration-500 hover:border-ink hover:bg-ink hover:text-canvas"
              >
                Book Consultation
              </button>
              <button
                onClick={() =>
                  openConcierge({ source: "header", intent: "inquire" })
                }
                className="whitespace-nowrap rounded-full border border-ink bg-ink px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-canvas transition-all duration-500 hover:bg-obsidian"
              >
                Start Your Project
              </button>
            </div>
          </div>

          {/* CENTER: wordmark */}
          <Link
            href="/"
            aria-label="Studio A by Nancy"
            className="justify-self-center"
          >
            <motion.div
              animate={{ scale: scrolled ? 0.92 : 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Wordmark className="text-[1rem] text-ink sm:text-[1.2rem] lg:text-[1.35rem]" />
            </motion.div>
          </Link>

          {/* RIGHT: nav (lg+) / hamburger (mobile) */}
          <div className="flex items-center justify-self-end">
            <nav className="hidden items-center lg:flex">
              {NAV.map((item) => (
                <Magnetic key={item.href} strength={0.18}>
                  <Link
                    href={item.href}
                    className="group relative px-3 py-2 text-caption text-ink/80 transition-colors hover:text-ink lg:px-4"
                  >
                    <span>{item.label}</span>
                    <span
                      aria-hidden
                      className="absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 lg:left-4 lg:right-4"
                    />
                  </Link>
                </Magnetic>
              ))}
            </nav>

            <button
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="ml-1 inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone/60 text-ink transition-colors hover:bg-linen lg:hidden"
            >
              <svg width="16" height="10" viewBox="0 0 18 10" fill="none">
                <path
                  d="M0 1h18M0 9h12"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
