"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function PortfolioPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  // fall back to the first 4 if none are explicitly featured
  const items = featured.length > 0 ? featured : projects.slice(0, 4);

  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="04"
            eyebrow="Selected Work"
            title={
              <>
                Completed work,
                <br />
                <span className="italic font-light">room by room.</span>
              </>
            }
          />
          <Reveal delay={0.2}>
            <ArrowLink href="/portfolio">View the full portfolio</ArrowLink>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-12">
          {items.map((p, i) => {
            // editorial asymmetric layout
            const layouts = [
              "md:col-span-7",
              "md:col-span-5 md:mt-32",
              "md:col-span-6",
              "md:col-span-6 md:mt-24",
            ];
            const aspects = [
              "aspect-[4/5]",
              "aspect-[3/4]",
              "aspect-[5/4]",
              "aspect-[4/5]",
            ];
            return (
              <Reveal
                key={p.slug}
                delay={i * 0.05}
                amount={0.15}
                className={layouts[i % layouts.length]}
              >
                <Link href={`/portfolio/${p.slug}`} className="group block">
                  <div
                    className={`relative ${aspects[i % aspects.length]} overflow-hidden bg-linen`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={p.cover.src}
                        alt={p.cover.alt}
                        fill
                        sizes="(min-width: 768px) 50vw, 95vw"
                        className="object-cover"
                      />
                    </motion.div>
                    {/* warm vignette */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/45 via-obsidian/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    {/* inset border that draws on hover */}
                    <div className="pointer-events-none absolute inset-4 border border-canvas/0 transition-colors duration-700 group-hover:border-canvas/45 sm:inset-5" />
                    {/* view disc */}
                    <span className="absolute right-5 top-5 inline-flex h-12 w-12 -translate-y-1 items-center justify-center rounded-full border border-canvas/55 bg-canvas/10 text-canvas opacity-0 backdrop-blur-md transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                      <svg
                        width="14"
                        height="14"
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

                  {/* Editorial caption */}
                  <div className="mt-7">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-10 bg-stone/60 transition-colors duration-700 group-hover:bg-accent" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
                        {p.type}
                      </span>
                    </div>
                    <h3 className="mt-4 inline-block font-display text-[1.75rem] leading-[1.1] text-ink lg:text-[2.25rem]">
                      <span className="relative">
                        {p.title}
                        <span
                          aria-hidden
                          className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                        />
                      </span>
                    </h3>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
