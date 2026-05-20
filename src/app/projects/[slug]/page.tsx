import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Ruler,
  Phone,
  PlayCircle,
} from "lucide-react";
import { PROJECTS, SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import ProjectGallery from "@/components/ProjectGallery";
import { breadcrumbSchema } from "@/lib/schema";
import { getSiteUrl, absoluteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();

const STATUS_DOT: Record<string, string> = {
  red: "bg-brand-red",
  blue: "bg-brand-blue",
  ash: "bg-brand-ash-dark",
};

/** Only the pre-rendered project slugs resolve — anything else 404s. */
export const dynamicParams = false;

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "প্রকল্প পাওয়া যায়নি" };
  const url = `${SITE_URL}/projects/${project.slug}`;
  const title = `${project.name} — প্রমিস সিটি প্রকল্প`;
  const image = absoluteUrl(project.cover);
  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "website",
      url,
      title,
      description: project.description,
      siteName: "Promise PPD",
      locale: "bn_BD",
      images: [{ url: image, secureUrl: image, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [{ url: image, alt: project.name }],
    },
  };
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const breadcrumb = breadcrumbSchema([
    { name: "হোম", url: SITE_URL },
    { name: "প্রকল্প", url: `${SITE_URL}/#projects` },
    { name: project.name, url: `${SITE_URL}/projects/${project.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* Hero — full-bleed cover photo with a dark scrim. */}
      <section className="relative isolate overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 -z-10">
          <Image
            src={project.cover}
            alt={project.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fg/90 via-fg/55 to-fg/35" />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:pt-28 sm:pb-16">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/85 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            সব প্রকল্প
          </Link>

          <div className="mt-5 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-semibold tracking-wide text-fg shadow-sm">
              <span
                className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                  STATUS_DOT[project.accent] ?? STATUS_DOT.red
                }`}
              />
              {project.status}
            </span>
            {project.size && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white">
                <Ruler className="h-3 w-3" />
                {project.size}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] drop-shadow-md">
            {project.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/90">
            <span className="inline-flex items-center gap-1.5 text-sm">
              <MapPin className="h-4 w-4" />
              {project.location}
            </span>
            <span className="text-sm">
              <span className="text-white/70">শুরু </span>
              <span className="font-bold">{project.price}</span>
            </span>
          </div>

          <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/90 leading-relaxed">
            {project.longDescription}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-blue px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:bg-brand-blue-dark hover:scale-[1.02] transition-all"
            >
              সাইট ভিজিট বুক করুন
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-fg hover:scale-[1.02] transition-transform"
            >
              <Phone className="h-4 w-4 text-brand-blue" />
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-3">
            {project.highlights.map((h) => (
              <div
                key={h}
                className="flex items-center gap-3 rounded-2xl bg-bg-soft border border-border px-5 py-4"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm sm:text-base font-medium text-fg">
                  {h}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative pb-12 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            ছবি<span className="text-grad"> গ্যালারি</span>
          </h2>
          <ProjectGallery images={project.gallery} name={project.name} />
        </div>
      </section>

      {/* Videos */}
      {project.videoIds && project.videoIds.length > 0 && (
        <section className="relative pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
              <PlayCircle className="h-7 w-7 text-brand-red" />
              ভিডিও
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {project.videoIds.map((id) => (
                <div
                  key={id}
                  className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-black ring-1 ring-border"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`}
                    title={project.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grad-border p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold leading-[1.15]">
              {project.name} <span className="text-grad">আপনার পছন্দ হয়েছে?</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-fg-muted max-w-2xl mx-auto">
              আজই একটি সাইট ভিজিট বুক করুন — আমাদের টিম প্রতিটি প্রশ্নের উত্তর
              দিতে প্রস্তুত।
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-blue px-7 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:bg-brand-blue-dark hover:scale-[1.02] transition-all"
              >
                যোগাযোগ করুন
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-white border border-border px-7 py-3.5 text-base font-semibold text-fg hover:border-brand-blue/40 hover:shadow-lg transition-all"
              >
                <Phone className="h-4 w-4 text-brand-blue" />
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
