/** 404 page — fired by `notFound()` calls and any URL Next.js
 *  can't resolve to a route.  Server component (no event handlers
 *  needed) so it ships cleanly without a client bundle.
 *
 *  Includes the developer-report card so visitors who hit a broken
 *  link can tell us about it directly. */

import type { Metadata } from "next";
import Link from "next/link";
import { Home, ArrowLeft, Compass, Search } from "lucide-react";
import ReportToDeveloper from "@/components/ReportToDeveloper";

export const metadata: Metadata = {
  title: "পেজ পাওয়া যায়নি — 404",
  description: "এই পেজটি খুঁজে পাওয়া যায়নি।",
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  { href: "/", label: "হোম" },
  { href: "/#divisions", label: "আমাদের বিভাগ" },
  { href: "/#projects", label: "প্রকল্প" },
  { href: "/partner", label: "পার্টনার" },
  { href: "/blog", label: "ব্লগ" },
  { href: "/contact", label: "যোগাযোগ" },
];

export default function NotFound() {
  return (
    <section className="relative min-h-[80svh] pt-32 pb-20 sm:pt-36">
      <div className="absolute inset-0 -z-10 mesh-bg-soft" />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Big 404 numeral with the brand gradient — visual punch */}
        <div className="text-[clamp(5rem,18vw,9rem)] font-extrabold leading-none text-grad tracking-tight">
          ৪০৪
        </div>

        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
          <Compass className="h-3.5 w-3.5 text-brand-blue" />
          <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
            পেজ পাওয়া যায়নি
          </span>
        </div>

        <h1 className="mt-6 text-3xl sm:text-4xl font-bold leading-tight">
          এই ঠিকানায় <span className="text-grad">কিছুই নেই।</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-fg-muted leading-relaxed">
          আপনি যে পেজটি খুঁজছেন সেটি সরিয়ে নেওয়া হয়েছে, নাম বদলেছে, অথবা
          কখনোই ছিল না। নিচের লিংক থেকে কোথাও চলে যান।
        </p>

        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-brand)] hover:bg-brand-blue-dark hover:scale-[1.02] transition-all"
          >
            <Home className="h-4 w-4" />
            হোমপেজে যান
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-2xl bg-white border border-border px-6 py-3 text-sm font-semibold text-fg hover:border-brand-blue/40 transition-colors"
          >
            <Search className="h-4 w-4" />
            ব্লগ খুঁজে দেখুন
          </Link>
        </div>

        {/* Quick links — get visitors back on track fast */}
        <div className="mt-10">
          <div className="text-[11px] uppercase tracking-[0.2em] text-fg-faint">
            জনপ্রিয় পেজ
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 rounded-full bg-white border border-border px-3 py-1.5 text-xs font-semibold text-fg-soft hover:border-brand-blue/40 hover:text-brand-blue transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <ReportToDeveloper errorMessage="404 — Page not found" />
        </div>
      </div>
    </section>
  );
}
