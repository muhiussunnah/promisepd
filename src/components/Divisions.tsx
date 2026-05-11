"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Hammer,
  Landmark,
  Plane,
  Palette,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import AnimatedBlobs from "./AnimatedBlobs";
import { DIVISIONS } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Hammer,
  Landmark,
  Plane,
  Palette,
};

const ACCENT_SOLID: Record<string, string> = {
  red: "bg-brand-red",
  blue: "bg-brand-blue",
  ash: "bg-brand-ash-dark",
  rb: "bg-brand-red",
  ab: "bg-brand-blue",
  ar: "bg-brand-red",
};

const ACCENT_GLOW: Record<string, string> = {
  red: "rgba(225,25,36,0.25)",
  blue: "rgba(24,71,161,0.25)",
  ash: "rgba(192,199,209,0.25)",
  rb: "rgba(225,25,36,0.25)",
  ab: "rgba(24,71,161,0.25)",
  ar: "rgba(225,25,36,0.25)",
};

export default function Divisions() {
  return (
    <section
      id="divisions"
      className="relative isolate overflow-hidden py-24 sm:py-32 bg-bg-soft"
    >
      <AnimatedBlobs
        blobs={[
          {
            className:
              "left-[-10%] top-[10%] w-[45vw] h-[45vw] bg-[radial-gradient(circle,rgba(225,25,36,0.16),transparent_60%)]",
            parallax: -100,
          },
          {
            className:
              "right-[-15%] bottom-[10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(24,71,161,0.18),transparent_60%)]",
            parallax: 120,
            delay: 5,
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse" />
            <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
              আমাদের বিভাগ
            </span>
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
            ৫টি বিভাগ —{" "}
            <span className="text-grad">এক ছাদের নিচে।</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-fg-muted leading-relaxed">
            প্রমিজ গ্রুপের পাঁচটি মূল ব্যবসায়িক বিভাগ — রিয়েল এস্টেট, নির্মাণ,
            সঞ্চয়, হজ্জ এবং ডিজাইন। প্রতিটি বিভাগে আমরা সেরাটাই দিই।
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DIVISIONS.map((division, i) => {
            const Icon = ICONS[division.icon] ?? Building2;
            const isLarge = i === 0; // Promise City featured larger
            return (
              <motion.article
                key={division.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -8 }}
                className={`card group relative overflow-hidden ${
                  isLarge ? "sm:col-span-2 lg:col-span-2 lg:row-span-1" : ""
                }`}
                style={{ "--glow": ACCENT_GLOW[division.accent] } as React.CSSProperties}
              >
                <div
                  className={`relative ${isLarge ? "min-h-[280px]" : "min-h-[260px]"} flex flex-col`}
                >
                  {/* Header gradient strip */}
                  <div
                    className={`relative h-32 overflow-hidden ${
                      ACCENT_SOLID[division.accent] ?? ACCENT_SOLID.red
                    }`}
                  >
                    <div className="absolute inset-0 opacity-25 mix-blend-overlay grid-bg" />
                    <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/20 blur-3xl animate-blob" />
                    <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-white/15 blur-2xl animate-blob-slow" />

                    <div className="absolute inset-0 p-5 flex items-center justify-between">
                      <div
                        className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/95 backdrop-blur-md shadow-lg"
                      >
                        <Icon className="h-7 w-7 text-fg" />
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/80">
                          বিভাগ {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex-1 p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-fg leading-tight">
                      {division.nameBn}
                    </h3>
                    <div className="text-[11px] uppercase tracking-wider text-fg-faint mt-0.5">
                      {division.nameEn}
                    </div>

                    <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                      {division.description}
                    </p>

                    {isLarge && (
                      <ul className="mt-4 grid grid-cols-2 gap-1.5">
                        {division.highlights.slice(0, 4).map((h) => (
                          <li
                            key={h}
                            className="text-xs text-fg-soft flex items-center gap-1.5"
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                ACCENT_SOLID[division.accent]
                              }`}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={`/divisions/${division.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-grad-rb group/btn"
                    >
                      বিস্তারিত দেখুন
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
