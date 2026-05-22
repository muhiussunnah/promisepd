import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft, Phone } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import FormFiller from "@/components/FormFiller";
import { FORMS, getForm } from "@/lib/forms";
import { SITE } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { getSiteUrl, absoluteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();

export const dynamicParams = false;

export function generateStaticParams() {
  return FORMS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(
  props: PageProps<"/forms/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const form = getForm(slug);
  if (!form) return { title: "ফরম পাওয়া যায়নি" };
  const title = `${form.nameBn} — PromisePD`;
  const image = absoluteUrl("/og-image.jpg");
  return {
    title,
    description: form.description,
    alternates: { canonical: `/forms/${slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/forms/${slug}`,
      title,
      description: form.description,
      siteName: "PromisePD",
      locale: "bn_BD",
      images: [{ url: image, secureUrl: image, type: "image/jpeg", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description: form.description, images: [{ url: image, alt: title }] },
  };
}

export default async function FormPage(props: PageProps<"/forms/[slug]">) {
  const { slug } = await props.params;
  const form = getForm(slug);
  if (!form) notFound();

  const breadcrumb = breadcrumbSchema([
    { name: "হোম", url: SITE_URL },
    { name: "ফর্ম", url: `${SITE_URL}/forms` },
    { name: form.nameBn, url: `${SITE_URL}/forms/${slug}` },
  ]);

  return (
    <section className="relative pt-28 sm:pt-32 pb-8">
      <JsonLd data={breadcrumb} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/forms"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted hover:text-brand-blue transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          সব ফরম
        </Link>
      </div>

      {form.ready ? (
        <FormFiller form={form} />
      ) : (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 text-center">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
            <Clock className="h-7 w-7 text-brand-blue" />
          </span>
          <h1 className="mt-6 text-2xl sm:text-3xl font-bold">{form.nameBn}</h1>
          <p className="mt-3 text-fg-muted leading-relaxed max-w-xl mx-auto">
            এই ফরমটি অনলাইনে পূরণের সুবিধা খুব শীঘ্রই যুক্ত হচ্ছে — ইন শা আল্লাহ।
            এখনই আবেদন করতে আমাদের অফিসে যোগাযোগ করুন।
          </p>
          <a
            href={`tel:${SITE.phone}`}
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-brand-blue px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-brand)] hover:bg-brand-blue-dark transition-colors"
          >
            <Phone className="h-4 w-4" />
            {SITE.phoneDisplay}
          </a>

          <div className="mt-10 rounded-2xl border border-border bg-white shadow-lg overflow-hidden max-w-md mx-auto">
            <Image
              src={form.pages[0]}
              alt={form.nameBn}
              width={760}
              height={1075}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}
