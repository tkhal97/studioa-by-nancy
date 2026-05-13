// Sanity schema barrel.
// Connect by installing @sanity/* and wiring into sanity.config.ts.
import { projectSchema } from "./project";

export const serviceSchema = {
  name: "service",
  type: "document",
  title: "Service",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "summary", type: "text", rows: 3 },
    { name: "body", type: "array", of: [{ type: "block" }] },
    { name: "image", type: "image", options: { hotspot: true } },
    { name: "order", type: "number" },
  ],
};

export const testimonialSchema = {
  name: "testimonial",
  type: "document",
  title: "Testimonial",
  fields: [
    { name: "quote", type: "text", rows: 4 },
    { name: "attribution", type: "string" },
    { name: "role", type: "string" },
    { name: "project", type: "reference", to: [{ type: "project" }] },
  ],
};

export const journalPostSchema = {
  name: "journalPost",
  type: "document",
  title: "Journal Post",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "excerpt", type: "text", rows: 3 },
    { name: "body", type: "array", of: [{ type: "block" }, { type: "image" }] },
    { name: "hero", type: "image", options: { hotspot: true } },
    { name: "publishedAt", type: "datetime" },
    { name: "tags", type: "array", of: [{ type: "string" }] },
  ],
};

export const siteSettingsSchema = {
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  fields: [
    { name: "logo", type: "image" },
    { name: "monogram", type: "image" },
    {
      name: "contact",
      type: "object",
      fields: [
        { name: "email", type: "string" },
        { name: "phone", type: "string" },
        { name: "address", type: "string" },
      ],
    },
    {
      name: "social",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "url" },
          ],
        },
      ],
    },
    {
      name: "hero",
      type: "object",
      fields: [
        { name: "headline", type: "string" },
        { name: "sub", type: "text" },
        { name: "video", type: "file" },
        { name: "poster", type: "image" },
      ],
    },
  ],
};

export const schemaTypes = [
  projectSchema,
  serviceSchema,
  testimonialSchema,
  journalPostSchema,
  siteSettingsSchema,
];
