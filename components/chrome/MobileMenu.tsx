"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { useConcierge } from "@/components/intake/ConciergeProvider";

const NAV = [
  { label: "Aesthetics", href: "/portfolio" },
  { label: "Studio", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const { openConcierge } = useConcierge();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[60]"
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        className="glass-deep absolute inset-0 flex flex-col overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <Wordmark variant="mark" className="text-xl text-ink" asLink />
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone/60 text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-1 px-6 pb-10 pt-12">
          {NAV.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.15 + i * 0.06,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="block border-b border-stone/40 py-4 font-display text-[1.85rem] leading-none text-ink sm:py-5 sm:text-[2.25rem]"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}

          <motion.button
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.15 + NAV.length * 0.06,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => {
              onClose();
              setTimeout(
                () =>
                  openConcierge({ source: "mobile-menu", intent: "inquire" }),
                420,
              );
            }}
            className="mt-10 inline-flex items-center justify-center rounded-full bg-ink px-7 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-canvas"
          >
            Start Your Project
          </motion.button>
        </nav>

        <div className="border-t border-stone/40 px-6 py-6 text-caption">
          <p>nancy@studioabynancy.com</p>
          <p className="mt-1">(503) 764-7003</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
