"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, type Project } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  /**
   * Optional override. When the Sanity client is wired, pass `projects`
   * fetched server-side instead of relying on the placeholder array.
   */
  items?: Project[];
};

export function PortfolioProjects({ items }: Props) {
  const list = items ?? projects;

  return (
    <section className="relative bg-linen/40 py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-caption">Portfolio</div>
            <h2 className="text-h2 mt-6 max-w-[20ch] font-display leading-[1.05]">
              Recent work,
              <br />
              <span className="italic font-light">project by project.</span>
            </h2>
          </div>
          <p className="max-w-[42ch] text-body lg:text-right">
            A selection of completed projects across Portland and the Pacific
            Northwest. Click any project to step inside.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 lg:gap-x-8 lg:gap-y-20">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.05}>
              <Link href={`/portfolio/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-canvas">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 95vw"
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-caption text-clay">
                      {p.location} · {p.year}
                    </div>
                    <h3 className="mt-2 font-display text-2xl text-ink md:text-[1.75rem]">
                      {p.title}
                    </h3>
                  </div>
                  <span className="hidden text-caption text-ink/60 md:block">
                    {p.category[0]}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
