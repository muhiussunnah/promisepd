/** Partner program data — commission rules, point system, awards.
 *  All numbers reflect the 2026 marketing-rules update issued by the
 *  Promise board, effective 1 January 2026 – 31 December 2026.
 *
 *  Pure data, no runtime imports, so the same module is consumable from
 *  Server Components and the interactive calculator (client). */

export type PartnerCommission = {
  id: string;
  nameBn: string;
  nameEn: string;
  /** Bangla unit phrase shown next to the commission — e.g. "প্রতি শেয়ার". */
  unit: string;
  /** Commission in BDT per single unit. */
  commission: number;
  /** Points awarded per single unit (0 for Hajj/Umrah passengers). */
  points: number;
  description: string;
  accent: "red" | "blue" | "ash";
};

/** Every commission line item — drives the rules grid + calculator counters. */
export const PARTNER_COMMISSIONS: PartnerCommission[] = [
  {
    id: "fuzala-tower",
    nameBn: "ফুজালা টাওয়ার শেয়ার",
    nameEn: "Fuzala Tower Share",
    unit: "প্রতি শেয়ার",
    commission: 20000,
    points: 1,
    description:
      "কোম্পানির হাতে সীমিত কিছু শেয়ার — প্রতিটি সেলস-এ সর্বোচ্চ কমিশন।",
    accent: "red",
  },
  {
    id: "fuzala-complex",
    nameBn: "ফুজালা কমপ্লেক্স শেয়ার",
    nameEn: "Fuzala Complex Share",
    unit: "প্রতি শেয়ার",
    commission: 15000,
    points: 1,
    description: "ফুজালা কমপ্লেক্সের শেয়ার সেলস-এ আকর্ষণীয় কমিশন।",
    accent: "blue",
  },
  {
    id: "land",
    nameBn: "জমি",
    nameEn: "Land",
    unit: "প্রতি শতাংশ",
    commission: 10000,
    points: 1,
    description: "প্রতি শতাংশ জমি সেলস-এ নিশ্চিত কমিশন।",
    accent: "ash",
  },
  {
    id: "ahbab-flat",
    nameBn: "আহবাব রিয়েল এস্টেট ফ্ল্যাট",
    nameEn: "Ahbab Real Estate Flat",
    unit: "প্রতি ফ্ল্যাট",
    commission: 50000,
    points: 5,
    description: "একটি ফ্ল্যাট সেলস = এক মাসের চমৎকার আয়।",
    accent: "red",
  },
  {
    id: "officer-recruit",
    nameBn: "অ্যাক্টিভ মার্কেটিং অফিসার নিয়োগ",
    nameEn: "Active Marketing Officer Recruitment",
    unit: "প্রতি অফিসার",
    commission: 20000,
    points: 2,
    description:
      "মার্কেটিং ডিরেক্টর হিসেবে প্রতিটি অ্যাক্টিভ অফিসার নিয়োগে।",
    accent: "blue",
  },
  {
    id: "umrah",
    nameBn: "উমরাহ যাত্রী",
    nameEn: "Umrah Passenger",
    unit: "প্রতি যাত্রী",
    commission: 5000,
    points: 0,
    description: "প্রতিটি উমরাহ যাত্রী বুকিং-এ অতিরিক্ত আয়।",
    accent: "ash",
  },
  {
    id: "hajj",
    nameBn: "হজ্জ যাত্রী",
    nameEn: "Hajj Passenger",
    unit: "প্রতি যাত্রী",
    commission: 10000,
    points: 0,
    description: "প্রতিটি হজ্জ যাত্রী বুকিং-এ আয়।",
    accent: "red",
  },
];

/** Standalone marketing rules — promotion thresholds, attendance perks, etc.
 *  These don't fit into the per-sale commission table above. */
export const PARTNER_RULES: {
  tag: string;
  title: string;
  body: string;
}[] = [
  {
    tag: "অফিস উপস্থিতি",
    title: "ডিরেক্টরদের জন্য সাপ্তাহিক ১ দিন অফিস",
    body: "শুধু মার্কেটিং ডিরেক্টরগণকে সপ্তাহে কমপক্ষে একদিন (সকাল ১০টা – বিকেল ৫টা) অফিস করতে হবে। অফিসের যাতায়াত খরচ, মোবাইল রিচার্জ ও লাঞ্চের ব্যবস্থা প্রমিসের পক্ষ থেকে — আলহামদুলিল্লাহ।",
  },
  {
    tag: "প্রমোশন",
    title: "৫ জন অফিসার = ১ লক্ষ + ডিরেক্টর পদ",
    body: "মার্কেটিং অফিসার কর্তৃক ৫ জন অ্যাকটিভ মার্কেটিং অফিসার নিয়োগে ১,০০,০০০ টাকা কমিশনসহ সরাসরি মার্কেটিং ডিরেক্টর পদে পদায়ন।",
  },
  {
    tag: "অ্যাক্টিভ যোগ্যতা",
    title: "নূন্যতম ৫ পয়েন্টে অ্যাক্টিভ অফিসার স্বীকৃতি",
    body: "সেলসে নূন্যতম ৫ পয়েন্ট অর্জন করলে অ্যাকটিভ মার্কেটিং অফিসার হিসেবে গন্য হবেন।",
  },
  {
    tag: "জমার শর্ত",
    title: "ক্লায়েন্টের জমা = কমিশনের কমপক্ষে ১০x",
    body: "কমিশন পেতে অবশ্যই লক্ষণীয় — ক্লায়েন্টের উক্ত প্রজেক্টে জমা টাকার ১০% পরিমাণ-এর সমান বা তার কম কমিশন হতে হবে।",
  },
];

/** Points table — both calculator-driving and informational rows. */
export const POINT_RULES: { item: string; points: string }[] = [
  { item: "ফুজালা টাওয়ার (প্রতি শেয়ার)", points: "১ পয়েন্ট" },
  { item: "ফুজালা কমপ্লেক্স (প্রতি শেয়ার)", points: "১ পয়েন্ট" },
  { item: "প্রতি শতাংশ জমি", points: "১ পয়েন্ট" },
  { item: "অ্যাক্টিভ মার্কেটিং অফিসার নিয়োগ", points: "২ পয়েন্ট" },
  { item: "আহবাব রিয়েল এস্টেট ফ্ল্যাট", points: "৫ পয়েন্ট" },
  {
    item: "প্রমিস সিটি পেইজ পোস্টে লাইক/কমেন্ট/শেয়ার (৭২ ঘণ্টার মধ্যে)",
    points: ".২০ পয়েন্ট/পোস্ট",
  },
  {
    item: "মিটিংয়ে সময়মতো উপস্থিতি (সময়ে-সময়ে ঘোষিত)",
    points: "ঘোষণা অনুযায়ী",
  },
];

/** Two annual rewards — used by hero hook + calculator progress bars. */
export const PARTNER_AWARDS = [
  {
    threshold: 20,
    titleBn: "ফ্রি বিদেশ ট্যুর",
    titleEn: "Free Foreign Tour",
    description: "২০ পয়েন্ট অর্জনে কোম্পানির খরচে আন্তর্জাতিক ট্যুর।",
    accent: "blue" as const,
  },
  {
    threshold: 25,
    titleBn: "ফ্রি উমরাহ",
    titleEn: "Free Umrah",
    description: "২৫ পয়েন্ট অর্জনে আল্লাহর ঘরে ফ্রি যাত্রা।",
    accent: "red" as const,
  },
];

/** The annual point-accumulation window. */
export const PARTNER_PERIOD = {
  startBn: "১ জানুয়ারি ২০২৬",
  endBn: "৩১ ডিসেম্বর ২০২৬",
};

/** Headline hook for the hero — the "matro 25 jonke refer" pitch.
 *  25 active officer recruits × 20,000 = 5,00,000 in cash + free Umrah
 *  (since 25 × 2 points = 50, well above the 25-point Umrah threshold).
 *  We frame the cash conservatively at 3,75,000 to be safe — the actual
 *  payout can be higher depending on Director-promotion timing. */
export const PARTNER_HEADLINE = {
  referralsTarget: 25,
  cashMinBn: "৩,৭৫,০০০",
  umrahValueBn: "১,৫০,০০০",
  totalValueBn: "৫,২৫,০০০",
};

/** Bengali (bn-BD) digit + lakh/crore grouping formatter — used everywhere
 *  numbers display in the partner UI. Created once, reused. */
export const bnNumber = (n: number) =>
  new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 0 }).format(n);
