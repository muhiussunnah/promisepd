"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.4, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 30 }}
          transition={{ type: "spring", damping: 18, stiffness: 240 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="উপরে যান"
          className="fixed bottom-6 right-6 z-40 group"
        >
          <svg
            viewBox="0 0 56 56"
            className="absolute inset-0 -rotate-90"
            aria-hidden
          >
            <circle
              cx="28"
              cy="28"
              r="25"
              strokeWidth="3"
              stroke="rgba(15,23,42,0.08)"
              fill="none"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="25"
              strokeWidth="3"
              stroke="url(#stt-grad)"
              fill="none"
              strokeLinecap="round"
              pathLength={1}
              style={{ pathLength: progress }}
            />
            <defs>
              <linearGradient id="stt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e11d2e" />
                <stop offset="100%" stopColor="#1d4fd8" />
              </linearGradient>
            </defs>
          </svg>
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[image:var(--grad-rb)] text-white shadow-[var(--shadow-brand)] group-hover:scale-110 transition-transform">
            <ArrowUp className="h-5 w-5" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
