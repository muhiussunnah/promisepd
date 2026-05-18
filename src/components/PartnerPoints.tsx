"use client";

/** Points system + two annual rewards (Free Foreign Tour @ 20 pts,
 *  Free Umrah @ 25 pts). Designed as a "ladder" so it's instantly clear
 *  how points stack toward each reward. */

import { motion } from "framer-motion";
import { Plane, Sparkles, Star } from "lucide-react";
import {
  POINT_RULES,
  PARTNER_AWARDS,
  PARTNER_PERIOD,
  bnNumber,
} from "@/lib/partner";

const AWARD_ICONS = { red: Sparkles, blue: Plane } as const;

const ACCENT_HEX: Record<string, string> = {
  red: "#e11924",
  blue: "#1847a1",
};

export default function PartnerPoints() {
  return (
    <section className="relative py-20 sm:py-28 bg-bg-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse" />
            <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
              পয়েন্ট সিস্টেম
            </span>
          </div>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15]">
            পয়েন্ট জমান —{" "}
            <span className="text-grad">পুরস্কার আনুন।</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-fg-muted leading-relaxed">
            {PARTNER_PERIOD.startBn} – {PARTNER_PERIOD.endBn} পর্যন্ত পয়েন্ট
            অর্জন করুন। নির্দিষ্ট থ্রেশহোল্ডে পৌঁছালে কোম্পানির খরচে ফ্রি
            পুরস্কার।
          </p>
        </motion.div>

        {/* Awards ladder */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PARTNER_AWARDS.map((award, i) => {
            const Icon = AWARD_ICONS[award.accent];
            return (
              <motion.div
                key={award.titleEn}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-3xl overflow-hidden shadow-xl p-8 text-white"
                style={{ backgroundColor: ACCENT_HEX[award.accent] }}
              >
                <div className="absolute inset-0 opacity-25 mix-blend-overlay grid-bg" />
                <div className="absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-white/20 blur-3xl animate-blob" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/95 shadow-lg">
                      <Icon className="h-7 w-7 text-fg" />
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-white/80">
                        লক্ষ্য
                      </div>
                      <div className="text-3xl font-bold text-white">
                        {bnNumber(award.threshold)}{" "}
                        <span className="text-base font-semibold">পয়েন্ট</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-6 text-2xl sm:text-3xl font-bold leading-tight">
                    {award.titleBn}
                  </h3>
                  <p className="mt-2 text-sm text-white/85 leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Point earning table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 card p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red text-white shadow-md">
              <Star className="h-5 w-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-fg">
              পয়েন্ট কীভাবে অর্জন করবেন
            </h3>
          </div>

          <ul className="divide-y divide-border">
            {POINT_RULES.map((p) => (
              <li
                key={p.item}
                className="flex items-start justify-between gap-4 py-3.5"
              >
                <span className="text-sm sm:text-base text-fg-soft leading-relaxed">
                  {p.item}
                </span>
                <span className="shrink-0 text-sm sm:text-base font-bold text-grad-rb whitespace-nowrap">
                  {p.points}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
