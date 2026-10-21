"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";

type Filter = "all" | Project["category"];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All projects" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
];

/**
 * Reads the initial filter from `?filter=` on the client so the page can be
 * statically exported. Must be rendered inside a <Suspense> boundary.
 */
export function PortfolioProjectsFromParams() {
  const param = useSearchParams().get("filter");
  const initial = FILTERS.find((f) => f.value === param)?.value ?? "all";
  // Remount when the param changes so footer links work while on the page.
  return <PortfolioProjects key={initial} initialFilter={initial} />;
}

export function PortfolioProjects({
  initialFilter = "all",
}: {
  initialFilter?: Filter;
}) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const list = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <section className="relative pb-20 lg:pb-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "whitespace-nowrap rounded-full border px-5 py-2 text-caption transition-colors duration-500",
                filter === f.value
                  ? "border-ink bg-ink text-canvas"
                  : "border-stone/60 text-ink/75 hover:border-ink/40",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-y-20"
        >
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={cn(i === 0 && "md:col-span-2")}
              >
                <ProjectCard project={p} index={i} wide={i === 0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project: p,
  index,
  wide,
}: {
  project: Project;
  index: number;
  wide: boolean;
}) {
  const photos = p.gallery.length + 1;
  return (
    <Link href={`/portfolio/${p.slug}`} className="group block">
      <div
        className={cn(
          "relative overflow-hidden rounded-[3px] bg-linen",
          wide ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={p.cover.src}
          alt={p.cover.alt}
          style={{ objectPosition: p.cover.focus }}
          fill
          sizes={wide ? "(min-width: 768px) 90vw, 95vw" : "(min-width: 768px) 45vw, 95vw"}
          className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/45 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full bg-canvas/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink backdrop-blur-md">
          {p.category}
        </span>
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px flex-1 bg-stone/50 transition-colors duration-700 group-hover:bg-terracotta" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
          {p.type} · {photos} photos{p.video ? " + video" : ""}
        </span>
      </div>
      <h3 className="mt-3 font-display text-[1.75rem] leading-[1.1] text-ink lg:text-[2.25rem]">
        {p.title}
      </h3>
      <p className="mt-3 max-w-[58ch] text-body">{p.excerpt}</p>
    </Link>
  );
}
