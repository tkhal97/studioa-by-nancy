import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ConsultationOffer } from "@/components/services/ConsultationOffer";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { details } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full interior design, procurement, renderings, installation, and bespoke furnishing - a complete studio composed for you.",
};

const heroPhoto = details.slatWall;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services · 02"
        title={
          <>
            A complete studio,
            <span className="italic font-light"> end-to-end.</span>
          </>
        }
        intro="From the first consultation to the final install, Studio A is a single point of contact for every layer of a luxury interior."
        panel={{
          src: heroPhoto.src,
          alt: heroPhoto.alt,
          caption: "Detail · Stacked wood slat wall",
        }}
      />
      <ConsultationOffer />
      <ServicesGrid />
      <InquiryCTA />
    </>
  );
}
