"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { aesthetics, aestheticTags } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function labelFor(value: string): string {
  return aestheticTags.find((t) => t.value === value)?.label ?? value;
}

export function PortfolioPreview() {
  const featured = aesthetics.filter((a) => a.featured).slice(0, 4);
  // fall back to first 4 if none are explicitly featured
  const items = featured.length > 0 ? featured : aesthetics.slice(0, 4);

  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="04"
            eyebrow="Selected Work"
            title={
              <>
                A look at our design inspirations,
                <br />
                <span className="italic font-light">room by room.</span>
              </>
            }
          />
          <Reveal delay={0.2}>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-3 text-caption text-ink"
            >
              <span className="border-b border-ink/40 pb-1">
                View the aesthetics gallery
              </span>
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
            </Link>
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
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(min-width: 768px) 50vw, 95vw"
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    <span className="absolute right-5 top-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-canvas/60 bg-canvas/10 text-canvas opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
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
                  <div className="mt-6 flex items-end justify-between gap-6">
                    <div>
                      <div className="text-caption text-clay">
                        {p.tags.slice(0, 2).map(labelFor).join(" · ")}
                      </div>
                      <h3 className="mt-2 font-display text-2xl text-ink lg:text-3xl">
                        {p.title}
                      </h3>
                    </div>
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
