import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import {
  AestheticsGallery,
  AestheticsGalleryFromParams,
} from "@/components/aesthetics/AestheticsGallery";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { aesthetics } from "@/lib/content";

const heroPhoto = aesthetics.find((p) => p.slug === "woven-warmth")!;

export const metadata: Metadata = {
  title: "Inspiration",
  description:
    "A visual library of the moods, materials, and aesthetics that inform our work.",
};

export default function InspirationPage() {
  return (
    <>
      <PageHero
        eyebrow="Inspiration"
        title={
          <>
            A visual library of
            <span className="italic font-light"> moods & materials.</span>
          </>
        }
        intro="The aesthetics, palettes, and references that inform our work. Browse by feel: residential, commercial, mountain, coastal, mid-century, and more."
        panel={{
          src: heroPhoto.src,
          alt: heroPhoto.alt,
          caption: `Plate ${heroPhoto.id} · ${heroPhoto.title}`,
        }}
      />

      <Suspense fallback={<AestheticsGallery />}>
        <AestheticsGalleryFromParams />
      </Suspense>

      <section className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10 lg:pb-24">
        <div className="flex flex-col items-start justify-between gap-6 border-t border-stone/50 pt-10 sm:flex-row sm:items-center">
          <p className="max-w-[48ch] text-body">
            These are the references we start from. To see rooms Nancy has
            designed and completed, visit the portfolio.
          </p>
          <ArrowLink href="/portfolio">View the portfolio</ArrowLink>
        </div>
      </section>

      <InquiryCTA />
    </>
  );
}
