import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import {
  AestheticsGallery,
  AestheticsGalleryFromParams,
} from "@/components/aesthetics/AestheticsGallery";
import { PortfolioProjects } from "@/components/portfolio/PortfolioProjects";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { aesthetics, projects } from "@/lib/content";

const heroPhoto = aesthetics.find((p) => p.slug === "woven-warmth")!;

export const metadata: Metadata = {
  title: "Aesthetics & Portfolio",
  description:
    "A visual library of the moods, materials, and aesthetics that inform our work — and a selection of completed Portland projects.",
};

export default function AestheticsPage() {
  return (
    <>
      <PageHero
        eyebrow="Aesthetics"
        title={
          <>
            A visual library of
            <span className="italic font-light"> moods & materials.</span>
          </>
        }
        intro="The aesthetics, palettes, and references that inform our work. Browse by feel — residential, commercial, mountain, coastal, mid-century, and more."
        panel={{
          src: heroPhoto.src,
          alt: heroPhoto.alt,
          caption: `Plate ${heroPhoto.id} · ${heroPhoto.title}`,
        }}
      />

      <Suspense fallback={<AestheticsGallery />}>
        <AestheticsGalleryFromParams />
      </Suspense>

      {projects.length > 0 && <PortfolioProjects />}

      <InquiryCTA />
    </>
  );
}
