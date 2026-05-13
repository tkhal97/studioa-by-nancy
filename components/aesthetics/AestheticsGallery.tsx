"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { aesthetics, aestheticTags, type AestheticTag } from "@/lib/content";
import { cn } from "@/lib/utils";

const RATIO: Record<"portrait" | "landscape" | "square", string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function AestheticsGallery({
  initialFilter,
}: {
  initialFilter?: AestheticTag | "all";
}) {
  const [filter, setFilter] = useState<AestheticTag | "all">(
    initialFilter ?? "all",
  );
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    if (filter === "all") return aesthetics;
    return aesthetics.filter((p) => p.tags.includes(filter));
  }, [filter]);

  return (
    <section className="relative bg-canvas pb-20 lg:pb-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Filter row */}
        <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-3 lg:mx-0 lg:flex-wrap lg:justify-center lg:px-0">
          {aestheticTags.map((t) => (
            <button
              key={t.value}
              onClick={() => setFilter(t.value)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-caption transition-colors duration-500",
                filter === t.value
                  ? "border-ink bg-ink text-canvas"
                  : "border-stone/60 text-ink/75 hover:border-ink/40",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Masonry grid using CSS columns for true masonry feel */}
        <motion.div
          layout
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 [column-fill:_balance] columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3 lg:gap-6"
        >
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.figure
                key={p.id}
                layout
                initial={
                  reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.7,
                  delay: Math.min(i * 0.02, 0.18),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group mb-4 break-inside-avoid sm:mb-5 lg:mb-6"
              >
                <Link href={`/portfolio/${p.slug}`} className="block">
                  <div
                    className={cn(
                      "relative w-full overflow-hidden rounded-[3px] bg-linen",
                      RATIO[p.ratio],
                    )}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 95vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    {/* Gradient + tag chips on hover */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/55 via-obsidian/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-4">
                      {p.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-canvas/85 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-ink backdrop-blur-md"
                        >
                          {labelFor(tag)}
                        </span>
                      ))}
                    </div>
                    {/* View affordance */}
                    <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-canvas/60 bg-canvas/15 text-canvas opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 sm:right-4 sm:top-4">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M5 13L13 5M13 5H6M13 5v7"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-caption text-clay">
            No images match this filter yet.
          </p>
        )}
      </div>
    </section>
  );
}

function labelFor(value: AestheticTag): string {
  const entry = aestheticTags.find((t) => t.value === value);
  return entry?.label ?? value;
}
