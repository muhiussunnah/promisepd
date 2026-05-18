/** Team / leadership data — drives /team and any "meet the people"
 *  card surface elsewhere on the site (CEO callout on /contact, etc.).
 *
 *  Photos live in /public.  Add a new headshot there (after running it
 *  through the image pipeline — see src/lib/image.ts and AGENTS.md)
 *  and append a TEAM_MEMBERS entry to surface them on the team page.
 */

export type TeamMember = {
  slug: string;
  name: string;
  nameEn: string;
  role: string;
  bio?: string;
  phone?: string;
  email?: string;
  /** Path under /public (already optimized to webp/jpg in the repo). */
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
    phone: "01910065136",
    email: "kamrulhasanfaridi95@gmail.com",
    photo: "/ceo.jpeg",
    accent: "blue",
  },
  {
    slug: "office-manager",
    name: "অফিস ম্যানেজার",
    nameEn: "Office Manager",
    role: "ম্যানেজার",
    bio: "দৈনন্দিন অপারেশন, ক্লায়েন্ট সেবা এবং অফিস সমন্বয়ের দায়িত্বে।",
    photo: "/manager.jpeg",
    accent: "red",
  },
];

/** Quick lookup for individual member pages or callouts. */
export function getTeamMember(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.slug === slug);
}
