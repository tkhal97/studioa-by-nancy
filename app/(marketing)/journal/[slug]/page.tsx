import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { journal } from "@/lib/content";
import { InquiryCTA } from "@/components/home/InquiryCTA";

type Params = { slug: string };

export async function generateStaticParams() {
  return journal.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = journal.find((j) => j.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.image] },
  };
}

export default async function JournalPost({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = journal.find((j) => j.slug === slug);
  if (!post) notFound();

  return (
    <>
      <section className="mx-auto max-w-[1100px] px-6 pb-10 pt-28 sm:pt-32 lg:px-10 lg:pt-40">
        <div className="text-caption text-clay">
          {post.date} · {post.tags.join(" · ")}
        </div>
        <h1 className="text-h1 mt-6 max-w-[20ch] font-display">{post.title}</h1>
      </section>
      <section className="mx-auto max-w-[1280px] px-6 pb-20 lg:px-10">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-linen">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>
      <article className="mx-auto max-w-[680px] space-y-6 px-6 pb-24 text-body lg:px-0">
        <p className="drop-cap">
          {post.excerpt} A meaningful interior is not the result of more - it is
          the result of less, considered closely. Every studio working at this
          level eventually arrives at the same considered conclusion: that
          restraint, when practiced patiently, becomes its own form of
          generosity.
        </p>
        <p>
          A room without a single false note is rare. It requires that every
          object earn its place, and that the architecture surrender, just a
          little, to the life inside it. We design for that surrender.
        </p>
        <p>
          The studio&apos;s process is built around it - eight stages,
          purposefully slow, each one designed to keep a room composed in
          relation to the people who will live in it, not in relation to a
          season or a trend.
        </p>
        <p>
          More writing will appear here over the months ahead - on materials,
          procurement, and the final reveal.
        </p>
        <p className="font-display text-2xl italic">- Nancy</p>
      </article>
      <InquiryCTA />
    </>
  );
}
