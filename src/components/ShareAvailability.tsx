"use client";

import { useState } from "react";
import { Building2, Phone, ChevronDown } from "lucide-react";
import { toBn } from "@/lib/bn";

type Filter = "available" | "booked" | "all";

/** Fuzala-Tower-style limited-share map.  `total` numbered shares,
 *  the first `sold` are gone, the rest are open & tap-to-book.
 *  A filter dropdown keeps the page short — defaults to showing only
 *  the open shares (50), with a "বিক্রি শেষ" view for the booked 300. */
export default function ShareAvailability({
  total,
  sold,
  note,
  phone,
}: {
  total: number;
  sold: number;
  note?: string;
  phone: string;
}) {
  const [filter, setFilter] = useState<Filter>("available");
  const remaining = total - sold;

  // Numbers to render, based on the current filter.
  const numbers: number[] = [];
  for (let n = 1; n <= total; n++) {
    const isAvailable = n > sold;
    if (
      filter === "all" ||
      (filter === "available" && isAvailable) ||
      (filter === "booked" && !isAvailable)
    ) {
      numbers.push(n);
    }
  }

  return (
    <section className="relative py-12 sm:py-16 bg-bg-soft">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="h-6 w-6 text-brand-blue" />
          <h2 className="text-2xl sm:text-3xl font-bold">
            শেয়ার <span className="text-grad">অ্যাভেইলেবিলিটি</span>
          </h2>
        </div>
        <p className="text-sm sm:text-base text-fg-muted mb-5">
          মোট {toBn(total)}টি শেয়ার · {toBn(sold)}টি বিক্রি শেষ ·{" "}
          <span className="font-bold text-brand-red">
            মাত্র {toBn(remaining)}টি বাকি
          </span>{" "}
          — দ্রুত শেষ হয়ে যাচ্ছে!
        </p>

        {/* Filter dropdown + legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <label className="relative inline-flex items-center">
            <span className="sr-only">শেয়ার ফিল্টার</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as Filter)}
              aria-label="শেয়ার ফিল্টার"
              className="appearance-none rounded-xl border border-border bg-white pl-4 pr-10 py-2.5 text-sm font-semibold text-fg shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30 cursor-pointer"
            >
              <option value="available">
                খালি — মাত্র {toBn(remaining)}টি
              </option>
              <option value="booked">বিক্রি শেষ — {toBn(sold)}টি</option>
              <option value="all">সব দেখুন — {toBn(total)}টি</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-fg-muted" />
          </label>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-fg-soft">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3.5 w-3.5 rounded bg-brand-blue/15 border border-brand-blue/50" />
              খালি — ক্লিক করে বুক করুন
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-3.5 w-3.5 rounded bg-brand-red/10 border border-brand-red/30" />
              বিক্রি শেষ
            </span>
          </div>
        </div>

        {/* Share grid */}
        <div className="rounded-2xl border border-border bg-white p-3 sm:p-4">
          <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-1.5 sm:gap-2">
            {numbers.map((n) => {
              const isAvailable = n > sold;
              if (isAvailable) {
                return (
                  <a
                    key={n}
                    href={`tel:${phone}`}
                    title={`শেয়ার ${toBn(n)} — খালি · বুক করতে কল করুন`}
                    className="group relative inline-flex flex-col items-center justify-center rounded-lg border-2 border-brand-blue/50 bg-gradient-to-b from-brand-blue/12 to-brand-blue/5 py-1.5 text-brand-blue shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-brand-blue hover:bg-brand-blue hover:text-white hover:shadow-[var(--shadow-brand)]"
                  >
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </span>
                    <span className="text-xs font-extrabold leading-none">
                      {toBn(n)}
                    </span>
                    <span className="mt-0.5 text-[7px] font-bold uppercase leading-none opacity-85 group-hover:opacity-100">
                      খালি
                    </span>
                  </a>
                );
              }
              return (
                <span
                  key={n}
                  className="relative inline-flex flex-col items-center justify-center rounded-lg border border-brand-red/25 bg-brand-red/10 py-1.5 text-brand-red/80"
                >
                  <span className="text-xs font-bold leading-none line-through">
                    {toBn(n)}
                  </span>
                  <span className="mt-0.5 text-[7px] font-bold uppercase leading-none">
                    বিক্রি শেষ
                  </span>
                </span>
              );
            })}
          </div>

          {numbers.length === 0 && (
            <p className="py-8 text-center text-sm text-fg-muted">
              এই মুহূর্তে এই ক্যাটাগরিতে কোনো শেয়ার নেই।
            </p>
          )}
        </div>

        <div className="mt-5 grad-border p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 text-sm text-fg-muted leading-relaxed">
            {note ??
              "পছন্দের খালি শেয়ার নিশ্চিত করতে এখনই যোগাযোগ করুন — সীমিত শেয়ার।"}
          </div>
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-red px-6 py-3 text-sm font-bold text-white shadow-md hover:scale-[1.02] transition-transform whitespace-nowrap"
          >
            <Phone className="h-4 w-4" />
            শেয়ার বুকিং
          </a>
        </div>
      </div>
    </section>
  );
}
