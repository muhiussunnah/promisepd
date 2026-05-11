"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";

export default function Testimonials() {
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
            <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
              বাস্তব কণ্ঠ
            </span>
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
            আমাদের পরিবার{" "}
            <span className="text-grad">যা বলে।</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 sm:w-32 z-10 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-32 z-10 bg-gradient-to-l from-bg to-transparent pointer-events-none" />

        <div className="overflow-hidden">
          <div className="flex gap-6 w-max animate-marquee">
            {items.map((t, i) => (
              <article
                key={i}
                className="grad-border w-[min(380px,85vw)] shrink-0 p-6 sm:p-7"
              >
                <div className="flex items-center justify-between mb-3">
                  <Quote className="h-8 w-8 text-brand-red/50" />
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-3.5 w-3.5 fill-brand-red text-brand-red"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm sm:text-base text-fg-soft leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[image:var(--grad-rb)] flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-fg">{t.name}</div>
                    <div className="text-xs text-fg-muted">{t.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
