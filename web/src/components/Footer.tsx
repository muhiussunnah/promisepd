"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Mail, Phone, MapPin, Send, Check, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { NAV, SITE } from "@/lib/site";
import { subscribeNewsletter } from "@/app/actions";
import { toBn } from "@/lib/bn";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.97 3.66 9.1 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.91h-2.33V22c4.78-.84 8.44-4.97 8.44-9.94Z" />
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
            <Link href="#home" className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-white p-1 ring-1 ring-border">
                <Image
                  src="/logo.png"
                  alt={SITE.shortName}
                  fill
                  sizes="48px"
                  className="object-contain p-0.5"
                />
              </div>
              <div className="leading-tight">
                <div className="text-base font-bold text-grad-rb">
                  {SITE.nameBn}
                </div>
                <div className="text-[11px] tracking-wider text-fg-muted">
                  {SITE.tagline}
                </div>
              </div>
            </Link>
            <p className="mt-5 text-sm text-fg-muted leading-relaxed max-w-md">
              ৭+ বছর ধরে ঢাকার পরিবারগুলোকে এমন বাড়িতে পৌঁছে দিচ্ছি যা তাঁরা
              ভালোবাসেন — স্বচ্ছতা, আইনি নিরাপত্তা ও দীর্ঘস্থায়ী আফটার-সেলস
              যত্নের সাথে।
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-border hover:border-brand-blue hover:text-brand-blue transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-border hover:border-brand-red hover:text-brand-red transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-border hover:border-brand-blue hover:text-brand-blue transition-colors"
                aria-label="Phone"
              >
                <Phone className="h-5 w-5" />
              </a>
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
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-brand-blue shrink-0" />
                <span>{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-fg-muted">
            © {toBn(new Date().getFullYear())} {SITE.name}. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-xs text-fg-muted">
            ঢাকা, বাংলাদেশে <span className="text-brand-red">♥</span> দিয়ে তৈরি।
          </p>
        </div>
      </div>
    </footer>
  );
}
