"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Signature } from "@/components/ui/Signature";

export function AboutNancy() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-28">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="sticky top-32">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px] bg-linen">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                  alt="Portrait of designer Nancy in her Portland studio"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-caption">
                NANCY A. Founder · Principal Designer
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading
            index="01"
            eyebrow="The Studio"
            title={
              <>
                Thoughtful interiors designed
                <br />
                around{" "}
                <span className="italic font-light">the way you live.</span>
              </>
            }
          />

          <Reveal delay={0.15}>
            <p className="drop-cap mt-12 max-w-[58ch] text-body">
              Studio A by Nancy was founded on the belief that great interior
              design should feel both beautiful and deeply livable. Every
              project is approached with careful attention to detail - balancing
              aesthetics, comfort, functionality, and the unique personality of
              each client.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[58ch] text-body">
              Nancy works closely with homeowners and select commercial clients
              to create spaces that feel refined, welcoming, and thoughtfully
              designed from start to finish. From design planning and sourcing
              to procurement and installation coordination, the studio manages
              each phase with a hands-on, personalized approach.
            </p>
          </Reveal>

          <div className="mt-12">
            <Signature delay={0.2} />
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10">
              <ArrowLink href="/about">Read the studio story</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
