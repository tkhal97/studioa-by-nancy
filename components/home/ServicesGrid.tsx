"use client";

import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  /** When set, show only the first N services and a "View All Services" CTA. */
  limit?: number;
};

export function ServicesGrid({ limit }: Props = {}) {
  const items = limit ? services.slice(0, limit) : services;
  const gridCols = limit && limit <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-3";

  return (
    <section className="relative bg-linen/60 py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionHeading
          index="02"
          eyebrow="Services"
          title={
            <>
              Every phase,
              <br />
              <span className="italic font-light">handled in-house.</span>
            </>
          }
          intro="From design and sourcing to procurement and installation, Studio A is a single point of contact for every part of your project."
        />

        {/* Desktop / tablet grid */}
        <div className={`mt-20 hidden grid-cols-2 gap-6 sm:grid lg:gap-8 ${gridCols}`}>
          {items.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        {/* Mobile snap-scroll */}
        <div className="no-scrollbar mt-12 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:hidden [scroll-padding-left:1.25rem]">
          {items.map((s) => (
            <article
              key={s.title}
              className="relative w-[72vw] flex-shrink-0 snap-start overflow-hidden rounded-[3px] border border-stone/40 bg-canvas"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="80vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <span className="font-mono text-[10px] tracking-[0.22em] text-clay">
                  {s.n}
                </span>
                <h3 className="mt-2 font-display text-xl text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        {limit && services.length > limit && (
          <Reveal delay={0.1}>
            <div className="mt-14 flex justify-center sm:mt-16 lg:mt-20">
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 rounded-full border border-ink bg-ink px-8 py-4 text-[0.7rem] uppercase tracking-[0.22em] text-canvas transition-all duration-500 hover:bg-obsidian hover:tracking-[0.26em]"
              >
                <span>View All Services</span>
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
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  return (
    <Reveal delay={(index % 3) * 0.06}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-stone/40 bg-canvas transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-ink/30 hover:shadow-[0_30px_60px_-40px_rgba(20,17,14,0.18)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/15 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 font-mono text-[11px] tracking-[0.22em] text-canvas drop-shadow-[0_1px_4px_rgba(20,17,14,0.5)]">
            {service.n}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6 lg:p-7">
          <h3 className="font-display text-2xl leading-tight text-ink">
            {service.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            {service.body}
          </p>
        </div>
      </article>
    </Reveal>
  );
}
