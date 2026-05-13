// Reference Sanity schema for portfolio projects.
// When @sanity/* is wired in, mount these via sanity.config.ts.

export const projectSchema = {
  name: "project",
  type: "document",
  title: "Project",
  fields: [
    { name: "title", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    { name: "slug", type: "slug", options: { source: "title" }, validation: (r: { required: () => unknown }) => r.required() },
    {
      name: "categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Modern", value: "modern" },
          { title: "Luxury", value: "luxury" },
          { title: "Minimal", value: "minimal" },
          { title: "Contemporary", value: "contemporary" },
        ],
      },
    },
    { name: "year", type: "string" },
    { name: "location", type: "string" },
    { name: "scope", type: "string" },
    { name: "excerpt", type: "text", rows: 3 },
    { name: "cover", type: "image", options: { hotspot: true } },
    {
      name: "gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "caption", type: "string" },
            {
              name: "layout",
              type: "string",
              options: {
                list: [
                  { title: "Full bleed", value: "full" },
                  { title: "Two up", value: "two-up" },
                  { title: "Sticky caption", value: "sticky" },
                ],
              },
            },
          ],
        },
      ],
    },
    { name: "featured", type: "boolean", initialValue: false },
    { name: "order", type: "number" },
    { name: "testimonial", type: "reference", to: [{ type: "testimonial" }] },
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
};
