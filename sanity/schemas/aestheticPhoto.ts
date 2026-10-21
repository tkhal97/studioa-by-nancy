// Reference Sanity schema for aesthetic-gallery photos.
// These are the mood/inspiration shots shown on /portfolio above the
// Portfolio (real project) section. Hand-curate via Studio; the front-end
// reads from `aestheticPhoto` documents instead of `lib/content.ts`.

export const aestheticPhotoSchema = {
  name: "aestheticPhoto",
  type: "document",
  title: "Aesthetic Photo",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description:
        "Short editorial title shown on the detail page. e.g. 'Stone & Oak Living'.",
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "URL slug. The detail page lives at /portfolio/{slug}.",
      options: { source: "title", maxLength: 96 },
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: "description",
      type: "text",
      rows: 3,
      title: "Description",
      description:
        "1–2 sentences shown on the photo's detail page. Talk about materials, mood, and feeling; avoid claiming this is a real project.",
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: "alt",
      type: "string",
      title: "Alt text",
      description:
        "Describe what's in the photo for accessibility and SEO. e.g. 'Warm modern living room with stone fireplace and oak millwork.'",
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      description: "Pick every aesthetic that genuinely applies.",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Modern", value: "modern" },
          { title: "Luxury", value: "luxury" },
          { title: "Minimal", value: "minimal" },
          { title: "Contemporary", value: "contemporary" },
          { title: "Warm Organic", value: "warm-organic" },
          { title: "Transitional", value: "transitional" },
          { title: "Mountain Modern", value: "mountain" },
          { title: "Coastal", value: "coastal" },
          { title: "Mid-Century", value: "mid-century" },
        ],
        layout: "tags",
      },
      validation: (r: { min: (n: number) => unknown }) => r.min(1),
    },
    {
      name: "ratio",
      type: "string",
      title: "Aspect ratio",
      description: "How the photo should render in the masonry grid.",
      options: {
        list: [
          { title: "Portrait (4:5)", value: "portrait" },
          { title: "Landscape (4:3)", value: "landscape" },
          { title: "Square (1:1)", value: "square" },
        ],
        layout: "radio",
      },
      initialValue: "portrait",
      validation: (r: { required: () => unknown }) => r.required(),
    },
    {
      name: "featured",
      type: "boolean",
      title: "Featured on homepage",
      description:
        "Surface this photo in the homepage 'Selected Work' preview.",
      initialValue: false,
    },
    {
      name: "order",
      type: "number",
      title: "Display order",
      description: "Lower numbers appear first.",
    },
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "alt", media: "image", subtitle: "tags" },
    prepare(value: { title?: string; media?: unknown; subtitle?: string[] }) {
      return {
        title: value.title ?? "Untitled",
        subtitle: (value.subtitle ?? []).join(" · "),
        media: value.media,
      };
    },
  },
};
