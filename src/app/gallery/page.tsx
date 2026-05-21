import type { Metadata } from "next";
import { Images } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import PropertyBackdrop from "@/components/PropertyBackdrop";
import GalleryView from "@/components/GalleryView";
import { breadcrumbSchema } from "@/lib/schema";
import { getSiteUrl, absoluteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();
const OG_IMAGE = absoluteUrl("/og-image.jpg");

const PAGE_TITLE = "গ্যালারি — PromisePD";
const PAGE_DESC =
  "আমাদের প্রকল্পের সর্বশেষ ছবি ও ভিডিও — ফুজালা টাওয়ার, ফুজালা কমপ্লেক্স, আহবাব প্যালেসসহ সকল কাজের একটি ঝলক।";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/gallery`,
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: "PromisePD",
    locale: "bn_BD",
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE,
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: PAGE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: [{ url: OG_IMAGE, alt: PAGE_TITLE }],
  },
};

export default function GalleryPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "হোম", url: SITE_URL },
    { name: "গ্যালারি", url: `${SITE_URL}/gallery` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-32 pb-12 sm:pt-36 sm:pb-14">
        <PropertyBackdrop
          src="/ftpics/ft.webp"
          alt="Promise City"
          intensity={26}
          bluewash="soft"
        />
        <div className="absolute inset-0 -z-10 mesh-bg-soft" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
            <Images className="h-3.5 w-3.5 text-brand-blue" />
            <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
              গ্যালারি
            </span>
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08]">
            আমাদের কাজের <span className="text-grad">ঝলক।</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-fg-muted leading-relaxed max-w-2xl mx-auto">
            ফুজালা টাওয়ার, ফুজালা কমপ্লেক্স, আহবাব প্যালেস — আমাদের
            চলমান ও সম্পন্ন প্রকল্পের সর্বশেষ ছবি এবং YouTube চ্যানেলের
            নতুন ভিডিও, সব এক জায়গায়।
          </p>
        </div>
      </section>

      <GalleryView />
    </>
  );
}
