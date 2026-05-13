import { Hero } from "@/components/home/Hero";
import { AboutNancy } from "@/components/home/AboutNancy";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { ContactBlock } from "@/components/home/ContactBlock";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutNancy />
      <ServicesGrid limit={3} />
      <ProcessTimeline />
      <PortfolioPreview />
      <Testimonials />
      <InquiryCTA />
      <ContactBlock />
    </>
  );
}
