"use client";

import { motion } from "framer-motion";
import {
  Home,
  Building2,
  MapPin,
  TrendingUp,
  Compass,
  CreditCard,
  ShieldCheck,
  LifeBuoy,
  Plus,
  type LucideIcon,
} from "lucide-react";
import AnimatedBlobs from "./AnimatedBlobs";
import { SERVICES } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  Home,
  Building2,
  MapPin,
  TrendingUp,
  Compass,
  CreditCard,
  ShieldCheck,
  LifeBuoy,
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden py-24 sm:py-32 bg-bg-soft"
    >
      <AnimatedBlobs
        blobs={[
          {
            className:
              "right-[-15%] top-[5%] w-[45vw] h-[45vw] bg-[radial-gradient(circle,rgba(225,29,46,0.18),transparent_60%)]",
            parallax: -100,
          },
          {
            className:
              "left-[-10%] bottom-[5%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(29,79,216,0.2),transparent_60%)]",
            parallax: 140,
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
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse" />
            <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
              আমরা কী করি
            </span>
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
            যা যা প্রয়োজন,{" "}
            <span className="text-grad">এক ছাদের নিচে।</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-fg-muted leading-relaxed">
            প্রথম কথোপকথন থেকে চাবি হস্তান্তরের অনেক পরেও — আট ধরনের সেবা, যা
            সম্পত্তির মালিকানার প্রতিটি ধাপ কভার করে।
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                whileHover={{ y: -8 }}
                className="card group relative h-full p-6 overflow-hidden"
              >
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.3),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--grad-rb)] shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  {Icon && <Icon className="h-6 w-6 text-white" />}
                </div>

                <h3 className="relative mt-5 text-lg font-bold leading-tight text-fg">
                  {service.title}
                </h3>
                <p className="relative mt-2 text-sm text-fg-muted leading-relaxed">
                  {service.description}
                </p>

                <div className="relative mt-5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-fg-muted group-hover:text-grad-rb transition-colors">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[image:var(--grad-rb)] text-white">
                    <Plus className="h-3 w-3" />
                  </span>
                  বিস্তারিত
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
