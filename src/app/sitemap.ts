import type { MetadataRoute } from "next";
import { DIVISIONS } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog";
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
    // Partner program (recruitment / lead-gen page).
    {
      url: `${SITE_URL}/partner`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Dedicated contact + leadership + leaderboard pages.
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/team`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/leaderboard`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/marketing-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Each division's inner page.
    ...DIVISIONS.map((d) => ({
      url: `${SITE_URL}/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Blog index.
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    // Each blog post — lastModified pinned to the post's own ISO date.
    ...BLOG_POSTS.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.iso),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return entries;
}
