"use client";

/** Reusable "watch our promo" button.  Click pops a centred YouTube
 *  lightbox instead of routing the visitor off-site — keeps them on
 *  the page so the next CTA is one scroll away when they finish.
 *
 *  Behaviours baked in:
 *   - ESC key closes
 *   - Click on the dimmed backdrop closes
 *   - Body scroll locked while the modal is open (no double-scroll)
 *   - Iframe only mounts when the modal opens (and unmounts on close)
 *     so the YouTube player isn't sitting in the page DOM doing
 *     nothing — saves the third-party bytes for visitors who never
 *     click.
 *   - role="dialog" + aria-modal + ESC handler for screen-reader
 *     and keyboard users.
 *
 *  Default label is "প্রোমো ভিডিও"; pass any children to override
 *  (e.g. "পরামর্শ নিন" on the hero, "ভিডিও দেখুন" elsewhere). */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

// One source of truth for the promo video — if it changes, this is
// the only line to edit.
const PROMO_VIDEO_ID = "kxKG8eU6L9s";

export default function PromoVideoButton({
  children,
  className,
}: {
  children?: React.ReactNode;
  /** Optional Tailwind override.  Default matches the existing
   *  "white ghost" CTA so it drops into the hero with no styling
   *  change. */
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  // ESC to close + body scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={
          className ??
          "group inline-flex items-center justify-center gap-2 rounded-2xl bg-white border border-border px-6 py-3.5 text-sm sm:text-base font-semibold text-fg hover:border-brand-blue/40 hover:shadow-lg transition-all"
        }
      >
        <Play className="h-4 w-4 text-brand-red" />
        {children ?? "প্রোমো ভিডিও"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Promise PD প্রোমো ভিডিও"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          >
            {/* Backdrop — click to close */}
            <div
              className="absolute inset-0 bg-fg/85 backdrop-blur-md"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl"
            >
              {/* Close button — sits above the video, always visible
                  against the dimmed backdrop. */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="ভিডিও বন্ধ করুন"
                className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-fg shadow-lg hover:scale-110 transition-transform"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black ring-1 ring-white/10">
                <iframe
                  // Mounted only while `open` is true (the entire
                  // <AnimatePresence> subtree unmounts on close), so
                  // the YouTube player + its tracking pixels are
                  // never loaded for visitors who don't watch.
                  src={`https://www.youtube.com/embed/${PROMO_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title="Promise PD প্রোমো ভিডিও"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
