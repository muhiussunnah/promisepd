"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Mail, Phone, MapPin, Send, Check, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { NAV, SITE } from "@/lib/site";
import { subscribeNewsletter } from "@/app/actions";
import { toBn } from "@/lib/bn";

// ============= Brand-colored social icons (full color, full opacity) =============

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="#1877F2"
        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.412c0-3.017 1.792-4.683 4.533-4.683 1.312 0 2.686.235 2.686.235v2.971h-1.513c-1.49 0-1.955.93-1.955 1.886v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z"
      />
    </svg>
  );
}

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="#FF0000"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8Z"
      />
      <path fill="#FFF" d="M9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="#25D366"
        d="M.06 24l1.69-6.16A11.87 11.87 0 0 1 .14 11.9C.14 5.34 5.48 0 12.05 0a11.87 11.87 0 0 1 8.44 3.5 11.86 11.86 0 0 1 3.5 8.44c0 6.57-5.34 11.91-11.91 11.91h-.01a11.92 11.92 0 0 1-5.7-1.45L.06 24Z"
      />
      <path
        fill="#FFF"
        d="M9.03 6.92c-.22-.49-.45-.5-.66-.51l-.56-.01a1.08 1.08 0 0 0-.78.36c-.27.3-1.03 1-1.03 2.45 0 1.45 1.05 2.85 1.2 3.05.15.2 2.04 3.27 5.05 4.45 2.5.99 3 .79 3.55.74.55-.05 1.77-.72 2.02-1.43.25-.7.25-1.31.18-1.43-.07-.13-.27-.2-.56-.35-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.42-1.49a9.04 9.04 0 0 1-1.67-2.08c-.18-.3 0-.46.13-.61.13-.13.3-.34.45-.5.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.65-1.57-.9-2.15Z"
      />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      {/* Layered cyan + magenta for TikTok's signature offset effect */}
      <path
        fill="#25F4EE"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.78 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.82-.1Z"
      />
      <path
        fill="#FE2C55"
        d="M20.61 7.7a4.85 4.85 0 0 1-1.02-1.01 4.83 4.83 0 0 1-3.77-4.25V2H13.6v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 6.78 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.8.91Z"
      />
      <path
        fill="#000"
        d="M19.59 7.69a4.85 4.85 0 0 1-1.02-1.01 4.83 4.83 0 0 1-3.77-4.25H12.4v13.66a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.32-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.78 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.82-.1Z"
      />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FED576" />
          <stop offset="30%" stopColor="#F47133" />
          <stop offset="60%" stopColor="#BC3081" />
          <stop offset="100%" stopColor="#4C68D7" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)" />
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="#FFF" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="#FFF" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await subscribeNewsletter(email);
      if (res.ok) {
        setDone(true);
        setEmail("");
        setTimeout(() => setDone(false), 4000);
      }
    });
  }

  const SOCIALS = [
    { name: "Facebook", url: SITE.socials.facebook, Icon: FacebookIcon, ring: "ring-[#1877F2]/30" },
    { name: "YouTube", url: SITE.socials.youtube, Icon: YouTubeIcon, ring: "ring-[#FF0000]/30" },
    { name: "WhatsApp", url: SITE.socials.whatsapp, Icon: WhatsAppIcon, ring: "ring-[#25D366]/30" },
    { name: "TikTok", url: SITE.socials.tiktok, Icon: TikTokIcon, ring: "ring-fg/30" },
    { name: "Instagram", url: SITE.socials.instagram, Icon: InstagramIcon, ring: "ring-brand-red/40" },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-bg-soft mt-24">
      <div className="absolute inset-0 -z-10 mesh-bg-soft" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grad-border mb-16 p-8 sm:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold">
                <span className="text-grad">আপডেট পেতে যুক্ত থাকুন</span>
              </h3>
              <p className="mt-2 text-sm sm:text-base text-fg-muted">
                নতুন প্রকল্প, কিস্তি অফার ও প্রি-লঞ্চ সুবিধার খবর সবার আগে
                পেতে সাবস্ক্রাইব করুন।
              </p>
            </div>
            <form
              onSubmit={onSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="ইমেইল ঠিকানা"
                className="flex-1 rounded-xl bg-white border border-border px-4 py-3 text-sm placeholder:text-fg-faint focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 transition-all"
              />
              <button
                type="submit"
                disabled={pending || done}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[image:var(--grad-rb)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-brand)] hover:scale-[1.03] transition-all btn-shine disabled:opacity-70"
              >
                {done ? (
                  <>
                    <Check className="h-4 w-4" /> সাবস্ক্রাইব হয়েছে
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {pending ? "পাঠানো হচ্ছে..." : "সাবস্ক্রাইব"}
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/#home" className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt={SITE.shortName}
                width={500}
                height={500}
                className="h-14 w-auto shrink-0"
              />
              <div className="leading-tight">
                <div className="text-base font-bold text-grad-rb">
                  প্রমিজ সিটি
                </div>
                <div className="text-[11px] tracking-wider text-fg-muted">
                  স্বপ্ন যেখানে বাস্তব
                </div>
              </div>
            </Link>
            <p className="mt-5 text-sm text-fg-muted leading-relaxed max-w-md">
              ১৫+ বছর ধরে ঢাকার পরিবারগুলোকে সেবা দিয়ে আসছি — রিয়েল এস্টেট,
              নির্মাণ, সঞ্চয়, হজ্জ এবং ডিজাইন — ৫টি বিভাগ এক ছাদের নিচে।
            </p>

            <div className="mt-6">
              <h5 className="text-[11px] uppercase tracking-[0.18em] text-fg-muted font-semibold mb-3">
                আমাদের অনুসরণ করুন
              </h5>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map(({ name, url, Icon, ring }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-border hover:ring-2 hover:${ring} hover:scale-110 hover:-translate-y-0.5 transition-all`}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-grad-rb mb-4">
              দ্রুত লিঙ্ক
            </h4>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-fg-muted hover:text-fg transition-colors link-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-grad-rb mb-4">
              যোগাযোগ
            </h4>
            <ul className="space-y-3 text-sm text-fg-muted">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-brand-red shrink-0" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-blue shrink-0" />
                <a
                  href={`tel:${SITE.phone}`}
                  className="hover:text-fg transition-colors"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-red shrink-0" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-fg transition-colors break-all"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <div>{SITE.hours}</div>
                  <div className="text-xs text-fg-faint mt-0.5">
                    {SITE.weeklyOff}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-fg-muted">
            © {toBn(new Date().getFullYear())} {SITE.name}. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-xs text-fg-muted">
            <a
              href={SITE.credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-grad-rb hover:opacity-80 transition-opacity"
            >
              {SITE.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
