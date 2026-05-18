"use client";

/** Leaderboard search + time-period sort row.
 *
 *  Sits between the rewards strip and the rank table on /leaderboard.
 *  Currently a client-only UI scaffold — the partner-program data
 *  source isn't live yet, so neither the search input nor the period
 *  dropdown filters anything below them.  When the Supabase query
 *  lands, lift the `query` + `period` state up (or move into a URL
 *  param) and pass them into the rank query — UI stays as-is.
 *
 *  Layout matches the blog's filter bar: search on the left taking
 *  the available space, the period select on the right. */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ChevronDown } from "lucide-react";

type Period = "30d" | "year" | "last-year" | "lifetime";

const PERIODS: { key: Period; label: string }[] = [
  { key: "30d", label: "শেষ ৩০ দিন" },
  { key: "year", label: "এই বছর" },
  { key: "last-year", label: "গত বছর" },
  { key: "lifetime", label: "সর্বকালীন" },
];

export default function LeaderboardControls() {
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState<Period>("year");
  const [open, setOpen] = useState(false);

  const currentLabel =
    PERIODS.find((p) => p.key === period)?.label ?? "এই বছর";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4 }}
      className="card p-3 sm:p-4 flex flex-col sm:flex-row gap-3"
    >
      {/* Search — left, takes available width.  Lets a partner type
          their username / email / mobile / ID to jump to their own
          row.  Visible feedback only — actual scroll-to-row gets
          wired once the data layer is in place. */}
      <div className="flex-1 flex items-center gap-2 rounded-xl bg-bg-soft px-4">
        <Search className="h-4 w-4 text-fg-muted shrink-0" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ইউজারনেম, ইমেইল, মোবাইল বা ID দিয়ে নিজের অবস্থান খুঁজুন…"
          className="w-full bg-transparent py-3 text-sm text-fg placeholder:text-fg-faint outline-none"
          aria-label="লিডারবোর্ডে খুঁজুন"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-[11px] font-bold uppercase tracking-wider text-fg-muted hover:text-brand-blue transition-colors"
          >
            ক্লিয়ার
          </button>
        )}
      </div>

      {/* Time-period dropdown — right.  Same visual pattern as the
          blog's category dropdown so the two surfaces feel familial. */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full sm:w-auto flex items-center justify-between gap-2 rounded-xl bg-bg-soft px-4 py-3 text-sm font-semibold text-fg hover:bg-bg-soft-2 transition-colors"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4 text-fg-muted" />
            {currentLabel}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {open && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setOpen(false)}
                aria-hidden
              />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-full mt-2 w-full sm:w-56 z-30 glass-strong rounded-2xl p-2 shadow-2xl"
                role="listbox"
              >
                {PERIODS.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    role="option"
                    aria-selected={period === p.key}
                    onClick={() => {
                      setPeriod(p.key);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      period === p.key
                        ? "bg-bg-soft font-bold text-fg"
                        : "text-fg-soft hover:bg-bg-soft"
                    }`}
                  >
                    <span>{p.label}</span>
                    {period === p.key && (
                      <span className="h-2 w-2 rounded-full bg-brand-blue" />
                    )}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
