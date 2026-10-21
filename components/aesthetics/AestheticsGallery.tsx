"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { aesthetics, aestheticTags, type AestheticTag } from "@/lib/content";
import { cn } from "@/lib/utils";

const RATIO: Record<"portrait" | "landscape" | "square", string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

/**
 * Reads the initial filter from `?filter=` on the client so the page can be
 * statically exported. Must be rendered inside a <Suspense> boundary.
 */
export function AestheticsGalleryFromParams() {
  const param = useSearchParams().get("filter");
  const initial = aestheticTags.find((t) => t.value === param)?.value ?? "all";
  // Remount when the param changes so footer links work while on the page.
  return <AestheticsGallery key={initial} initialFilter={initial} />;
}

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
                className="group mb-10 break-inside-avoid sm:mb-12 lg:mb-14"
              >
                <Link href={`/inspiration/${p.slug}`} className="block">
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
                      className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    {/* warm vignette on hover */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/45 via-obsidian/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    {/* inner brass border that draws on hover */}
                    <div className="pointer-events-none absolute inset-3 border border-canvas/0 transition-colors duration-700 group-hover:border-canvas/40 sm:inset-4" />
                    {/* View disc: top-right, brass tint on hover */}
                    <span className="absolute right-3 top-3 inline-flex h-10 w-10 -translate-y-1 items-center justify-center rounded-full border border-canvas/55 bg-canvas/10 text-canvas opacity-0 backdrop-blur-md transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 sm:right-4 sm:top-4">
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

                  {/* Caption: editorial layout under the photo */}
                  <figcaption className="mt-5 sm:mt-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-stone/50 transition-colors duration-700 group-hover:bg-accent" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
                        {labelFor(p.tags[0])}
                      </span>
                    </div>
                    <h3 className="relative mt-3 inline-block max-w-full font-display text-[1.35rem] leading-[1.1] text-ink sm:text-[1.5rem] lg:text-[1.65rem]">
                      <span className="relative">
                        {p.title}
                        <span
                          aria-hidden
                          className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                        />
                      </span>
                    </h3>
                  </figcaption>
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
