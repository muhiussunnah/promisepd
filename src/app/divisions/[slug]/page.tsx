import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Building2,
  Hammer,
  Landmark,
  Plane,
  Palette,
  Phone,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { DIVISIONS, PROJECTS, SITE } from "@/lib/site";
import DivisionHero from "@/components/DivisionHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, divisionServiceSchema } from "@/lib/schema";

const SITE_URL = "https://promisepd.com";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Hammer,
  Landmark,
  Plane,
  Palette,
};

const ACCENT_SOLID: Record<string, string> = {
  red: "bg-brand-red",
  blue: "bg-brand-blue",
  ash: "bg-brand-ash",
  rb: "bg-brand-red",
  ab: "bg-brand-blue",
  ar: "bg-brand-red",
};

export async function generateStaticParams() {
  return DIVISIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(
  props: PageProps<"/divisions/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const division = DIVISIONS.find((d) => d.slug === slug);
  if (!division) return { title: "বিভাগ পাওয়া যায়নি" };
  const url = `${SITE_URL}/divisions/${division.slug}`;
  const title = `${division.nameBn} — ${division.tagline}`;
  return {
    title,
    description: division.description,
    alternates: { canonical: `/divisions/${division.slug}` },
    openGraph: {
      type: "website",
      url,
      title,
      description: division.description,
      siteName: "Promise PPD",
      locale: "bn_BD",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: division.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function DivisionPage(props: PageProps<"/divisions/[slug]">) {
  const { slug } = await props.params;
  const division = DIVISIONS.find((d) => d.slug === slug);
  if (!division) notFound();

  const Icon = ICONS[division.icon] ?? Building2;
  const showProjects = division.slug === "promise-city";
  const currentIdx = DIVISIONS.findIndex((d) => d.slug === slug);
  const prev = DIVISIONS[(currentIdx - 1 + DIVISIONS.length) % DIVISIONS.length];
  const next = DIVISIONS[(currentIdx + 1) % DIVISIONS.length];

  const breadcrumb = breadcrumbSchema([
    { name: "হোম", url: SITE_URL },
    { name: "আমাদের বিভাগ", url: `${SITE_URL}/#divisions` },
    { name: division.nameBn, url: `${SITE_URL}/divisions/${division.slug}` },
  ]);
  const service = divisionServiceSchema(division.slug);

  return (
    <>
      <JsonLd data={breadcrumb} />
      {service && <JsonLd data={service} />}
      <DivisionHero division={division} />

      {/* About this division */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
              <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
                বিভাগ পরিচিতি
              </span>
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15]">
              <span className="text-grad">{division.nameBn}</span> সম্পর্কে
            </h2>
          </div>
          <p className="text-base sm:text-lg text-fg-muted leading-relaxed text-center max-w-3xl mx-auto">
            {division.longDescription}
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {division.highlights.map((h) => (
              <div
                key={h}
                className={`grad-border p-4 text-center text-sm font-semibold text-fg`}
              >
                {h}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20 sm:py-28 bg-bg-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse" />
              <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
                আমরা যা দিই
              </span>
            </div>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15]">
              এই বিভাগের <span className="text-grad">সেবা ও সুবিধা</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {division.features.map((f) => (
              <div key={f.title} className="card p-6">
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                    ACCENT_SOLID[division.accent]
                  } shadow-md`}
                >
                  <Check
                    className={`h-5 w-5 ${
                      division.accent === "ash" ? "text-fg" : "text-white"
                    }`}
                  />
                </div>
                <h3 className="mt-4 text-lg font-bold text-fg">{f.title}</h3>
                <p className="mt-1.5 text-sm text-fg-muted leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects (Promise City only) */}
      {showProjects && (
        <section className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
                <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
                  চলমান প্রকল্প
                </span>
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15]">
                প্রমিজ সিটির <span className="text-grad">প্রকল্পসমূহ</span>
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((p, i) => (
                <article key={i} className="card overflow-hidden">
                  <div className="relative h-40 bg-brand-red overflow-hidden">
                    <div className="absolute inset-0 opacity-25 mix-blend-overlay grid-bg" />
                    <div className="absolute inset-0 flex items-end p-5">
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-fg">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                          {p.status}
                        </span>
                        <h3 className="mt-2 text-xl font-bold text-white drop-shadow-md">
                          {p.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline justify-between">
                      <div className="text-xs text-fg-muted">{p.location}</div>
                      <div className="text-lg font-bold text-grad-rb">
                        {p.price}
                      </div>
                    </div>
                    {p.size && (
                      <div className="text-xs text-fg-faint mt-1">{p.size}</div>
                    )}
                    <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grad-border p-8 sm:p-12 text-center">
            <Icon className="h-12 w-12 mx-auto text-grad-rb" />
            <h2 className="mt-5 text-3xl sm:text-4xl font-bold leading-[1.15]">
              {division.nameBn} সম্পর্কে{" "}
              <span className="text-grad">আরও জানুন</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-fg-muted max-w-2xl mx-auto">
              আমাদের সাথে সরাসরি কথা বলুন — আপনার প্রয়োজন বুঝে সঠিক সমাধান দেবো।
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-red px-7 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:bg-brand-red-dark hover:scale-[1.02] transition-all"
              >
                <Phone className="h-4 w-4" />
                {SITE.phoneDisplay}
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-white border border-border px-7 py-3.5 text-base font-semibold text-fg hover:border-brand-red/40 hover:shadow-lg transition-all"
              >
                <Mail className="h-4 w-4 text-brand-red" />
                বার্তা পাঠান
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next division */}
      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href={`/divisions/${prev.slug}`}
              className="card group p-6 flex items-center gap-4 hover:scale-[1.01] transition-transform"
            >
              <ArrowLeft className="h-5 w-5 text-fg-muted group-hover:text-brand-red transition-colors" />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                  পূর্ববর্তী বিভাগ
                </div>
                <div className="text-base font-bold text-fg truncate">
                  {prev.nameBn}
                </div>
              </div>
            </Link>
            <Link
              href={`/divisions/${next.slug}`}
              className="card group p-6 flex items-center gap-4 sm:text-right hover:scale-[1.01] transition-transform"
            >
              <div className="min-w-0 flex-1 sm:order-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                  পরবর্তী বিভাগ
                </div>
                <div className="text-base font-bold text-fg truncate">
                  {next.nameBn}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-fg-muted group-hover:text-brand-red transition-colors sm:order-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
