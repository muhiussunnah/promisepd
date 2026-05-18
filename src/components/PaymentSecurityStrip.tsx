/** Payment methods + security trust strip — footer column 4.
 *
 *  Uses real, official brand logos (downloaded + WebP-optimised via
 *  scripts/download-payment-logos.mjs).  Visitors recognise the
 *  actual marks — that's the trust signal a solid colour chip can't
 *  carry.
 *
 *  All logos render at a uniform visual height inside white pill
 *  cards so the strip reads as a tidy grid no matter how each
 *  wordmark's aspect ratio differs. */

import Image from "next/image";
import { ShieldCheck, BadgeCheck } from "lucide-react";

type LogoEntry = {
  name: string;
  src: string;
  /** Aspect-ratio anchor for next/image to lay out without CLS. */
  width: number;
  height: number;
};

// Mobile financial services + card networks.  Width/height pairs are
// the cropped WebP's native dimensions at 96 px tall (computed at
// download time) — feeding them to next/image avoids layout shift.
const PAYMENT_LOGOS: LogoEntry[] = [
  { name: "bKash", src: "/payments/bkash.webp", width: 200, height: 96 },
  { name: "Nagad", src: "/payments/nagad.webp", width: 200, height: 96 },
  { name: "Rocket / Dutch-Bangla Bank", src: "/payments/rocket.webp", width: 300, height: 96 },
  { name: "Upay", src: "/payments/upay.webp", width: 100, height: 96 },
  { name: "Visa", src: "/payments/visa.webp", width: 180, height: 96 },
  { name: "Mastercard", src: "/payments/mastercard.webp", width: 130, height: 96 },
];

export default function PaymentSecurityStrip() {
  return (
    <div className="space-y-4">
      {/* ── Payment methods ────────────────────────────────────── */}
      <div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-fg-faint font-bold mb-2.5">
          পেমেন্ট মেথড
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {PAYMENT_LOGOS.map((logo) => (
            <div
              key={logo.name}
              title={`${logo.name} accepted`}
              className="bg-white border border-border rounded-md h-10 flex items-center justify-center px-2 hover:border-brand-blue/30 transition-colors"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="max-h-6 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Security / trust badges ────────────────────────────── */}
      <div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-fg-faint font-bold mb-2.5">
          সুরক্ষিত পেমেন্ট
        </div>
        <div className="space-y-1.5">
          {/* SSLCommerz gets a logo card — it's the highest-recognition
              trust mark for online payments in Bangladesh. */}
          <div className="flex items-center gap-2 rounded-lg bg-white border border-border px-2.5 py-1.5">
            <div className="shrink-0 h-7 w-16 flex items-center">
              <Image
                src="/payments/sslcommerz.webp"
                alt="SSLCommerz"
                width={200}
                height={96}
                className="max-h-6 w-auto object-contain"
              />
            </div>
            <div className="min-w-0 leading-tight">
              <div className="text-[10px] font-bold text-fg">
                Secure Gateway
              </div>
              <div className="text-[9px] text-fg-faint uppercase tracking-wider">
                Bangladesh's #1
              </div>
            </div>
          </div>

          {/* The remaining two are iconographic — SSL + Verified
              business don't have a single recognisable wordmark. */}
          <div className="flex items-center gap-2 rounded-lg bg-white border border-border px-2.5 py-1.5">
            <ShieldCheck className="h-4 w-4 text-brand-blue shrink-0" />
            <div className="min-w-0 leading-tight">
              <div className="text-[11px] font-bold text-fg truncate">
                SSL Secured
              </div>
              <div className="text-[9px] text-fg-faint truncate uppercase tracking-wider">
                256-bit Encrypted
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white border border-border px-2.5 py-1.5">
            <BadgeCheck className="h-4 w-4 text-brand-blue shrink-0" />
            <div className="min-w-0 leading-tight">
              <div className="text-[11px] font-bold text-fg truncate">
                Verified Business
              </div>
              <div className="text-[9px] text-fg-faint truncate uppercase tracking-wider">
                RAJUK Approved
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
