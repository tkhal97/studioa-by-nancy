import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { partners } from "@/lib/content";

/** Trusted collaborators - each logo, name, and photo links to their site. */
export function Partners() {
  return (
    <section id="partners" className="scroll-mt-28 py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal>
          <div className="text-caption">Partners</div>
          <h2 className="text-h2 mt-6 max-w-[18ch] font-display leading-[1.05]">
            Trusted collaborators,
            <span className="italic font-light text-terracotta"> from the ground up.</span>
          </h2>
          <p className="mt-6 max-w-[56ch] text-body">
            Great interiors start with great architecture. These are the
            professionals Nancy works alongside and recommends.
          </p>
        </Reveal>

        <div className="mt-14 space-y-16">
          {partners.map((p) => (
            <Reveal key={p.name}>
              <article className="grid items-center gap-10 border-t border-stone/50 pt-10 lg:grid-cols-12 lg:gap-16">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} - visit website`}
                  className="group relative block aspect-[16/9] overflow-hidden rounded-[3px] bg-linen lg:col-span-7"
                >
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 95vw"
                    className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute right-4 top-4 flex items-center rounded-full bg-obsidian/35 p-2 backdrop-blur-md">
                    <img src={p.logoLight} alt="" className="h-8 w-auto" />
                  </span>
                </a>

                <div className="lg:col-span-5">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-5"
                  >
                    <img src={p.logoDark} alt="" className="h-16 w-auto" />
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-clay">
                        {p.discipline}
                      </span>
                      <span className="relative mt-2 block font-display text-[1.75rem] leading-[1.1] text-ink">
                        {p.name}
                        <span
                          aria-hidden
                          className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                        />
                      </span>
                    </span>
                  </a>
                  <p className="mt-6 max-w-[48ch] text-body">{p.description}</p>

                  <dl className="mt-8 divide-y divide-stone/50 border-y border-stone/50">
                    {[
                      { k: "Contact", v: p.person },
                      { k: "Phone", v: p.phone, href: `tel:+1${p.phone.replace(/\D/g, "")}` },
                      { k: "Email", v: p.email, href: `mailto:${p.email}` },
                      { k: "Based in", v: p.location },
                    ].map((row) => (
                      <div key={row.k} className="flex items-baseline justify-between gap-6 py-3.5">
                        <dt className="text-caption text-clay">{row.k}</dt>
                        <dd className="text-right text-ink">
                          {row.href ? (
                            <a href={row.href} className="transition-colors hover:text-terracotta">
                              {row.v}
                            </a>
                          ) : (
                            row.v
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-3 rounded-full border border-ink/30 px-6 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-ink transition-all duration-500 hover:bg-ink hover:text-canvas"
                  >
                    Visit website
                    <svg width="10" height="10" viewBox="0 0 18 18" fill="none" aria-hidden>
                      <path d="M5 13L13 5M13 5H6M13 5v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
