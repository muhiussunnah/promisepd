"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import { toBn } from "@/lib/bn";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });
  // Vertical progress bar height (track fills as user scrolls)
  const fillHeight = useTransform(smooth, [0, 1], ["0%", "100%"]);

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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ type: "spring", damping: 22, stiffness: 240 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2.5"
        >
          {/* Vertical scroll progress rail */}
          <div className="relative h-28 w-1.5 rounded-full bg-brand-ash-tint overflow-hidden">
            <motion.div
              style={{ height: fillHeight }}
              className="absolute top-0 left-0 right-0 bg-brand-red rounded-full"
            />
          </div>

          {/* Percentage label */}
          <div className="text-[10px] font-bold tabular-nums text-brand-red leading-none">
            {toBn(percent)}%
          </div>

          {/* Scroll-to-top button — solid brand red */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="উপরে যান"
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-white shadow-lg shadow-brand-red/40 hover:bg-brand-red-dark transition-colors"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
