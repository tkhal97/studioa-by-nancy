import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { aesthetics, aestheticTags } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { InquiryCTA } from "@/components/home/InquiryCTA";

type Params = { slug: string };

export async function generateStaticParams() {
  return aesthetics.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const photo = aesthetics.find((p) => p.slug === slug);
  if (!photo) return {};
  return {
    title: photo.title,
    description: photo.description,
    openGraph: {
      images: [photo.src],
      title: photo.title,
      description: photo.description,
    },
  };
}

function labelFor(value: string): string {
  return aestheticTags.find((t) => t.value === value)?.label ?? value;
}

export default async function AestheticDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const photo = aesthetics.find((p) => p.slug === slug);
  if (!photo) notFound();

  // Related: photos that share at least one tag, excluding the current one
  const related = aesthetics
    .filter(
      (p) =>
        p.slug !== slug && p.tags.some((tag) => photo.tags.includes(tag)),
    )
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[90svh] min-h-[640px] w-full overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/15 via-transparent to-obsidian/65" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 text-canvas lg:px-10 lg:pb-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-wrap gap-2">
              {photo.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-canvas/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-canvas backdrop-blur-md"
                >
                  {labelFor(tag)}
                </span>
              ))}
            </div>
            <h1 className="text-display mt-5 max-w-[18ch] font-display">
              {photo.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Description + meta */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 lg:grid-cols-12 lg:gap-20 lg:px-10 lg:py-20">
        <div className="lg:col-span-4">
          <Reveal>
            <dl className="space-y-6">
              <div>
                <dt className="text-caption text-clay">Tags</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {photo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stone/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink/80"
                    >
                      {labelFor(tag)}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="drop-cap max-w-[58ch] text-body">
              {photo.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10 lg:pb-24">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="text-caption">Related aesthetics</span>
              <span className="h-px flex-1 bg-stone/50" />
            </div>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-3 lg:gap-12">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-linen">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute inset-3 border border-canvas/0 transition-colors duration-700 group-hover:border-canvas/40 sm:inset-4" />
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-8 bg-stone/60 transition-colors duration-700 group-hover:bg-accent" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
                        {labelFor(p.tags[0])}
                      </span>
                    </div>
                    <h3 className="mt-3 inline-block font-display text-[1.5rem] leading-[1.1] text-ink lg:text-[1.65rem]">
                      <span className="relative">
                        {p.title}
                        <span
                          aria-hidden
                          className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                        />
                      </span>
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="mx-auto max-w-[1440px] px-6 pb-16 lg:px-10 lg:pb-20">
        <ArrowLink href="/portfolio" direction="left">
          Back to the aesthetics gallery
        </ArrowLink>
      </section>

      <InquiryCTA />
    </>
  );
}
