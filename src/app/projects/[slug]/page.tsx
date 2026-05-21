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
  FileText,
  Building2,
  Wallet,
  Calendar,
  KeyRound,
  ZoomIn,
  Sparkles,
  LandPlot,
} from "lucide-react";
import { PROJECTS, SITE } from "@/lib/site";
import { toBn } from "@/lib/bn";
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

  // Magazine layout: when a project has rich "details" paragraphs, the
  // first video is embedded in the MIDDLE of them (bigger, centred) and
  // the remaining videos (if any) drop to the bottom Videos section.
  const details = project.details ?? [];
  const mid = Math.ceil(details.length / 2);
  const firstHalf = details.slice(0, mid);
  const secondHalf = details.slice(mid);
  const midVideo = details.length > 0 ? project.videoIds?.[0] : undefined;
  const bottomVideos =
    details.length > 0
      ? (project.videoIds ?? []).slice(1)
      : project.videoIds ?? [];

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
            {project.floorPlanUrl && (
              <a
                href={project.floorPlanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-md px-6 py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-white/25 transition-colors"
              >
                <FileText className="h-4 w-4" />
                ফ্লোর প্ল্যান দেখুন
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Building availability — multi-building projects only */}
      {project.buildings && (
        <section className="relative py-12 sm:py-16 bg-bg-soft">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-6 w-6 text-brand-blue" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                ভবন <span className="text-grad">স্ট্যাটাস</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-fg-muted mb-6">
              মোট {toBn(project.buildings.total)}টি ভবন ·{" "}
              {toBn(project.buildings.soldOut)}টি বিক্রি শেষ · ভবন{" "}
              {toBn(project.buildings.nowBooking)}-এ বুকিং চলছে
            </p>

            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-2.5">
              {Array.from({ length: project.buildings.total }, (_, idx) => {
                const n = idx + 1;
                const sold = n <= project.buildings!.soldOut;
                const booking = n === project.buildings!.nowBooking;
                return (
                  <div
                    key={n}
                    className={`relative flex flex-col items-center justify-center rounded-xl border py-3 text-center ${
                      booking
                        ? "bg-brand-blue text-white border-brand-blue shadow-[var(--shadow-brand)]"
                        : sold
                          ? "bg-bg-soft-2 text-fg-faint border-border"
                          : "bg-white text-fg-soft border-border"
                    }`}
                  >
                    <span className="text-base font-extrabold tnum">
                      {toBn(n)}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wide mt-0.5">
                      {booking ? "বুকিং" : sold ? "বিক্রি শেষ" : "আসছে"}
                    </span>
                    {booking && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75 animate-ping" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-red" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grad-border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="text-sm font-bold text-fg">
                  ভবন {toBn(project.buildings.nowBooking)}-এ এখন বুকিং চলছে
                </div>
                <p className="text-sm text-fg-muted mt-0.5">
                  পছন্দের ইউনিট নিশ্চিত করতে এখনই যোগাযোগ করুন — সীমিত ইউনিট।
                </p>
              </div>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-red px-6 py-3 text-sm font-bold text-white shadow-md hover:scale-[1.02] transition-transform whitespace-nowrap"
              >
                <Phone className="h-4 w-4" />
                জরুরি যোগাযোগ
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Payment & deed terms */}
      {project.payment && (
        <section className="relative py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Wallet className="h-6 w-6 text-brand-blue" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                পেমেন্ট ও <span className="text-grad">দলিল</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {project.payment.rows.map((row, i) => {
                const RIcon = [Wallet, Calendar, KeyRound][i % 3];
                const box = [
                  "bg-brand-blue",
                  "bg-brand-red",
                  "bg-brand-ash-dark",
                ][i % 3];
                return (
                  <div key={row.label} className="card p-5">
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${box} text-white shadow-md`}
                    >
                      <RIcon className="h-5 w-5" />
                    </div>
                    <div className="mt-3 text-[11px] uppercase tracking-wider text-fg-faint font-bold">
                      {row.label}
                    </div>
                    <div className="text-xl font-bold text-grad-rb">
                      {row.value}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-bg-soft border border-border px-5 py-4">
              <KeyRound className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
              <p className="text-sm text-fg-muted leading-relaxed">
                {project.payment.note}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Full rules / spec graphic — official details + নিয়মাবলী */}
      {project.rulesImage && (
        <section className="relative pb-12 sm:pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="h-6 w-6 text-brand-blue" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                বিস্তারিত <span className="text-grad">নিয়মাবলী</span>
              </h2>
            </div>
            <a
              href={project.rulesImage}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden border border-border shadow-lg"
            >
              <Image
                src={project.rulesImage}
                alt={`${project.name} — বিস্তারিত নিয়মাবলী`}
                width={1280}
                height={904}
                sizes="(min-width:1024px) 896px, 100vw"
                className="w-full h-auto"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-fg/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md group-hover:bg-brand-blue transition-colors">
                <ZoomIn className="h-3.5 w-3.5" />
                বড় করে দেখুন
              </span>
            </a>
          </div>
        </section>
      )}

      {/* Unit availability — seat-map style floor diagram */}
      {project.unitMap && (
        <section className="relative py-12 sm:py-16 bg-bg-soft">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-6 w-6 text-brand-blue" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                ইউনিট <span className="text-grad">অ্যাভেইলেবিলিটি</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-fg-muted mb-5">
              কোন ইউনিট খালি আর কোনটি বিক্রি হয়ে গেছে — নিচের ডায়াগ্রামে দেখে নিন।
            </p>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mb-5 text-xs font-medium text-fg-soft">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3.5 w-3.5 rounded bg-brand-blue/15 border border-brand-blue/50" />
                খালি
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3.5 w-3.5 rounded bg-bg-soft-2 border border-border" />
                বিক্রি শেষ
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3.5 w-3.5 rounded bg-brand-ash/40 border border-brand-ash" />
                ভাড়া
              </span>
            </div>

            <div className="rounded-2xl border border-border bg-white overflow-hidden divide-y divide-border">
              {project.unitMap.floors.map((floor) => (
                <div
                  key={floor.label}
                  className="flex items-center gap-3 px-3 sm:px-4 py-2.5"
                >
                  <div className="w-16 sm:w-20 shrink-0 text-xs sm:text-sm font-bold text-fg">
                    {floor.label}
                  </div>
                  <div className="flex flex-wrap gap-2 flex-1">
                    {floor.units.map((u) => {
                      // Available units are tappable (→ call to book),
                      // with a blinking "open" beacon + hover lift.
                      if (u.status === "available") {
                        return (
                          <a
                            key={u.id}
                            href={`tel:${SITE.phone}`}
                            title={`${u.id} — খালি · বুক করতে কল করুন`}
                            className="group relative inline-flex min-w-[4rem] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-brand-blue/50 bg-gradient-to-b from-brand-blue/12 to-brand-blue/5 px-3 py-2 text-brand-blue shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.08] hover:border-brand-blue hover:bg-brand-blue hover:text-white hover:shadow-[var(--shadow-brand)]"
                          >
                            <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                            </span>
                            <span className="text-sm font-extrabold leading-none">
                              {u.id}
                            </span>
                            {u.size && (
                              <span className="mt-0.5 text-[9px] font-semibold leading-none opacity-90">
                                {u.size} sqft
                              </span>
                            )}
                            <span className="mt-0.5 text-[8px] font-bold uppercase leading-none opacity-85 group-hover:opacity-100">
                              খালি
                            </span>
                          </a>
                        );
                      }
                      const isRented = u.status === "rented";
                      return (
                        <span
                          key={u.id}
                          className={`inline-flex min-w-[4rem] flex-col items-center justify-center rounded-xl border px-3 py-2 ${
                            isRented
                              ? "border-brand-ash bg-brand-ash/30 text-fg-muted"
                              : "border-border bg-bg-soft-2 text-fg-faint"
                          }`}
                        >
                          <span
                            className={`text-sm font-bold leading-none ${
                              isRented ? "" : "line-through"
                            }`}
                          >
                            {u.id}
                          </span>
                          {u.size && (
                            <span className="mt-0.5 text-[9px] font-medium leading-none">
                              {isRented ? "ভাড়া" : `${u.size} sqft`}
                            </span>
                          )}
                          {!isRented && (
                            <span className="mt-0.5 text-[8px] font-bold uppercase leading-none">
                              বিক্রি
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grad-border p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 text-sm text-fg-muted">
                পছন্দের খালি ইউনিট নিশ্চিত করতে এখনই যোগাযোগ করুন — সীমিত ইউনিট।
              </div>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-blue px-6 py-3 text-sm font-bold text-white shadow-[var(--shadow-brand)] hover:scale-[1.02] transition-transform whitespace-nowrap"
              >
                <Phone className="h-4 w-4" />
                বুকিং যোগাযোগ
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Land plots — pricing + categories (Promise City township) */}
      {project.plots && (
        <section className="relative py-12 sm:py-16 bg-bg-soft">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-2">
              <LandPlot className="h-6 w-6 text-brand-blue" />
              <h2 className="text-2xl sm:text-3xl font-bold">
                জমির <span className="text-grad">প্লট ও মূল্য</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-fg-muted mb-6">
              বিনিয়োগযোগ্য আবাসিক প্লট — যাচাইকৃত দলিল ও নামজারিসহ হস্তান্তর।
            </p>

            {/* Price summary strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "প্রতি শতাংশ", value: project.plots.pricePerShotangsho },
                { label: "প্রতি কাঠা", value: project.plots.pricePerKatha },
                { label: "রূপান্তর", value: project.plots.conversion },
              ].map((row) => (
                <div key={row.label} className="card p-5">
                  <div className="text-[11px] uppercase tracking-wider text-fg-faint font-bold">
                    {row.label}
                  </div>
                  <div className="text-xl font-bold text-grad-rb">
                    {row.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Plot category cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.plots.categories.map((c) => (
                <div
                  key={c.katha}
                  className="grad-border p-6 text-center transition-transform hover:-translate-y-1"
                >
                  <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue text-white shadow-md">
                    <Ruler className="h-6 w-6" />
                  </div>
                  <div className="mt-3 text-2xl font-extrabold text-fg">
                    {c.katha}
                  </div>
                  <div className="text-sm text-fg-muted">{c.shotangsho}</div>
                  <div className="mt-3 text-xl font-bold text-grad-rb">
                    {c.price}
                  </div>
                </div>
              ))}
            </div>

            {/* Layout plan button + coming-soon dynamic note */}
            <div className="mt-6 flex flex-col gap-4">
              {project.plots.layoutPlanUrl && (
                <a
                  href={project.plots.layoutPlanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-blue px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:bg-brand-blue-dark hover:scale-[1.01] transition-all sm:w-auto sm:self-start"
                >
                  <FileText className="h-4 w-4" />
                  জমির লেআউট প্ল্যান দেখুন
                  <ZoomIn className="h-4 w-4" />
                </a>
              )}
              {project.plots.note && (
                <div className="flex items-start gap-3 rounded-2xl bg-white border border-border px-5 py-4">
                  <Sparkles className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <p className="text-sm text-fg-muted leading-relaxed">
                    {project.plots.note}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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

      {/* About — rich description with the video sitting in the middle */}
      {details.length > 0 && (
        <section className="relative pb-12 sm:pb-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              প্রকল্প <span className="text-grad">সম্পর্কে</span>
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-fg-muted leading-relaxed">
              {firstHalf.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {midVideo && (
              <figure className="my-10 sm:my-12">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${midVideo}?rel=0&modestbranding=1&playsinline=1`}
                    title={`${project.name} — প্রজেক্ট ভিডিও`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm text-fg-faint">
                  {project.name} — প্রজেক্ট ডকুমেন্টরি
                </figcaption>
              </figure>
            )}

            <div className="space-y-5 text-base sm:text-lg text-fg-muted leading-relaxed">
              {secondHalf.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="relative pb-12 sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            ছবি<span className="text-grad"> গ্যালারি</span>
          </h2>
          <ProjectGallery images={project.gallery} name={project.name} />
        </div>
      </section>

      {/* Videos — only the ones not already embedded in the About section */}
      {bottomVideos.length > 0 && (
        <section className="relative pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
              <PlayCircle className="h-7 w-7 text-brand-red" />
              ভিডিও
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {bottomVideos.map((id) => (
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
