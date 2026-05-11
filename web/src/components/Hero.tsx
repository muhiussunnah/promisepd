"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play, Sparkles, ShieldCheck, Award, MapPin, Wallet } from "lucide-react";
import AnimatedBlobs from "./AnimatedBlobs";
import Typewriter from "./Typewriter";
import { SITE, HERO_PITCHES } from "@/lib/site";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.4, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden pt-24"
    >
      {/* Promo video — soft, light overlay */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 -z-20"
      >
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

      <motion.div
        style={{ y }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs sm:text-sm shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-brand-red" />
          <span className="font-medium tracking-wide text-fg-soft">
            <span className="text-grad-rb font-bold">১৫+ বছর</span> ধরে ঢাকার বুকে আস্থা · ৫টি বিভাগ
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-6 text-[clamp(2.2rem,7vw,5.5rem)] font-bold leading-[1.1] tracking-tight"
        >
          <span className="block">এমন একটি বাড়ি,</span>
          <span className="block text-grad">যেটি আপনি সত্যিই ভালোবাসবেন।</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-fg-muted leading-relaxed"
        >
          প্রমিজ গ্রুপ — ঢাকার বিশ্বস্ত অংশীদার। ৫টি বিভাগে এক ছাদের নিচে
          সম্পূর্ণ সমাধান। স্বচ্ছ, নমনীয় এবং দীর্ঘস্থায়ী।
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-8"
        >
          <Typewriter phrases={HERO_PITCHES} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            href="#divisions"
            className="group inline-flex items-center gap-2 rounded-2xl bg-[image:var(--grad-rb)] px-7 py-4 text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:scale-[1.03] transition-all btn-shine"
          >
            আমাদের বিভাগ দেখুন
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-2xl bg-white border border-border px-7 py-4 text-base font-semibold text-fg hover:border-brand-red/40 hover:shadow-lg transition-all"
          >
            <Play className="h-4 w-4 text-brand-red" />
            সাইট ভিজিট বুক করুন
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: ShieldCheck, label: "আইনি নিরাপত্তা" },
            { icon: Award, label: "গুণগত নির্মাণ" },
            { icon: MapPin, label: "প্রিমিয়াম এলাকা" },
            { icon: Wallet, label: "নমনীয় কিস্তি" },
          ].map((feature, i) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.07 }}
              className="flex items-center gap-2 rounded-xl bg-white border border-border px-3 py-2.5 text-xs sm:text-sm shadow-sm"
            >
              <feature.icon className="h-4 w-4 text-brand-blue" />
              <span className="font-medium text-fg-soft">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-fg-faint">
          <span className="text-[10px] uppercase tracking-[0.3em]">স্ক্রল</span>
          <div className="h-10 w-6 rounded-full border-2 border-fg-faint/40 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1 rounded-full bg-[image:var(--grad-rb)]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
