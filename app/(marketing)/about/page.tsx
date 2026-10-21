import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { Signature } from "@/components/ui/Signature";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { PageHero } from "@/components/ui/PageHero";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio · About Nancy",
  description:
    "Studio A by Nancy is a Portland-based interior design studio specializing in refined residential and commercial spaces that feel elevated, timeless, and deeply personal.",
};

const heroPhoto = projects
  .find((p) => p.slug === "the-nursery")!
  .gallery.find((g) => g.src.endsWith("balloon-detail.jpg"))!;

const SERVICES = [
  "Residential Interior Design",
  "Commercial Interior Design",
  "Furnishing & Styling",
  "Space Planning",
  "Procurement",
  "Renderings & Visualization",
  "Installation Coordination",
];

const STATS = [
  { k: "Founded", v: "2024" },
  { k: "Projects Completed", v: "60+" },
  { k: "Based In", v: "Portland, Oregon" },
  { k: "Focus", v: "Residential & Commercial Design" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio · About"
        title={
          <>
            Designed with intention.{" "}
            <span className="italic font-light">Created for real life.</span>
          </>
        }
        intro="Studio A by Nancy is a Portland-based interior design studio specializing in refined residential and commercial spaces that feel elevated, timeless, and deeply personal."
        panel={{
          src: heroPhoto.src,
          alt: heroPhoto.alt,
          caption: "From the portfolio · The Nursery",
        }}
      />

      {/* Portrait + narrative */}
      <section className="mx-auto grid max-w-[1440px] gap-14 px-6 pb-16 lg:grid-cols-12 lg:gap-20 lg:px-10 lg:pb-20">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-linen">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80"
                alt="Portrait of Nancy"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <p className="mt-6 text-caption">Founder · Principal Designer</p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="drop-cap max-w-[58ch] text-body">
              Founded in 2024, the studio was built around the idea that great
              design should feel effortless to live in. Every project is
              approached with careful attention to detail, balancing aesthetics,
              comfort, functionality, and the unique personality of each client.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[58ch] text-body">
              Led by Nancy, the studio works closely with homeowners, business
              owners, and developers to create spaces that feel cohesive,
              welcoming, and thoughtfully curated from start to finish.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-[58ch] text-body">
              From full interior design and furnishing to procurement,
              renderings, and installation coordination, Studio A by Nancy
              manages every phase with a hands-on, highly personalized approach.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[58ch] text-body">
              Based in Portland, the studio draws inspiration from modern
              architecture, natural textures, soft organic palettes, and
              timeless materials to create interiors that feel sophisticated
              without feeling cold.
            </p>
          </Reveal>
          <div className="mt-12">
            <Signature />
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-linen/60 py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="text-caption">Services include</div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-h2 mt-6 max-w-[18ch] font-display leading-[1.05]">
                Every phase,
                <br />
                <span className="italic font-light">handled in-house.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <ul className="divide-y divide-stone/40 border-y border-stone/40">
                {SERVICES.map((s, i) => (
                  <li
                    key={s}
                    className="grid grid-cols-12 gap-4 py-5 transition-colors hover:bg-canvas/40"
                  >
                    <span className="col-span-2 text-caption text-clay">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="col-span-10 font-display text-xl text-ink sm:text-2xl">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <p className="mx-auto max-w-[36ch] text-center font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.2] text-ink">
            Whether designing a private residence, boutique commercial space, or
            full renovation, the goal is always the same -
            <br />
            <span className="italic font-light">
              to create spaces that feel beautiful, functional, and truly lived
              in.
            </span>
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-8 border-y border-stone/40 py-12 sm:grid-cols-4">
          {STATS.map(({ k, v }) => (
            <Reveal key={k} delay={0.05}>
              <div className="text-caption text-clay">{k}</div>
              <div className="mt-3 font-display text-xl text-ink lg:text-2xl">
                {v}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <InquiryCTA />
    </>
  );
}
