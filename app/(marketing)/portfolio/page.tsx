import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { ArrowLink } from "@/components/ui/ArrowLink";
import {
  PortfolioProjects,
  PortfolioProjectsFromParams,
} from "@/components/portfolio/PortfolioProjects";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A selection of residential and commercial interiors by Nancy Alkhouri of Studio A.",
};

const nursery = projects.find((p) => p.slug === "arched-nursery")!;

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Spaces made
            <span className="italic font-light"> for real life.</span>
          </>
        }
        intro="A selection of homes and businesses designed by Nancy, from the first conversation through to the finishing touches."
        panel={{
          src: nursery.cover.src,
          alt: nursery.cover.alt,
          focus: nursery.cover.focus,
          caption: `Completed · ${nursery.title}`,
        }}
      />

      <Suspense fallback={<PortfolioProjects />}>
        <PortfolioProjectsFromParams />
      </Suspense>

      <section className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10 lg:pb-24">
        <div className="flex flex-col items-start justify-between gap-6 border-t border-stone/50 pt-10 sm:flex-row sm:items-center">
          <p className="max-w-[48ch] text-body">
            Looking for a place to begin? Explore the colors, materials, and
            references that shape Nancy&rsquo;s work.
          </p>
          <ArrowLink href="/inspiration">Browse inspiration</ArrowLink>
        </div>
      </section>

      <InquiryCTA />
    </>
  );
}
