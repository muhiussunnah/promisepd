export const SITE = {
  name: "Promise Proper Development Ltd.",
  nameBn: "প্রমিস প্রপার ডেভেলপমেন্ট লিমিটেড",
  shortName: "Promise PPD",
  tagline: "স্বপ্ন যেখানে বাস্তব",
  description:
    "ঢাকায় আবাসিক, বাণিজ্যিক ও বিনিয়োগযোগ্য সম্পত্তির জন্য আপনার বিশ্বস্ত অংশীদার।",
  phone: "+8801910065136",
  phoneDisplay: "+৮৮০ ১৯১০-০৬৫১৩৬",
  whatsapp: "8801910065136",
  email: "promisegroup2023@gmail.com",
  address:
    "১২৩/১/২ কাজী টাওয়ার, দক্ষিণ যাত্রাবাড়ী, ঢাকা-১২০৪, বাংলাদেশ",
  hours: "মঙ্গল – রবি · সকাল ৯টা – সন্ধ্যা ৬টা",
  weeklyOff: "সাপ্তাহিক ছুটি: সোমবার",
  facebook: "https://www.facebook.com/profile.php?id=100083894211030",
  founded: 2010,
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=100083894211030",
    youtube: "https://www.youtube.com/@PromiseCity",
    // Footer WhatsApp icon → the public broadcast channel.  (The
    // floating chat button uses SITE.whatsapp / wa.me for 1:1 chat.)
    whatsapp: "https://whatsapp.com/channel/0029VbCq2Gv47Xe5fUugZi1D",
    telegram: "https://t.me/promisegroup2026",
  },
  credit: {
    label: "Made by Mustaqeem Billah",
    url: "https://growthency.com/",
  },
};

export type Division = {
  slug: string;
  nameEn: string;
  nameBn: string;
  shortBn: string;
  tagline: string;
  heroTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  accent: "red" | "blue" | "ash" | "rb" | "ab" | "ar";
  features: {
    title: string;
    description: string;
    icon: string;
    /** 2 concrete sub-points shown as a mini bullet list on the card. */
    points: string[];
  }[];
  highlights: string[];
};

export const DIVISIONS: Division[] = [
  {
    slug: "promise-city",
    nameEn: "Promise City",
    nameBn: "প্রমিস সিটি",
    shortBn: "প্রমিস সিটি",
    tagline: "ঢাকার বুকে নিজের একটা ঠিকানা",
    heroTitle: "ভাড়ার ঘরে স্বপ্ন দেখা শেষ — এবার নিজের ঠিকানা।",
    description:
      "প্রমিস সিটির অধীনে আহবাব প্যালেস, ফুজালা টাওয়ার ও ফুজালা কমপ্লেক্স — যাচাইকৃত দলিল, নমনীয় কিস্তি ও সম্পূর্ণ আইনি নিরাপত্তার সাথে আপনার ভবিষ্যতের ঠিকানা।",
    longDescription:
      "প্রমিস সিটির অধীনে আমরা রিয়েল এস্টেট, ফ্ল্যাট, জমি এবং ল্যান্ডিং প্রপার্টি ব্যবসা পরিচালনা করি। আহবাব প্যালেস ১ ও ২, ফুজালা টাওয়ার, ফুজালা কমপ্লেক্স — সব আমাদের প্রমিস সিটির অধীনে।",
    icon: "Building2",
    accent: "red",
    features: [
      {
        title: "প্রিমিয়াম লোকেশনে ফ্ল্যাট",
        description:
          "ঢাকার বিকাশমান এলাকায় বাছাইকৃত প্রকল্পে আধুনিক অ্যাপার্টমেন্ট।",
        icon: "Building2",
        points: ["মূল সড়ক, স্কুল ও বাজারের কাছে", "১, ২ ও ৩ বেডরুমের ইউনিট"],
      },
      {
        title: "যাচাইকৃত জমি ও প্লট",
        description:
          "সম্পূর্ণ আইনি যাচাইসহ প্রিমিয়াম প্লট এবং ল্যান্ডিং প্রপার্টি।",
        icon: "MapPin",
        points: ["RS/BS খতিয়ান যাচাই করা", "নামজারিসহ হস্তান্তর"],
      },
      {
        title: "নমনীয় কিস্তি",
        description:
          "আপনার ক্যাশফ্লো অনুযায়ী মাসিক পরিকল্পনা — বাজেট না ভেঙে।",
        icon: "CreditCard",
        points: ["মাসিক / ত্রৈমাসিক প্ল্যান", "ব্যাংক লোন ছাড়াই ইন-হাউস কিস্তি"],
      },
      {
        title: "সম্পূর্ণ আইনি নিরাপত্তা",
        description:
          "যাচাইকৃত দলিল, নিবন্ধিত স্বাক্ষর, কোনো অস্পষ্টতা নেই।",
        icon: "ShieldCheck",
        points: ["রেজিস্ট্রি-প্রস্তুত দলিল", "অভিজ্ঞ আইনি দল"],
      },
    ],
    highlights: [
      "৫+ চলমান ও সম্পন্ন প্রকল্প",
      "ফ্ল্যাট, জমি ও বাণিজ্যিক স্পেস",
      "প্রিমিয়াম লোকেশন",
      "৩০০০+ সুখী পরিবার",
    ],
  },
  {
    slug: "ahbab-real-estate",
    nameEn: "Ahbab Real Estate",
    nameBn: "আহবাব রিয়েল এস্টেট",
    shortBn: "আহবাব রিয়েল এস্টেট",
    tagline: "নকশা থেকে চাবি — সম্পূর্ণ নির্মাণ সমাধান",
    heroTitle: "প্রতিটি ইট গাঁথা হয় আপনার বিশ্বাসের উপর।",
    description:
      "ফ্ল্যাট, বাড়ি ও বাণিজ্যিক ভবন — অভিজ্ঞ স্থপতি, কঠোর মান নিয়ন্ত্রণ এবং সময়মতো হস্তান্তরের নিশ্চয়তায় ৫০ বছর পরেও যে নির্মাণ দাঁড়িয়ে থাকবে।",
    longDescription:
      "আহবাব রিয়েল এস্টেটের মাধ্যমে আমরা ফ্ল্যাট, বাড়ি এবং সব ধরনের নির্মাণকাজ সম্পন্ন করি। নকশা থেকে চাবি হস্তান্তর পর্যন্ত — সম্পূর্ণ নির্মাণ সমাধান এক ছাদের নিচে।",
    icon: "Hammer",
    accent: "blue",
    features: [
      {
        title: "আবাসিক ভবন নির্মাণ",
        description:
          "আধুনিক বাড়ি, অ্যাপার্টমেন্ট ও পারিবারিক কমপ্লেক্স নির্মাণ।",
        icon: "Home",
        points: ["নকশা থেকে ফিনিশিং", "মান নিয়ন্ত্রিত নির্মাণসামগ্রী"],
      },
      {
        title: "বাণিজ্যিক নির্মাণ",
        description:
          "অফিস, দোকান এবং মিশ্র-ব্যবহারের ভবন নির্মাণ।",
        icon: "Store",
        points: ["অফিস, শো-রুম ও দোকান", "মিশ্র-ব্যবহার ভবন"],
      },
      {
        title: "রিনোভেশন ও সম্প্রসারণ",
        description:
          "পুরানো ভবন আধুনিকায়ন এবং সম্প্রসারণের কাজ।",
        icon: "Wrench",
        points: ["পুরোনো ভবন আধুনিকায়ন", "অতিরিক্ত ফ্লোর সংযোজন"],
      },
      {
        title: "নকশা থেকে নির্মাণ",
        description:
          "আর্কিটেকচার, স্ট্রাকচারাল ডিজাইন থেকে নির্মাণ — সবকিছু।",
        icon: "Ruler",
        points: ["আর্কিটেকচারাল ও স্ট্রাকচারাল ডিজাইন", "3D ভিজ্যুয়ালাইজেশন"],
      },
      {
        title: "মান নিয়ন্ত্রণ",
        description:
          "প্রতিটি ধাপে কঠোর গুণগত তদারকি ও অভিজ্ঞ ইঞ্জিনিয়ার।",
        icon: "Award",
        points: ["প্রতিটি ধাপে তদারকি", "অভিজ্ঞ ইঞ্জিনিয়ার দল"],
      },
    ],
    highlights: [
      "সম্পূর্ণ নির্মাণ সমাধান",
      "অভিজ্ঞ স্থপতি ও ইঞ্জিনিয়ার দল",
      "সময়মতো হস্তান্তর",
      "দীর্ঘস্থায়ী মান",
    ],
  },
  {
    slug: "promise-international",
    nameEn: "Promise International",
    nameBn: "প্রমিস ইন্টারন্যাশনাল",
    shortBn: "প্রমিস ইন্টারন্যাশনাল",
    tagline: "১০,০০০ থেকে শুরু · যেকোনো সময় উত্তোলন",
    heroTitle: "ব্যাংক টাকা রাখে — আমরা টাকাকে কাজে লাগাই।",
    description:
      "ব্যাংকের চেয়ে উন্নত সঞ্চয় ব্যবস্থা — যেকোনো সময় উত্তোলনের স্বাধীনতা, লেনদেন-ভিত্তিক বার্ষিক লভ্যাংশ এবং সম্পূর্ণ স্বচ্ছ পরিচালনা। সুদ নয়, প্রকৃত লাভ।",
    longDescription:
      "প্রমিস ইন্টারন্যাশনালের মাধ্যমে আমরা ব্যাংকের চেয়েও উন্নত সঞ্চয় সেবা দিই। ১০,০০০ টাকা থেকে যেকোনো অঙ্ক জমা রাখুন, ব্যাংকের মতো যেকোনো সময় তুলুন, এবং বছর শেষে লেনদেনের ভিত্তিতে লভ্যাংশ পান। ব্যাংক তো সুদ দেয়, আর সময়মতো নিজের টাকা চাইলেও আজকাল পাওয়া যায় না — আমরা সেই সমস্যার সমাধান।",
    icon: "Landmark",
    accent: "ab",
    features: [
      {
        title: "১০,০০০ টাকা থেকে শুরু",
        description:
          "কম পরিমাণ থেকেই সঞ্চয় শুরু করতে পারবেন — যেকোনো অঙ্ক।",
        icon: "PiggyBank",
        points: ["যেকোনো অঙ্ক জমা", "সহজে অ্যাকাউন্ট খোলা"],
      },
      {
        title: "যেকোনো সময় উত্তোলন",
        description:
          "ব্যাংকের মতো যখন প্রয়োজন তখনই টাকা তুলতে পারবেন।",
        icon: "Wallet",
        points: ["ব্যাংকিং আওয়ারে তাৎক্ষণিক", "কোনো লক-ইন পিরিয়ড নেই"],
      },
      {
        title: "বার্ষিক লভ্যাংশ",
        description:
          "সারা বছরের লেনদেনের ভিত্তিতে বছর শেষে লভ্যাংশ — সুদ নয়।",
        icon: "TrendingUp",
        points: ["লেনদেন-ভিত্তিক মুনাফা", "সুদ নয়, প্রকৃত লাভ"],
      },
      {
        title: "স্বচ্ছ পরিচালনা",
        description:
          "প্রতিটি লেনদেন স্পষ্ট ও যাচাইযোগ্য, কোনো লুকানো শর্ত নেই।",
        icon: "Eye",
        points: ["প্রতিটি লেনদেন যাচাইযোগ্য", "কোনো লুকানো শর্ত নেই"],
      },
      {
        title: "দ্রুত জরুরি সেবা",
        description:
          "জরুরি প্রয়োজনে দ্রুত সাড়া — দীর্ঘ প্রক্রিয়ার ঝামেলা নেই।",
        icon: "Zap",
        points: ["জরুরি প্রয়োজনে দ্রুত সাড়া", "ন্যূনতম প্রক্রিয়া"],
      },
    ],
    highlights: [
      "ব্যাংকের চেয়ে উচ্চতর সুবিধা",
      "নমনীয় ও সহজ সঞ্চয়",
      "লেনদেন-ভিত্তিক লভ্যাংশ",
      "স্বচ্ছ ও বিশ্বস্ত",
    ],
  },
  {
    slug: "ahbab-travels-tours",
    nameEn: "Ahbab Travels & Tours",
    nameBn: "আহবাব ট্রাভেলস অ্যান্ড ট্যুরস",
    shortBn: "আহবাব ট্রাভেলস",
    tagline: "দেশসেরা হজ্জ ও উমরাহ পরিষেবা",
    heroTitle: "আল্লাহর ঘরে যাত্রা — আমরা পাশে হাঁটি প্রতিটি কদমে।",
    description:
      "বাংলাদেশের অন্যতম নির্ভরযোগ্য হজ্জ ও উমরাহ পরিষেবা। ভিসা প্রক্রিয়া থেকে দেশে ফেরা পর্যন্ত — অভিজ্ঞ মুয়াল্লিম, প্রিমিয়াম থাকা ও ২৪/৭ সহায়তা।",
    longDescription:
      "আহবাব ট্রাভেলস অ্যান্ড ট্যুরস বাংলাদেশের অন্যতম নির্ভরযোগ্য হজ্জ ও উমরাহ পরিষেবা প্রদানকারী। প্রতিটি ধাপে আপনার পাশে থাকি — ভিসা প্রক্রিয়া থেকে যাত্রা, এবং সফলভাবে দেশে ফেরা পর্যন্ত। অভিজ্ঞ গাইড, প্রিমিয়াম থাকার ব্যবস্থা এবং সম্পূর্ণ সহায়তা।",
    icon: "Plane",
    accent: "rb",
    features: [
      {
        title: "হজ্জ প্যাকেজ",
        description:
          "সম্পূর্ণ হজ্জ প্যাকেজ — ভিসা, ফ্লাইট, হোটেল ও মুয়াল্লিম সেবা।",
        icon: "Moon",
        points: ["ভিসা, ফ্লাইট ও হোটেল একসাথে", "অভিজ্ঞ মুয়াল্লিম"],
      },
      {
        title: "উমরাহ প্যাকেজ",
        description:
          "বছরজুড়ে উমরাহ যাত্রা — বিভিন্ন বাজেট ও মেয়াদের অপশন।",
        icon: "Star",
        points: ["বছরজুড়ে যাত্রার সুযোগ", "বিভিন্ন বাজেটের অপশন"],
      },
      {
        title: "ভিসা প্রক্রিয়া",
        description:
          "দ্রুত ও সঠিক ভিসা প্রক্রিয়াকরণ — সব কাগজপত্র আমরা সামলাই।",
        icon: "FileCheck",
        points: ["সম্পূর্ণ কাগজপত্র আমরা সামলাই", "দ্রুত ও সঠিক প্রসেসিং"],
      },
      {
        title: "হোটেল ও পরিবহন",
        description:
          "মক্কা ও মদিনায় প্রিমিয়াম থাকা এবং নির্ভরযোগ্য পরিবহন।",
        icon: "BedDouble",
        points: ["হারামের কাছে থাকা", "শীতাতপ নিয়ন্ত্রিত পরিবহন"],
      },
      {
        title: "অভিজ্ঞ গাইড",
        description:
          "জ্ঞানী ও অভিজ্ঞ মুয়াল্লিম এবং বাংলা ভাষায় গাইড।",
        icon: "Users",
        points: ["বাংলা ভাষায় গাইড", "প্রতি কদমে সঙ্গী"],
      },
      {
        title: "সম্পূর্ণ সহায়তা",
        description:
          "যাত্রার আগে, চলাকালীন ও পরে — ২৪/৭ সহায়তা।",
        icon: "Headphones",
        points: ["যাত্রার আগে-পরে সহায়তা", "২৪/৭ জরুরি হটলাইন"],
      },
    ],
    highlights: [
      "দেশসেরা সেবা",
      "শতভাগ স্বচ্ছ মূল্য",
      "অভিজ্ঞ মুয়াল্লিম দল",
      "প্রিমিয়াম থাকা ও পরিবহন",
    ],
  },
  {
    // Interior & 3D uses ASH for an elegant, neutral design-canvas feel
    // — balances the palette (2 red + 2 blue + 1 ash across the 5 divisions).
    slug: "interior-3d-design",
    nameEn: "Interior & 3D Design",
    nameBn: "ইন্টেরিয়র ও 3D ডিজাইন",
    shortBn: "ইন্টেরিয়র ও 3D",
    tagline: "নির্মাণের আগেই দেখুন আপনার স্বপ্ন",
    heroTitle: "চার দেয়ালে আপনার গল্প — আমরা শিল্প করে তুলি।",
    description:
      "বাড়ি, অফিস ও দোকানের ইন্টেরিয়র ডিজাইন এবং ফটোরিয়ালিস্টিক 3D রেন্ডারিং — আপনার রুচি, প্রয়োজন ও বাজেট অনুযায়ী কাস্টম সমাধান।",
    longDescription:
      "প্রমিস গ্রুপের ইন্টেরিয়র ও 3D ডিজাইন বিভাগে আমরা আপনার বাড়ি, অফিস, দোকান — যেকোনো স্থাপনার অভ্যন্তরীণ ডিজাইন এবং 3D ভিজ্যুয়ালাইজেশন তৈরি করি। নির্মাণের আগেই দেখুন আপনার স্বপ্ন কেমন দেখাবে।",
    icon: "Palette",
    accent: "ash",
    features: [
      {
        title: "আবাসিক ইন্টেরিয়র",
        description:
          "বসার ঘর, শোবার ঘর, রান্নাঘর — প্রতিটি কোণে নিখুঁত নকশা।",
        icon: "Sofa",
        points: ["লিভিং, বেডরুম ও কিচেন", "প্রতিটি কোণে কাস্টম নকশা"],
      },
      {
        title: "অফিস ও কমার্শিয়াল",
        description:
          "অফিস, শো-রুম ও দোকানের জন্য আধুনিক ও কার্যকর নকশা।",
        icon: "Briefcase",
        points: ["অফিস, শো-রুম ও রিটেইল", "ব্র্যান্ড-সংগতিপূর্ণ ডিজাইন"],
      },
      {
        title: "3D রেন্ডারিং",
        description:
          "ফটোরিয়ালিস্টিক 3D ভিজ্যুয়ালাইজেশন — নির্মাণের আগেই দেখুন।",
        icon: "Box",
        points: ["ফটোরিয়ালিস্টিক ভিজ্যুয়াল", "নির্মাণের আগেই প্রিভিউ"],
      },
      {
        title: "স্পেস প্ল্যানিং",
        description:
          "প্রতিটি বর্গফুটের সর্বোচ্চ ব্যবহার — স্মার্ট লেআউট।",
        icon: "LayoutGrid",
        points: ["প্রতিটি বর্গফুটের সদ্ব্যবহার", "স্মার্ট, কার্যকর লেআউট"],
      },
      {
        title: "ফার্নিচার সিলেকশন",
        description:
          "নকশার সাথে মিলিয়ে সঠিক ফার্নিচার ও উপাদান নির্বাচন।",
        icon: "Armchair",
        points: ["নকশা-সংগতিপূর্ণ ফার্নিচার", "মানসম্পন্ন উপাদান"],
      },
      {
        title: "কাস্টম সমাধান",
        description:
          "আপনার রুচি ও বাজেট অনুযায়ী সম্পূর্ণ ব্যক্তিগত ডিজাইন।",
        icon: "Palette",
        points: ["রুচি ও বাজেট অনুযায়ী", "সম্পূর্ণ ব্যক্তিগত ডিজাইন"],
      },
    ],
    highlights: [
      "ফটোরিয়ালিস্টিক 3D",
      "আবাসিক ও কমার্শিয়াল",
      "স্পেস অপ্টিমাইজেশন",
      "ব্যক্তিগত স্পর্শ",
    ],
  },
];

/** Brand logo (WebP, transparent) per division — used for the Hero
 *  showcase card icon and the "আমাদের বিভাগ" nav dropdown.  Keyed by
 *  slug; a division without an entry falls back to its lucide `icon`.
 *  Sources converted via scripts/convert-division-logos.mjs.
 *  (interior-3d-design has no brand logo yet → keeps the lucide icon.) */
export const DIVISION_LOGO: Record<string, string> = {
  "promise-city": "/div-promise-city.webp",
  "ahbab-real-estate": "/div-ahbab-real-estate.webp",
  "promise-international": "/div-promise-international.webp",
  "ahbab-travels-tours": "/div-ahbab-travels-tours.webp",
};

/** Real photo per division for the homepage division-card headers.
 *  Keyed by slug; a division without an entry keeps its solid accent
 *  header.  (Savings + interior have no real project photo yet.) */
export const DIVISION_IMAGE: Record<string, string> = {
  "promise-city": "/promisecityreal.webp",
  "ahbab-real-estate": "/ahbab.webp",
  "promise-international": "/savings.webp",
  "ahbab-travels-tours": "/kaaba.webp",
  "interior-3d-design": "/interior3d.webp",
};

// "about" + "why" left in NAV_IDS so the navbar's title/tagline still
// flips correctly when the visitor scrolls *through* those homepage
// sections — even though they're no longer clickable in the menu.
export const NAV_IDS = ["home", "about", "divisions", "projects", "why", "contact"];

/** Curated short list for the footer "দ্রুত লিঙ্ক" column.
 *  Only the 5 highest-conversion pages — full NAV would make the
 *  footer column much taller than the others and break the
 *  symmetric 4-column layout. */
export const FOOTER_QUICK_LINKS: { label: string; href: string }[] = [
  { label: "হোম", href: "/#home" },
  { label: "আমাদের বিভাগ", href: "/#divisions" },
  { label: "প্রকল্প", href: "/#projects" },
  { label: "পার্টনার হোন", href: "/partner" },
  { label: "মার্কেটিং পলিসি", href: "/marketing-policy" },
  { label: "যোগাযোগ", href: "/contact" },
];

/** When on the home section, navbar cycles through these brand identities */
export const HOME_BRAND_CYCLES = [
  { title: "Promise PPD", tagline: SITE.tagline },
  { title: "প্রমিস সিটি", tagline: "স্বপ্ন যেখানে বাস্তব" },
];

/** Dynamic navbar title + tagline per section */
export const SECTION_META: Record<
  string,
  { title: string; tagline: string }
> = {
  home: { title: "Promise PPD", tagline: SITE.tagline },
  about: { title: "আমাদের সম্পর্কে", tagline: "১৫+ বছরের আস্থা ও অঙ্গীকার" },
  stats: { title: "আমাদের যাত্রা", tagline: "সংখ্যায় প্রমিস গ্রুপ" },
  divisions: { title: "আমাদের বিভাগ", tagline: "৫টি বিভাগ — এক ছাদের নিচে" },
  projects: { title: "চলমান প্রকল্প", tagline: "ঢাকার বুকে নতুন ঠিকানা" },
  why: { title: "কেন প্রমিস গ্রুপ", tagline: "পরিবার যে কারণে বেছে নেয়" },
  testimonials: { title: "গ্রাহকদের কণ্ঠ", tagline: "তাঁদের কথায় আমাদের গল্প" },
  contact: { title: "যোগাযোগ করুন", tagline: "খুব শীঘ্রই উত্তর পাবেন" },
};

export const STATS = [
  { value: 15, suffix: "+", label: "বছরের অভিজ্ঞতা" },
  { value: 5, suffix: "", label: "ব্যবসায়িক বিভাগ" },
  { value: 5, suffix: "+", label: "প্রকল্প" },
  { value: 3000, suffix: "+", label: "সুখী পরিবার" },
];

export type Project = {
  /** URL slug — drives /projects/<slug> detail page + nav dropdown. */
  slug: string;
  name: string;
  status: "চলমান" | "সম্পন্ন" | "আসন্ন";
  location: string;
  price: string;
  size?: string;
  description: string;
  /** Longer copy shown on the detail page hero. */
  longDescription: string;
  /** Rich "about" paragraphs for the detail page.  If present, the
   *  detail page renders them with the first video embedded in the
   *  middle for a magazine-style layout. */
  details?: string[];
  highlights: string[];
  /** Brand accent for the card header band — keeps the projects grid varied. */
  accent: "red" | "blue" | "ash";
  /** Real cover image (WebP) — card header + detail hero. */
  cover: string;
  /** Gallery images for the detail page (first one usually = cover). */
  gallery: string[];
  /** Optional YouTube video ids shown on the detail page. */
  videoIds?: string[];
  /** Floor-plan link (PDF / image, e.g. Google Drive). */
  floorPlanUrl?: string;
  /** Payment & deed terms — rendered as a dedicated detail section. */
  payment?: {
    bookingMoney: string;
    monthly: string;
    totalShare: string;
    note: string;
  };
  /** Building availability for multi-building projects (status grid). */
  buildings?: { total: number; soldOut: number; nowBooking: number };
};

export const PROJECTS: Project[] = [
  {
    slug: "promise-city",
    name: "প্রমিস সিটি",
    status: "চলমান",
    location: "ঢাকা",
    price: "৳ ৪.৪৫ লাখ থেকে",
    description:
      "প্রমিস সিটি — আহবাব প্যালেস, ফুজালা টাওয়ার ও ফুজালা কমপ্লেক্স নিয়ে গড়ে ওঠা একটি সমন্বিত আবাসিক ঠিকানা।",
    longDescription:
      "প্রমিস সিটি আমাদের ফ্ল্যাগশিপ আবাসিক উদ্যোগ — একই ছাদের নিচে আহবাব প্যালেস, ফুজালা টাওয়ার ও ফুজালা কমপ্লেক্স। যাচাইকৃত দলিল, নমনীয় কিস্তি এবং সম্পূর্ণ আইনি নিরাপত্তার সাথে ঢাকার বুকে আপনার ভবিষ্যতের ঠিকানা।",
    highlights: ["৫+ চলমান প্রকল্প", "প্রিমিয়াম লোকেশন", "নমনীয় কিস্তি", "সম্পূর্ণ আইনি নিরাপত্তা"],
    accent: "red",
    cover: "/promisecityreal.webp",
    gallery: [
      "/promisecityreal.webp",
      "/ftpics/ftt1.webp",
      "/fcpics/fc1.webp",
      "/ahbab1pics/ahbab1pics.webp",
    ],
    videoIds: ["u55eC0IjfUQ"],
  },
  {
    slug: "fuzala-tower",
    name: "ফুজালা টাওয়ার",
    status: "চলমান",
    location: "প্রমিস সিটি, ঢাকা",
    price: "৳ ৫ লাখ",
    description:
      "প্রমিস সিটির প্রাণকেন্দ্রে আধুনিক আবাসিক টাওয়ার — মাত্র ৫ লাখ টাকা ওয়ান-টাইমে নিজের ঠিকানার মালিক হওয়ার সুযোগ।",
    longDescription:
      "ফুজালা টাওয়ার প্রমিস সিটির মুকুট — ঢাকার বুকে একটি আধুনিক, পূর্ণাঙ্গ আবাসিক টাওয়ার, যেখানে প্রতিটি পরিবার খুঁজে পায় নিরাপত্তা, স্বাচ্ছন্দ্য আর গর্ব করার মতো একটি ঠিকানা।",
    details: [
      "ফুজালা টাওয়ার শুধু একটি ভবন নয় — এটি প্রমিস সিটির মুকুট। ঢাকার বুকে একটি আধুনিক, পূর্ণাঙ্গ আবাসিক টাওয়ার, যেখানে প্রতিটি পরিবার খুঁজে পায় নিরাপত্তা, স্বাচ্ছন্দ্য এবং নিজের একটি গর্ব করার মতো ঠিকানা।",
      "চিন্তাশীল স্থাপত্য নকশায় গড়া প্রতিটি ইউনিট — পর্যাপ্ত আলো-বাতাস, খোলা ব্যালকনি, প্রশস্ত বসার ঘর ও আধুনিক ফিনিশিং। লিফট, জেনারেটর ব্যাকআপ, ২৪ ঘণ্টা নিরাপত্তা, নিজস্ব পার্কিং এবং কমিউনিটি স্পেস — দৈনন্দিন জীবনের প্রতিটি প্রয়োজন এক ছাদের নিচে।",
      "প্রমিস সিটির প্রাণকেন্দ্রে অবস্থিত হওয়ায় স্কুল, বাজার, মসজিদ, হাসপাতাল ও প্রধান সড়কের সাথে সহজ সংযোগ — যানজটের শহরে আপনার সময় আর স্বস্তি, দুটোই বাঁচে।",
      "যাচাইকৃত দলিল, নিবন্ধিত স্বাক্ষর ও সম্পূর্ণ আইনি স্বচ্ছতা — ফুজালা টাওয়ারে বিনিয়োগ মানে নিশ্চিন্ত ভবিষ্যৎ। ওয়ান-টাইম মাত্র ৫ লাখ টাকায় নিজের একটি ঠিকানার মালিক হওয়ার সুযোগ, যার মূল্য সময়ের সাথে কেবল বাড়বে।",
      "ভাড়ার ঘরে স্বপ্ন দেখা শেষ — ফুজালা টাওয়ারে গড়ে তুলুন আপনার পরিবারের স্থায়ী নিরাপত্তা ও অহংকার। আজই একটি সাইট ভিজিট বুক করুন এবং নিজ চোখে দেখে নিন কেন প্রমিস সিটি ঢাকার বিশ্বস্ত নাম।",
    ],
    highlights: ["ওয়ান-টাইম মাত্র ৳৫ লাখ", "প্রিমিয়াম লোকেশন", "স্কাইলাইন ভিউ", "আধুনিক সুবিধা"],
    accent: "red",
    cover: "/ftpics/ftt1.webp",
    gallery: ["/ftpics/ftt1.webp", "/ftpics/ft.webp", "/ftpics/fuzala-2-0.webp"],
    videoIds: ["appf8v2ATLo"],
  },
  {
    slug: "fuzala-complex",
    name: "ফুজালা কমপ্লেক্স",
    status: "চলমান",
    location: "প্রমিস সিটি, ঢাকা",
    price: "৳ ৫,২০,০০০",
    size: "১২০০ বর্গফুট / ইউনিট",
    description:
      "৩০টি ভবনের পারিবারিক আবাসন — G+9, প্রতি ফ্লোরে ২টি ১২০০ বর্গফুট ইউনিট। ১১টি ভবন বিক্রি শেষ, ১২ নম্বর ভবনে বুকিং চলছে।",
    longDescription:
      "ফুজালা কমপ্লেক্স প্রমিস সিটির সাশ্রয়ী পারিবারিক আবাসন প্রকল্প — মোট ৩০টি ভবন, প্রতিটি ৬ শতাংশ (প্রায় ৪ কাঠা) জমির উপর G+9 কাঠামোয় নির্মিত।",
    details: [
      "ফুজালা কমপ্লেক্স প্রমিস সিটির একটি সাশ্রয়ী পারিবারিক আবাসন প্রকল্প — মোট ৩০টি ভবন, প্রতিটি ভবন ৬ শতাংশ (প্রায় ৪ কাঠা) জমির উপর G+9 কাঠামোয় নির্মিত।",
      "প্রতিটি ফ্লোরে ২টি করে ইউনিট, প্রতিটি ১২০০ বর্গফুট। বেসমেন্টে পার্কিং — প্রতি ২ ইউনিটের জন্য ১টি পার্কিং স্পেস বরাদ্দ।",
      "ইতিমধ্যে ১১টি ভবন সম্পূর্ণ বিক্রি হয়ে গেছে। বর্তমানে ১২ নম্বর ভবনে বুকিং চলছে — পছন্দের ইউনিট নিশ্চিত করতে এখনই যোগাযোগ করুন।",
      "চিন্তাশীল লেআউট, নিরাপদ কমিউনিটি ও সহজ যাতায়াতের সংযোগ — প্রথমবার নিজের ঠিকানা গড়তে চাওয়া পরিবারের জন্য ফুজালা কমপ্লেক্স একটি আদর্শ ঠিকানা।",
    ],
    highlights: [
      "৩০টি ভবন · G+9",
      "প্রতি ফ্লোরে ২ ইউনিট · ১২০০ sqft",
      "৬ শতাংশ (৪ কাঠা) জমি",
      "বেসমেন্ট পার্কিং (২ ইউনিটে ১টি)",
    ],
    accent: "blue",
    cover: "/fcpics/fc1.webp",
    gallery: ["/fcpics/fc1.webp", "/fcpics/fc2.webp", "/fcpics/fc3.webp", "/fcpics/f4.webp"],
    floorPlanUrl:
      "https://drive.google.com/file/d/1LNYsoSRrMGJFrGXG4MQkAj7s71-JkK4L/view?usp=sharing",
    payment: {
      bookingMoney: "৪০,০০০ টাকা",
      monthly: "৪,০০০ টাকা / মাস",
      totalShare: "৫,২০,০০০ টাকা",
      note: "মোট ল্যান্ড শেয়ার মূল্য ৫,২০,০০০ টাকা পরিশোধ হলে প্রমিস সিটি জমির দলিল সম্পন্ন করে দেবে। কেউ যদি ২০২৭ সালের ডিসেম্বরের মধ্যে সম্পূর্ণ মূল্য পরিশোধ করেন, তাঁকে তখনই জমির দলিল বুঝিয়ে দেওয়া হবে এবং ২০২৯ সালে ফ্ল্যাট হস্তান্তর করা হবে — ইন শা আল্লাহ।",
    },
    buildings: { total: 30, soldOut: 11, nowBooking: 12 },
  },
  {
    slug: "ahbab-palace-01",
    name: "আহবাব প্যালেস · ০১",
    status: "চলমান",
    location: "ঢাকা",
    price: "৳ ৪০.০০ লাখ",
    description:
      "ফ্ল্যাগশিপ প্যালেস-ক্লাস বাসস্থান — প্রশস্ত যাপন, প্রিমিয়াম ফিনিশিং ও নিরবচ্ছিন্ন গোপনীয়তা।",
    longDescription:
      "আহবাব প্যালেস ০১ আমাদের ফ্ল্যাগশিপ প্যালেস-ক্লাস বাসস্থান — প্রশস্ত যাপন স্থান, প্রিমিয়াম ফিনিশিং এবং নিরবচ্ছিন্ন গোপনীয়তা। বিলাসিতা ও মান যেখানে প্রতিটি ডিটেইলে।",
    highlights: ["ফ্ল্যাগশিপ প্রকল্প", "প্রিমিয়াম ফিনিশিং", "একান্ত গোপনীয়তা"],
    accent: "red",
    cover: "/ahbab1pics/ahbab1pics.webp",
    gallery: ["/ahbab1pics/ahbab1pics.webp"],
    videoIds: ["9P1GRaFG-1I"],
  },
  {
    slug: "ahbab-palace-02",
    name: "আহবাব প্যালেস · ০২",
    status: "চলমান",
    location: "ঢাকা",
    price: "৳ ১৪.৫০ লাখ",
    size: "১২০০ ও ১৮০০ বর্গফুট",
    description:
      "১২০০ ও ১৮০০ বর্গফুটের ইউনিট — খোলা রান্নাঘর, মাস্টার স্যুট, বড় ব্যালকনি ও আধুনিক ফিটিং।",
    longDescription:
      "আহবাব প্যালেস ০২ — ১২০০ ও ১৮০০ বর্গফুটের দুই ধরনের ইউনিট। খোলা রান্নাঘর, মাস্টার স্যুট, বড় ব্যালকনি ও আধুনিক ফিটিং — পরিবারের আকার ও বাজেট অনুযায়ী বেছে নেওয়ার স্বাধীনতা।",
    highlights: ["১২০০ ও ১৮০০ বর্গফুট", "মাস্টার স্যুট", "বড় ব্যালকনি", "আধুনিক ফিটিং"],
    accent: "blue",
    cover: "/ahbab2pics/ahbab2pics.webp",
    gallery: ["/ahbab2pics/ahbab2pics.webp"],
  },
];

export const NAV = [
  // Home points at root `/` (not `/#home`) so the URL bar stays
  // clean — Navbar intercepts the click and scrolls to top when
  // the user is already on the homepage.
  { label: "হোম", href: "/", id: "home" },
  {
    label: "আমাদের বিভাগ",
    href: "/#divisions",
    id: "divisions",
    dropdown: DIVISIONS.map((d) => ({
      label: d.nameBn,
      tagline: d.tagline,
      href: `/${d.slug}`,
      slug: d.slug,
      icon: d.icon as string | undefined,
      image: undefined as string | undefined,
      accent: d.accent as string,
    })),
  },
  {
    label: "প্রকল্প",
    href: "/#projects",
    id: "projects",
    dropdown: PROJECTS.map((p) => ({
      label: p.name,
      tagline: p.location,
      href: `/projects/${p.slug}`,
      slug: p.slug,
      icon: undefined as string | undefined,
      image: p.cover as string | undefined,
      accent: p.accent as string,
    })),
  },
  { label: "গ্যালারি", href: "/gallery", id: "gallery", standalone: true },
  { label: "পার্টনার হোন", href: "/partner", id: "partner", standalone: true },
  { label: "লিডারবোর্ড", href: "/leaderboard", id: "leaderboard", standalone: true },
  { label: "টিম", href: "/team", id: "team", standalone: true },
  { label: "ব্লগ", href: "/blog", id: "blog", standalone: true },
  { label: "যোগাযোগ", href: "/contact", id: "contact", standalone: true },
];

export const WHY_US = [
  {
    title: "প্রিমিয়াম লোকেশন",
    description: "ঢাকার বিকাশমান এলাকা থেকে হাতে বাছাই করা প্রতিটি প্রকল্প।",
    icon: "MapPin",
  },
  {
    title: "গুণগত নিশ্চয়তা",
    description: "প্রতিটি দেয়াল, প্রতিটি ফিটিং — দশকের পর দশক টিকে থাকার মতো।",
    icon: "Award",
  },
  {
    title: "১৫+ বছরের অভিজ্ঞতা",
    description: "২০১০ সাল থেকে পরিবারগুলোকে সঠিক পথ দেখাচ্ছি, সঠিকভাবে।",
    icon: "Users",
  },
  {
    title: "নমনীয় কিস্তি",
    description: "আপনার বেতনের সাথে চলে — বিরুদ্ধে নয়। এমন পরিকল্পনা।",
    icon: "CreditCard",
  },
  {
    title: "আইনি নিরাপত্তা",
    description: "যাচাইকৃত দলিল, নিবন্ধিত স্বাক্ষর, কোনো অস্পষ্টতা নেই।",
    icon: "ShieldCheck",
  },
  {
    title: "৫ বিভাগ এক ছাদের নিচে",
    description: "রিয়েল এস্টেট, নির্মাণ, সঞ্চয়, হজ্জ ও ডিজাইন — সব একসাথে।",
    icon: "Layers",
  },
];

export const TESTIMONIALS = [
  {
    name: "রাশেদ আহমেদ",
    role: "গৃহকর্তা · ফুজালা টাওয়ার",
    quote:
      "প্রথম সাইট ভিজিট থেকে চাবি হাতে পাওয়ার দিন পর্যন্ত প্রতিটি ধাপ সহজ মনে হয়েছে। সৎ মানুষ, সৎ কাজ।",
  },
  {
    name: "নুসরাত জাহান",
    role: "পরিবার · আহবাব প্যালেস",
    quote:
      "ঢাকার ছয়জন ডেভেলপারের সাথে তুলনা করেছি। স্বচ্ছতাতেই প্রমিস গ্রুপ জিতেছে — আর নির্মাণের মানও প্রতিশ্রুতির চেয়েও ভালো।",
  },
  {
    name: "আবদুল হালিম",
    role: "হাজী · আহবাব ট্রাভেলস",
    quote:
      "আল্লাহর ঘরে যাত্রার প্রতিটি ধাপে আহবাব ট্রাভেলস পাশে ছিল। নির্ভরযোগ্যতা, যত্ন এবং ইসলামি আদব — সবকিছু পেয়েছি।",
  },
  {
    name: "ইমরান হোসেন",
    role: "সঞ্চয়ী · প্রমিস ইন্টারন্যাশনাল",
    quote:
      "ব্যাংকের ঝামেলা ছাড়াই প্রতিমাসে সঞ্চয় করছি, যখন প্রয়োজন তখনই তুলেছি। স্বচ্ছতা ও সুবিধা — দুটোই।",
  },
  {
    name: "সাবিনা ইয়াসমিন",
    role: "গৃহকর্তা · ইন্টেরিয়র ডিজাইন",
    quote:
      "3D ডিজাইন দেখে নির্মাণের আগেই বাড়িটা মনে হয়েছিল চিনি। ফিনিশিং-ও ঠিক তেমনই হয়েছে।",
  },
];

export const INTERESTS = [
  "প্রমিস সিটি — ফ্ল্যাট/জমি",
  "আহবাব রিয়েল এস্টেট — নির্মাণ",
  "প্রমিস ইন্টারন্যাশনাল — সঞ্চয়",
  "আহবাব ট্রাভেলস — হজ্জ/উমরাহ",
  "ইন্টেরিয়র ও 3D ডিজাইন",
  "সাধারণ পরামর্শ",
];
