/** English overlay for homepage content.
 *
 *  The English pages iterate the SAME Bengali data arrays (so icons,
 *  accents, images, order and structure stay identical) and overlay the
 *  English TEXT from these lookups when the locale is "en". This keeps
 *  the change low-risk and avoids duplicating the full data shapes.
 *
 *  Keyed by slug (divisions/projects) or by index/label (stats, etc.). */

export const DIVISION_EN: Record<
  string,
  {
    name: string;
    tagline: string;
    heroTitle: string;
    description: string;
    highlights: string[];
  }
> = {
  "promise-city": {
    name: "Promise City",
    tagline: "Your own address in the heart of Dhaka",
    heroTitle: "No more dreaming from a rented home — own your address.",
    description:
      "Land plots, Fuzala Tower & Fuzala Complex in Promise City township, plus Ahbab Palace at Bashundhara River View — your future address with verified deeds, flexible instalments and full legal security.",
    highlights: [
      "5+ ongoing & completed projects",
      "Flats, land & commercial space",
      "Premium locations",
      "3,000+ happy families",
    ],
  },
  "ahbab-real-estate": {
    name: "Ahbab Real Estate",
    tagline: "Design to keys — a complete construction solution",
    heroTitle: "Every brick is laid on your trust.",
    description:
      "Flats, homes and commercial buildings — built by experienced architects with strict quality control and on-time handover, to stand strong even 50 years on.",
    highlights: [
      "Complete construction solution",
      "Experienced architect & engineer team",
      "On-time handover",
      "Lasting quality",
    ],
  },
  "promise-international": {
    name: "Promise International",
    tagline: "Start from 10,000 · withdraw anytime",
    heroTitle: "Banks just hold your money — we put it to work.",
    description:
      "A savings system better than a bank — freedom to withdraw anytime, transaction-based annual profit and fully transparent management. Real profit, not interest.",
    highlights: [
      "Better than a bank",
      "Flexible, easy savings",
      "Transaction-based profit",
      "Transparent & trusted",
    ],
  },
  "ahbab-travels-tours": {
    name: "Ahbab Travels & Tours",
    tagline: "The country's finest Hajj & Umrah service",
    heroTitle: "A journey to the House of Allah — we walk beside you every step.",
    description:
      "One of Bangladesh's most trusted Hajj & Umrah services. From visa processing to your return home — experienced muallims, premium accommodation and 24/7 support.",
    highlights: [
      "Nation's finest service",
      "100% transparent pricing",
      "Experienced muallim team",
      "Premium stay & transport",
    ],
  },
  "interior-3d-design": {
    name: "Engineering Plan & Interior Design",
    tagline: "See your dream before it is built",
    heroTitle: "Your story on four walls — we turn it into art.",
    description:
      "Interior design, engineering plans and photorealistic 3D rendering for homes, offices and shops — custom solutions to match your taste, needs and budget.",
    highlights: [
      "Engineering plans & drawings",
      "Photorealistic 3D rendering",
      "Residential & commercial interior",
      "Space optimisation",
    ],
  },
};

export const PROJECT_EN: Record<
  string,
  {
    name: string;
    status: string;
    location: string;
    price: string;
    size?: string;
    description: string;
    highlights: string[];
  }
> = {
  "promise-city": {
    name: "Promise City",
    status: "Ongoing",
    location: "Dhaka",
    price: "Tk 6 Lakh / decimal",
    description:
      "A planned residential township in Dhaka — investable land plots (4/6/9 katha) alongside Fuzala Tower and Fuzala Complex.",
    highlights: [
      "4 / 6 / 9 katha plots",
      "Tk 9 Lakh per katha",
      "Verified deed & mutation",
      "Premium location",
    ],
  },
  "fuzala-tower": {
    name: "Fuzala Tower",
    status: "Ongoing",
    location: "Promise City, Dhaka",
    price: "Tk 5 Lakh",
    description:
      "A modern residential tower at the heart of Promise City — Tk 5 Lakh land share, then construction cost in 8 easy instalments. Each building on 9 decimals (6 katha) of land.",
    highlights: [
      "Land share from Tk 5 Lakh",
      "Construction in 8 instalments · 10% service charge",
      "Fully transparent construction account",
      "Premium location · skyline view",
    ],
  },
  "fuzala-complex": {
    name: "Fuzala Complex",
    status: "Ongoing",
    location: "Promise City, Dhaka",
    price: "Tk 5,20,000",
    size: "1200 sqft / unit",
    description:
      "A 30-building family residence — G+9, two 1200 sqft units per floor. 11 buildings sold out; booking now open for building 12.",
    highlights: [
      "30 buildings · G+9",
      "2 units per floor · 1200 sqft",
      "9 decimals (6 katha) of land",
      "Basement parking (1 per 2 units)",
    ],
  },
  "ahbab-palace-01": {
    name: "Ahbab Palace · 01",
    status: "Ongoing",
    location: "Bashundhara River View, Dhaka",
    price: "Tk 40.00 Lakh",
    description:
      "Flagship palace-class residence — G+6, 12 flats. Nearly all occupied; only 2 flats left on the 5th floor.",
    highlights: [
      "G+6 · 12 flats",
      "2 units per floor",
      "Only 2 left on 5th floor",
      "Premium finishing",
    ],
  },
  "ahbab-palace-02": {
    name: "Ahbab Palace · 02",
    status: "Ongoing",
    location: "Bashundhara River View, C Block, Dhaka",
    price: "Tk 4,000 / sqft",
    size: "1200 / 1800 sqft",
    description:
      "A south-facing G+9 residential building at Bashundhara River View C Block — 1200 & 1800 sqft flats at just Tk 4,000 per sqft. 5th-floor roof cast; ~50% complete.",
    highlights: [
      "South-facing · Bashundhara River View C Block",
      "1200 / 1800 sqft flats",
      "Land share from Tk 14.50 Lakh",
      "~50% complete incl. 5th-floor roof",
    ],
  },
};

/** Stats — same order as STATS; only labels translate. */
export const STATS_EN_LABELS = [
  "Years of experience",
  "Business divisions",
  "Projects",
  "Happy families",
];

/** Why-us — same order as WHY_US. */
export const WHY_US_EN = [
  { title: "Premium location", description: "Every project hand-picked from Dhaka's fastest-growing areas." },
  { title: "Quality assurance", description: "Every wall, every fitting — built to last decade after decade." },
  { title: "15+ years of experience", description: "Guiding families the right way since 2010." },
  { title: "Flexible instalments", description: "Plans that move with your salary — never against it." },
  { title: "Legal security", description: "Verified deeds, registered signatures, zero ambiguity." },
  { title: "5 divisions under one roof", description: "Real estate, construction, savings, Hajj and design — all together." },
];

/** Testimonials — same order as TESTIMONIALS. */
export const TESTIMONIALS_EN = [
  {
    name: "Rashed Ahmed",
    role: "Homeowner · Fuzala Tower",
    quote:
      "From the first site visit to the day I got the keys, every step felt easy. Honest people, honest work.",
  },
  {
    name: "Nusrat Jahan",
    role: "Family · Ahbab Palace",
    quote:
      "I compared six developers in Dhaka. Promise Group won on transparency — and the build quality was even better than promised.",
  },
  {
    name: "Abdul Halim",
    role: "Hajji · Ahbab Travels",
    quote:
      "Ahbab Travels was beside me at every step of the journey to the House of Allah. Reliability, care and Islamic adab — I found it all.",
  },
  {
    name: "Imran Hossain",
    role: "Saver · Promise International",
    quote:
      "I save every month without the hassle of a bank, and withdraw whenever I need to. Transparency and convenience — both.",
  },
  {
    name: "Sabina Yasmin",
    role: "Homeowner · Interior Design",
    quote:
      "Seeing the 3D design, I knew the home before it was even built. The finishing turned out exactly the same.",
  },
];

/** English navbar meta (the scrolling logo title/tagline) — page +
 *  section keys mirror the Bengali SECTION_META / page checks. */
export const NAV_META_EN: Record<string, { title: string; tagline: string }> = {
  home: { title: "PromisePD", tagline: "Where dreams come true" },
  about: { title: "About us", tagline: "15+ years of trust & commitment" },
  stats: { title: "Our journey", tagline: "Promise Group in numbers" },
  divisions: { title: "Our Divisions", tagline: "5 divisions — under one roof" },
  projects: { title: "Ongoing Projects", tagline: "New addresses in Dhaka" },
  why: { title: "Why Promise Group", tagline: "Why families choose us" },
  testimonials: { title: "Client voices", tagline: "Our story in their words" },
  contact: { title: "Contact us", tagline: "We'll reply very soon" },
  partner: { title: "Become a Partner", tagline: "Set your own income target" },
  blog: { title: "Promise Journal", tagline: "Real-estate knowledge, your way" },
  team: { title: "Our Team", tagline: "The people who build your dream" },
  leaderboard: { title: "Leaderboard", tagline: "Those at the top — and their rewards" },
  gallery: { title: "Gallery", tagline: "Our work in photos & videos" },
  story: { title: "Our Story", tagline: "The journey behind PromisePD" },
};

export const HOME_BRAND_CYCLES_EN = [
  { title: "PromisePD", tagline: "Where dreams come true" },
  { title: "Promise City", tagline: "Where dreams come true" },
];

/** Contact "interest" options — same order as INTERESTS. */
export const INTERESTS_EN = [
  "Promise City — flat/land",
  "Ahbab Real Estate — construction",
  "Promise International — savings",
  "Ahbab Travels — Hajj/Umrah",
  "Engineering & Interior Design",
  "General enquiry",
];

/** About pillars — same order as the About component. */
export const ABOUT_PILLARS_EN = [
  {
    title: "Built right",
    copy: "The same materials we'd use in our own home — nothing less. We measure standards in decades, not days.",
  },
  {
    title: "People first",
    copy: "Family before fees. Every decision starts with the person who will live here.",
  },
  {
    title: "Promises kept",
    copy: "On-time milestones, no hidden costs, and no surprises even after the keys are handed over.",
  },
];
