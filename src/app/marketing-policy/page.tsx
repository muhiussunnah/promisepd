import type { Metadata } from "next";
import Link from "next/link";
import { ScrollText, ShieldCheck, ArrowRight, Phone, Crown } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import PropertyBackdrop from "@/components/PropertyBackdrop";
import { breadcrumbSchema } from "@/lib/schema";
import { MARKETING_POLICY } from "@/lib/partner";
import { SITE } from "@/lib/site";
import { toBn } from "@/lib/bn";
import { getSiteUrl, absoluteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();
const OG_IMAGE = absoluteUrl("/og-image.jpg");

const PAGE_TITLE = "মার্কেটিং পলিসি — PromisePD";
const PAGE_DESC =
  "প্রমিস সিটির মার্কেটার ও রিসেলারদের জন্য অফিসিয়াল মার্কেটিং নীতিমালা — কনটেন্ট ব্যবহার, মূল্য নির্ধারণ, রেফারেন্স, কমিশন ও ক্লায়েন্ট ভিজিটের নিয়মাবলী।";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: "/marketing-policy" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/marketing-policy`,
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

export default function MarketingPolicyPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "হোম", url: SITE_URL },
    { name: "মার্কেটিং পলিসি", url: `${SITE_URL}/marketing-policy` },
  ]);

  // Rule 10 is the "owner may amend" clause — pulled out as a
  // standalone callout, so the numbered list shows the 9 operational
  // rules and the amendment right gets its own emphasis block.
  const operationalRules = MARKETING_POLICY.slice(0, -1);
  const amendmentRule = MARKETING_POLICY[MARKETING_POLICY.length - 1];

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* Hero with a soft project backdrop */}
      <section className="relative isolate overflow-hidden pt-32 pb-14 sm:pt-36 sm:pb-16">
        <PropertyBackdrop
          src="/ftpics/ftt1.webp"
          alt="Promise City"
          intensity={26}
          bluewash="soft"
        />
        <div className="absolute inset-0 -z-10 mesh-bg-soft" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
            <ScrollText className="h-3.5 w-3.5 text-brand-blue" />
            <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
              মার্কেটিং পলিসি
            </span>
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08]">
            মার্কেটারদের জন্য <span className="text-grad">নিয়মাবলী।</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-fg-muted leading-relaxed max-w-2xl mx-auto">
            প্রমিস সিটির প্রতিটি মার্কেটার ও রিসেলার যে নীতিমালা মেনে কাজ
            করেন — কনটেন্ট ব্যবহার, মূল্য, রেফারেন্স, কমিশন ও ক্লায়েন্ট
            ভিজিট। স্বচ্ছতা ও পারস্পরিক বিশ্বাসই আমাদের ভিত্তি।
          </p>
        </div>
      </section>

      {/* Numbered rules */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {operationalRules.map((rule, i) => (
              <div
                key={rule.title}
                className="card p-5 sm:p-6 flex gap-4 sm:gap-5"
              >
                {/* Big gradient number */}
                <div className="shrink-0">
                  <div className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-brand-blue text-white text-lg font-extrabold shadow-md tnum">
                    {toBn(i + 1)}
                  </div>
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-fg leading-tight">
                    {rule.title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-fg-muted leading-relaxed">
                    {rule.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Amendment-rights callout (rule 10) */}
          <div className="mt-6 grad-border p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-red text-white shadow-md">
                <Crown className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-fg-faint font-bold">
                    ধারা {toBn(MARKETING_POLICY.length)}
                  </span>
                </div>
                <h2 className="mt-1 text-lg sm:text-xl font-bold text-fg leading-tight">
                  {amendmentRule.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-fg-muted leading-relaxed">
                  {amendmentRule.body}
                </p>
              </div>
            </div>
          </div>

          {/* Trust note */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-bg-soft border border-border px-5 py-4">
            <ShieldCheck className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
            <p className="text-sm text-fg-muted leading-relaxed">
              এই নীতিমালা প্রমিস সিটি ও তার মার্কেটারদের মধ্যে স্বচ্ছ ও
              ন্যায্য সম্পর্ক নিশ্চিত করতে তৈরি। যেকোনো প্রশ্ন বা স্পষ্টতার
              প্রয়োজনে সরাসরি মার্কেটিং অফিসে যোগাযোগ করুন।
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grad-border p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold leading-[1.15]">
              পার্টনার হিসেবে <span className="text-grad">যাত্রা শুরু করুন</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-fg-muted max-w-2xl mx-auto">
              নিয়মাবলী বুঝে নিয়েছেন? এবার পার্টনার প্রোগ্রামে যোগ দিন আর
              নিজের আয়ের লক্ষ্য নিজেই ঠিক করুন।
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/partner"
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-blue px-7 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:bg-brand-blue-dark hover:scale-[1.02] transition-all"
              >
                পার্টনার পেজে যান
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
