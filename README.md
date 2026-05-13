# Studio A by Nancy

A bespoke, editorial-quality interior design website. Next.js 15 + TypeScript + Tailwind v4 + Framer Motion + Lenis.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in keys as you have them
npm run dev                  # http://localhost:3000
```

Everything works without API keys - the site runs on curated placeholder content and the intake API logs to the server console.

## What's included

- **Liquid-glass header** that shrinks on scroll, with editorial nav, magnetic hover, and a full-screen glass mobile menu.
- **Cinematic homepage** - hero with masked word reveal, asymmetric About, editorial Services grid (with mobile snap-scroll), 8-stage Process timeline, Portfolio masonry preview, auto-advancing testimonials, full-bleed Inquiry CTA, minimalist Contact block.
- **Concierge intake** - 8-step decision-tree flow that opens in a glass modal anywhere on the site. Adapts investment options and confirmation copy by branch (residential vs commercial, commercial big-budget, planning phase, etc.). Persists draft to localStorage and resumes after refresh. Honeypot + Upstash rate limit + Zod validation server-side.
- **First-visit prompt** - quietly appears at 35s or 70% scroll, suppresses for 14 days on dismissal.
- **Portfolio** - filterable editorial masonry + cinematic case study template with adjacent-project navigation.
- **Pages** - About, Services, Process, Portfolio (+ slug), Journal (+ slug), Contact, /start fallback, 404.
- **Emails** - Nancy lead email + branded client confirmation via Resend + React Email.
- **SEO** - dynamic metadata, sitemap, robots, manifest, JSON-LD (`InteriorDesigner` schema).
- **Accessibility** - focus rings everywhere, ESC + focus trap on modal, prefers-reduced-motion respected.

## Environment

All env keys are optional - the site degrades gracefully:

| Var                                                      | Effect when missing                                                           |
| -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `RESEND_API_KEY`                                         | Submissions are logged to the server console instead of emailed.              |
| `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Leads aren't persisted - only emailed.                                        |
| `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`    | Rate limiting is disabled.                                                    |
| `NEXT_PUBLIC_CAL_LINK`                                   | The "Schedule" confirmation shows a placeholder instead of the Cal.com embed. |
| `NEXT_PUBLIC_SANITY_*`                                   | Portfolio uses curated placeholder content (`lib/content.ts`).                |

Supabase table schema: `sanity/supabase-schema.sql`.
Sanity schemas (ready to mount when CMS is wired): `sanity/schemas/`.

## Architecture notes

- `app/(marketing)/` - public site under shared header/footer.
- `app/api/intake/route.ts` - single endpoint that validates, rate-limits, persists, and emails.
- `lib/intake/` - schema (Zod), decision tree (pure), store (Zustand + persist), copy adaptation.
- `components/intake/` - concierge shell, progress rail, 8 step components.
- `components/home/` - homepage section components, each a server-friendly client island.
- `components/ui/` - design-system primitives: Button, Reveal, Magnetic, Marquee, SectionHeading, Wordmark.

## Brand tokens

Defined in `app/globals.css` under `@theme`:

- `canvas / linen / stone / clay / ink / obsidian / accent` - warm bone → near-black, with brushed-brass accent used sparingly.
- Display serif: Fraunces. Sans: Inter Tight. Mono: JetBrains Mono.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (luxe) and `cubic-bezier(0.65, 0, 0.35, 1)` (curtains).

## Production checklist

1. Fill `.env.local` with Resend, Supabase, Upstash, Cal.com, Sanity keys.
2. Run `sanity/supabase-schema.sql` in Supabase.
3. Verify a Resend sending domain for `studioabynancy.com`.
4. Connect a Cal.com event type and copy its link to `NEXT_PUBLIC_CAL_LINK`.
5. Mount Sanity Studio (drop `@sanity/*` deps and re-export `sanity/schemas` from `sanity.config.ts`).
6. Swap placeholder Unsplash imagery for Nancy's real photography in Sanity.
7. `npm run build` and deploy to Vercel.
