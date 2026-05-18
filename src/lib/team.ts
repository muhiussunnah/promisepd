/** Team / leadership data — drives /team and any "meet the people"
 *  card surface elsewhere on the site (CEO callout on /contact, etc.).
 *
 *  Photos live in /public — all WebP per the MUST RULE in AGENTS.md.
 *  When adding a new headshot, run it through the image pipeline
 *  (`scripts/convert-headshots-to-webp.mjs` or `src/lib/image.ts`)
 *  first, then append a TEAM_MEMBERS entry.
 */

export type TeamMember = {
  slug: string;
  name: string;
  nameEn: string;
  role: string;
  bio?: string;
  phone?: string;
  email?: string;
  /** Path under /public — always .webp per the MUST RULE. */
  photo: string;
  /** Brand-coloured accent strip behind the photo card. */
  accent: "red" | "blue" | "ash";
  /** Optional social handles — rendered as small links under the card. */
  socials?: {
    facebook?: string;
    linkedin?: string;
    whatsapp?: string;
  };
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "kamrul-hasan",
    name: "কামরুল হাসান",
    nameEn: "Kamrul Hasan",
    role: "MD & CEO",
    bio: "প্রমিস গ্রুপের প্রতিষ্ঠাতা ও প্রধান পরিচালক। ১৫+ বছরের অভিজ্ঞতায় ঢাকার রিয়েল এস্টেট ইন্ডাস্ট্রিতে স্বচ্ছতা ও বিশ্বাসের নতুন মান গড়ে তুলেছেন।",
    phone: "+8801910065136",
    email: "kamrulhasanfaridi95@gmail.com",
    photo: "/ceo.webp",
    accent: "blue",
  },
  {
    slug: "office-manager",
    name: "অফিস ম্যানেজার",
    nameEn: "Office Manager",
    role: "Manager",
    bio: "দৈনন্দিন অপারেশন, ক্লায়েন্ট সেবা এবং অফিস সমন্বয়ের দায়িত্বে।",
    phone: "+8801910065137",
    email: "promisegroup2023@gmail.com",
    photo: "/manager.webp",
    accent: "red",
  },
  {
    slug: "mustaqeem-billah",
    name: "মুস্তাকীম বিল্লাহ",
    nameEn: "Mustaqeem Billah",
    role: "Development Support",
    bio: "এই ওয়েবসাইট ও ডিজিটাল ইকোসিস্টেমের পেছনের ইঞ্জিনিয়ার। সাইটের যেকোনো জায়গায় বাগ বা সমস্যা দেখলে সরাসরি তাঁকে রিপোর্ট করুন — দ্রুত সমাধান নিশ্চিত।",
    phone: "+8801767682381",
    email: "itsinjamul@gmail.com",
    photo: "/developer.webp",
    accent: "ash",
  },
];

/** Quick lookup for individual member pages or callouts. */
export function getTeamMember(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.slug === slug);
}

/** Shortcut used by error pages, "report a bug" buttons, and
 *  anywhere else that needs to surface the developer's contact
 *  details.  Pulled from TEAM_MEMBERS so there's one source of
 *  truth for Mustaqeem's phone / email / WhatsApp.
 *
 *  WhatsApp link uses wa.me with the country-code'd phone (no
 *  spaces, no '+') so it works from both web and mobile. */
const _dev = TEAM_MEMBERS.find((m) => m.slug === "mustaqeem-billah")!;

export const DEVELOPER = {
  ..._dev,
  whatsappUrl: `https://wa.me/${(_dev.phone ?? "").replace(/[^\d]/g, "")}`,
  /** Pre-filled mail link that captures the error context. */
  reportMailUrl: (subject = "Promise PPD — Site Issue Report", body = "") =>
    `mailto:${_dev.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
};
