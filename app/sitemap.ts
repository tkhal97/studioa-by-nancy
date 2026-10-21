import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";
import { aesthetics, journal, projects } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/about",
    "/services",
    "/process",
    "/portfolio",
    "/inspiration",
    "/journal",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${SITE_URL}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Inspiration photo detail pages live under /inspiration/[slug]
  const aestheticRoutes = aesthetics.map((p) => ({
    url: `${SITE_URL}/inspiration/${p.slug}`,
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

  return [...routes, ...projectRoutes, ...aestheticRoutes, ...journalRoutes];
}
