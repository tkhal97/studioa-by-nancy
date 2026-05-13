// Curated placeholder content for Studio A by Nancy.
// Image URLs use Unsplash with constrained crops. Swap to Sanity when assets land.

// ───────────────────────────── Aesthetics ─────────────────────────────
// Standalone inspiration photos for the /portfolio "Aesthetics" gallery.
// Tag-driven filtering. When Sanity is wired, this becomes a `aestheticPhoto`
// document type and the gallery sources from there.

export type AestheticTag =
  | "residential"
  | "commercial"
  | "modern"
  | "luxury"
  | "minimal"
  | "contemporary"
  | "warm-organic"
  | "transitional"
  | "mountain"
  | "coastal"
  | "mid-century";

export const aestheticTags: { value: AestheticTag | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "modern", label: "Modern" },
  { value: "warm-organic", label: "Warm Organic" },
  { value: "minimal", label: "Minimal" },
  { value: "transitional", label: "Transitional" },
  { value: "luxury", label: "Luxury" },
  { value: "contemporary", label: "Contemporary" },
  { value: "mountain", label: "Mountain Modern" },
  { value: "coastal", label: "Coastal" },
  { value: "mid-century", label: "Mid-Century" },
];

export type AestheticPhoto = {
  id: string;
  slug: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  tags: AestheticTag[];
  ratio: "portrait" | "landscape" | "square";
  featured?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  category: ("residential" | "commercial" | "modern" | "luxury" | "minimal" | "contemporary")[];
  year: string;
  location: string;
  scope: string;
  cover: string;
  gallery: string[];
  excerpt: string;
  featured?: boolean;
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Real, completed projects. Currently empty — Nancy's case studies will be
// populated here when Sanity is wired and real photography is delivered.
// Keep the `Project` type intact so the PortfolioProjects component can
// drop straight back in.
export const projects: Project[] = [];

export const services = [
  {
    n: "01",
    title: "Residential Interior Design",
    body: "Full-service design for homes - warm, layered, and built around the way you actually live.",
    image: u("photo-1505693416388-ac5ce068fe85", 900),
  },
  {
    n: "02",
    title: "Commercial Interior Design",
    body: "Thoughtful design for hospitality, retail, and workspace - spaces that feel welcoming, functional, and made to last.",
    image: u("photo-1493663284031-b7e3aefcae8e", 900),
  },
  {
    n: "03",
    title: "Furnishing & Styling",
    body: "Custom and vintage pieces, carefully sourced and styled to feel collected - never staged.",
    image: u("photo-1554995207-c18c203602cb", 900),
  },
  {
    n: "04",
    title: "Space Planning",
    body: "Floor plans, flow, and proportion - getting the bones of the room right before anything else.",
    image: u("photo-1616594039964-ae9021a400a0", 900),
  },
  {
    n: "05",
    title: "Procurement",
    body: "Tracking, vendor coordination, and white-glove logistics - handled in-house, end-to-end.",
    image: u("photo-1600607687644-c7171b42498f", 900),
  },
  {
    n: "06",
    title: "Renderings & Visualization",
    body: "Photoreal renderings so you can stand inside a room before a single piece is ordered.",
    image: u("photo-1618221195710-dd6b41faaea6", 900),
  },
  {
    n: "07",
    title: "Installation Coordination",
    body: "We coordinate every trade and delivery - and hand over the finished home, fully installed and styled.",
    image: u("photo-1600210492486-724fe5c67fb0", 900),
  },
];

export const process = [
  {
    n: "01",
    title: "Discovery",
    body: "We begin with a private consultation - your space, your lifestyle, and the way you want to live in it.",
  },
  {
    n: "02",
    title: "Vision & Planning",
    body: "A clear project brief: aesthetic direction, architecture, investment, and timeline - captured in a single document.",
  },
  {
    n: "03",
    title: "Concept Development",
    body: "Material palettes, layered moodboards, and architectural studies. This is where the overall direction, materials, and feeling of the space begin to take shape.",
  },
  {
    n: "04",
    title: "Design",
    body: "Detailed layouts, elevations, and design plans - refined down to the smallest details.",
  },
  {
    n: "05",
    title: "Procurement",
    body: "Sourcing, tracking, and coordinating every order - custom, vintage, and trade.",
  },
  {
    n: "06",
    title: "Rendering",
    body: "Photoreal rendering of every key view, refined until each room is exactly right on paper.",
  },
  {
    n: "07",
    title: "Installation",
    body: "We coordinate every trade and delivery and stage the home in advance of your arrival.",
  },
  {
    n: "08",
    title: "Final Reveal",
    body: "The final space is fully installed, styled, and ready to be lived in.",
  },
];

export const testimonials = [
  {
    quote:
      "Nancy listened more than any designer we've worked with. The result feels like our home - only finally finished.",
    attribution: "The Andersons",
    role: "West Hills · Portland",
  },
  {
    quote:
      "She managed every trade and delivery so we didn't have to think about it. We walked back into a finished house. That alone was worth it.",
    attribution: "Maya R.",
    role: "Lake Oswego",
  },
  {
    quote:
      "Every choice came back to how we'd actually live in the room. It shows.",
    attribution: "David & Lin",
    role: "NW Portland",
  },
  {
    quote:
      "We've worked with three designers over the years. Nancy is the only one we'd hire again without hesitation.",
    attribution: "A. Patel",
    role: "Bend, Oregon",
  },
];

export const journal = [
  {
    slug: "designing-for-real-life",
    title: "Designing for Real Life",
    excerpt:
      "Notes on building homes that feel both beautiful and easy to live in - without sacrificing either.",
    date: "March 2024",
    image: u("photo-1505691938895-1758d7feb511", 1200),
    tags: ["Philosophy", "Editorial"],
  },
  {
    slug: "materials-we-return-to",
    title: "Materials We Return To",
    excerpt:
      "The handful of materials - limewash, oiled oak, brushed brass, raw linen - that show up in nearly every project, and why.",
    date: "February 2024",
    image: u("photo-1554995207-c18c203602cb", 1200),
    tags: ["Materials", "Process"],
  },
  {
    slug: "the-day-you-move-in",
    title: "The Day You Move In",
    excerpt:
      "How we plan the installation and handover so a finished home is genuinely ready - not a list of follow-ups.",
    date: "January 2024",
    image: u("photo-1600607687644-c7171b42498f", 1200),
    tags: ["Process", "Installation"],
  },
];

// ───────────────────────────── Aesthetics gallery ─────────────────────────────
// Hand-curated inspiration photos. Tag each shot with EVERY style that applies.
// Commercial-tagged shots should depict commercial spaces (retail, hospitality,
// workspace, showroom) — not residential rooms.

export const aesthetics: AestheticPhoto[] = [
  {
    id: "01",
    slug: "stone-and-oak",
    title: "Stone & Oak",
    description:
      "Warmth balanced on stone and oak — bone, oat, and brushed bronze, held in soft daylight. A palette that feels right at any hour.",
    src: u("photo-1600585154340-be6161a56a0c", 1400),
    alt: "Sun-lit interior with stone and warm oak materials",
    tags: ["residential", "modern", "warm-organic", "mountain"],
    ratio: "portrait",
    featured: true,
  },
  {
    id: "02",
    slug: "light-and-linen",
    title: "Light & Linen",
    description:
      "An interior planned around natural light — pale stone, light-stained wood, and washed linen doing the quiet work.",
    src: u("photo-1505693416388-ac5ce068fe85", 1400),
    alt: "Bright residential interior with natural light",
    tags: ["residential", "modern", "contemporary"],
    ratio: "landscape",
  },
  {
    id: "03",
    slug: "woven-warmth",
    title: "Woven Warmth",
    description:
      "A room composed around a single woven piece — linen, leather, and natural fiber doing the rest. Warmth without weight.",
    src: u("photo-1616594039964-ae9021a400a0", 1400),
    alt: "Warm interior with woven textures and natural materials",
    tags: ["residential", "warm-organic", "transitional"],
    ratio: "portrait",
  },
  {
    id: "04",
    slug: "quiet-modern",
    title: "Quiet Modern",
    description:
      "A restrained palette and a deep, considered material — generous in feel, never loud. Built for daily use.",
    src: u("photo-1600210492486-724fe5c67fb0", 1400),
    alt: "Modern interior with restrained palette",
    tags: ["residential", "modern", "minimal", "luxury"],
    ratio: "landscape",
    featured: true,
  },
  {
    id: "05",
    slug: "soft-neutrals",
    title: "Soft Neutrals",
    description:
      "Layers of oat linen, washed wool, and a single sculptural piece. Light is the loudest thing in the room.",
    src: u("photo-1618221195710-dd6b41faaea6", 1400),
    alt: "Contemporary interior layered in soft neutrals",
    tags: ["residential", "luxury", "contemporary"],
    ratio: "portrait",
    featured: true,
  },
  {
    id: "06",
    slug: "washed-linen",
    title: "Washed Linen",
    description:
      "A pared-back interior built around natural light and a single material story — washed linen, oiled oak, the slightest brass detail.",
    src: u("photo-1600566753190-17f0baa2a6c3", 1400),
    alt: "Pared-back interior with natural light and linen textures",
    tags: ["residential", "minimal", "contemporary", "warm-organic"],
    ratio: "landscape",
  },
  {
    id: "07",
    slug: "collected-modern",
    title: "Collected Modern",
    description:
      "An interior that reads collected, not assembled: a vintage rug, brass accents from different decades, and pieces chosen for the way people actually live with them.",
    src: u("photo-1615873968403-89e068629265", 1400),
    alt: "Interior with vintage rug and layered brass accents",
    tags: ["residential", "transitional", "mid-century", "warm-organic"],
    ratio: "portrait",
  },
  {
    id: "08",
    slug: "walnut-and-wool",
    title: "Walnut & Wool",
    description:
      "Walnut, wool, and a single sculptural lamp. Mid-century lines without the museum feeling — built to be used.",
    src: u("photo-1554995207-c18c203602cb", 1400),
    alt: "Mid-century interior with walnut furniture and wool textures",
    tags: ["residential", "mid-century", "contemporary", "warm-organic"],
    ratio: "landscape",
  },
  {
    id: "09",
    slug: "pared-back",
    title: "Pared-Back",
    description:
      "An interior held to a quiet palette and a few well-chosen pieces. Oak floors, plaster walls, and just enough texture to keep the room from going cold.",
    src: u("photo-1505691938895-1758d7feb511", 1400),
    alt: "Minimal interior with quiet palette and oak floors",
    tags: ["residential", "minimal", "modern"],
    ratio: "portrait",
  },
  {
    id: "10",
    slug: "architectural-calm",
    title: "Architectural Calm",
    description:
      "Pared-back architecture as the room's main statement: a sculptural line, soft daylight, and the discipline to let it stand on its own.",
    src: u("photo-1503602642458-232111445657", 1400),
    alt: "Pared-back interior with sculptural architectural element",
    tags: ["residential", "minimal", "modern", "contemporary"],
    ratio: "landscape",
  },
  {
    id: "11",
    slug: "bone-and-linen",
    title: "Bone & Linen",
    description:
      "An airy interior shaped by light: white walls, light-stained wood, and natural fibers that age beautifully under sun and salt.",
    src: u("photo-1600585154526-990dced4db0d", 1400),
    alt: "Airy coastal-feel interior with white walls and light wood",
    tags: ["residential", "coastal", "minimal", "modern", "warm-organic"],
    ratio: "portrait",
  },
  {
    id: "12",
    slug: "cabin-warmth",
    title: "Cabin Warmth",
    description:
      "A textured interior built around stone and exposed wood. Warm under foot, warm to the eye — designed for long evenings.",
    src: u("photo-1505691723518-36a5ac3be353", 1400),
    alt: "Cabin interior with stone and warm wood beams",
    tags: ["residential", "mountain", "warm-organic", "transitional"],
    ratio: "landscape",
  },
  {
    id: "13",
    slug: "mountain-glass",
    title: "Mountain Glass",
    description:
      "Floor-to-ceiling glass framing the landscape, with the interior composed quietly inside it: warm woods, a single deep piece, and very little else.",
    src: u("photo-1597218868981-1b68e15f0065", 1400),
    alt: "Mountain modern home with floor-to-ceiling windows",
    tags: ["residential", "mountain", "modern", "luxury"],
    ratio: "portrait",
  },
  {
    id: "14",
    slug: "open-horizon",
    title: "Open Horizon",
    description:
      "An interior shaped by view and weather: panoramic windows, layered upholstery, and a palette tuned to the light off the water.",
    src: u("photo-1559511260-66a654ae982a", 1400),
    alt: "Waterfront interior with panoramic windows",
    tags: ["residential", "luxury", "contemporary", "coastal"],
    ratio: "landscape",
    featured: true,
  },
  {
    id: "15",
    slug: "marble-and-walnut",
    title: "Marble & Walnut",
    description:
      "Two materials in conversation: deep walnut and pale stone. Quiet hardware, considered lighting, room to breathe.",
    src: u("photo-1559329007-40df8a9345d8", 1400),
    alt: "Interior with marble surfaces and walnut cabinetry",
    tags: ["residential", "modern", "mid-century", "luxury"],
    ratio: "portrait",
  },
  {
    id: "16",
    slug: "plaster-and-oak",
    title: "Plaster & Oak",
    description:
      "Pale plaster, oat upholstery, and a single statement piece. A modern interior composed entirely in neutrals — restrained, never austere.",
    src: u("photo-1502672260266-1c1ef2d93688", 1400),
    alt: "Modern interior with plaster walls and neutral palette",
    tags: ["residential", "minimal", "modern", "contemporary"],
    ratio: "landscape",
  },
  {
    id: "17",
    slug: "natural-materials",
    title: "Natural Materials",
    description:
      "A space layered with the materials of the landscape: stone, oak, linen, raw wool. Everything feels gathered from one place.",
    src: u("photo-1600607687939-ce8a6c25118c", 1400),
    alt: "Interior layered with stone, oak, linen, and natural fibers",
    tags: ["residential", "warm-organic", "transitional"],
    ratio: "portrait",
  },
  {
    id: "18",
    slug: "brass-and-stone",
    title: "Brass & Stone",
    description:
      "An interior built around brushed brass and quarried stone — utilitarian by design, generous by intention.",
    src: u("photo-1616137422495-1e9e46e2aa77", 1400),
    alt: "Interior with brushed brass details and quarried stone",
    tags: ["residential", "modern", "contemporary", "luxury"],
    ratio: "portrait",
  },
  {
    id: "19",
    slug: "cedar-and-glass",
    title: "Cedar & Glass",
    description:
      "A modern interior that leans on the landscape: cedar, large glass, and a palette built from what's outside the window.",
    src: u("photo-1616486338812-3dadae4b4ace", 1400),
    alt: "Pacific Northwest interior with cedar paneling and large glass",
    tags: ["residential", "modern", "warm-organic", "mountain"],
    ratio: "landscape",
  },
  {
    id: "20",
    slug: "linen-and-oak",
    title: "Linen & Oak",
    description:
      "A deep linen piece, an oak table, and quiet light. The materials do the talking.",
    src: u("photo-1582719478250-c89cae4dc85b", 1400),
    alt: "Warm interior with linen and oak materials",
    tags: ["residential", "warm-organic", "transitional", "minimal"],
    ratio: "portrait",
  },
  // ── Commercial ─────────────────────────────────────────────────────────
  {
    id: "21",
    slug: "boutique-retail",
    title: "Boutique Retail",
    description:
      "Editorial display, wood shelving, and considered lighting — a retail environment designed to slow the shopper down.",
    src: u("photo-1493663284031-b7e3aefcae8e", 1400),
    alt: "Boutique retail interior with curated display and wood shelving",
    tags: ["commercial", "modern", "luxury", "contemporary"],
    ratio: "landscape",
  },
  {
    id: "22",
    slug: "hospitality-warmth",
    title: "Hospitality Warmth",
    description:
      "A commercial interior shaped by warm light and layered texture — the kind of space that lets a guest exhale on arrival.",
    src: u("photo-1600607687644-c7171b42498f", 1400),
    alt: "Hospitality interior with warm light and layered textures",
    tags: ["commercial", "luxury", "warm-organic", "contemporary"],
    ratio: "portrait",
  },
];
