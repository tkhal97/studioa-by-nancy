import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";
import { aesthetics, journal } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/about",
    "/services",
    "/process",
    "/portfolio",
    "/journal",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  // Aesthetic photo detail pages live under /portfolio/[slug]
  const aestheticRoutes = aesthetics.map((p) => ({
    url: `${SITE_URL}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const journalRoutes = journal.map((j) => ({
    url: `${SITE_URL}/journal/${j.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...aestheticRoutes, ...journalRoutes];
}
