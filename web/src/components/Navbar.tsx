"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV, SITE, SECTION_META } from "@/lib/site";
import { useActiveSection } from "@/lib/useActiveSection";

const SECTION_IDS = NAV.map((n) => n.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS, 120);
  const meta = SECTION_META[active] ?? SECTION_META.home;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-5 ${
              scrolled
                ? "glass-strong shadow-[0_10px_40px_-15px_rgba(15,23,42,0.18)]"
                : "bg-white/40 backdrop-blur-md border border-transparent"
            }`}
          >
            <Link
              href="#home"
              className="flex items-center gap-3 group min-w-0"
              aria-label={SITE.shortName}
            >
              <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-xl overflow-hidden bg-white p-1 ring-1 ring-border shrink-0">
                <Image
                  src="/logo.png"
                  alt={SITE.shortName}
                  fill
                  sizes="48px"
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="hidden sm:flex flex-col leading-tight min-w-0">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={meta.title}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm sm:text-base font-bold tracking-wide text-grad-rb truncate"
                  >
                    {meta.title}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={meta.tagline}
                    initial={{ y: -6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 6, opacity: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    className="text-[11px] text-fg-muted truncate"
                  >
                    {meta.tagline}
                  </motion.span>
                </AnimatePresence>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active === item.id}
                  className={`link-underline px-3 py-2 text-sm font-medium transition-colors ${
                    active === item.id
                      ? "text-fg"
                      : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${SITE.phone}`}
                className="hidden md:inline-flex items-center gap-2 rounded-xl bg-[image:var(--grad-rb)] px-4 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-brand)] hover:scale-[1.03] transition-all btn-shine"
              >
                <Phone className="h-4 w-4" />
                <span>কল করুন</span>
              </a>
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-border hover:border-brand-red/50 transition-colors"
                aria-label="মেনু খুলুন"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-fg/30 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="absolute right-0 top-0 h-full w-[min(360px,85vw)] bg-white shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold text-grad-rb">মেনু</span>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-bg-soft hover:bg-bg-soft-2 transition-colors"
                  aria-label="মেনু বন্ধ করুন"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                        active === item.id
                          ? "bg-[image:var(--grad-rb)] text-white"
                          : "hover:bg-bg-soft text-fg"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={
                          active === item.id
                            ? "text-white"
                            : "text-fg-faint group-hover:text-brand-red transition-colors"
                        }
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <a
                href={`tel:${SITE.phone}`}
                className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-[image:var(--grad-rb)] px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-brand)] btn-shine"
                onClick={() => setOpen(false)}
              >
                <Phone className="h-4 w-4" />
                {SITE.phoneDisplay}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
