"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
  AlertCircle,
} from "lucide-react";
import AnimatedBlobs from "./AnimatedBlobs";
import { SITE, INTERESTS } from "@/lib/site";
import { submitContact } from "@/app/actions";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: INTERESTS[0],
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "idle" | "ok" | "err";
    msg?: string;
  }>({ type: "idle" });
  const [pending, startTransition] = useTransition();

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "idle" });
    startTransition(async () => {
      const res = await submitContact(form);
      if (res.ok) {
        setStatus({
          type: "ok",
          msg: "ধন্যবাদ — আমরা এক কর্মদিবসের মধ্যে যোগাযোগ করবো।",
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          interest: INTERESTS[0],
          message: "",
        });
      } else {
        setStatus({
          type: "err",
          msg: res.error || "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।",
        });
      }
    });
  }

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <AnimatedBlobs
        blobs={[
          {
            className:
              "left-[-10%] top-[10%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(225,25,36,0.16),transparent_60%)]",
            parallax: -80,
          },
          {
            className:
              "right-[-10%] bottom-[10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(24,71,161,0.18),transparent_60%)]",
            parallax: 100,
            delay: 4,
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
            <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
              যোগাযোগ
            </span>
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
            চলুন খুঁজে নিই <span className="text-grad">আপনার পরবর্তী বাড়ি।</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-fg-muted leading-relaxed">
            একটি বার্তা পাঠান — সাধারণত আমরা এক কর্মদিবসের মধ্যে উত্তর দিই।
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              {
                icon: Phone,
                label: "ফোন",
                value: SITE.phoneDisplay,
                href: `tel:${SITE.phone}`,
                bg: "bg-brand-red",
              },
              {
                icon: Mail,
                label: "ইমেইল",
                value: SITE.email,
                href: `mailto:${SITE.email}`,
                bg: "bg-brand-blue",
              },
              {
                icon: MapPin,
                label: "অফিস",
                value: SITE.address,
                href: "https://maps.google.com/?q=Kazi+Tower+South+Jatrabari+Dhaka",
                bg: "bg-brand-blue",
              },
              {
                icon: Clock,
                label: "সময়",
                value: `${SITE.hours} · ${SITE.weeklyOff}`,
                bg: "bg-brand-ash",
              },
            ].map((item) => {
              const Wrapper = item.href ? "a" : "div";
              return (
                <Wrapper
                  key={item.label}
                  href={item.href}
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="card group flex items-start gap-4 p-5"
                >
                  <div
                    className={`shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.bg} shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${
                        item.bg === "bg-brand-ash" ? "text-fg" : "text-white"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm sm:text-base font-medium text-fg break-words">
                      {item.value}
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={onSubmit}
            className="lg:col-span-3 grad-border p-6 sm:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="আপনার নাম"
                required
                value={form.name}
                onChange={(v) => update("name", v)}
                placeholder="পূর্ণ নাম"
              />
              <Field
                label="ইমেইল"
                type="email"
                required
                value={form.email}
                onChange={(v) => update("email", v)}
                placeholder="you@example.com"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="ফোন (ঐচ্ছিক)"
                type="tel"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                placeholder="+৮৮০ ১XXX-XXXXXX"
              />
              <div>
                <label className="text-[11px] uppercase tracking-[0.18em] text-fg-muted">
                  আগ্রহের বিষয়
                </label>
                <select
                  value={form.interest}
                  onChange={(e) => update("interest", e.target.value)}
                  className="mt-1.5 w-full rounded-xl bg-white border border-border px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 transition-all"
                >
                  {INTERESTS.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.18em] text-fg-muted">
                বার্তা *
              </label>
              <textarea
                required
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                rows={5}
                placeholder="আপনি কী খুঁজছেন একটু লিখুন..."
                className="mt-1.5 w-full rounded-xl bg-white border border-border px-4 py-3 text-sm placeholder:text-fg-faint focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 transition-all resize-none"
              />
            </div>

            {status.msg && (
              <div
                className={`flex items-start gap-2 rounded-xl p-3 text-sm ${
                  status.type === "ok"
                    ? "bg-brand-blue-tint border border-brand-blue/30 text-brand-blue-dark"
                    : "bg-brand-red-tint border border-brand-red/30 text-brand-red-dark"
                }`}
              >
                {status.type === "ok" ? (
                  <Check className="h-4 w-4 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                )}
                <span>{status.msg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-red px-6 py-4 text-base font-semibold text-white shadow-[var(--shadow-brand)] hover:scale-[1.02] disabled:opacity-70 disabled:scale-100 transition-all btn-shine"
            >
              <Send className="h-4 w-4" />
              {pending ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
            </button>
            <p className="text-[11px] text-fg-faint text-center">
              ফর্ম জমা দিয়ে আপনি আমাদের যোগাযোগ করার অনুমতি দিচ্ছেন।
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  required,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.18em] text-fg-muted">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl bg-white border border-border px-4 py-3 text-sm placeholder:text-fg-faint focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 transition-all"
      />
    </div>
  );
}
