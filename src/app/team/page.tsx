import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, Users, Sparkles } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { TEAM_MEMBERS, type TeamMember } from "@/lib/team";
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
            {TEAM_MEMBERS.map((member) => (
              <MemberCard key={member.slug} member={member} />
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

const ACCENT_BG_HEX: Record<TeamMember["accent"], string> = {
  red: "#e11924",
  blue: "#1847a1",
  ash: "#c0c7d1",
};

function MemberCard({ member }: { member: TeamMember }) {
  return (
    // Premium hover treatment — five layered effects fire together
    // on hover so the card feels "crafted" rather than basic:
    //   1. The card lifts 8 px with a brand-blue glow shadow + ring.
    //   2. The photo scales 110 % with a 1.5° rotate (organic feel)
    //      and brightness/saturation boost so the subject pops.
    //   3. A diagonal shine sweeps left→right across the photo.
    //   4. A brand-blue gradient tint fades in from the bottom edge,
    //      anchoring the photo in the brand palette while hovered.
    //   5. A floating role pill slides up from below the photo.
    //   6. The name gains an animated red→blue underline that draws
    //      from 0 → 100 % width.
    //
    // Everything is pure CSS via Tailwind group-hover — no JS event
    // handlers, no client component needed, no JS bundle cost.
    <article
      className="
        card group overflow-hidden flex flex-col cursor-default
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_24px_60px_-15px_rgba(24,71,161,0.30),0_8px_24px_-8px_rgba(225,25,36,0.18)]
        hover:ring-2 hover:ring-brand-blue/25
      "
    >
      {/* Brand-coloured photo frame */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ backgroundColor: ACCENT_BG_HEX[member.accent] }}
      >
        <div className="absolute inset-0 opacity-20 mix-blend-overlay grid-bg" />
        <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-white/20 blur-3xl animate-blob" />

        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="
            object-cover relative z-10
            transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
            will-change-transform
            group-hover:scale-110 group-hover:rotate-[1.5deg]
            group-hover:brightness-110 group-hover:saturate-110
          "
        />

        {/* Brand-tint gradient — fades in over the lower half of the
            photo on hover, gives the subject a subtle blue "halo". */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-0 z-20
            bg-gradient-to-t from-brand-blue/45 via-brand-blue/12 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          "
        />

        {/* Diagonal shine sweep — narrow bright stripe that slides
            across the photo when the card is hovered.  Skewed -12°
            for a "polished metal" feel. */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute top-0 bottom-0 -left-1/2 z-30
            w-1/2 -skew-x-12
            bg-gradient-to-r from-transparent via-white/35 to-transparent
            -translate-x-full
            group-hover:translate-x-[440%]
            transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]
          "
        />

        {/* Floating role badge — slides up from below the frame edge
            on hover, with a tiny delay so it lands after the lift
            has settled. */}
        <div
          className="
            absolute left-3 bottom-3 z-40
            translate-y-12 opacity-0
            group-hover:translate-y-0 group-hover:opacity-100
            transition-all duration-500 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)]
          "
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-blue shadow-lg ring-1 ring-white/40">
            {member.role}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="text-[10px] uppercase tracking-[0.2em] text-fg-faint transition-colors duration-300 group-hover:text-brand-blue/75">
          {member.nameEn}
        </div>

        {/* Name with animated draw-underline.  The span is absolutely
            positioned under the text; width transitions 0 → 100 %
            on group hover with a 600 ms ease-out. */}
        <h3 className="mt-1 text-xl font-bold text-fg leading-tight relative inline-block w-fit">
          <span className="relative">
            {member.name}
            <span
              aria-hidden
              className="
                absolute left-0 -bottom-1 h-[3px] w-0
                bg-gradient-to-r from-brand-red via-brand-blue to-brand-blue
                rounded-full
                group-hover:w-full
                transition-[width] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
              "
            />
          </span>
        </h3>

        <div className="mt-1 text-sm font-semibold text-brand-blue">
          {member.role}
        </div>

        {member.bio && (
          <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
            {member.bio}
          </p>
        )}

        {(member.phone || member.email) && (
          <div className="mt-5 pt-5 border-t border-border space-y-2 transition-colors duration-300 group-hover:border-brand-blue/30">
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="flex items-center gap-2 text-sm text-fg hover:text-brand-blue transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-fg-muted shrink-0" />
                <span className="truncate">{member.phone}</span>
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-sm text-fg hover:text-brand-blue transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-fg-muted shrink-0" />
                <span className="truncate">{member.email}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
