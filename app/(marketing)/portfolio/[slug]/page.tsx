import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { aesthetics, aestheticTags } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
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
            <div className="text-caption">Related aesthetics</div>
          </Reveal>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {related.map((p) => (
              <Reveal key={p.slug}>
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
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 text-caption text-clay">
                    {labelFor(p.tags[0])}
                  </div>
                  <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="mx-auto max-w-[1440px] px-6 pb-16 lg:px-10 lg:pb-20">
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-3 text-caption text-ink"
        >
          <svg
            width="16"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            className="transition-transform duration-500 group-hover:-translate-x-1"
          >
            <path
              d="M17 5H1M6 1L1 5l5 4"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <span className="border-b border-ink/40 pb-1">
            Back to the aesthetics gallery
          </span>
        </Link>
      </section>

      <InquiryCTA />
    </>
  );
}
