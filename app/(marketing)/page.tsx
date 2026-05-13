import { Hero } from "@/components/home/Hero";
import { AboutNancy } from "@/components/home/AboutNancy";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { ContactBlock } from "@/components/home/ContactBlock";
import { SectionTransition } from "@/components/ui/SectionTransition";

export default function HomePage() {
  return (
    <>
      <Hero />

      <SectionTransition index="01" label="The Studio" tone="canvas" />
      <AboutNancy />

      <SectionTransition index="02" label="Services" tone="linen" />
      <ServicesGrid limit={3} />

      <SectionTransition index="03" label="Process" tone="walnut" />
      <ProcessTimeline />

      <SectionTransition index="04" label="Selected Work" tone="canvas" />
      <PortfolioPreview />

      <SectionTransition index="05" label="Voices" tone="canvas" />
      <Testimonials />

      <SectionTransition index="06" label="Begin" tone="canvas" />
      <InquiryCTA />

      <SectionTransition index="07" label="Contact" tone="canvas" />
      <ContactBlock />
    </>
  );
}
