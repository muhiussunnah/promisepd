"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Building2,
  Hammer,
  Landmark,
  Plane,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV, SITE, SECTION_META, NAV_IDS, DIVISIONS } from "@/lib/site";
import { useActiveSection } from "@/lib/useActiveSection";

const DIV_ICONS: Record<string, LucideIcon> = {
  Building2,
  Hammer,
  Landmark,
  Plane,
  Palette,
};

const ACCENT_TO_GRAD: Record<string, string> = {
  red: "from-brand-red to-brand-red-soft",
  blue: "from-brand-blue to-brand-blue-soft",
  rose: "from-rose-500 to-pink-600",
  indigo: "from-indigo-500 to-brand-blue",
  amber: "from-amber-500 to-orange-500",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDivOpen, setMobileDivOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Only track sections on home page
  const activeSection = useActiveSection(isHome ? NAV_IDS : [], 120);

  // Determine the navbar meta to display
  const divisionSlug = pathname.startsWith("/divisions/")
    ? pathname.split("/")[2]
    : null;
  const currentDivision = divisionSlug
    ? DIVISIONS.find((d) => d.slug === divisionSlug)
    : null;

  const meta = currentDivision
    ? { title: currentDivision.nameBn, tagline: currentDivision.tagline }
    : (isHome ? SECTION_META[activeSection] : null) ?? SECTION_META.home;

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

  // Auto-scrolled state when not on home (so inner pages always have solid navbar)
  const isCondensed = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <motion.div
          animate={{
            paddingTop: isCondensed ? 8 : 18,
            paddingBottom: isCondensed ? 8 : 18,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            animate={{
              backgroundColor: isCondensed
                ? "rgba(255,255,255,0.85)"
                : "rgba(255,255,255,0)",
              borderColor: isCondensed
                ? "rgba(229,231,235,0.9)"
                : "rgba(229,231,235,0)",
              boxShadow: isCondensed
                ? "0 10px 40px -15px rgba(15,23,42,0.18)"
                : "0 0 0 0 rgba(0,0,0,0)",
              backdropFilter: isCondensed ? "blur(22px) saturate(180%)" : "blur(0px)",
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between rounded-2xl px-3 sm:px-5 border"
            style={{
              WebkitBackdropFilter: isCondensed ? "blur(22px) saturate(180%)" : "none",
            }}
          >
            <Link
              href="/#home"
              className="flex items-center gap-3 group min-w-0 py-1.5"
              aria-label={SITE.shortName}
            >
              <motion.div
                animate={{
                  width: isCondensed ? 40 : 48,
                  height: isCondensed ? 40 : 48,
                }}
                transition={{ duration: 0.4 }}
                className="relative rounded-xl overflow-hidden bg-white p-1 ring-1 ring-border shrink-0"
              >
                <Image
                  src="/logo.png"
                  alt={SITE.shortName}
                  fill
                  sizes="48px"
                  className="object-contain p-0.5"
                  priority
                />
              </motion.div>
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
              {NAV.map((item) => {
                const isActive = isHome && activeSection === item.id;
                if (item.dropdown) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <Link
                        href={item.href}
                        data-active={isActive}
                        className={`link-underline flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                          isActive ? "text-fg" : "text-fg-soft hover:text-fg"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${
                            dropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </Link>

                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[440px] glass-strong rounded-2xl p-3 shadow-2xl"
                          >
                            <div className="grid gap-1">
                              {item.dropdown.map((d) => {
                                const Icon = DIV_ICONS[d.icon] ?? Building2;
                                return (
                                  <Link
                                    key={d.slug}
                                    href={d.href}
                                    onClick={() => setDropdownOpen(false)}
                                    className="group flex items-start gap-3 rounded-xl p-3 hover:bg-bg-soft transition-colors"
                                  >
                                    <div
                                      className={`shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${
                                        ACCENT_TO_GRAD[d.accent] ?? ACCENT_TO_GRAD.red
                                      } text-white shadow-md group-hover:scale-105 transition-transform`}
                                    >
                                      <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-sm font-bold text-fg leading-tight">
                                        {d.label}
                                      </div>
                                      <div className="mt-0.5 text-xs text-fg-muted leading-snug">
                                        {d.tagline}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-active={isActive}
                    className={`link-underline px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-fg" : "text-fg-soft hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 py-1">
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
          </motion.div>
        </motion.div>
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
              className="absolute right-0 top-0 h-full w-[min(360px,85vw)] bg-white shadow-2xl p-6 overflow-y-auto"
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
                {NAV.map((item, i) => {
                  const isActive = isHome && activeSection === item.id;
                  if (item.dropdown) {
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.05 * i }}
                      >
                        <button
                          onClick={() => setMobileDivOpen((v) => !v)}
                          className="w-full group flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium hover:bg-bg-soft text-fg transition-colors"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              mobileDivOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileDivOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-2 pt-1 pb-2 grid gap-1">
                                {item.dropdown.map((d) => {
                                  const Icon = DIV_ICONS[d.icon] ?? Building2;
                                  return (
                                    <Link
                                      key={d.slug}
                                      href={d.href}
                                      onClick={() => setOpen(false)}
                                      className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-bg-soft transition-colors"
                                    >
                                      <div
                                        className={`shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br ${
                                          ACCENT_TO_GRAD[d.accent] ?? ACCENT_TO_GRAD.red
                                        } text-white shadow-sm`}
                                      >
                                        <Icon className="h-4 w-4" />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="text-sm font-semibold text-fg leading-tight">
                                          {d.label}
                                        </div>
                                        <div className="mt-0.5 text-[11px] text-fg-muted leading-snug">
                                          {d.tagline}
                                        </div>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }
                  return (
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
                          isActive
                            ? "bg-[image:var(--grad-rb)] text-white"
                            : "hover:bg-bg-soft text-fg"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span
                          className={
                            isActive
                              ? "text-white"
                              : "text-fg-faint group-hover:text-brand-red transition-colors"
                          }
                        >
                          →
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
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
