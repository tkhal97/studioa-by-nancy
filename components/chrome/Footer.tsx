"use client";

import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { Marquee } from "@/components/ui/Marquee";
import { useConcierge } from "@/components/intake/ConciergeProvider";

const STUDIO = [
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Journal", href: "/journal" },
];
const WORK = [
  { label: "Aesthetics", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Residential", href: "/portfolio?filter=residential" },
  { label: "Commercial", href: "/portfolio?filter=commercial" },
];
const CONNECT = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Houzz", href: "https://houzz.com" },
];

export function Footer() {
  const { openConcierge } = useConcierge();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 bg-walnut text-canvas">
      <div className="border-b border-canvas/10 py-10">
        <Marquee speed={60}>
          {[
            "Modern Interiors",
            "Thoughtful Design",
            "Residential & Commercial",
            "Portland, Oregon",
          ].map((s, i) => (
            <span
              key={i}
              className="font-display text-[clamp(1.75rem,7vw,5rem)] italic leading-none text-canvas/90"
            >
              {s} <span className="not-italic text-accent">·</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-20 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <Wordmark className="text-[clamp(2.25rem,4vw,3.25rem)] text-canvas" />
          <p className="mt-6 max-w-[36ch] text-canvas/70">
            A Portland-based interior design studio crafting refined homes and
            considered commercial spaces - every project led personally by
            Nancy.
          </p>
          <button
            onClick={() =>
              openConcierge({ source: "footer", intent: "inquire" })
            }
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-canvas/30 px-6 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-canvas transition-all duration-500 hover:bg-canvas hover:text-ink"
          >
            <span>Begin a project</span>
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
          </button>
        </div>

        <FooterCol heading="Studio" items={STUDIO} />
        <FooterCol heading="Work" items={WORK} />
        <FooterCol heading="Connect" items={CONNECT} />
      </div>

      <div className="border-t border-canvas/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-6 text-xs text-canvas/55 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p>© {year} Studio A by Nancy. All rights reserved.</p>
          <p className="flex gap-6">
            <Link href="/privacy" className="hover:text-canvas">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-canvas">
              Terms
            </Link>
            <span>Portland, Oregon</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  items,
}: {
  heading: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="lg:col-span-2">
      <div className="text-caption text-canvas/55">{heading}</div>
      <ul className="mt-5 space-y-3">
        {items.map((i) => {
          const external = i.href.startsWith("http");
          return (
            <li key={i.label}>
              {external ? (
                <a
                  href={i.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-canvas/85 transition-colors hover:text-canvas"
                >
                  {i.label}
                </a>
              ) : (
                <Link
                  href={i.href}
                  className="text-canvas/85 transition-colors hover:text-canvas"
                >
                  {i.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
