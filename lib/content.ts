// Content for Studio A by Nancy. Portfolio projects use Nancy's own
// photography; the Inspiration gallery and a few other spots still use
// Unsplash stand-ins.

import { asset } from "@/lib/utils";

// ───────────────────────────── Aesthetics ─────────────────────────────
// Standalone inspiration photos for the /inspiration gallery.
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

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position used wherever the photo is cropped */
  focus?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: "residential" | "commercial";
  /** what the space is, e.g. "Pediatric dental clinic" */
  type: string;
  location?: string;
  year?: string;
  scope: string[];
  excerpt: string;
  story: string[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  video?: { src: string; poster: string; caption: string };
  /** shown in the home page "Selected Work" section */
  featured?: boolean;
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Web-sized copies of Nancy's photography live in /public/images/projects;
// full-size originals are kept (untracked) in /assets/originals.
const shot = (
  project: string,
  name: string,
  width: number,
  height: number,
  alt: string,
  focus?: string,
): ProjectImage => ({
  src: asset(`/images/projects/${project}/${name}.jpg`),
  alt,
  width,
  height,
  focus,
});

// ───────────────────────────── Portfolio ─────────────────────────────
// Completed projects, photographed on site. Shown on /portfolio.
export const projects: Project[] = [
  {
    slug: "dreamworks-dental",
    title: "Dreamworks Dental",
    category: "commercial",
    type: "Pediatric dental clinic",
    scope: ["Space planning", "Finishes & millwork", "Furniture & lighting", "Art & styling"],
    excerpt:
      "A pediatric dental office designed to put parents at ease and make kids feel welcome, with a lounge-like waiting room, walnut detailing, and a reading nook for little patients.",
    story: [
      "The goal was simple: create a clinic that doesn’t feel clinical. Warm neutrals, cognac leather, sculptural sconces, and a softly lit aquarium make the waiting room feel relaxed from the moment families walk in.",
      "The children’s corner has a house-shaped activity desk, chalkboard wall, and colorful patchwork rug. Walnut slat wainscoting and a black-framed sliding door carry that warmth into the treatment rooms, where a framed Bigfoot gallery gives patients something to talk about besides their teeth.",
    ],
    cover: shot("dreamworks-dental", "lounge", 2400, 1600, "Waiting lounge with a walnut coffee table, olive armchair, and cognac leather sofa"),
    gallery: [
      shot("dreamworks-dental", "reception", 2400, 1600, "Reception wall with the Dreamworks Dental logo, leather sofa, and sculptural sconces"),
      shot("dreamworks-dental", "waiting-room", 2400, 1600, "Waiting room with leather sofa, aquarium, and tall windows"),
      shot("dreamworks-dental", "kids-corner", 2400, 1600, "Kids' corner with a house-shaped activity desk and patchwork rug"),
      shot("dreamworks-dental", "chalkboard-wall", 2400, 1600, "Walnut-framed chalkboard wall above slat wainscoting"),
      shot("dreamworks-dental", "operatory", 2400, 1600, "Treatment room with a framed art grid and garden views"),
      shot("dreamworks-dental", "bigfoot-gallery", 2400, 1600, "Framed vintage Bigfoot headlines and Portland prints on floating shelves"),
      shot("dreamworks-dental", "hallway", 2400, 1600, "Hallway with walnut slat wainscoting and a black-framed sliding glass door"),
    ],
    video: {
      src: asset("/videos/dreamworks-dental-walkthrough.mp4"),
      poster: asset("/videos/dreamworks-dental-walkthrough-poster.jpg"),
      caption: "Walkthrough",
    },
    featured: true,
  },
  {
    slug: "the-nursery",
    title: "The Nursery",
    category: "residential",
    type: "Nursery",
    scope: ["Wall detailing", "Furniture & lighting", "Closet design", "Styling"],
    excerpt:
      "A soft, storybook nursery with arched wall details, walnut furniture, an heirloom-style rug, and thoughtful storage for all the little things.",
    story: [
      "Applied arch mouldings bring gentle structure to the walls without adding more color, allowing the walnut crib and dresser to take center stage. A round, heirloom-style rug softens the room and anchors the layout.",
      "The playful details, including a hot-air-balloon lamp, wooden toy piano, and brass sconce with a green glass shade, give the room its character. In the closet, drawers, open shelving, and a glass-topped accessory drawer make room for tiny clothes, shoes, and bows.",
    ],
    cover: shot("arched-nursery", "crib-arches", 1597, 2400, "Walnut crib in front of applied arch wall mouldings", "50% 22%"),
    gallery: [
      shot("arched-nursery", "nursery-wide", 887, 1327, "Nursery with reading chair, crib, and round heirloom rug"),
      shot("arched-nursery", "reading-chair", 920, 1376, "Bouclé reading chair beside a hot-air-balloon lamp and arched mirror"),
      shot("arched-nursery", "dresser-gallery-wall", 1416, 2128, "Walnut dresser beneath a small gallery wall"),
      shot("arched-nursery", "balloon-detail", 1416, 2128, "Hot-air-balloon lamp on a round side table"),
      shot("arched-nursery", "toy-piano", 1416, 2128, "Wooden toy piano on soft carpet"),
      shot("arched-nursery", "through-the-crib", 1416, 2128, "Plush toys seen through the crib slats"),
      shot("arched-nursery", "closet", 881, 1317, "Custom closet with drawers, hanging rail, and open shelving"),
      shot("arched-nursery", "closet-detail", 1416, 2128, "Glass-topped accessory drawer with brass pulls"),
      shot("arched-nursery", "sconce", 1416, 2128, "Brass sconce with a ribbed green glass shade"),
    ],
    featured: true,
  },
  {
    slug: "charcoal-oak-bedroom",
    title: "Charcoal & Oak Bedroom",
    category: "residential",
    type: "Primary bedroom",
    scope: ["Feature wall", "Furniture", "Styling"],
    excerpt:
      "A charcoal-paneled feature wall gives this primary bedroom a sense of calm, balanced by solid oak furniture, plush carpet, and a few well-chosen details.",
    story: [
      "The charcoal paneling frames the bed and makes the white linens and oak furniture feel even warmer. The rest of the room is kept light and uncluttered.",
      "Solid oak nightstands and a long dresser add warmth and storage, while an arched floor mirror helps the room feel more open. Styling is intentionally simple: glass, ceramic, a snake plant, and a small sculptural object.",
    ],
    cover: shot("charcoal-oak-bedroom", "bed-wall", 1605, 2400, "Bed against a charcoal panelled wall with an oak nightstand"),
    gallery: [
      shot("charcoal-oak-bedroom", "dresser-mirror", 1416, 2128, "Oak dresser beside an arched floor mirror"),
      shot("charcoal-oak-bedroom", "nightstand", 1597, 2400, "Oak nightstand with a white ceramic vase against the dark wall"),
      shot("charcoal-oak-bedroom", "dresser-styling", 1416, 2128, "Glass vase and snake plant styled on the oak dresser"),
      shot("charcoal-oak-bedroom", "dresser-detail", 1416, 2128, "Ball of twine and sculpture on the rounded corner of the dresser"),
      shot("charcoal-oak-bedroom", "room-view", 2128, 1416, "Bedroom with arched mirror and oak dresser"),
    ],
    featured: true,
  },
  {
    slug: "family-playroom",
    title: "Family Playroom",
    category: "residential",
    type: "Playroom & family room",
    scope: ["Space planning", "Storage", "Furniture", "Styling"],
    excerpt:
      "A bright family room built for everyday use, with open storage for books and toys, warm oak details, and a deep sectional for movie nights.",
    story: [
      "This room needed to work for everyone: kids on the floor, adults on the sofa, and plenty of toys in between. Low storage and open shelves keep things within reach and easy to put away.",
      "An oak slat accent and woven-front media console bring warmth to the white walls. A deep sectional and round coffee table leave the center of the room open for play.",
    ],
    cover: shot("family-playroom", "playroom", 2128, 1416, "Playroom with sectional sofa, media console, and open shelving"),
    gallery: [
      shot("family-playroom", "media-wall", 1376, 920, "Oak slat accent, woven media console, and toy storage"),
      shot("family-playroom", "lounge-corner", 1286, 860, "Sectional and armchair with a wood side table and floating shelves"),
    ],
    featured: true,
  },
  {
    slug: "fireside-great-room",
    title: "Fireside Great Room",
    category: "residential",
    type: "Great room",
    scope: ["Fireplace wall", "Furniture layout", "Styling"],
    excerpt:
      "A vaulted great room with a charcoal shiplap fireplace wall, comfortable seating for gathering, and layers of cognac leather, cream bouclé, and marble.",
    story: [
      "The charcoal shiplap fireplace wall gives this tall, open room a clear focal point. Two seating areas, with cognac leather by the fire and softer cream pieces by the windows, make the space feel welcoming and easy to use.",
      "A large traditional rug connects both areas, while a marble coffee table and floating picture ledges leave room for the family’s own photos and memories.",
    ],
    cover: shot("fireside-great-room", "great-room", 1800, 2400, "Vaulted great room with bouclé chairs, leather sofas, and a large rug"),
    gallery: [
      shot("fireside-great-room", "fireplace", 1800, 2400, "Charcoal shiplap fireplace wall beside a cognac leather sofa"),
      shot("fireside-great-room", "fireplace-wide", 1800, 2400, "Fireplace wall with a marble coffee table in the foreground"),
      shot("fireside-great-room", "sofa-wall", 1800, 2400, "Cream sofa beneath floating picture ledges"),
      shot("fireside-great-room", "seating", 1800, 2400, "Seating area with a marble coffee table and patterned rug"),
    ],
  },
];

/** Detail shots not tied to a single project. */
export const details = {
  slatWall: shot("details", "slat-wall", 1416, 2128, "Stacked wood slat feature wall against black paint"),
  globeChandelier: shot("details", "globe-chandelier", 1416, 2128, "Black chandelier with clear glass globes"),
};

// ───────────────────────────── Consultation ─────────────────────────────
export const consultation = {
  fee: "$250",
  formats: "Zoom or in-home",
  credit:
    "Applied toward your design fee if we continue working together - so neither of us spends time on a project that isn't the right fit.",
};

export type Service = {
  n: string;
  title: string;
  body: string;
  image: string;
  intro: string;
  includes: string[];
  deliverables: string[];
  idealFor: string;
};

export const services: Service[] = [
  {
    n: "01",
    title: "Residential Interior Design",
    body: "Full-service design for homes - warm, layered, and built around the way you actually live.",
    image: asset("/images/projects/arched-nursery/crib-arches.jpg"),
    intro:
      "Full-service design for primary residences, second homes, and remodels. We start with how you live - mornings, evenings, the way you host - and build a layered, livable home around it. Warm materials, considered details, and rooms that work as well at 7am as they do for dinner.",
    includes: [
      "On-site discovery and lifestyle conversation",
      "Aesthetic direction, palette, and material strategy",
      "Floor plans, elevations, and detailed construction documents",
      "Custom furniture, lighting, and millwork design",
      "Sourcing of antiques, vintage, and trade-only pieces",
      "Coordination with architect, contractor, and trades",
    ],
    deliverables: [
      "Design brief and aesthetic moodboards",
      "Construction-ready drawings",
      "Full furnishings and finishes specification",
      "Photoreal renderings of key rooms",
      "Final install with styling and reveal",
    ],
    idealFor:
      "Homeowners renovating, building, or fully furnishing a primary or second home who want one studio managing the whole arc.",
  },
  {
    n: "02",
    title: "Commercial Interior Design",
    body: "Thoughtful design for hospitality, retail, and workspace - spaces that feel welcoming, functional, and made to last.",
    image: asset("/images/projects/dreamworks-dental/reception.jpg"),
    intro:
      "Hospitality, retail, and workspace interiors built around how guests, customers, and teams actually move through a space. Designed to wear well, photograph beautifully, and quietly do the work of the brand without ever shouting it.",
    includes: [
      "Brand and program discovery with stakeholders",
      "Space planning for guest flow, capacity, and operations",
      "Material and finish strategy built for commercial use",
      "Custom millwork, banquettes, and lighting design",
      "FF&E specification, sourcing, and procurement",
      "Trade and contractor coordination through opening",
    ],
    deliverables: [
      "Concept package and material palette",
      "Permit-ready drawing set",
      "Full FF&E schedule and procurement plan",
      "Photoreal renderings for stakeholders and press",
      "Punch list and opening-day install",
    ],
    idealFor:
      "Operators of hospitality, retail, restaurant, or boutique workspace projects who want an interior that holds up to daily use and represents the brand well.",
  },
  {
    n: "03",
    title: "Furnishing & Styling",
    body: "Custom and vintage pieces, carefully sourced and styled to feel collected - never staged.",
    image: asset("/images/projects/charcoal-oak-bedroom/dresser-styling.jpg"),
    intro:
      "For homes that already have great architecture and just need the right pieces in the right places. We source, custom-build, and style every room - antique, vintage, and trade-only - until the home reads collected rather than catalogued.",
    includes: [
      "Room-by-room inventory and gap analysis",
      "Layered sourcing: custom, vintage, antique, trade-only",
      "Art, accessories, books, and styling objects",
      "Window treatments, rugs, and lighting refresh",
      "Logistics, white-glove delivery, and placement",
      "Final styling session with everything in place",
    ],
    deliverables: [
      "Furnishings plan and palette",
      "Specification sheets with imagery and pricing",
      "Procurement and delivery management",
      "Two-day styling install",
      "Reveal-ready, professionally photographed home",
    ],
    idealFor:
      "Homeowners moving into a finished home, refreshing key rooms, or layering in collected pieces after a renovation.",
  },
  {
    n: "04",
    title: "Space Planning",
    body: "Floor plans, flow, and proportion - getting the bones of the room right before anything else.",
    image: u("photo-1616594039964-ae9021a400a0", 1600),
    intro:
      "The most expensive mistakes are made in the bones. Before finishes or furnishings, we get the floor plan, sightlines, and proportion right - whether you're renovating, building new, or trying to make an existing layout finally work.",
    includes: [
      "Existing conditions survey and measurement",
      "Lifestyle and program discovery",
      "Wall, opening, and partition strategy",
      "Furniture layout and clearance planning",
      "Lighting and electrical placement",
      "Coordination with architect or contractor",
    ],
    deliverables: [
      "Scaled existing-conditions and proposed plans",
      "Furniture layout with traffic flow notes",
      "Electrical and lighting plan",
      "Annotated walkthrough document",
    ],
    idealFor:
      "Anyone planning a renovation, addition, or new build who wants the layout pressure-tested before construction starts.",
  },
  {
    n: "05",
    title: "Procurement",
    body: "Tracking, vendor coordination, and white-glove logistics - handled in-house, end-to-end.",
    image: u("photo-1600607687644-c7171b42498f", 1600),
    intro:
      "Procurement is where great design plans usually unravel - long lead times, damaged shipments, vendor gaps. We run procurement in-house: every PO, every freight schedule, every receiving inspection, until the last box is opened.",
    includes: [
      "Trade pricing and PO management",
      "Production tracking with weekly updates",
      "Receiving warehouse inspection and storage",
      "Damage claims, returns, and replacements",
      "White-glove freight scheduling",
      "On-site delivery coordination",
    ],
    deliverables: [
      "Live procurement tracker with status per item",
      "Weekly client-facing status reports",
      "Receiving inspection photos for every item",
      "Coordinated install-day delivery sequence",
    ],
    idealFor:
      "Clients with a design plan in hand (ours or another firm's) who want a single party owning execution end to end.",
  },
  {
    n: "06",
    title: "Renderings & Visualization",
    body: "Photoreal renderings so you can stand inside a room before a single piece is ordered.",
    image: u("photo-1618221195710-dd6b41faaea6", 1600),
    intro:
      "Renderings let you stand inside the room before anyone orders anything. We use photoreal 3D to test material combinations, lighting decisions, and furniture scale - so the most expensive choices are made on screen, not on site.",
    includes: [
      "3D model of the space from drawings or site survey",
      "Material, finish, and lighting application",
      "Day and evening lighting studies",
      "Multiple view angles per room",
      "Revision rounds against feedback",
    ],
    deliverables: [
      "Photoreal still images of every key view",
      "Optional fly-through or walk-through video",
      "Side-by-side material option comparisons",
      "High-resolution files for review and reference",
    ],
    idealFor:
      "Anyone wanting to lock in big-ticket decisions - millwork, stone, lighting - before committing budget. Also great for stakeholder approval on commercial projects.",
  },
  {
    n: "07",
    title: "Installation Coordination",
    body: "We coordinate every trade and delivery - and hand over the finished home, fully installed and styled.",
    image: u("photo-1600210492486-724fe5c67fb0", 1600),
    intro:
      "The day you walk into the finished home shouldn't include any decisions. We orchestrate every trade and delivery, stage the install in the right sequence, and style every room - so the hand-off is a reveal, not a project meeting.",
    includes: [
      "Install sequencing and trade scheduling",
      "On-site supervision through delivery and assembly",
      "Window treatment, art, and lighting installation",
      "Final styling: books, objects, linens, florals",
      "Punch list resolution",
      "Reveal walkthrough with the client",
    ],
    deliverables: [
      "Install schedule with day-by-day sequence",
      "On-site coordination through completion",
      "Fully styled, reveal-ready home",
      "Professional photography (optional add-on)",
    ],
    idealFor:
      "Clients at the end of a design and procurement phase ready for a turnkey reveal - no boxes, no decisions, no punch list.",
  },
];

export const process = [
  {
    n: "01",
    title: "Discovery",
    body: "We begin with a private consultation - over Zoom or in your home - to talk through your space, your lifestyle, and the way you want to live in it.",
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
// workspace, showroom), not residential rooms.

export const aesthetics: AestheticPhoto[] = [
  {
    id: "01",
    slug: "stone-and-oak",
    title: "Stone & Oak",
    description:
      "Warmth balanced on stone and oak: bone, oat, and brushed bronze, held in soft daylight. A palette that feels right at any hour.",
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
      "An interior planned around natural light, with pale stone, light-stained wood, and washed linen doing the quiet work.",
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
      "A room composed around a single woven piece, with linen, leather, and natural fiber doing the rest. Warmth without weight.",
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
      "A restrained palette and a deep, considered material. Generous in feel, never loud. Built for daily use.",
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
      "A pared-back interior built around natural light and a single material story: washed linen, oiled oak, and the slightest brass detail.",
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
      "Walnut, wool, and a single sculptural lamp. Mid-century lines without the museum feeling, built to be used.",
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
      "A textured interior built around stone and exposed wood. Warm underfoot and warm to the eye, designed for long evenings.",
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
      "Pale plaster, oat upholstery, and a single statement piece. A modern interior composed entirely in neutrals, restrained but never austere.",
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
      "An interior built around brushed brass and quarried stone, utilitarian by design and generous by intention.",
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
      "Editorial displays, wood shelving, and considered lighting create a retail environment designed to slow the shopper down.",
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
      "A commercial interior shaped by warm light and layered texture, the kind of space that lets a guest exhale on arrival.",
    src: u("photo-1600607687644-c7171b42498f", 1400),
    alt: "Hospitality interior with warm light and layered textures",
    tags: ["commercial", "luxury", "warm-organic", "contemporary"],
    ratio: "portrait",
  },
];
