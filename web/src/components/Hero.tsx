"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play, ShieldCheck, Award, MapPin, Wallet } from "lucide-react";
import AnimatedBlobs from "./AnimatedBlobs";
import Typewriter from "./Typewriter";
import { HERO_PITCHES } from "@/lib/site";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.4, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-20 sm:pt-24 pb-10"
    >
      {/* Promo video — soft light overlay */}
      <motion.div style={{ scale, opacity }} className="absolute inset-0 -z-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/logo.png"
          className="h-full w-full object-cover opacity-15"
        >
          <source src="/promo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white" />
      </motion.div>

      <div className="absolute inset-0 -z-10 mesh-bg" />
      <AnimatedBlobs />
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
      <div className="noise" />

      {/* Main content — vertically centered, with scroll indicator pinned to bottom */}
      <motion.div
        style={{ y }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center text-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Typewriter — sole headline element of the hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="w-full"
        >
          <Typewriter phrases={HERO_PITCHES} size="hero" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="#divisions"
            className="group inline-flex items-center gap-2 rounded-2xl bg-[image:var(--grad-rb)] px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:scale-[1.03] transition-all btn-shine"
          >
            আমাদের বিভাগ দেখুন
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-2xl bg-white border border-border px-6 py-3 text-sm sm:text-base font-semibold text-fg hover:border-brand-red/40 hover:shadow-lg transition-all"
          >
            <Play className="h-4 w-4 text-brand-red" />
            সাইট ভিজিট বুক করুন
          </Link>
        </motion.div>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl"
        >
          {[
            { icon: ShieldCheck, label: "আইনি নিরাপত্তা" },
            { icon: Award, label: "গুণগত নির্মাণ" },
            { icon: MapPin, label: "প্রিমিয়াম এলাকা" },
            { icon: Wallet, label: "নমনীয় কিস্তি" },
          ].map((feature, i) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.06 }}
              className="flex items-center gap-2 rounded-xl bg-white border border-border px-3 py-2 text-xs sm:text-sm shadow-sm"
            >
              <feature.icon className="h-4 w-4 text-brand-blue shrink-0" />
              <span className="font-medium text-fg-soft truncate">
                {feature.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — pinned to bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-10 flex justify-center pb-2 sm:pb-3"
      >
        <div className="flex flex-col items-center gap-1.5 text-fg-faint">
          <span className="text-[10px] uppercase tracking-[0.3em]">স্ক্রল</span>
          <div className="h-8 w-5 rounded-full border-2 border-fg-faint/40 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-full bg-[image:var(--grad-rb)]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
