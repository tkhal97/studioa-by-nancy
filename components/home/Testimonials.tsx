"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: 30 });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setIndex(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  // auto-advance
  useEffect(() => {
    if (!embla) return;
    const id = setInterval(() => embla.scrollNext(), 7000);
    return () => clearInterval(id);
  }, [embla]);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <section className="relative bg-canvas py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal>
          <div className="text-caption">05 · Words from our clients</div>
        </Reveal>

        <div className="mt-12 grid grid-cols-12 items-start gap-10">
          <div
            aria-hidden
            className="col-span-12 select-none font-display text-[clamp(5rem,18vw,22rem)] leading-[0.6] text-accent/35 lg:col-span-2"
          >
            “
          </div>

          <div className="col-span-12 lg:col-span-9">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="min-w-0 flex-[0_0_100%] pr-12"
                    aria-hidden={index !== i}
                  >
                    <blockquote className="text-h2 max-w-[24ch] font-display leading-[1.08]">
                      {t.quote}
                    </blockquote>
                    <footer className="mt-10 flex items-baseline gap-4">
                      <span className="h-px w-12 bg-stone" aria-hidden />
                      <div>
                        <div className="text-ink">{t.attribution}</div>
                        <div className="text-caption">{t.role}</div>
                      </div>
                    </footer>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  aria-label="Previous quote"
                  onClick={prev}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone/60 text-ink transition-colors hover:bg-linen"
                >
                  <svg width="14" height="10" viewBox="0 0 18 10" fill="none">
                    <path d="M17 5H1M6 1L1 5l5 4" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </button>
                <button
                  aria-label="Next quote"
                  onClick={next}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone/60 text-ink transition-colors hover:bg-linen"
                >
                  <svg width="14" height="10" viewBox="0 0 18 10" fill="none">
                    <path d="M1 5h16M12 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-3 text-caption text-clay">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={index}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="inline-block w-6 tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span className="h-px w-10 bg-stone/70" />
                <span>{String(testimonials.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
