import type { MetadataRoute } from "next";
import { DIVISIONS } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Each division's inner page.
    ...DIVISIONS.map((d) => ({
      url: `${SITE_URL}/divisions/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return entries;
}
