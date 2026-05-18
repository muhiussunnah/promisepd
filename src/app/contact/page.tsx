import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { TEAM_MEMBERS } from "@/lib/team";
import { getSiteUrl, absoluteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();
const OG_IMAGE = absoluteUrl("/og-image.png");

const PAGE_TITLE = "যোগাযোগ — Promise PPD";
const PAGE_DESC =
  "প্রমিস গ্রুপের সাথে সরাসরি যোগাযোগ করুন — ফোন, ইমেইল, অফিস ঠিকানা এবং বার্তা পাঠানোর ফর্ম। এক কর্মদিবসের মধ্যে আমরা উত্তর দিই।";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
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

// ContactPage Schema.org — declares this URL as the canonical contact
// surface so search engines know exactly where to send "phone number"
// or "office address" intent traffic.
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#contactpage`,
  name: PAGE_TITLE,
  url: `${SITE_URL}/contact`,
  inLanguage: "bn-BD",
  isPartOf: { "@id": `${SITE_URL}#website` },
  about: { "@id": `${SITE_URL}#organization` },
};

export default function ContactPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "হোম", url: SITE_URL },
    { name: "যোগাযোগ", url: `${SITE_URL}/contact` },
  ]);

  // Surface the CEO at the top of /contact so visitors who came here
  // to talk to a decision-maker see one immediately.
  const ceo = TEAM_MEMBERS.find((m) => m.role.includes("CEO"));

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={contactPageSchema} />

      {/* Header */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16">
        <div className="absolute inset-0 -z-10 mesh-bg-soft" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
            <MessageCircle className="h-3.5 w-3.5 text-brand-blue" />
            <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
              যোগাযোগ
            </span>
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08]">
            <span className="text-grad">যেকোনো প্রশ্নে</span> আমরা পাশে।
          </h1>
          <p className="mt-5 text-base sm:text-lg text-fg-muted leading-relaxed max-w-2xl mx-auto">
            ফোন, ইমেইল, অফিস ভিজিট বা বার্তা — যেভাবে স্বাচ্ছন্দ্য বোধ
            করেন, আমাদের জানান। সাধারণত এক কর্মদিবসের মধ্যে উত্তর দিই।
          </p>
        </div>
      </section>

      {/* CEO direct-line card — premium VIP touch */}
      {ceo && (
        <section className="relative pb-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grad-border p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
                  <Image
                    src={ceo.photo}
                    alt={ceo.name}
                    fill
                    sizes="(min-width: 640px) 112px, 96px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                    সরাসরি কথা বলুন
                  </div>
                  <div className="mt-1 text-xl sm:text-2xl font-bold text-fg">
                    {ceo.name}
                  </div>
                  <div className="text-sm font-semibold text-brand-blue">
                    {ceo.role} · Promise Group
                  </div>
                  {ceo.bio && (
                    <p className="mt-2 text-sm text-fg-muted leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {ceo.bio}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-auto sm:shrink-0">
                  {ceo.phone && (
                    <a
                      href={`tel:${ceo.phone}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-blue-dark transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      {ceo.phone}
                    </a>
                  )}
                  {ceo.email && (
                    <a
                      href={`mailto:${ceo.email}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-border px-5 py-3 text-sm font-semibold text-fg hover:border-brand-blue/40 transition-colors"
                    >
                      <Mail className="h-4 w-4 text-brand-blue" />
                      ইমেইল
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick-info strip — phone, email, office, hours */}
      <section className="relative pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoTile
              icon={Phone}
              label="ফোন"
              value={SITE.phoneDisplay}
              href={`tel:${SITE.phone}`}
              accent="blue"
            />
            <InfoTile
              icon={Mail}
              label="ইমেইল"
              value={SITE.email}
              href={`mailto:${SITE.email}`}
              accent="blue"
            />
            <InfoTile
              icon={MapPin}
              label="অফিস"
              value={SITE.address}
              href="https://maps.google.com/?q=Kazi+Tower+South+Jatrabari+Dhaka"
              accent="red"
            />
            <InfoTile
              icon={Clock}
              label="সময়সূচী"
              value={`${SITE.hours} · ${SITE.weeklyOff}`}
              accent="ash"
            />
          </div>
        </div>
      </section>

      {/* Existing rich contact form, reused as-is */}
      <Contact />
    </>
  );
}

type Accent = "red" | "blue" | "ash";
const ACCENT_BG: Record<Accent, string> = {
  red: "bg-brand-red text-white",
  blue: "bg-brand-blue text-white",
  ash: "bg-brand-ash text-fg",
};

function InfoTile({
  icon: Icon,
  label,
  value,
  href,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  accent: Accent;
}) {
  const Wrapper = (href ? "a" : "div") as "a" | "div";
  return (
    <Wrapper
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="card p-5 group flex items-start gap-4 hover:scale-[1.01] transition-transform"
    >
      <div
        className={`shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl ${ACCENT_BG[accent]} shadow-md`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          {label}
        </div>
        <div className="mt-1 text-sm font-semibold text-fg break-words">
          {value}
        </div>
      </div>
    </Wrapper>
  );
}
