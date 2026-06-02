/** Bilingual foundation.
 *
 *  The site ships in TWO fully-separate versions:
 *    • Bengali  — the DEFAULT, at the root domain (`/`, `/blog`, …)
 *    • English  — under the `/en` prefix (`/en`, `/en/blog`, …)
 *
 *  Rule (per the owner): an English page shows NO Bengali and a Bengali
 *  page shows NO English — EXCEPT the official application forms, whose
 *  content stays Bengali in both versions (they mirror real paper forms).
 *
 *  This module is the single source of truth for:
 *    • the Locale type + helpers to add/strip the `/en` prefix
 *    • the UI-string dictionary (navbar, footer, buttons, common chrome)
 *
 *  Page CONTENT (divisions, projects, blog, story) carries its English
 *  text alongside the Bengali in src/lib/site.ts etc.; this file holds
 *  the reusable interface strings. */

export type Locale = "bn" | "en";

export const LOCALES: Locale[] = ["bn", "en"];
export const DEFAULT_LOCALE: Locale = "bn";

/** Strip a leading `/en` (or `/en/...`) → the locale-neutral path. */
export function stripLocale(pathname: string): { locale: Locale; rest: string } {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.slice(3) || "/";
    return { locale: "en", rest };
  }
  return { locale: "bn", rest: pathname || "/" };
}

/** Build the href for `path` in `locale` (bn = root, en = /en prefix). */
export function localizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean === "/" ? "/en" : `/en${clean}`;
  return clean;
}

/** Swap the current path to the other locale (used by the switcher). */
export function swapLocale(pathname: string, to: Locale): string {
  const { rest } = stripLocale(pathname);
  return localizedPath(rest, to);
}

/** Reusable UI / chrome strings. Page content lives with the data. */
type Dict = {
  // nav labels (keyed by NAV item id)
  nav: Record<string, string>;
  // common buttons + chrome
  login: string;
  signup: string;
  call: string;
  menu: string;
  openMenu: string;
  closeMenu: string;
  langName: string; // this locale's own name, for the switcher
  footer: {
    brand: string;
    tagline: string;
    about: string;
    follow: string;
    quickLinks: string;
    contact: string;
    rights: string;
  };
};

export const DICT: Record<Locale, Dict> = {
  bn: {
    nav: {
      home: "হোম",
      divisions: "বিভাগ",
      projects: "প্রকল্প",
      forms: "ফর্ম",
      gallery: "গ্যালারি",
      partner: "পার্টনার হোন",
      leaderboard: "লিডারবোর্ড",
      team: "টিম",
      story: "পেছনের গল্প",
      blog: "ব্লগ",
      contact: "যোগাযোগ",
    },
    login: "লগইন",
    signup: "সাইন আপ",
    call: "কল করুন",
    menu: "মেনু",
    openMenu: "মেনু খুলুন",
    closeMenu: "মেনু বন্ধ করুন",
    langName: "বাংলা",
    footer: {
      brand: "প্রমিস সিটি",
      tagline: "স্বপ্ন যেখানে বাস্তব",
      about:
        "১৫+ বছর ধরে ঢাকার মানুষকে সেবা দিয়ে আসছি — রিয়েল এস্টেট, নির্মাণ, সঞ্চয়, হজ্জ ও ডিজাইন।",
      follow: "অনুসরণ করুন",
      quickLinks: "দ্রুত লিঙ্ক",
      contact: "যোগাযোগ",
      rights: "সর্বস্বত্ব সংরক্ষিত।",
    },
  },
  en: {
    nav: {
      home: "Home",
      divisions: "Divisions",
      projects: "Projects",
      forms: "Forms",
      gallery: "Gallery",
      partner: "Become a Partner",
      leaderboard: "Leaderboard",
      team: "Team",
      story: "Our Story",
      blog: "Blog",
      contact: "Contact",
    },
    login: "Login",
    signup: "Sign Up",
    call: "Call Now",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    langName: "English",
    footer: {
      brand: "Promise City",
      tagline: "Where dreams come true",
      about:
        "Serving the people of Dhaka for 15+ years — real estate, construction, savings, Hajj and design.",
      follow: "Follow us",
      quickLinks: "Quick Links",
      contact: "Contact",
      rights: "All rights reserved.",
    },
  },
};
