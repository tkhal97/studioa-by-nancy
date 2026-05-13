import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { AestheticsGallery } from "@/components/aesthetics/AestheticsGallery";
import { PortfolioProjects } from "@/components/portfolio/PortfolioProjects";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { projects, type AestheticTag } from "@/lib/content";

export const metadata: Metadata = {
  title: "Aesthetics & Portfolio",
  description:
    "A visual library of the moods, materials, and aesthetics that inform our work — and a selection of completed Portland projects.",
};

type Search = { filter?: string };

const VALID_FILTERS: (AestheticTag | "all")[] = [
  "all",
  "residential",
  "commercial",
  "modern",
  "luxury",
  "minimal",
  "contemporary",
  "warm-organic",
  "transitional",
  "mountain",
  "coastal",
  "mid-century",
];

export default async function AestheticsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { filter } = await searchParams;
  const initial = (VALID_FILTERS.find((v) => v === filter) ?? "all") as
    | AestheticTag
    | "all";

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
      />

      <AestheticsGallery initialFilter={initial} />

      {projects.length > 0 && <PortfolioProjects />}

      <InquiryCTA />
    </>
  );
}
