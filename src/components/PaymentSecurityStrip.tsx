/** Payment-methods + security-trust strip used in the footer.
 *
 *  Stylised brand badges rather than logo files — keeps the bundle
 *  tiny (no extra HTTP requests for tiny PNGs) and gives us pixel-
 *  perfect rendering at any DPR.  Colours and wordmarks come from
 *  each provider's public brand guidelines circa 2026.
 *
 *  When the partnership officially closes with a provider, drop the
 *  real logo into /public (run it through the WebP pipeline first)
 *  and swap the corresponding component below for an <Image>. */

import { ShieldCheck, Lock, BadgeCheck } from "lucide-react";

type PayBadge = {
  label: string;
  className: string;
  textClassName?: string;
};

const PAYMENT_METHODS: PayBadge[] = [
  // Official 2026 brand colours.  Each chip uses its provider's
  // signature colour so the strip reads as authentic at a glance.
  { label: "bKash", className: "bg-[#E2136E]" },
  { label: "Nagad", className: "bg-[#F26522]" },
  { label: "Rocket", className: "bg-[#8C3494]" },
  { label: "Upay", className: "bg-[#5B2D90]" },
  { label: "Bank Transfer", className: "bg-brand-blue" },
];

const TRUST_BADGES = [
  {
    Icon: ShieldCheck,
    title: "SSLCommerz",
    sub: "Secure Gateway",
  },
  {
    Icon: Lock,
    title: "SSL Secured",
    sub: "256-bit Encrypted",
  },
  {
    Icon: BadgeCheck,
    title: "Verified Business",
    sub: "RAJUK Approved",
  },
];

export default function PaymentSecurityStrip() {
  return (
    <div className="space-y-4">
      {/* Payment methods row */}
      <div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-fg-faint font-bold mb-2.5">
          পেমেন্ট মেথড
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PAYMENT_METHODS.map((p) => (
            <span
              key={p.label}
              className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold text-white shadow-sm ${p.className} ${p.textClassName ?? ""}`}
              title={`${p.label} accepted`}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>

      {/* Trust / security badges */}
      <div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-fg-faint font-bold mb-2.5">
          নিরাপত্তা ও বিশ্বস্ততা
        </div>
        <div className="space-y-1.5">
          {TRUST_BADGES.map(({ Icon, title, sub }) => (
            <div
              key={title}
              className="flex items-center gap-2 rounded-lg bg-white border border-border px-2.5 py-1.5"
            >
              <Icon className="h-4 w-4 text-brand-blue shrink-0" />
              <div className="min-w-0 leading-tight">
                <div className="text-[11px] font-bold text-fg truncate">
                  {title}
                </div>
                <div className="text-[9px] text-fg-faint truncate uppercase tracking-wider">
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
