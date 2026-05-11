import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/?source=pwa",
    name: "Promise Proper Development Ltd. — স্বপ্ন যেখানে বাস্তব",
    short_name: "Promise PPD",
    description:
      "ঢাকার বিশ্বস্ত আবাসন অংশীদার। ৫টি বিভাগে এক ছাদের নিচে — রিয়েল এস্টেট, নির্মাণ, সঞ্চয়, হজ্জ ও ৩ডি ডিজাইন।",
    start_url: "/?source=pwa",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "any",
    background_color: "#ffffff",
    theme_color: "#E11924",
    categories: ["business", "real-estate", "lifestyle", "finance", "travel"],
    lang: "bn",
    dir: "ltr",
    scope: "/",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png", purpose: "any" },
      { src: "/logo.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/logo.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    // Rich install previews — Chrome/Edge show these in the install dialog.
    screenshots: [
      {
        src: "/screenshot-wide.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Promise PPD — Dhaka's trusted real-estate partner",
      },
      {
        src: "/screenshot-mobile.png",
        sizes: "720x1280",
        type: "image/png",
        form_factor: "narrow",
        label: "Promise PPD — five business divisions",
      },
    ],
    shortcuts: [
      {
        name: "প্রকল্প",
        short_name: "প্রকল্প",
        description: "চলমান প্রকল্প দেখুন",
        url: "/?source=pwa#projects",
        icons: [{ src: "/icon.png", sizes: "256x256" }],
      },
      {
        name: "আমাদের বিভাগ",
        short_name: "বিভাগ",
        description: "৫টি বিভাগ দেখুন",
        url: "/?source=pwa#divisions",
        icons: [{ src: "/icon.png", sizes: "256x256" }],
      },
      {
        name: "যোগাযোগ",
        short_name: "যোগাযোগ",
        description: "যোগাযোগ করুন",
        url: "/?source=pwa#contact",
        icons: [{ src: "/icon.png", sizes: "256x256" }],
      },
    ],
    prefer_related_applications: false,
  };
}
