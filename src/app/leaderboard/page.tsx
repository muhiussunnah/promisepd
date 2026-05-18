import type { Metadata } from "next";
import Link from "next/link";
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Sparkles,
  ArrowRight,
  Plane,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { PARTNER_AWARDS, PARTNER_PERIOD } from "@/lib/partner";
import { getSiteUrl, absoluteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();
const OG_IMAGE = absoluteUrl("/og-image.png");

const PAGE_TITLE = "লিডারবোর্ড — প্রমিস পার্টনার র‍্যাঙ্কিং";
const PAGE_DESC =
  "প্রমিস গ্রুপের পার্টনার প্রোগ্রামের শীর্ষ সেলস পারফরমার র‍্যাঙ্কিং। সর্বোচ্চ পয়েন্ট অর্জনকারীদের জন্য ফ্রি উমরাহ ও বিদেশ ট্যুর পুরস্কার।";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: "/leaderboard" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/leaderboard`,
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

// 8 placeholder slots so the empty leaderboard *looks* like a real
// leaderboard.  When live data comes in via Supabase later, swap the
// `PLACEHOLDER_ROWS` array for a `supabase.from(...).select()` query.
const PLACEHOLDER_ROWS = Array.from({ length: 8 }, (_, i) => ({
  rank: i + 1,
}));

const RANK_DECOR: Record<
  number,
  { icon: typeof Trophy; bg: string; ring: string; text: string }
> = {
  1: {
    icon: Crown,
    bg: "bg-brand-blue",
    ring: "ring-brand-blue/30",
    text: "text-white",
  },
  2: {
    icon: Medal,
    bg: "bg-brand-ash",
    ring: "ring-brand-ash/40",
    text: "text-fg",
  },
  3: {
    icon: Award,
    bg: "bg-brand-red",
    ring: "ring-brand-red/30",
    text: "text-white",
  },
};

export default function LeaderboardPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "হোম", url: SITE_URL },
    { name: "লিডারবোর্ড", url: `${SITE_URL}/leaderboard` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* Header */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16">
        <div className="absolute inset-0 -z-10 mesh-bg-soft" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
            <Trophy className="h-3.5 w-3.5 text-brand-blue" />
            <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
              পার্টনার লিডারবোর্ড · {PARTNER_PERIOD.startBn}
            </span>
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08]">
            শীর্ষে যাঁরা — <span className="text-grad">তাঁদের পুরস্কার।</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-fg-muted leading-relaxed max-w-2xl mx-auto">
            {PARTNER_PERIOD.startBn} থেকে {PARTNER_PERIOD.endBn} পর্যন্ত
            সর্বোচ্চ পয়েন্ট অর্জনকারী পার্টনারদের লাইভ র‍্যাঙ্কিং। শীর্ষ
            পারফরমারদের জন্য ফ্রি উমরাহ ও আন্তর্জাতিক ট্যুর।
          </p>
        </div>
      </section>

      {/* Awards strip — what's at stake */}
      <section className="relative pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            {PARTNER_AWARDS.map((award) => {
              const Icon = award.accent === "red" ? Sparkles : Plane;
              return (
                <div
                  key={award.titleEn}
                  className="card p-5 flex items-center gap-4"
                >
                  <div
                    className={`shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                      award.accent === "red"
                        ? "bg-brand-red"
                        : "bg-brand-blue"
                    } text-white shadow-md`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                      {award.threshold} পয়েন্ট
                    </div>
                    <div className="text-base font-bold text-fg">
                      {award.titleBn}
                    </div>
                    <p className="text-xs text-fg-muted leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leaderboard placeholder — 8 skeleton rows */}
      <section className="relative pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="card overflow-hidden">
            {/* Table header */}
            <div className="bg-bg-soft px-5 sm:px-6 py-3 grid grid-cols-[3rem_1fr_5rem_6rem] sm:grid-cols-[3rem_1fr_8rem_8rem] gap-3 text-[10px] uppercase tracking-[0.18em] font-bold text-fg-muted">
              <div>র‍্যাঙ্ক</div>
              <div>পার্টনার</div>
              <div className="text-right">পয়েন্ট</div>
              <div className="text-right">আয়</div>
            </div>

            {PLACEHOLDER_ROWS.map((row) => {
              const decor = RANK_DECOR[row.rank];
              return (
                <div
                  key={row.rank}
                  className="px-5 sm:px-6 py-4 grid grid-cols-[3rem_1fr_5rem_6rem] sm:grid-cols-[3rem_1fr_8rem_8rem] gap-3 items-center border-t border-border"
                >
                  <div>
                    {decor ? (
                      <div
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${decor.bg} ${decor.text} ring-4 ${decor.ring} shadow-sm`}
                      >
                        <decor.icon className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg-soft text-fg-muted font-bold text-sm">
                        {new Intl.NumberFormat("bn-BD").format(row.rank)}
                      </div>
                    )}
                  </div>

                  {/* Skeleton bars — give the placeholder a "real
                      leaderboard loading" feel rather than empty grey. */}
                  <div className="space-y-1.5">
                    <div className="h-3 w-32 rounded-full bg-bg-soft-2" />
                    <div className="h-2.5 w-20 rounded-full bg-bg-soft" />
                  </div>
                  <div className="ml-auto h-4 w-12 rounded-full bg-bg-soft-2" />
                  <div className="ml-auto h-4 w-16 rounded-full bg-bg-soft-2" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — join the partner program */}
      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grad-border p-8 sm:p-12 text-center">
            <Trophy className="h-12 w-12 mx-auto text-brand-blue" />
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15]">
              এই তালিকায় <span className="text-grad">আপনার নাম দেখতে চান?</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-fg-muted max-w-2xl mx-auto">
              পার্টনার প্রোগ্রামে যোগ দিন, ক্যালকুলেটরে আয়ের লক্ষ্য সেট
              করুন, এবং বছর শেষে শীর্ষ পারফরমারদের তালিকায় উঠে আসুন।
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/partner"
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-blue px-7 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:bg-brand-blue-dark hover:scale-[1.02] transition-all"
              >
                পার্টনার পেজে যান
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-white border border-border px-7 py-3.5 text-base font-semibold text-fg hover:border-brand-blue/40 hover:shadow-lg transition-all"
              >
                সরাসরি যোগাযোগ
              </Link>
            </div>
            <p className="mt-6 text-[11px] text-fg-faint">
              * লাইভ র‍্যাঙ্কিং ডেটা শীঘ্রই সংযুক্ত হবে — পার্টনার প্রোগ্রাম
              সক্রিয় হলে।
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
