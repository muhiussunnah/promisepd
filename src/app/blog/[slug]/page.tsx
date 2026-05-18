import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Clock,
  Calendar,
  Phone,
  Mail,
  Building2,
  Hammer,
  Landmark,
  Palette,
  Plane,
  Bell,
  Megaphone,
  FileText,
  ScrollText,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Compass,
  type LucideIcon,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import BlogCard from "@/components/BlogCard";
import { SITE } from "@/lib/site";
import {
  BLOG_AUTHOR,
  BLOG_POSTS,
  CATEGORY_META,
  bnNumber,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/schema";
import { getSiteUrl, absoluteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();
const OG_IMAGE = absoluteUrl("/og-image.png");

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

/** Only the 12 known slugs prerender — every other URL 404s. */
export const dynamicParams = false;

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "পোস্ট পাওয়া যায়নি" };

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      siteName: "Promise PPD",
      locale: "bn_BD",
      publishedTime: post.iso,
      authors: [BLOG_AUTHOR.name],
      images: [
        {
          url: OG_IMAGE,
          secureUrl: OG_IMAGE,
          type: "image/png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [{ url: OG_IMAGE, alt: post.title }],
    },
  };
}

export default async function BlogPostPage(
  props: PageProps<"/blog/[slug]">,
) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const Icon = ICONS[post.icon] ?? BookOpen;
  const cat = CATEGORY_META[post.category];
  const related = getRelatedPosts(post.slug, 3);

  // Prev/next within the full chronological list (newest-first).
  const sorted = [...BLOG_POSTS].sort((a, b) => (a.iso < b.iso ? 1 : -1));
  const idx = sorted.findIndex((p) => p.slug === post.slug);
  const prev = sorted[(idx - 1 + sorted.length) % sorted.length];
  const next = sorted[(idx + 1) % sorted.length];

  const breadcrumb = breadcrumbSchema([
    { name: "হোম", url: SITE_URL },
    { name: "ব্লগ", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: OG_IMAGE,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.iso,
    dateModified: post.iso,
    inLanguage: "bn-BD",
    wordCount: post.sections.reduce(
      (n, s) => n + s.body.join(" ").split(/\s+/).length,
      post.intro.split(/\s+/).length,
    ),
    author: {
      "@type": "Person",
      name: BLOG_AUTHOR.name,
      alternateName: BLOG_AUTHOR.nameEn,
    },
    publisher: { "@id": `${SITE_URL}#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    articleSection: cat.en,
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={articleSchema} />

      {/* Article header / hero */}
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 -z-10 mesh-bg-soft" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted hover:text-brand-red transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            সব পোস্টে ফিরুন
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ${
                ACCENT_TAG[cat.accent]
              } shadow-sm`}
            >
              {cat.bn}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-bg-soft px-3 py-1.5 text-[11px] font-semibold text-fg-muted">
              <Clock className="h-3 w-3" />
              {bnNumber(post.readingMinutes)} মিনিট পড়া
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-bg-soft px-3 py-1.5 text-[11px] font-semibold text-fg-muted">
              <Eye className="h-3 w-3" />
              {bnNumber(post.views)} ভিউ
            </span>
            <time
              dateTime={post.iso}
              className="inline-flex items-center gap-1 rounded-full bg-bg-soft px-3 py-1.5 text-[11px] font-semibold text-fg-muted"
            >
              <Calendar className="h-3 w-3" />
              {post.date}
            </time>
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] text-fg">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <Image
              src={BLOG_AUTHOR.avatarUrl}
              alt={BLOG_AUTHOR.name}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full shrink-0"
              unoptimized
            />
            <div className="min-w-0">
              <div className="text-sm font-bold text-fg">
                {BLOG_AUTHOR.name}
              </div>
              <div className="text-[11px] text-fg-muted">
                {BLOG_AUTHOR.role}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article visual */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden shadow-xl h-56 sm:h-72 lg:h-80"
          style={{ backgroundColor: ACCENT_HEX[post.accent] }}
        >
          <div className="absolute inset-0 opacity-25 mix-blend-overlay grid-bg" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/20 blur-3xl animate-blob" />
          <div className="absolute -top-12 -left-12 h-56 w-56 rounded-full bg-white/15 blur-2xl animate-blob-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="inline-flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-white/95 backdrop-blur-md shadow-xl">
              <Icon className="h-12 w-12 sm:h-14 sm:w-14 text-fg" />
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <p className="text-lg sm:text-xl text-fg-soft leading-relaxed font-medium first-letter:text-5xl first-letter:font-bold first-letter:text-brand-red first-letter:float-left first-letter:mr-2 first-letter:leading-none">
          {post.intro}
        </p>

        <div className="mt-10 space-y-10">
          {post.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-2xl sm:text-3xl font-bold text-fg leading-tight">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((p, j) => (
                  <p
                    key={j}
                    className="text-base sm:text-lg text-fg-soft leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {post.closing && (
          <div className="mt-12 rounded-2xl border-l-4 border-brand-red bg-bg-soft px-6 py-5">
            <p className="text-base sm:text-lg text-fg-soft leading-relaxed italic">
              {post.closing}
            </p>
          </div>
        )}

        {/* Author card */}
        <div className="mt-12 card p-6 flex items-start gap-4">
          <Image
            src={BLOG_AUTHOR.avatarUrl}
            alt={BLOG_AUTHOR.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-2xl shrink-0"
            unoptimized
          />
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.2em] text-fg-faint">
              লেখক
            </div>
            <div className="mt-1 text-lg font-bold text-fg">
              {BLOG_AUTHOR.name}
            </div>
            <p className="mt-1 text-sm text-fg-muted leading-relaxed">
              {BLOG_AUTHOR.role}। প্রমিস গ্রুপের মার্কেটিং, পার্টনার
              অনবোর্ডিং এবং কন্টেন্ট স্ট্র্যাটেজির দায়িত্বে।
            </p>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="relative pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grad-border p-7 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              আরও জানতে চান?
            </h2>
            <p className="mt-3 text-base text-fg-muted max-w-2xl mx-auto">
              এই পোস্টের বিষয়ে প্রশ্ন থাকলে অথবা ব্যক্তিগত পরামর্শ চাইলে
              সরাসরি যোগাযোগ করুন।
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-red px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-brand)] hover:bg-brand-red-dark hover:scale-[1.02] transition-all"
              >
                <Phone className="h-4 w-4" />
                {SITE.phoneDisplay}
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-white border border-border px-6 py-3 text-sm font-semibold text-fg hover:border-brand-red/40 hover:shadow-lg transition-all"
              >
                <Mail className="h-4 w-4 text-brand-red" />
                বার্তা পাঠান
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="relative pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-fg leading-tight">
              সম্পর্কিত পোস্ট
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / next */}
      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href={`/blog/${prev.slug}`}
              className="card group p-5 flex items-center gap-4 hover:scale-[1.01] transition-transform"
            >
              <ArrowLeft className="h-5 w-5 text-fg-muted group-hover:text-brand-red transition-colors shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                  পূর্ববর্তী পোস্ট
                </div>
                <div className="text-sm font-bold text-fg truncate">
                  {prev.title}
                </div>
              </div>
            </Link>
            <Link
              href={`/blog/${next.slug}`}
              className="card group p-5 flex items-center gap-4 sm:text-right hover:scale-[1.01] transition-transform"
            >
              <div className="min-w-0 flex-1 sm:order-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                  পরবর্তী পোস্ট
                </div>
                <div className="text-sm font-bold text-fg truncate">
                  {next.title}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-fg-muted group-hover:text-brand-red transition-colors sm:order-2 shrink-0" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
