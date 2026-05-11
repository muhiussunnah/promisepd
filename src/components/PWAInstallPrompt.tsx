"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  X,
  Sparkles,
  Share,
  Zap,
  WifiOff,
  Smartphone,
} from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const STORAGE_KEY = "ppd-pwa-prompt-dismissed";
const COOLDOWN_DAYS = 7;
// Reduced from 4s — show our branded prompt before the user reaches for the
// browser's address-bar install icon.
const APPEAR_DELAY_MS = 1500;

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

    // iOS doesn't fire beforeinstallprompt — show after a delay anyway.
    let iosTimer: number | undefined;
    if (ios) {
      iosTimer = window.setTimeout(() => setShow(true), APPEAR_DELAY_MS);
    }

    // Hide our prompt if the install completes via any path (incl. URL-bar icon).
    const onInstalled = () => setShow(false);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
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

  const benefits = [
    { icon: Zap, label: "দ্রুত লোড", color: "text-brand-red" },
    { icon: WifiOff, label: "অফলাইনেও কাজ", color: "text-brand-blue" },
    { icon: Smartphone, label: "হোম স্ক্রিনে", color: "text-brand-ash-dark" },
  ];

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop — dismisses on click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-fg/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", damping: 22, stiffness: 180 }}
            className="relative w-[min(460px,100%)]"
          >
            <div className="relative grad-border overflow-hidden shadow-2xl bg-white">
              {/* Brand gradient banner with logo */}
              <div className="relative h-28 bg-[image:var(--grad-rb)] overflow-hidden">
                <div className="absolute inset-0 opacity-25 mix-blend-overlay grid-bg" />
                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
                <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-white/15 blur-xl" />
                <div className="relative h-full flex items-center justify-center">
                  <div className="rounded-2xl bg-white/95 backdrop-blur-md shadow-xl p-1.5">
                    <Image
                      src="/icon.png"
                      alt="Promise PPD"
                      width={56}
                      height={56}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleDismiss}
                aria-label="বন্ধ করুন"
                className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 backdrop-blur-md text-fg-muted hover:text-fg shadow-md transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="px-5 sm:px-6 pt-5 pb-5 sm:pb-6">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-brand-red" />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-brand-red">
                    নতুন · দ্রুত · অফলাইন
                  </span>
                </div>

                <h3 className="text-center text-lg sm:text-xl font-bold text-fg leading-tight">
                  Promise PPD অ্যাপ ইনস্টল করুন
                </h3>
                <p className="mt-2 text-center text-xs sm:text-sm text-fg-muted leading-relaxed">
                  {isIOS
                    ? "Safari-র শেয়ার বাটনে ট্যাপ করুন → 'Add to Home Screen' সিলেক্ট করুন।"
                    : "এক ক্লিকে ফোন বা ডেস্কটপে — ব্রাউজার লাগবে না, দ্রুত খুলবে, অফলাইনেও কাজ করবে।"}
                </p>

                {/* Benefits row */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {benefits.map(({ icon: Icon, label, color }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1 rounded-xl bg-bg-soft border border-border px-2 py-2.5"
                    >
                      <Icon className={`h-4 w-4 ${color}`} />
                      <span className="text-[10px] sm:text-[11px] font-medium text-fg-soft text-center leading-tight">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {isIOS ? (
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-bg-soft border border-border px-3 py-2.5">
                    <Share className="h-4 w-4 text-brand-blue shrink-0" />
                    <span className="text-xs text-fg-muted leading-snug">
                      Safari-র শেয়ার আইকনে ট্যাপ করুন → নিচে নেমে{" "}
                      <strong className="text-fg">Add to Home Screen</strong>
                    </span>
                  </div>
                ) : deferredPrompt ? (
                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={handleInstall}
                      disabled={installing}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark px-4 py-3 text-sm font-bold text-white shadow-md hover:scale-[1.02] transition-all disabled:opacity-70"
                    >
                      <Download className="h-4 w-4" />
                      {installing ? "ইনস্টল হচ্ছে..." : "ইনস্টল করুন"}
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="rounded-xl border border-border px-4 py-3 text-sm font-semibold text-fg-muted hover:text-fg hover:border-border-strong transition-colors"
                    >
                      পরে
                    </button>
                  </div>
                ) : (
                  <p className="mt-5 text-center text-xs text-fg-faint">
                    ব্রাউজারের মেনু থেকে &ldquo;Install App&rdquo; অপশনটি বেছে নিন।
                  </p>
                )}

                <p className="mt-3 text-center text-[10px] text-fg-faint">
                  সম্পূর্ণ ফ্রি · কোনো অ্যাপ স্টোর লাগবে না
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
