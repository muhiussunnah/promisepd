"use client";

/** Compact blog card used in the 3×3 grid.  No real photos in the
 *  dataset — we lean on a brand-coloured gradient panel with a single
 *  lucide icon as the visual stand-in, which keeps the layout uniform
 *  while staying strictly on-brand. */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  Hammer,
  Landmark,
  Palette,
  Plane,
  Bell,
  Megaphone,
  Calendar,
  FileText,
  ScrollText,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Compass,
  Eye,
  Clock,
  type LucideIcon,
} from "lucide-react";
import {
  BLOG_AUTHOR,
  CATEGORY_META,
  bnNumber,
  type BlogPost,
} from "@/lib/blog";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Hammer,
  Landmark,
  Palette,
  Plane,
  Bell,
  Megaphone,
  Calendar,
  FileText,
  ScrollText,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Compass,
};

const ACCENT_HEX: Record<string, string> = {
  red: "#e11924",
  blue: "#1847a1",
  ash: "#c0c7d1",
};

const ACCENT_TAG: Record<string, string> = {
  red: "bg-brand-red text-white",
  blue: "bg-brand-blue text-white",
  ash: "bg-brand-ash text-fg",
};

export default function BlogCard({
  post,
  index = 0,
}: {
  post: BlogPost;
  index?: number;
}) {
  const Icon = ICONS[post.icon] ?? BookOpen;
  const cat = CATEGORY_META[post.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
      whileHover={{ y: -6 }}
      className="card group overflow-hidden flex flex-col"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* Visual / "hero" area */}
        <div
          className="relative h-44 overflow-hidden"
          style={{ backgroundColor: ACCENT_HEX[post.accent] }}
        >
          <div className="absolute inset-0 opacity-25 mix-blend-overlay grid-bg" />
          <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/20 blur-3xl animate-blob" />
          <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-white/15 blur-2xl animate-blob-slow" />

          {/* Category chip — top-left */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                ACCENT_TAG[cat.accent]
              } shadow-md`}
            >
              {cat.bn}
            </span>
          </div>

          {/* Reading time — top-right */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-fg shadow-md">
              <Clock className="h-3 w-3" />
              {bnNumber(post.readingMinutes)} মিনিট
            </span>
          </div>

          {/* Centred icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/95 backdrop-blur-md shadow-xl group-hover:scale-110 transition-transform">
              <Icon className="h-8 w-8 text-fg" />
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-fg leading-tight line-clamp-2 group-hover:text-brand-red transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-fg-muted leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          {/* Footer — author + meta */}
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Image
                src={BLOG_AUTHOR.avatarUrl}
                alt={BLOG_AUTHOR.name}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full shrink-0"
                unoptimized
              />
              <span className="text-xs font-semibold text-fg truncate">
                {BLOG_AUTHOR.name}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-fg-muted shrink-0">
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {bnNumber(post.views)}
              </span>
              <time dateTime={post.iso}>{post.date}</time>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
