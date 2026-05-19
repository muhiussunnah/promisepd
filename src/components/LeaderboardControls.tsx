"use client";

/** Leaderboard search + role filter + time-period sort row.
 *
 *  Sits between the rewards strip and the rank table on /leaderboard.
 *  Currently a client-only UI scaffold — the partner-program data
 *  source isn't live yet, so none of the controls filter anything
 *  below them.  When the Supabase query lands, lift `query` +
 *  `role` + `period` state up (or move into URL params) and pass
 *  them into the rank query — UI stays as-is.
 *
 *  Layout: search on the left taking available width, then two
 *  pill dropdowns on the right (role first, then time-period). */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  ChevronDown,
  Users,
} from "lucide-react";

type Period = "30d" | "year" | "last-year" | "lifetime";

type Role = "all" | "head" | "director" | "active" | "officer";

const PERIODS: { key: Period; label: string }[] = [
  { key: "30d", label: "শেষ ৩০ দিন" },
  { key: "year", label: "এই বছর" },
  { key: "last-year", label: "গত বছর" },
  { key: "lifetime", label: "সর্বকালীন" },
];

// Role hierarchy matches the partner program rules:
//   Head of Marketing        — exactly one, lifetime top seller.
//   Marketing Director       — anyone who's recruited 5+ active
//                              officers (multiple are possible).
//   Active Marketing Officer — at least 5 points earned.
//   Marketing Officer        — 1–4 points (entry tier).
const ROLES: { key: Role; label: string; sub: string }[] = [
  { key: "all", label: "সকল ভূমিকা", sub: "" },
  {
    key: "head",
    label: "Head of Marketing",
    sub: "Lifetime top seller · একজন",
  },
  {
    key: "director",
    label: "Marketing Director",
    sub: "৫+ active officer রিক্রুট",
  },
  {
    key: "active",
    label: "Active Marketing Officer",
    sub: "ন্যূনতম ৫ পয়েন্ট",
  },
  {
    key: "officer",
    label: "Marketing Officer",
    sub: "১–৪ পয়েন্ট",
  },
];

export default function LeaderboardControls() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<Role>("all");
  const [period, setPeriod] = useState<Period>("year");
  const [roleOpen, setRoleOpen] = useState(false);
  const [periodOpen, setPeriodOpen] = useState(false);

  const currentRoleLabel =
    ROLES.find((r) => r.key === role)?.label ?? "সকল ভূমিকা";
  const currentPeriodLabel =
    PERIODS.find((p) => p.key === period)?.label ?? "এই বছর";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4 }}
      className="card p-3 sm:p-4 flex flex-col sm:flex-row gap-3"
    >
      {/* Search — left, takes available width. */}
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

      {/* Role dropdown — left of the time-period select.  Filter by
          the partner-program role hierarchy. */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setRoleOpen((v) => !v);
            setPeriodOpen(false);
          }}
          className="w-full sm:w-auto flex items-center justify-between gap-2 rounded-xl bg-bg-soft px-4 py-3 text-sm font-semibold text-fg hover:bg-bg-soft-2 transition-colors"
          aria-haspopup="listbox"
          aria-expanded={roleOpen}
        >
          <span className="inline-flex items-center gap-2">
            <Users className="h-4 w-4 text-fg-muted" />
            {currentRoleLabel}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              roleOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {roleOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setRoleOpen(false)}
                aria-hidden
              />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-full sm:w-72 z-30 glass-strong rounded-2xl p-2 shadow-2xl"
                role="listbox"
              >
                {ROLES.map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    role="option"
                    aria-selected={role === r.key}
                    onClick={() => {
                      setRole(r.key);
                      setRoleOpen(false);
                    }}
                    className={`w-full flex items-start justify-between gap-2 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      role === r.key
                        ? "bg-bg-soft"
                        : "hover:bg-bg-soft"
                    }`}
                  >
                    <div className="min-w-0">
                      <div
                        className={`text-sm leading-tight ${
                          role === r.key
                            ? "font-bold text-fg"
                            : "text-fg-soft"
                        }`}
                      >
                        {r.label}
                      </div>
                      {r.sub && (
                        <div className="mt-0.5 text-[11px] text-fg-faint">
                          {r.sub}
                        </div>
                      )}
                    </div>
                    {role === r.key && (
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-blue shrink-0" />
                    )}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Time-period dropdown — rightmost. */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setPeriodOpen((v) => !v);
            setRoleOpen(false);
          }}
          className="w-full sm:w-auto flex items-center justify-between gap-2 rounded-xl bg-bg-soft px-4 py-3 text-sm font-semibold text-fg hover:bg-bg-soft-2 transition-colors"
          aria-haspopup="listbox"
          aria-expanded={periodOpen}
        >
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4 text-fg-muted" />
            {currentPeriodLabel}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              periodOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {periodOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setPeriodOpen(false)}
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
                      setPeriodOpen(false);
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
