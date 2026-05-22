/** Official application forms — each is an exact replica of the
 *  company's real PDF form. The blank PDF pages are rasterised to
 *  WebP (scripts/rasterize-forms.mjs → /public/forms/<slug>-p<n>.webp)
 *  and used as the form background; the applicant's typed values are
 *  overlaid at the coordinates below, then the whole thing is captured
 *  to a faithful PDF (client-side, so Bengali shapes correctly) and
 *  emailed to the office.
 *
 *  Coordinates are PERCENTAGES of the page image (top/left of the
 *  baseline where the value should sit), so they scale at any preview
 *  size. `size` is the font size in % of the page WIDTH. */

export type FormFieldType = "text" | "tel" | "email" | "number" | "date";

export type FormField = {
  key: string;
  label: string;
  type: FormFieldType;
  /** Section grouping for the data-entry UI. */
  group: string;
  required?: boolean;
  placeholder?: string;
  /** Overlay placement on the form image. */
  pos: {
    page: number; // 1-based page index
    top: number; // % from top (baseline)
    left: number; // % from left
    width: number; // % wide (text wraps/truncates within)
    size?: number; // font size as % of page width (default 1.4)
    align?: "left" | "center";
  };
};

export type FormDef = {
  slug: string;
  nameBn: string;
  shortBn: string;
  description: string;
  accent: "red" | "blue" | "ash";
  /** Ordered page background images (WebP). */
  pages: string[];
  /** True once fields are mapped + calibrated. */
  ready: boolean;
  fields: FormField[];
};

/** Shared default font size (% of page width). */
const S = 1.4;

export const FORMS: FormDef[] = [
  {
    slug: "flat-allocation",
    nameBn: "ফ্ল্যাট বরাদ্দের আবেদন ফরম",
    shortBn: "ফ্ল্যাট বরাদ্দ",
    description:
      "আহবাব রিয়েল এস্টেটের ফ্ল্যাট বুকিং ও বরাদ্দের জন্য আবেদন ফরম — আবেদনকারী, নমিনি ও অফিসিয়াল তথ্যসহ।",
    accent: "blue",
    pages: ["/forms/flat-allocation-p1.webp", "/forms/flat-allocation-p2.webp"],
    ready: true,
    fields: [
      // ── Applicant ───────────────────────────────────────────
      { key: "file_no", label: "ফাইল নং", type: "text", group: "আবেদনকারীর তথ্য", pos: { page: 1, top: 16.6, left: 14, width: 20, size: S } },
      { key: "name", label: "নাম", type: "text", group: "আবেদনকারীর তথ্য", required: true, pos: { page: 1, top: 19.2, left: 11.5, width: 40, size: S } },
      { key: "profession", label: "পেশা", type: "text", group: "আবেদনকারীর তথ্য", pos: { page: 1, top: 19.2, left: 61, width: 16, size: S } },
      { key: "blood", label: "রক্তের গ্রুপ", type: "text", group: "আবেদনকারীর তথ্য", pos: { page: 1, top: 19.2, left: 87, width: 11, size: S } },
      { key: "father", label: "পিতা/স্বামী", type: "text", group: "আবেদনকারীর তথ্য", pos: { page: 1, top: 21.7, left: 13, width: 38, size: S } },
      { key: "mother", label: "মাতা", type: "text", group: "আবেদনকারীর তথ্য", pos: { page: 1, top: 21.7, left: 56, width: 40, size: S } },
      { key: "present_addr", label: "বর্তমান ঠিকানা", type: "text", group: "আবেদনকারীর তথ্য", pos: { page: 1, top: 24.3, left: 18, width: 78, size: S } },
      { key: "permanent_addr", label: "স্থায়ী ঠিকানা", type: "text", group: "আবেদনকারীর তথ্য", pos: { page: 1, top: 26.9, left: 15, width: 81, size: S } },
      { key: "dob", label: "জন্ম তারিখ", type: "text", group: "আবেদনকারীর তথ্য", placeholder: "দিন/মাস/বছর", pos: { page: 1, top: 29.5, left: 16, width: 14, size: S } },
      { key: "nid", label: "NID/পাসপোর্ট নং", type: "text", group: "আবেদনকারীর তথ্য", pos: { page: 1, top: 29.5, left: 47, width: 40, size: 1.5, align: "center" } },
      { key: "mobile", label: "মোবাইল নং", type: "tel", group: "আবেদনকারীর তথ্য", required: true, pos: { page: 1, top: 32.1, left: 17, width: 28, size: 1.5, align: "center" } },
      { key: "email", label: "ই-মেইল", type: "email", group: "আবেদনকারীর তথ্য", pos: { page: 1, top: 32.1, left: 60, width: 36, size: S } },

      // ── Nominee ─────────────────────────────────────────────
      { key: "n_name", label: "নমিনির নাম", type: "text", group: "নমিনির তথ্য", pos: { page: 1, top: 38.6, left: 11, width: 38, size: S } },
      { key: "n_profession", label: "নমিনির পেশা", type: "text", group: "নমিনির তথ্য", pos: { page: 1, top: 38.6, left: 61, width: 16, size: S } },
      { key: "n_blood", label: "নমিনির রক্তের গ্রুপ", type: "text", group: "নমিনির তথ্য", pos: { page: 1, top: 41.1, left: 14, width: 11, size: S } },
      { key: "n_relation", label: "সম্পর্ক", type: "text", group: "নমিনির তথ্য", pos: { page: 1, top: 41.1, left: 35, width: 16, size: S } },
      { key: "n_dob", label: "নমিনির জন্ম তারিখ", type: "text", group: "নমিনির তথ্য", pos: { page: 1, top: 41.1, left: 65, width: 12, size: S } },
      { key: "n_father", label: "নমিনির পিতা/স্বামী", type: "text", group: "নমিনির তথ্য", pos: { page: 1, top: 43.7, left: 13, width: 30, size: S } },
      { key: "n_mother", label: "নমিনির মাতা", type: "text", group: "নমিনির তথ্য", pos: { page: 1, top: 43.7, left: 53, width: 24, size: S } },
      { key: "n_present_addr", label: "নমিনির বর্তমান ঠিকানা", type: "text", group: "নমিনির তথ্য", pos: { page: 1, top: 46.2, left: 18, width: 58, size: S } },
      { key: "n_permanent_addr", label: "নমিনির স্থায়ী ঠিকানা", type: "text", group: "নমিনির তথ্য", pos: { page: 1, top: 48.8, left: 15, width: 61, size: S } },
      { key: "n_nid", label: "নমিনির NID/পাসপোর্ট নং", type: "text", group: "নমিনির তথ্য", pos: { page: 1, top: 51.3, left: 22, width: 50, size: 1.5, align: "center" } },
      { key: "n_mobile", label: "নমিনির মোবাইল নং", type: "tel", group: "নমিনির তথ্য", pos: { page: 1, top: 54.3, left: 17, width: 50, size: 1.5, align: "center" } },

      // ── Official ────────────────────────────────────────────
      { key: "ref", label: "রেফারেন্স", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 62.4, left: 13, width: 30, size: S } },
      { key: "project", label: "প্রজেক্টের নাম", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 62.4, left: 53, width: 43, size: S } },
      { key: "location", label: "অবস্থান", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 65.0, left: 15, width: 23, size: S } },
      { key: "flat_size", label: "ফ্ল্যাট সাইজ", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 65.0, left: 45, width: 14, size: S } },
      { key: "block", label: "ব্লক নং", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 65.0, left: 67, width: 8, size: S } },
      { key: "road", label: "রোড নং", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 65.0, left: 85, width: 11, size: S } },
      { key: "plot", label: "প্লট নং", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 67.5, left: 13, width: 14, size: S } },
      { key: "flat_no", label: "ফ্ল্যাট নং", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 67.5, left: 37, width: 10, size: S } },
      { key: "payment_type", label: "পেমেন্টের ধরণ", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 67.5, left: 60, width: 12, size: S } },
      { key: "onetime", label: "এককালীন", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 67.5, left: 83, width: 13, size: S } },
      { key: "installment", label: "কিস্তি", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 70.1, left: 13, width: 14, size: S } },
      { key: "booking_money", label: "বুকিং মানি", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 70.1, left: 41, width: 16, size: S } },
      { key: "monthly", label: "প্রতি মাসের কিস্তি", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 70.1, left: 73, width: 23, size: S } },
      { key: "total", label: "মোট মূল্য", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 72.6, left: 16, width: 26, size: S } },
      { key: "in_words", label: "কথায়", type: "text", group: "অফিসিয়াল তথ্য", pos: { page: 1, top: 72.6, left: 52, width: 44, size: S } },
    ],
  },

  // The remaining five share the same pipeline; field maps are added
  // (and calibrated) one by one. Pages already rasterised + listed so
  // visitors can preview the official form immediately.
  {
    slug: "investment",
    nameBn: "বিনিয়োগ ফরম",
    shortBn: "বিনিয়োগ",
    description: "প্রমিস ইন্টারন্যাশনালে সঞ্চয় ও বিনিয়োগের আবেদন ফরম।",
    accent: "blue",
    pages: ["/forms/investment-p1.webp", "/forms/investment-p2.webp"],
    ready: false,
    fields: [],
  },
  {
    slug: "promise-city",
    nameBn: "প্রমিস সিটি ফরম",
    shortBn: "প্রমিস সিটি",
    description: "প্রমিস সিটি প্রকল্পে জমি/প্লট বুকিংয়ের আবেদন ফরম।",
    accent: "red",
    pages: ["/forms/promise-city-p1.webp", "/forms/promise-city-p2.webp"],
    ready: false,
    fields: [],
  },
  {
    slug: "fuzala-tower",
    nameBn: "ফুজালা টাওয়ার ফরম",
    shortBn: "ফুজালা টাওয়ার",
    description: "ফুজালা টাওয়ারে ফ্ল্যাট/শেয়ার বুকিংয়ের আবেদন ফরম।",
    accent: "red",
    pages: ["/forms/fuzala-tower-p1.webp", "/forms/fuzala-tower-p2.webp"],
    ready: false,
    fields: [],
  },
  {
    slug: "fuzala-complex",
    nameBn: "ফুজালা কমপ্লেক্স ফরম",
    shortBn: "ফুজালা কমপ্লেক্স",
    description: "ফুজালা কমপ্লেক্সে ফ্ল্যাট বুকিংয়ের আবেদন ফরম।",
    accent: "blue",
    pages: ["/forms/fuzala-complex-p1.webp", "/forms/fuzala-complex-p2.webp"],
    ready: false,
    fields: [],
  },
  {
    slug: "marketing-director",
    nameBn: "মার্কেটিং ডিরেক্টর ফরম",
    shortBn: "মার্কেটিং ডিরেক্টর",
    description: "প্রমিস গ্রুপের মার্কেটিং ডিরেক্টর হিসেবে যোগদানের আবেদন ফরম।",
    accent: "ash",
    pages: ["/forms/marketing-director-p1.webp", "/forms/marketing-director-p2.webp"],
    ready: false,
    fields: [],
  },
];

export function getForm(slug: string): FormDef | undefined {
  return FORMS.find((f) => f.slug === slug);
}
