import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import RegisterSW from "@/components/RegisterSW";
import JsonLd from "@/components/JsonLd";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/schema";
import { getSiteUrl, absoluteUrl } from "@/lib/site-url";

const bn = Noto_Sans_Bengali({
  variable: "--font-bn",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const SITE_URL = getSiteUrl();
const OG_IMAGE = absoluteUrl("/og-image.png");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Promise Proper Development Ltd. — স্বপ্ন যেখানে বাস্তব",
    template: "%s · Promise PPD",
  },
  description:
    "ঢাকার বিশ্বস্ত আবাসন অংশীদার। প্রিমিয়াম আবাসিক ও বাণিজ্যিক প্রকল্প, নমনীয় কিস্তি, আইনি নিরাপত্তা এবং ১৫+ বছরের অভিজ্ঞতা।",
  applicationName: "Promise PPD",
  keywords: [
    "Promise PPD",
    "Promise City",
    "প্রমিজ সিটি",
    "প্রমিজ পিপিডি",
    "Real Estate Dhaka",
    "ঢাকা রিয়েল এস্টেট",
    "ফুজালা টাওয়ার",
    "ফুজালা কমপ্লেক্স",
    "আহবাব প্যালেস",
    "Ahbab Real Estate",
    "Promise International",
    "Ahbab Travels Tours",
    "Hajj Umrah Bangladesh",
    "Interior 3D Design Dhaka",
    "Apartment Dhaka",
    "জমি বিক্রয় ঢাকা",
  ],
  authors: [{ name: "Promise Proper Development Ltd.", url: SITE_URL }],
  creator: "Promise Proper Development Ltd.",
  publisher: "Promise Proper Development Ltd.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Replace these placeholders once GSC / Bing verification codes are issued.
  verification: {
    google: undefined,
    other: { "msvalidate.01": [] },
  },
  category: "Real Estate",
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: SITE_URL,
    title: "Promise Proper Development Ltd. — স্বপ্ন যেখানে বাস্তব",
    description:
      "ঢাকার বিশ্বস্ত আবাসন অংশীদার। ৫টি বিভাগে এক ছাদের নিচে সম্পূর্ণ সমাধান।",
    siteName: "Promise PPD",
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Promise PPD — স্বপ্ন যেখানে বাস্তব",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@promisepd",
    creator: "@promisepd",
    title: "Promise Proper Development Ltd.",
    description: "স্বপ্ন যেখানে বাস্তব · ঢাকার বিশ্বস্ত আবাসন অংশীদার।",
    images: [{ url: OG_IMAGE, alt: "Promise PPD" }],
  },
  appleWebApp: {
    capable: true,
    title: "Promise PPD",
    statusBarStyle: "default",
  },
  // icons intentionally omitted — Next.js auto-discovers src/app/icon.png
  // and src/app/apple-icon.png (cropped to the PPD mark for crisp rendering
  // at favicon sizes).
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" className={bn.variable}>
      <head>
        {/* Preconnect to remote origins used above the fold or for fonts. */}
        <link rel="preconnect" href="https://api.dicebear.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://api.dicebear.com" />
        {/* Site-wide structured data (Organization, WebSite, LocalBusiness). */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <JsonLd data={localBusinessSchema()} />
      </head>
      <body className="min-h-screen bg-bg text-fg antialiased selection:bg-brand-red selection:text-white">
        {/* Skip link for keyboard / screen-reader users — only visible on focus. */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-brand-red focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg focus:outline-none"
        >
          মূল কনটেন্টে যান
        </a>
        <Navbar />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <WhatsAppFAB />
        <PWAInstallPrompt />
        <RegisterSW />
      </body>
    </html>
  );
}
