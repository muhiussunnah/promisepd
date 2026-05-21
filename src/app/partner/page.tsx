import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { PARTNER_HEADLINE } from "@/lib/partner";
import PartnerHero from "@/components/PartnerHero";
import PartnerCalculator from "@/components/PartnerCalculator";
import PartnerRules from "@/components/PartnerRules";
import PartnerPoints from "@/components/PartnerPoints";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getSiteUrl, absoluteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();
const OG_IMAGE = absoluteUrl("/og-image.jpg");

const PAGE_TITLE = "পার্টনার হোন — নিজের আয়ের লক্ষ্য নিজে ঠিক করুন";
const PAGE_DESC = `প্রমিস গ্রুপের পার্টনার প্রোগ্রাম। মাত্র ${PARTNER_HEADLINE.referralsTarget} জন রেফার করে ফ্রি উমরাহ + ৳ ${PARTNER_HEADLINE.totalValueBn} টাকার পুরস্কার। ক্যালকুলেটরে আয়ের লক্ষ্য সেট করুন, প্ল্যান বানান।`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: "/partner" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/partner`,
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

export default function PartnerPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "হোম", url: SITE_URL },
    { name: "পার্টনার হোন", url: `${SITE_URL}/partner` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <PartnerHero />
      <PartnerCalculator />
      <PartnerRules />
      <PartnerPoints />

      {/* Final CTA */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grad-border p-8 sm:p-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
              <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
                আজই শুরু করুন
              </span>
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15]">
              আপনার <span className="text-grad">পার্টনারশিপ</span> যাত্রা
              এক ফোনকল দূরে।
            </h2>
            <p className="mt-4 text-base sm:text-lg text-fg-muted max-w-2xl mx-auto">
              ক্যালকুলেটরে দেখা প্ল্যান নিয়ে সরাসরি আমাদের মার্কেটিং
              টিমের সাথে কথা বলুন — অনবোর্ডিং, ট্রেনিং ও কমিশন স্ট্রাকচার
              বিস্তারিত বুঝে নিন।
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-blue px-7 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:bg-brand-blue-dark hover:scale-[1.02] transition-all"
              >
                <Phone className="h-4 w-4" />
                {SITE.phoneDisplay}
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-white border border-border px-7 py-3.5 text-base font-semibold text-fg hover:border-brand-blue/40 hover:shadow-lg transition-all"
              >
                <Mail className="h-4 w-4 text-brand-red" />
                বার্তা পাঠান
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
