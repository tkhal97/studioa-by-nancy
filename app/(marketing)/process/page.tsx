import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { InquiryCTA } from "@/components/home/InquiryCTA";

export const metadata: Metadata = {
  title: "Process",
  description:
    "From discovery to final reveal - Studio A by Nancy's considered, eight-stage design process.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process · 03"
        title={
          <>
            How we work -
            <span className="italic font-light"> eight considered stages.</span>
          </>
        }
        intro="Every project moves through eight private, considered stages - each one designed to feel inevitable."
      />
      <ProcessTimeline />
      <InquiryCTA />
    </>
  );
}
