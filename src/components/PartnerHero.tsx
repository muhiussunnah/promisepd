"use client";

/** Partner-page hero — leads with the "25 referrals → free Umrah + ৳5L
 *  in prizes" hook and a single primary CTA that scrolls down to the
 *  interactive calculator. */

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Trophy, Wallet, Calculator } from "lucide-react";
import Link from "next/link";
import AnimatedBlobs from "./AnimatedBlobs";
import { PARTNER_HEADLINE, PARTNER_PERIOD } from "@/lib/partner";

export default function PartnerHero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 -z-10 mesh-bg" />
      <AnimatedBlobs />
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left column — copy + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
              <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
                পার্টনার প্রোগ্রাম · {PARTNER_PERIOD.startBn}
              </span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08]">
              নিজের আয়ের <span className="text-grad">লক্ষ্য</span> নিজেই ঠিক
              করুন।
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-fg-soft leading-relaxed font-medium">
              মানুষের কাছে{" "}
              <span className="font-bold text-brand-red">প্রমিস সিটি</span>{" "}
              পৌঁছে দিন — কারণ প্রমিস সিটি মানেই{" "}
              <span className="font-bold text-brand-blue">
                আপনার স্বপ্ন যেখানে বাস্তব।
              </span>
            </p>

            <p className="mt-3 text-base text-fg-muted leading-relaxed max-w-2xl">
              ক্যালকুলেটরে আয়ের লক্ষ্য সেট করুন, প্ল্যান বানান — কোন
              প্রকল্প থেকে কত সেলস করলে সেই লক্ষ্যে পৌঁছাবেন, লাইভ দেখুন।
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-blue px-7 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:bg-brand-blue-dark hover:scale-[1.02] transition-all"
              >
                <Calculator className="h-4 w-4" />
                ক্যালকুলেটর খুলুন
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-white border border-border px-7 py-3.5 text-base font-semibold text-fg hover:border-brand-blue/40 transition-all"
              >
                পার্টনার হতে যোগাযোগ
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-fg-muted">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                রিয়েল এস্টেট কমিশন
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                টিম বিল্ডিং বোনাস
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-ash-dark" />
                হজ্জ · উমরাহ কমিশন
              </span>
            </div>
          </motion.div>

          {/* Right column — the "25 referrals" hook card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div
              className="relative rounded-3xl p-8 sm:p-10 overflow-hidden shadow-2xl bg-brand-red"
            >
              <div className="absolute inset-0 opacity-25 mix-blend-overlay grid-bg" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/20 blur-3xl animate-blob" />
              <div className="absolute -top-12 -left-12 h-48 w-48 rounded-full bg-white/15 blur-2xl animate-blob-slow" />

              <div className="relative text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-red">
                  <Sparkles className="h-3 w-3" />
                  সিগনেচার অফার
                </span>

                <h2 className="mt-5 text-3xl sm:text-4xl font-bold leading-tight">
                  মাত্র{" "}
                  <span className="text-white">
                    {new Intl.NumberFormat("bn-BD").format(
                      PARTNER_HEADLINE.referralsTarget,
                    )}{" "}
                    জন
                  </span>{" "}
                  রেফার করে
                </h2>
                <div className="mt-1 text-2xl sm:text-3xl font-bold text-white/95">
                  নিশ্চিত <span className="underline decoration-white/60">ফ্রি উমরাহ</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/15 border border-white/20 backdrop-blur-md px-3 py-3">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-brand-red mb-2">
                      <Wallet className="h-4 w-4" />
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-white/75">
                      ন্যূনতম ক্যাশ
                    </div>
                    <div className="mt-0.5 text-lg font-bold text-white">
                      ৳ {PARTNER_HEADLINE.cashMinBn}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/15 border border-white/20 backdrop-blur-md px-3 py-3">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-brand-red mb-2">
                      <Trophy className="h-4 w-4" />
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-white/75">
                      উমরাহ ভ্যালু
                    </div>
                    <div className="mt-0.5 text-lg font-bold text-white">
                      ৳ {PARTNER_HEADLINE.umrahValueBn}
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-white text-fg px-4 py-3 flex items-baseline justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                    মোট পুরস্কার
                  </span>
                  <span className="text-2xl font-bold text-grad-rb">
                    ~ ৳ {PARTNER_HEADLINE.totalValueBn}
                  </span>
                </div>

                <p className="mt-4 text-[11px] leading-relaxed text-white/80">
                  * বছরের সর্বোচ্চ ২৫ পয়েন্টে ফ্রি উমরাহ, ২০ পয়েন্টে ফ্রি
                  বিদেশ ট্যুর। {PARTNER_PERIOD.startBn} – {PARTNER_PERIOD.endBn}{" "}
                  পর্যন্ত।
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
