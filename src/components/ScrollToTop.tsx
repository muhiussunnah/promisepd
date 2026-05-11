"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import { toBn } from "@/lib/bn";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const p =
        total > 0 ? Math.min(100, Math.round((window.scrollY / total) * 100)) : 0;
      setPercent(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ring geometry — 64×64 viewBox, stroke 4, radius 28
  const SIZE = 64;
  const STROKE = 4;
  const R = (SIZE - STROKE) / 2;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ type: "spring", damping: 22, stiffness: 240 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-1.5"
        >
          {/* Button with circular progress ring around it */}
          <div className="relative" style={{ width: SIZE, height: SIZE }}>
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="absolute inset-0 -rotate-90"
              aria-hidden
            >
              {/* Track */}
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={R}
                fill="none"
                stroke="var(--color-brand-ash-tint)"
                strokeWidth={STROKE}
              />
              {/* Progress fill */}
              <motion.circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={R}
                fill="none"
                stroke="var(--color-brand-red)"
                strokeWidth={STROKE}
                strokeLinecap="round"
                pathLength={1}
                style={{ pathLength: smooth }}
              />
            </svg>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="উপরে যান"
              className="absolute inset-2 flex items-center justify-center rounded-full bg-brand-red text-white shadow-lg shadow-brand-red/40 hover:bg-brand-red-dark transition-colors"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Percentage scrolled — Bangla numerals */}
          <div className="text-[11px] font-bold tabular-nums text-brand-red leading-none px-2 py-0.5 rounded-full bg-white shadow-sm border border-brand-red-tint">
            {toBn(percent)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
