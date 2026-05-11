"use client";

import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Award,
  MapPin,
  Wallet,
  Building2,
  Hammer,
  Landmark,
  Plane,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import AnimatedBlobs from "./AnimatedBlobs";
import TypeOnce from "./TypeOnce";
import { DIVISIONS } from "@/lib/site";
import { toBn } from "@/lib/bn";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Hammer,
  Landmark,
  Plane,
  Palette,
};

/** SOLID brand color per division accent (no gradients).
 *  red/rb/ar → solid red, blue/ab → solid blue, ash → solid ash-dark */
const ACCENT_SOLID_HEX: Record<string, string> = {
  red: "#e11924",
  blue: "#1847a1",
  ash: "#c0c7d1",
  rb: "#e11924",
  ab: "#1847a1",
  ar: "#e11924",
};

const ACCENT_SOLID_CLASS: Record<string, string> = {
  red: "bg-brand-red",
  blue: "bg-brand-blue",
  ash: "bg-brand-ash",
  rb: "bg-brand-red",
  ab: "bg-brand-blue",
  ar: "bg-brand-red",
};

const ACCENT_TEXT: Record<string, string> = {
  red: "text-brand-red",
  blue: "text-brand-blue",
  ash: "text-brand-ash-dark",
  rb: "text-brand-red",
  ab: "text-brand-blue",
  ar: "text-brand-red",
};

/** Cursor color for the typewriter on the H1 */
const ACCENT_CURSOR: Record<string, string> = {
  red: "#e11924",
  blue: "#1847a1",
  ash: "#c0c7d1",
  rb: "#e11924",
  ab: "#1847a1",
  ar: "#e11924",
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.5, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);

  // Auto-rotate divisions every 7.5s. No pause-on-hover — hover was firing
  // immediately on page load (cursor naturally over hero) and freezing the
  // rotation forever. User can still jump via dot indicators below.
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(
      () => setIdx((i) => (i + 1) % DIVISIONS.length),
      7500,
    );
    return () => clearInterval(t);
  }, [reduce]);

  const current = DIVISIONS[idx];
  const Icon = ICONS[current.icon] ?? Building2;
  const accentSolidClass = ACCENT_SOLID_CLASS[current.accent];
  const accentText = ACCENT_TEXT[current.accent];

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden pt-24 sm:pt-28 pb-12 flex flex-col"
    >
      {/* Promo video — soft light overlay */}
      <motion.div
        style={{ scale: videoScale, opacity }}
        className="absolute inset-0 -z-20"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/logo.png"
          className="h-full w-full object-cover opacity-10"
        >
          <source src="/promo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/88 to-white" />
      </motion.div>

      <div className="absolute inset-0 -z-10 mesh-bg" />
      <AnimatedBlobs />
      <div className="absolute inset-0 -z-10 grid-bg opacity-50" />
      <div className="noise" />

      {/* Main content */}
      <motion.div
        style={{ y }}
        className="relative z-10 flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex items-center"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 w-full items-center">
          {/* LEFT — content */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Service kicker */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full ${accentSolidClass} px-3.5 py-1.5 text-[11px] sm:text-xs font-bold text-white tracking-wider shadow-md`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    {toBn(idx + 1)} / ৫ · {current.nameBn}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-fg-faint font-semibold">
                    {current.nameEn}
                  </span>
                </div>

                {/* Big title — typewriter (re-types on each slide) */}
                <h1 className="mt-5 text-[clamp(1.875rem,4.6vw,3.75rem)] font-extrabold leading-[1.15] tracking-tight text-fg max-w-[22ch] min-h-[1.5em]">
                  <TypeOnce
                    text={current.heroTitle}
                    speed={45}
                    cursorColor={ACCENT_CURSOR[current.accent]}
                  />
                </h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className={`mt-4 text-[clamp(1.05rem,1.6vw,1.375rem)] font-bold ${accentText}`}
                >
                  {current.tagline}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                  className="mt-3 text-[clamp(0.95rem,1.2vw,1.0625rem)] text-fg-muted leading-relaxed max-w-2xl"
                >
                  {current.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={`/divisions/${current.slug}`}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-red px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:bg-brand-red-dark hover:scale-[1.02] transition-all"
              >
                বিস্তারিত দেখুন
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white border border-border px-6 py-3.5 text-sm sm:text-base font-semibold text-fg hover:border-brand-red/40 hover:shadow-lg transition-all"
              >
                <Play className="h-4 w-4 text-brand-red" />
                পরামর্শ নিন
              </Link>
            </div>

            {/* Dot indicators */}
            <div className="mt-6 flex items-center gap-2.5">
              {DIVISIONS.map((d, i) => {
                const active = i === idx;
                return (
                  <button
                    key={d.slug}
                    onClick={() => setIdx(i)}
                    aria-label={d.nameBn}
                    className={`transition-all duration-500 ease-out rounded-full ${
                      active
                        ? `w-9 h-1.5 ${ACCENT_SOLID_CLASS[d.accent]}`
                        : "w-1.5 h-1.5 bg-fg-faint/40 hover:bg-fg-faint/70"
                    }`}
                  />
                );
              })}
              <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                স্বয়ংক্রিয়ভাবে পরিবর্তিত হয়
              </span>
            </div>

            {/* Trust chips */}
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl">
              {[
                { icon: ShieldCheck, label: "আইনি নিরাপত্তা", color: "text-brand-blue" },
                { icon: Award, label: "গুণগত নির্মাণ", color: "text-brand-red" },
                { icon: MapPin, label: "প্রিমিয়াম এলাকা", color: "text-brand-blue" },
                { icon: Wallet, label: "নমনীয় কিস্তি", color: "text-brand-red" },
              ].map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur-sm border border-border px-3 py-2 text-xs sm:text-sm shadow-sm"
                >
                  <feature.icon className={`h-4 w-4 shrink-0 ${feature.color}`} />
                  <span className="font-medium text-fg-soft truncate">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — visual showcase card */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 sm:-inset-6 rounded-[2rem] bg-gradient-to-br from-white/40 to-white/0 -z-10" />

              <AnimatePresence mode="wait">
                {(() => {
                  // Ash (#C0C7D1) is light — flip text/chips to dark for legibility.
                  const onLight = current.accent === "ash";
                  const labelCls = onLight ? "text-fg-soft" : "text-white/85";
                  const headingCls = onLight
                    ? "text-fg drop-shadow-none"
                    : "text-white drop-shadow-md";
                  const subCls = onLight ? "text-fg-muted" : "text-white/95";
                  const sparkleCls = onLight ? "text-fg-muted/60" : "text-white/70";
                  const chipCls = onLight
                    ? "bg-fg/5 backdrop-blur-md border border-fg/15 text-fg"
                    : "bg-white/15 backdrop-blur-md border border-white/25 text-white";
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.94, rotate: -3, y: 16 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, rotate: 3, y: -16 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="relative rounded-[1.75rem] p-7 sm:p-9 overflow-hidden shadow-2xl"
                      style={{ backgroundColor: ACCENT_SOLID_HEX[current.accent] }}
                    >
                      <div className="absolute inset-0 opacity-25 mix-blend-overlay grid-bg" />
                      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/25 blur-3xl animate-blob" />
                      <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-white/20 blur-2xl animate-blob-slow" />

                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <div
                            className={`text-[10px] uppercase tracking-[0.25em] font-semibold ${labelCls}`}
                          >
                            বিভাগ {toBn(idx + 1).padStart(2, "০")}
                          </div>
                          <Sparkles className={`h-5 w-5 ${sparkleCls}`} />
                        </div>

                        <div className="mt-7 inline-flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl bg-white/95 backdrop-blur-md shadow-xl">
                          <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-fg" />
                        </div>

                        <h3
                          className={`mt-6 text-2xl sm:text-3xl font-bold leading-tight ${headingCls}`}
                        >
                          {current.nameBn}
                        </h3>
                        <p
                          className={`mt-2 text-sm leading-relaxed ${subCls}`}
                        >
                          {current.tagline}
                        </p>

                        <div className="mt-7 grid grid-cols-2 gap-2.5">
                          {current.highlights.slice(0, 4).map((h) => (
                            <div
                              key={h}
                              className={`rounded-xl px-3 py-2.5 text-[11px] sm:text-xs font-medium leading-snug ${chipCls}`}
                            >
                              {h}
                            </div>
                          ))}
                        </div>

                        <Link
                          href={`/divisions/${current.slug}`}
                          className="mt-7 inline-flex items-center gap-1.5 rounded-xl bg-white text-fg px-4 py-2.5 text-sm font-bold shadow-md hover:scale-[1.03] transition-transform"
                        >
                          বিভাগটি দেখুন
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative z-10 flex justify-center pt-4 pb-2"
      >
        <div className="flex flex-col items-center gap-1.5 text-fg-faint">
          <span className="text-[10px] uppercase tracking-[0.3em]">স্ক্রল</span>
          <div className="h-8 w-5 rounded-full border-2 border-fg-faint/40 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-full bg-brand-red"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
