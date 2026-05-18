"use client";

/** Wide "featured" card shown ONLY at the top of page 1.  Two-column
 *  layout on desktop (big visual left, copy + CTA right); stacks on
 *  mobile.  The post is also kept out of the grid below so it never
 *  appears twice. */

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
  ArrowRight,
  Sparkles,
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

export default function BlogFeatured({ post }: { post: BlogPost }) {
  const Icon = ICONS[post.icon] ?? BookOpen;
  const cat = CATEGORY_META[post.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55 }}
      className="card overflow-hidden group"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="grid lg:grid-cols-5 h-full"
      >
        {/* Visual — left 2/5 on desktop */}
        <div
          className="relative lg:col-span-2 min-h-[280px] lg:min-h-[360px] overflow-hidden"
          style={{ backgroundColor: ACCENT_HEX[post.accent] }}
        >
          <div className="absolute inset-0 opacity-25 mix-blend-overlay grid-bg" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/20 blur-3xl animate-blob" />
          <div className="absolute -top-12 -left-12 h-56 w-56 rounded-full bg-white/15 blur-2xl animate-blob-slow" />

          {/* Featured ribbon */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-red shadow-md">
              <Sparkles className="h-3.5 w-3.5" />
              ফিচার্ড পোস্ট
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ${
                ACCENT_TAG[cat.accent]
              } shadow-md border border-white/30`}
            >
              {cat.bn}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-white/95 backdrop-blur-md shadow-xl group-hover:scale-110 transition-transform">
              <Icon className="h-12 w-12 text-fg" />
            </div>
          </div>
        </div>

        {/* Copy — right 3/5 */}
        <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-fg-muted">
            <span className="inline-flex items-center gap-1 rounded-full bg-bg-soft px-2.5 py-1 font-semibold">
              <Clock className="h-3 w-3" />
              {bnNumber(post.readingMinutes)} মিনিট পড়া
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-bg-soft px-2.5 py-1 font-semibold">
              <Eye className="h-3 w-3" />
              {bnNumber(post.views)} ভিউ
            </span>
            <time
              dateTime={post.iso}
              className="inline-flex items-center gap-1 rounded-full bg-bg-soft px-2.5 py-1 font-semibold"
            >
              <Calendar className="h-3 w-3" />
              {post.date}
            </time>
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-fg leading-tight group-hover:text-brand-red transition-colors">
            {post.title}
          </h2>

          <p className="mt-3 text-base text-fg-muted leading-relaxed line-clamp-3 sm:line-clamp-4">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Image
                src={BLOG_AUTHOR.avatarUrl}
                alt={BLOG_AUTHOR.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full shrink-0 object-cover"
              />
              <div className="min-w-0">
                <div className="text-sm font-bold text-fg truncate">
                  {BLOG_AUTHOR.name}
                </div>
                <div className="text-[11px] text-fg-faint truncate">
                  {BLOG_AUTHOR.role}
                </div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-grad-rb group-hover:gap-3 transition-all whitespace-nowrap">
              পড়ুন
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
