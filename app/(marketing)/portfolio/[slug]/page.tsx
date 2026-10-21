import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { InquiryCTA } from "@/components/home/InquiryCTA";

type Params = { slug: string };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      images: [project.cover.src],
      title: project.title,
      description: project.excerpt,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { k: "Project", v: project.type },
    { k: "Sector", v: project.category === "commercial" ? "Commercial" : "Residential" },
    ...(project.location ? [{ k: "Location", v: project.location }] : []),
    ...(project.year ? [{ k: "Completed", v: project.year }] : []),
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[88svh] min-h-[600px] w-full overflow-hidden bg-obsidian">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: project.cover.focus }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian/70" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 text-canvas lg:px-10 lg:pb-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-canvas/85">
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta-soft" />
              Portfolio · {project.type}
            </div>
            <h1 className="text-display mt-5 max-w-[18ch] font-display">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Story + facts */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 lg:grid-cols-12 lg:gap-20 lg:px-10 lg:py-24">
        <div className="lg:col-span-4">
          <Reveal>
            <dl className="divide-y divide-stone/50 border-y border-stone/50">
              {facts.map((f) => (
                <div key={f.k} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-caption text-clay">{f.k}</dt>
                  <dd className="text-right text-ink">{f.v}</dd>
                </div>
              ))}
              <div className="py-4">
                <dt className="text-caption text-clay">Scope</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.scope.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-stone/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink/80"
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.25] text-ink">
              {project.excerpt}
            </p>
          </Reveal>
          {project.story.map((para, i) => (
            <Reveal key={i} delay={0.05 * (i + 1)}>
              <p className="mt-8 max-w-[62ch] text-body">{para}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-[1440px] px-6 pb-16 lg:px-10 lg:pb-24">
        <div className="columns-1 gap-5 sm:columns-2 lg:gap-6">
          {project.gallery.map((img) => (
            <Reveal key={img.src} amount={0.1} className="mb-5 break-inside-avoid lg:mb-6">
              <figure className="overflow-hidden rounded-[3px] bg-linen">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 640px) 45vw, 95vw"
                  className="h-auto w-full"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Walkthrough video */}
      {project.video && (
        <section className="bg-linen/60 py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-caption">{project.video.caption}</div>
                <h2 className="text-h2 mt-6 max-w-[14ch] font-display">
                  Step inside
                  <span className="italic font-light text-terracotta"> {project.title}.</span>
                </h2>
                <p className="mt-6 max-w-[44ch] text-body">
                  A short walkthrough of the finished space, filmed on site.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-[28px] border-[6px] border-ink bg-ink shadow-[0_40px_80px_-40px_rgba(20,17,14,0.55)]">
                  <video
                    src={project.video.src}
                    poster={project.video.poster}
                    controls
                    playsInline
                    preload="none"
                    className="aspect-[9/16] w-full bg-ink object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Next project */}
      <section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-20">
        <Link href={`/portfolio/${next.slug}`} className="group grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-caption">Next project</div>
            <h2 className="text-h2 mt-4 font-display">
              <span className="relative">
                {next.title}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
              </span>
            </h2>
            <p className="mt-3 text-caption text-clay">{next.type}</p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[3px] bg-linen md:col-span-7">
            <Image
              src={next.cover.src}
              alt={next.cover.alt}
              style={{ objectPosition: next.cover.focus }}
              fill
              sizes="(min-width: 768px) 55vw, 95vw"
              className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          </div>
        </Link>
        <div className="mt-12">
          <ArrowLink href="/portfolio" direction="left">
            Back to the portfolio
          </ArrowLink>
        </div>
      </section>

      <InquiryCTA />
    </>
  );
}
