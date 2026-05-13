import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { journal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from the studio - essays on restraint, material grammar, and the choreography of a finished space.",
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal · 08"
        title={
          <>
            Notes from
            <span className="italic font-light"> the studio.</span>
          </>
        }
        intro="Essays, references, and reflections on the slow work of composing a room."
      />

      <section className="mx-auto max-w-[1440px] px-6 pb-24 lg:px-10">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
          {journal.map((j, i) => (
            <Reveal key={j.slug} delay={i * 0.05}>
              <Link href={`/journal/${j.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-linen">
                  <Image
                    src={j.image}
                    alt={j.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 90vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 text-caption text-clay">
                  {j.date} · {j.tags.join(" · ")}
                </div>
                <h3 className="mt-2 font-display text-2xl text-ink md:text-3xl">
                  {j.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-body">{j.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
