import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Promise Proper Development Ltd.",
    short_name: "Promise PPD",
    description:
      "ঢাকার বিশ্বস্ত আবাসন অংশীদার — প্রিমিয়াম আবাসিক, বাণিজ্যিক ও বিনিয়োগযোগ্য সম্পত্তি।",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    categories: ["business", "real-estate", "lifestyle"],
    lang: "bn",
    scope: "/",
    icons: [
      { src: "/logo.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/logo.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "প্রকল্প",
        short_name: "প্রকল্প",
        description: "চলমান প্রকল্প দেখুন",
        url: "/#projects",
      },
      {
        name: "যোগাযোগ",
        short_name: "যোগাযোগ",
        description: "যোগাযোগ করুন",
        url: "/#contact",
      },
    ],
  };
}
