import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactBlock } from "@/components/home/ContactBlock";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { aesthetics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Studio A by Nancy - a Portland-based interior design studio. We take a small number of projects each year.",
};

const heroPhoto = aesthetics.find((p) => p.slug === "stone-and-oak")!;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact · 07"
        title={
          <>
            Get in touch
            <span className="italic font-light"> with the studio.</span>
          </>
        }
        intro="We take a small number of residential and commercial projects each year. Write to us and Nancy will reply personally."
        panel={{
          src: heroPhoto.src,
          alt: heroPhoto.alt,
          caption: "By appointment · Portland",
        }}
      />
      <ContactBlock showSelfLink={false} showIntro={false} />
      <InquiryCTA />
    </>
  );
}
