"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Award,
  Users,
  CreditCard,
  ShieldCheck,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import AnimatedBlobs from "./AnimatedBlobs";
import { WHY_US } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  MapPin,
  Award,
  Users,
  CreditCard,
  ShieldCheck,
  Headphones,
};

export default function WhyUs() {
  return (
    <section
      id="why"
      className="relative isolate overflow-hidden py-24 sm:py-32 bg-bg-soft"
    >
      <AnimatedBlobs
        blobs={[
          {
            className:
              "left-[10%] top-[5%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(225,29,46,0.16),transparent_60%)]",
            parallax: -80,
          },
          {
            className:
              "right-[5%] bottom-[10%] w-[45vw] h-[45vw] bg-[radial-gradient(circle,rgba(29,79,216,0.18),transparent_60%)]",
            parallax: 120,
            delay: 6,
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse" />
            <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
              কেন প্রমিজ PPD
            </span>
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
            যে কারণে পরিবার{" "}
            <span className="text-grad">আমাদের বেছে নেয়।</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                className="card group relative overflow-hidden p-6 sm:p-7"
              >
                <div className="absolute inset-0 bg-[image:var(--grad-rb)] opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500" />
                <div className="relative flex items-start gap-4">
                  <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-bg-soft-2 group-hover:bg-[image:var(--grad-rb)] transition-colors duration-300">
                    {Icon && (
                      <Icon className="h-5 w-5 text-brand-blue group-hover:text-white transition-colors" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-fg">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-fg-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
