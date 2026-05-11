"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Sparkles, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const STORAGE_KEY = "ppd-pwa-prompt-dismissed";
const COOLDOWN_DAYS = 7;
const APPEAR_DELAY_MS = 4000;

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Already running as installed PWA?
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone
    ) {
      return;
    }

    // Recently dismissed?
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed) {
        const days =
          (Date.now() - parseInt(dismissed, 10)) / (1000 * 60 * 60 * 24);
        if (days < COOLDOWN_DAYS) return;
      }
    } catch {
      /* ignore */
    }

    const ua = window.navigator.userAgent;
    const ios =
      /iPad|iPhone|iPod/.test(ua) &&
      !(window as Window & { MSStream?: unknown }).MSStream;
    setIsIOS(ios);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      window.setTimeout(() => setShow(true), APPEAR_DELAY_MS);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // iOS doesn't fire beforeinstallprompt — show after a delay anyway
    let iosTimer: number | undefined;
    if (ios) {
      iosTimer = window.setTimeout(() => setShow(true), APPEAR_DELAY_MS);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      if (iosTimer) window.clearTimeout(iosTimer);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    setInstalling(true);
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShow(false);
      }
    } finally {
      setInstalling(false);
      setDeferredPrompt(null);
    }
  }

  function handleDismiss() {
    setShow(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 180 }}
          className="fixed bottom-24 left-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto z-[60] w-auto sm:w-[min(420px,calc(100vw-3rem))]"
        >
          <div className="relative grad-border p-5 sm:p-6 shadow-2xl">
            <button
              onClick={handleDismiss}
              aria-label="বন্ধ করুন"
              className="absolute top-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-bg-soft hover:bg-bg-soft-2 transition-colors"
            >
              <X className="h-4 w-4 text-fg-muted" />
            </button>

            <div className="flex items-start gap-4 pr-6">
              <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--grad-rb)] shadow-md">
                <Download className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-brand-red" />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-brand-red">
                    নতুন · দ্রুত · অফলাইন
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-fg leading-tight">
                  Promise PPD অ্যাপ ইনস্টল করুন
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-fg-muted leading-relaxed">
                  {isIOS
                    ? "Safari-র শেয়ার বাটনে ট্যাপ করুন → 'Add to Home Screen' সিলেক্ট করুন। হোম স্ক্রিন থেকে এক ট্যাপেই খুলবে।"
                    : "এক ক্লিকে আপনার ফোন বা ডেস্কটপে ইনস্টল করুন। দ্রুত খুলবে, অফলাইনেও কাজ করবে — ব্রাউজার লাগবে না।"}
                </p>
              </div>
            </div>

            {isIOS ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-bg-soft border border-border px-3 py-2.5">
                <Share className="h-4 w-4 text-brand-blue shrink-0" />
                <span className="text-xs text-fg-muted leading-snug">
                  নিচে Safari-র শেয়ার আইকনে ট্যাপ করুন → স্ক্রল করে{" "}
                  <strong className="text-fg">Add to Home Screen</strong>
                </span>
              </div>
            ) : deferredPrompt ? (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleInstall}
                  disabled={installing}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[image:var(--grad-rb)] px-4 py-2.5 text-sm font-bold text-white shadow-md hover:scale-[1.02] transition-transform btn-shine disabled:opacity-70"
                >
                  <Download className="h-4 w-4" />
                  {installing ? "ইনস্টল হচ্ছে..." : "ইনস্টল করুন"}
                </button>
                <button
                  onClick={handleDismiss}
                  className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-fg-muted hover:text-fg hover:border-border-strong transition-colors"
                >
                  পরে
                </button>
              </div>
            ) : (
              <p className="mt-4 text-xs text-fg-faint">
                ব্রাউজারের মেনু থেকে &ldquo;Install App&rdquo; অপশনটি বেছে নিন।
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
