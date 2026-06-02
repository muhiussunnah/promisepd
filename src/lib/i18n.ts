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
  home: {
    detailsBtn: string;
    aboutBtn: string;
    autoRotate: string;
    divisionWord: string;
    viewDivision: string;
    trustChips: string[];
    fromPrice: string;
    about: { eyebrow: string; headA: string; headB: string; body1: string; body2: string };
    divisions: { eyebrow: string; headA: string; headB: string; sub: string };
    projects: { eyebrow: string; headA: string; headB: string; sub: string };
    why: { eyebrow: string; headA: string; headB: string };
    testimonials: { eyebrow: string; headA: string; headB: string };
  };
  contact: {
    eyebrow: string;
    headA: string;
    headB: string;
    sub: string;
    labelPhone: string;
    labelEmail: string;
    labelOffice: string;
    labelHours: string;
    fName: string;
    phName: string;
    fEmail: string;
    fPhone: string;
    phPhone: string;
    fInterest: string;
    fMessage: string;
    phMessage: string;
    send: string;
    sending: string;
    consent: string;
    ok: string;
    err: string;
  };
  newsletter: {
    headA: string;
    headB: string;
    sub: string;
    placeholder: string;
    subscribe: string;
    subscribing: string;
    subscribed: string;
    perks: string[];
  };
  divDetail: {
    backToDivisions: string;
    consult: string;
    otherDivisions: string;
    aboutEyebrow: string;
    aboutSuffix: string;
    featEyebrow: string;
    featHeadA: string;
    featHeadB: string;
    projEyebrow: string;
    projHeadA: string;
    projHeadB: string;
    ctaSuffix: string;
    ctaMore: string;
    ctaSub: string;
    sendMsg: string;
    prevDiv: string;
    nextDiv: string;
  };
  auth: {
    loginH: string;
    loginHb: string;
    loginSub: string;
    signupH: string;
    signupHb: string;
    signupSub: string;
    fullName: string;
    phName: string;
    loginId: string;
    mobile: string;
    mobileHint: string;
    emailOrUser: string;
    phEmailOrUser: string;
    password: string;
    remember: string;
    forgot: string;
    processing: string;
    loginBtn: string;
    signupBtn: string;
    noAccount: string;
    signupLink: string;
    haveAccount: string;
    loginLink: string;
    pwHide: string;
    pwShow: string;
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
    home: {
      detailsBtn: "বিস্তারিত দেখুন",
      aboutBtn: "আমাদের সম্পর্কে",
      autoRotate: "স্বয়ংক্রিয়ভাবে পরিবর্তিত হয়",
      divisionWord: "বিভাগ",
      viewDivision: "বিভাগটি দেখুন",
      trustChips: ["আইনি নিরাপত্তা", "গুণগত নির্মাণ", "প্রিমিয়াম এলাকা", "নমনীয় কিস্তি"],
      fromPrice: "শুরু",
      about: {
        eyebrow: "আমাদের গল্প",
        headA: "আমরা শুধু ভবন তৈরি করি না।",
        headB: "প্রতিশ্রুতি গড়ি।",
        body1:
          "২০১০ সাল থেকে প্রমিস গ্রুপ ঢাকার মাটিতে নিঃশব্দে এক অবিচল শক্তি — পরিবারগুলোকে এমন বাড়িতে পৌঁছে দিচ্ছি যা তাঁদের জীবন, বাজেট ও ভবিষ্যতের সাথে মেলে।",
        body2:
          "আজ আমরা ৫টি বিভাগে কাজ করি — প্রমিস সিটি (রিয়েল এস্টেট), আহবাব রিয়েল এস্টেট (নির্মাণ), প্রমিস ইন্টারন্যাশনাল (সঞ্চয়), আহবাব ট্রাভেলস (হজ্জ/উমরাহ), এবং ইঞ্জিনিয়ারিং ও ইন্টেরিয়র ডিজাইন।",
      },
      divisions: {
        eyebrow: "আমাদের বিভাগ",
        headA: "৫টি বিভাগ —",
        headB: "এক ছাদের নিচে।",
        sub: "প্রমিস গ্রুপের পাঁচটি মূল ব্যবসায়িক বিভাগ — রিয়েল এস্টেট, নির্মাণ, সঞ্চয়, হজ্জ এবং ডিজাইন। প্রতিটি বিভাগে আমরা সেরাটাই দিই।",
      },
      projects: {
        eyebrow: "চলমান প্রকল্প",
        headA: "যেখানে মানুষ",
        headB: "পরবর্তী ঠিকানা গড়ছে।",
        sub: "বাছাইকৃত সাইট, স্বচ্ছ মূল্য, নমনীয় পরিকল্পনা। নিচের প্রতিটি প্রকল্প বাস্তব, চলমান এবং আজই বুকিংযোগ্য।",
      },
      why: {
        eyebrow: "কেন প্রমিস PPD",
        headA: "যে কারণে মানুষ",
        headB: "আমাদের বেছে নেয়।",
      },
      testimonials: {
        eyebrow: "বাস্তব কণ্ঠ",
        headA: "আমাদের পরিবার",
        headB: "যা বলে।",
      },
    },
    contact: {
      eyebrow: "যোগাযোগ",
      headA: "চলুন খুঁজে নিই",
      headB: "আপনার পরবর্তী বাড়ি।",
      sub: "একটি বার্তা পাঠান — আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করবো।",
      labelPhone: "ফোন",
      labelEmail: "ইমেইল",
      labelOffice: "অফিস",
      labelHours: "সময়",
      fName: "আপনার নাম",
      phName: "পূর্ণ নাম",
      fEmail: "ইমেইল",
      fPhone: "ফোন (ঐচ্ছিক)",
      phPhone: "+৮৮০ ১XXX-XXXXXX",
      fInterest: "আগ্রহের বিষয়",
      fMessage: "বার্তা",
      phMessage: "আপনি কী খুঁজছেন একটু লিখুন...",
      send: "বার্তা পাঠান",
      sending: "পাঠানো হচ্ছে...",
      consent: "ফর্ম জমা দিয়ে আপনি আমাদের যোগাযোগ করার অনুমতি দিচ্ছেন।",
      ok: "ধন্যবাদ — আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করবো।",
      err: "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।",
    },
    newsletter: {
      headA: "আপডেট পেতে",
      headB: "যুক্ত থাকুন।",
      sub: "নতুন প্রকল্প, কিস্তি অফার ও প্রি-লঞ্চ সুবিধার খবর সবার আগে আপনার ইনবক্সে পৌঁছে দেবো — কোনো স্প্যাম নেই।",
      placeholder: "you@example.com",
      subscribe: "সাবস্ক্রাইব",
      subscribing: "পাঠানো হচ্ছে...",
      subscribed: "সাবস্ক্রাইব হয়েছে",
      perks: ["নতুন প্রকল্প", "কিস্তি অফার", "প্রি-লঞ্চ সুবিধা"],
    },
    divDetail: {
      backToDivisions: "আমাদের বিভাগ",
      consult: "পরামর্শ নিন",
      otherDivisions: "অন্যান্য বিভাগ",
      aboutEyebrow: "বিভাগ পরিচিতি",
      aboutSuffix: "সম্পর্কে",
      featEyebrow: "আমরা যা দিই",
      featHeadA: "এই বিভাগের",
      featHeadB: "সেবা ও সুবিধা",
      projEyebrow: "চলমান প্রকল্প",
      projHeadA: "প্রমিস সিটির",
      projHeadB: "প্রকল্পসমূহ",
      ctaSuffix: "সম্পর্কে",
      ctaMore: "আরও জানুন",
      ctaSub: "আমাদের সাথে সরাসরি কথা বলুন — আপনার প্রয়োজন বুঝে সঠিক সমাধান দেবো।",
      sendMsg: "বার্তা পাঠান",
      prevDiv: "পূর্ববর্তী বিভাগ",
      nextDiv: "পরবর্তী বিভাগ",
    },
    auth: {
      loginH: "স্বাগতম",
      loginHb: "ফিরে।",
      loginSub: "মোবাইল নম্বর ও পাসওয়ার্ড দিয়ে দ্রুত লগইন করুন।",
      signupH: "আপনার",
      signupHb: "যাত্রা শুরু",
      signupSub: "শুধু নাম + মোবাইল + পাসওয়ার্ড — এক মিনিটেই অ্যাকাউন্ট তৈরি।",
      fullName: "পূর্ণ নাম",
      phName: "যেমন: কামরুল হাসান",
      loginId: "মোবাইল / ইউজারনেম / ইমেইল",
      mobile: "মোবাইল নম্বর",
      mobileHint: "শুধু মোবাইল + পাসওয়ার্ড দিয়েই দ্রুত লগইন করতে পারবেন।",
      emailOrUser: "ইমেইল বা ইউজারনেম (ঐচ্ছিক)",
      phEmailOrUser: "you@example.com  অথবা  kamrul95",
      password: "পাসওয়ার্ড",
      remember: "আমাকে মনে রাখুন",
      forgot: "পাসওয়ার্ড ভুলে গেছেন?",
      processing: "প্রক্রিয়াধীন...",
      loginBtn: "লগইন করুন",
      signupBtn: "অ্যাকাউন্ট তৈরি করুন",
      noAccount: "অ্যাকাউন্ট নেই?",
      signupLink: "সাইন আপ করুন →",
      haveAccount: "আগে থেকেই অ্যাকাউন্ট আছে?",
      loginLink: "লগইন করুন →",
      pwHide: "পাসওয়ার্ড লুকান",
      pwShow: "পাসওয়ার্ড দেখান",
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
    home: {
      detailsBtn: "View details",
      aboutBtn: "About us",
      autoRotate: "Auto-rotating",
      divisionWord: "Division",
      viewDivision: "View division",
      trustChips: ["Legal security", "Quality build", "Premium areas", "Flexible instalments"],
      fromPrice: "From",
      about: {
        eyebrow: "Our Story",
        headA: "We don't just build buildings.",
        headB: "We build promises.",
        body1:
          "Since 2010, Promise Group has been a quiet, steady force on Dhaka's soil — delivering families homes that fit their life, budget and future.",
        body2:
          "Today we work across 5 divisions — Promise City (real estate), Ahbab Real Estate (construction), Promise International (savings), Ahbab Travels (Hajj/Umrah), and Engineering & Interior Design.",
      },
      divisions: {
        eyebrow: "Our Divisions",
        headA: "5 divisions —",
        headB: "under one roof.",
        sub: "Promise Group's five core business divisions — real estate, construction, savings, Hajj and design. In each, we give our very best.",
      },
      projects: {
        eyebrow: "Ongoing Projects",
        headA: "Where people build",
        headB: "their next address.",
        sub: "Curated sites, transparent pricing, flexible plans. Every project below is real, ongoing and bookable today.",
      },
      why: {
        eyebrow: "Why PromisePD",
        headA: "The reasons people",
        headB: "choose us.",
      },
      testimonials: {
        eyebrow: "Real voices",
        headA: "What our family",
        headB: "says.",
      },
    },
    contact: {
      eyebrow: "Contact",
      headA: "Let's find",
      headB: "your next home.",
      sub: "Send us a message — we'll get back to you very soon.",
      labelPhone: "Phone",
      labelEmail: "Email",
      labelOffice: "Office",
      labelHours: "Hours",
      fName: "Your name",
      phName: "Full name",
      fEmail: "Email",
      fPhone: "Phone (optional)",
      phPhone: "+880 1XXX-XXXXXX",
      fInterest: "Interested in",
      fMessage: "Message",
      phMessage: "Tell us a little about what you're looking for...",
      send: "Send message",
      sending: "Sending...",
      consent: "By submitting this form you allow us to contact you.",
      ok: "Thank you — we'll get back to you very soon.",
      err: "Something went wrong, please try again.",
    },
    newsletter: {
      headA: "Stay in the loop",
      headB: "for updates.",
      sub: "New projects, instalment offers and pre-launch perks — delivered to your inbox first. No spam, ever.",
      placeholder: "you@example.com",
      subscribe: "Subscribe",
      subscribing: "Sending...",
      subscribed: "Subscribed",
      perks: ["New projects", "Instalment offers", "Pre-launch perks"],
    },
    divDetail: {
      backToDivisions: "Our Divisions",
      consult: "Get a consultation",
      otherDivisions: "Other divisions",
      aboutEyebrow: "About this division",
      aboutSuffix: "",
      featEyebrow: "What we offer",
      featHeadA: "This division's",
      featHeadB: "services & benefits",
      projEyebrow: "Ongoing Projects",
      projHeadA: "Promise City",
      projHeadB: "projects",
      ctaSuffix: "",
      ctaMore: "Learn more",
      ctaSub: "Talk to us directly — we'll understand your needs and give you the right solution.",
      sendMsg: "Send message",
      prevDiv: "Previous division",
      nextDiv: "Next division",
    },
    auth: {
      loginH: "Welcome",
      loginHb: "back.",
      loginSub: "Log in quickly with your mobile number and password.",
      signupH: "Begin your",
      signupHb: "journey",
      signupSub: "Just name + mobile + password — create an account in a minute.",
      fullName: "Full name",
      phName: "e.g. Kamrul Hasan",
      loginId: "Mobile / username / email",
      mobile: "Mobile number",
      mobileHint: "Just mobile + password lets you log in fast.",
      emailOrUser: "Email or username (optional)",
      phEmailOrUser: "you@example.com  or  kamrul95",
      password: "Password",
      remember: "Remember me",
      forgot: "Forgot password?",
      processing: "Processing...",
      loginBtn: "Log in",
      signupBtn: "Create account",
      noAccount: "No account?",
      signupLink: "Sign up →",
      haveAccount: "Already have an account?",
      loginLink: "Log in →",
      pwHide: "Hide password",
      pwShow: "Show password",
    },
  },
};
