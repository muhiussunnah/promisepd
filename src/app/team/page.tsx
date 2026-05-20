import type { Metadata } from "next";
import { Users, Sparkles } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import TeamMemberCard from "@/components/TeamMemberCard";
import { breadcrumbSchema } from "@/lib/schema";
import { TEAM_MEMBERS } from "@/lib/team";
import { getSiteUrl, absoluteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();
const OG_IMAGE = absoluteUrl("/og-image.png");

const PAGE_TITLE = "আমাদের টিম — Promise PPD";
const PAGE_DESC =
  "প্রমিস গ্রুপের পেছনের মানুষ — যারা প্রতিদিন আপনার স্বপ্নের ঠিকানা গড়তে কাজ করছেন। নেতৃত্ব, ব্যবস্থাপনা এবং অপারেশন টিমের পরিচিতি।";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: "/team" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/team`,
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: "Promise PPD",
    locale: "bn_BD",
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE,
        type: "image/png",
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

export default function TeamPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "হোম", url: SITE_URL },
    { name: "টিম", url: `${SITE_URL}/team` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* Header */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16">
        <div className="absolute inset-0 -z-10 mesh-bg-soft" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
            <Users className="h-3.5 w-3.5 text-brand-blue" />
            <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
              আমাদের টিম
            </span>
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08]">
            যাঁদের কাজ <span className="text-grad">আপনার স্বপ্ন গড়ে।</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-fg-muted leading-relaxed max-w-2xl mx-auto">
            প্রমিস গ্রুপের নেতৃত্ব ও অপারেশন টিম — প্রতিটি প্রকল্পের
            পেছনে দাঁড়িয়ে।
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="relative pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member, i) => (
              <TeamMemberCard key={member.slug} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Coming-soon scaffold — sets expectation that the team is
          larger and more members will be added.  Acts as visual
          placeholder so the page doesn't feel empty with just 2
          cards. */}
      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-dashed border-border-strong bg-bg-soft p-10 text-center cursor-default">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
              <Sparkles className="h-7 w-7 text-brand-blue" />
            </div>
            <h2 className="mt-5 text-xl sm:text-2xl font-bold text-fg">
              আরও সদস্য — খুব শীঘ্রই
            </h2>
            <p className="mt-2 text-sm sm:text-base text-fg-muted max-w-2xl mx-auto leading-relaxed">
              মার্কেটিং, প্রজেক্ট ম্যানেজমেন্ট, ইঞ্জিনিয়ারিং, কাস্টমার
              কেয়ার — প্রমিস পরিবারের পুরো টিমের পরিচিতি এখানে শীঘ্রই
              যুক্ত হবে।
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
