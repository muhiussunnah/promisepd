"use client";

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
import Link from "next/link";
import AnimatedBlobs from "./AnimatedBlobs";
import type { Division } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Hammer,
  Landmark,
  Plane,
  Palette,
};

const ACCENT_BG: Record<string, string> = {
  red: "from-brand-red to-brand-red-soft",
  blue: "from-brand-blue to-brand-blue-soft",
  ash: "from-brand-ash-dark to-brand-ash",
  rb: "from-brand-red to-brand-blue",
  ab: "from-brand-ash to-brand-blue",
  ar: "from-brand-ash to-brand-red",
};

const ACCENT_GRAD: Record<string, string> = {
  red: "linear-gradient(135deg, #e11924 0%, #ff4757 100%)",
  blue: "linear-gradient(135deg, #1847a1 0%, #3463c7 100%)",
  ash: "linear-gradient(135deg, #7c8696 0%, #c0c7d1 100%)",
  rb: "linear-gradient(135deg, #e11924 0%, #1847a1 100%)",
  ab: "linear-gradient(135deg, #c0c7d1 0%, #1847a1 100%)",
  ar: "linear-gradient(135deg, #c0c7d1 0%, #e11924 100%)",
};

export default function DivisionHero({ division }: { division: Division }) {
  const Icon = ICONS[division.icon] ?? Building2;

  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 -z-10 mesh-bg" />
      <AnimatedBlobs />
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <Link
              href="/#divisions"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted hover:text-fg transition-colors"
            >
              ← আমাদের বিভাগ
            </Link>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
              <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
                {division.nameEn}
              </span>
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
              <span className="text-grad">{division.nameBn}</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-fg-soft leading-relaxed font-medium">
              {division.tagline}
            </p>
            <p className="mt-4 text-base sm:text-lg text-fg-muted leading-relaxed max-w-2xl">
              {division.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-[image:var(--grad-rb)] px-7 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:scale-[1.03] transition-all btn-shine"
              >
                পরামর্শ নিন
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#divisions"
                className="inline-flex items-center gap-2 rounded-2xl bg-white border border-border px-7 py-3.5 text-base font-semibold text-fg hover:border-brand-red/40 transition-all"
              >
                অন্যান্য বিভাগ
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div
              className="relative rounded-3xl p-10 sm:p-12 overflow-hidden shadow-2xl"
              style={{ backgroundImage: ACCENT_GRAD[division.accent] }}
            >
              <div className="absolute inset-0 opacity-25 mix-blend-overlay grid-bg" />
              <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/20 blur-3xl animate-blob" />
              <div className="absolute -top-12 -left-12 h-48 w-48 rounded-full bg-white/15 blur-2xl animate-blob-slow" />

              <div className="relative">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white/95 backdrop-blur-md shadow-xl">
                  <Icon className="h-10 w-10 text-fg" />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {division.highlights.slice(0, 4).map((h) => (
                    <div
                      key={h}
                      className="rounded-xl bg-white/15 backdrop-blur-md border border-white/20 px-3 py-2.5 text-xs sm:text-sm font-medium text-white"
                    >
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
