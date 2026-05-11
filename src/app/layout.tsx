import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import RegisterSW from "@/components/RegisterSW";

const bn = Noto_Sans_Bengali({
  variable: "--font-bn",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://promisepd.com"),
  title: {
    default: "Promise Proper Development Ltd. — স্বপ্ন যেখানে বাস্তব",
    template: "%s · Promise PPD",
  },
  description:
    "ঢাকার বিশ্বস্ত আবাসন অংশীদার। প্রিমিয়াম আবাসিক ও বাণিজ্যিক প্রকল্প, নমনীয় কিস্তি, আইনি নিরাপত্তা এবং ৭+ বছরের অভিজ্ঞতা।",
  keywords: [
    "Promise PPD",
    "প্রমিজ পিপিডি",
    "Real Estate Dhaka",
    "ঢাকা রিয়েল এস্টেট",
    "ফুজালা টাওয়ার",
    "আহবাব প্যালেস",
    "Apartment Dhaka",
    "জমি বিক্রয় ঢাকা",
  ],
  authors: [{ name: "Promise Proper Development Ltd." }],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://promisepd.com",
    title: "Promise Proper Development Ltd.",
    description: "ঢাকায় আপনার বিশ্বস্ত আবাসন অংশীদার।",
    siteName: "Promise PPD",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Promise PPD" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Promise Proper Development Ltd.",
    description: "স্বপ্ন যেখানে বাস্তব",
    images: ["/logo.png"],
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
      <body className="min-h-screen bg-bg text-fg antialiased selection:bg-brand-red selection:text-white">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <ScrollToTop />
        <WhatsAppFAB />
        <PWAInstallPrompt />
        <RegisterSW />
      </body>
    </html>
  );
}
