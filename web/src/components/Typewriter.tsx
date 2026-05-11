"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Phrase = { name: string; pitch: string; color: string };

const COLOR_TO_GRAD: Record<string, string> = {
  red: "from-brand-red to-brand-red-soft",
  blue: "from-brand-blue to-brand-blue-soft",
  indigo: "from-indigo-500 to-brand-blue",
  amber: "from-amber-500 to-orange-500",
  rose: "from-rose-500 to-pink-600",
};

const COLOR_TO_CURSOR: Record<string, string> = {
  red: "#e11d2e",
  blue: "#1d4fd8",
  indigo: "#6366f1",
  amber: "#f59e0b",
  rose: "#f43f5e",
};

/** Split text into user-perceived characters (graphemes) so Bangla conjuncts stay intact. */
function getGraphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    try {
      const seg = new Intl.Segmenter("bn", { granularity: "grapheme" });
      return Array.from(seg.segment(text), (s) => s.segment);
    } catch {
      // fall through
    }
  }
  return Array.from(text);
}

export default function Typewriter({
  phrases,
  typeMs = 55,
  holdMs = 1800,
  deleteMs = 28,
  size = "default",
}: {
  phrases: Phrase[];
  typeMs?: number;
  holdMs?: number;
  deleteMs?: number;
  size?: "default" | "hero";
}) {
  const reduce = useReducedMotion();
  const [pIdx, setPIdx] = useState(0);
  const [chIdx, setChIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  const current = phrases[pIdx];
  const graphemes = useMemo(() => getGraphemes(current.pitch), [current.pitch]);

  useEffect(() => {
    if (reduce) {
      // Reduced motion: just show full text, no animation
      setChIdx(graphemes.length);
      const t = setTimeout(
        () => setPIdx((i) => (i + 1) % phrases.length),
        3500,
      );
      return () => clearTimeout(t);
    }

    if (phase === "typing") {
      if (chIdx < graphemes.length) {
        const t = setTimeout(() => setChIdx((c) => c + 1), typeMs);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("holding"), 100);
      return () => clearTimeout(t);
    }
    if (phase === "holding") {
      const t = setTimeout(() => setPhase("deleting"), holdMs);
      return () => clearTimeout(t);
    }
    if (phase === "deleting") {
      if (chIdx > 0) {
        const t = setTimeout(() => setChIdx((c) => c - 1), deleteMs);
        return () => clearTimeout(t);
      }
      setPIdx((i) => (i + 1) % phrases.length);
      setPhase("typing");
    }
  }, [phase, chIdx, graphemes.length, typeMs, holdMs, deleteMs, phrases.length, reduce]);

  const display = graphemes.slice(0, chIdx).join("");
  const cursorColor = COLOR_TO_CURSOR[current.color] ?? COLOR_TO_CURSOR.red;

  const isHero = size === "hero";

  return (
    <div className={`flex flex-col items-center ${isHero ? "gap-5" : "gap-3"}`}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={pIdx}
          initial={{ y: 8, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -8, opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.2 }}
          className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${
            COLOR_TO_GRAD[current.color] ?? COLOR_TO_GRAD.red
          } shadow-md text-white font-bold tracking-wider ${
            isHero ? "px-5 py-1.5 text-xs sm:text-sm" : "px-3.5 py-1 text-[11px]"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          {current.name}
        </motion.span>
      </AnimatePresence>

      <div
        className={`text-center px-4 ${
          isHero ? "min-h-[3.2em] max-w-4xl mx-auto" : "min-h-[2.5em]"
        }`}
      >
        <span
          className={`font-bold leading-[1.25] tracking-tight ${
            isHero
              ? "text-[clamp(1.25rem,3vw,2.25rem)] text-fg"
              : "text-base sm:text-xl lg:text-2xl font-semibold text-fg-soft leading-snug"
          }`}
        >
          {display}
          <span
            className={`inline-block align-middle animate-pulse ${
              isHero ? "w-[2px] sm:w-[3px]" : "w-[2px] sm:w-[3px]"
            }`}
            style={{
              height: "0.95em",
              background: cursorColor,
              marginLeft: 3,
              verticalAlign: "-0.15em",
            }}
            aria-hidden
          />
        </span>
      </div>
    </div>
  );
}
