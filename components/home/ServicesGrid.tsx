"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { services, type Service } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceModal } from "@/components/services/ServiceModal";

type Props = {
  /** When set, show only the first N services and a "View All Services" CTA. */
  limit?: number;
};

export function ServicesGrid({ limit }: Props = {}) {
  const items = limit ? services.slice(0, limit) : services;
  const [active, setActive] = useState<Service | null>(null);

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
        <div className="mt-20 hidden grid-cols-2 gap-6 sm:grid lg:grid-cols-3 lg:gap-8">
          {items.map((s, i) => (
            <ServiceCard
              key={s.title}
              service={s}
              index={i}
              onOpen={() => setActive(s)}
            />
          ))}
        </div>

        {/* Mobile snap-scroll */}
        <div className="no-scrollbar mt-12 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:hidden [scroll-padding-left:1.25rem]">
          {items.map((s) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setActive(s)}
              className="group relative w-[72vw] flex-shrink-0 snap-start overflow-hidden rounded-[3px] border border-stone/40 bg-canvas text-left transition-colors duration-500 hover:border-ink/30"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="80vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.22em] text-canvas drop-shadow-[0_1px_4px_rgba(20,17,14,0.55)]">
                  {s.n}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {s.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-clay">
                  <span>Read more</span>
                  <svg width="14" height="9" viewBox="0 0 18 10" fill="none">
                    <path
                      d="M1 5h16M12 1l5 4-5 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </span>
              </div>
            </button>
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

      <ServiceModal service={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ServiceCard({
  service,
  index,
  onOpen,
}: {
  service: Service;
  index: number;
  onOpen: () => void;
}) {
  return (
    <Reveal delay={(index % 3) * 0.06}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Read more about ${service.title}`}
        className="group flex h-full w-full flex-col overflow-hidden rounded-[3px] border border-stone/40 bg-canvas text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-ink/30 hover:shadow-[0_30px_60px_-40px_rgba(20,17,14,0.18)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/25 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 font-mono text-[11px] tracking-[0.22em] text-canvas drop-shadow-[0_1px_4px_rgba(20,17,14,0.5)]">
            {service.n}
          </span>
          {/* view affordance */}
          <span className="absolute right-5 top-5 inline-flex h-10 w-10 -translate-y-1 items-center justify-center rounded-full border border-canvas/55 bg-canvas/15 text-canvas opacity-0 backdrop-blur-md transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
              <path
                d="M5 13L13 5M13 5H6M13 5v7"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6 lg:p-7">
          <h3 className="font-display text-2xl leading-tight text-ink">
            <span className="relative">
              {service.title}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
            </span>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            {service.body}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-clay transition-colors duration-500 group-hover:text-ink">
            <span>Read more</span>
            <svg
              width="14"
              height="9"
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
          </span>
        </div>
      </button>
    </Reveal>
  );
}
