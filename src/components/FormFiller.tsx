"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { submitForm } from "@/app/actions/submit-form";
import type { FormDef } from "@/lib/forms";

export default function FormFiller({ form }: { form: FormDef }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [pageW, setPageW] = useState(760);
  const captureRef = useRef<HTMLDivElement>(null);
  const firstPageRef = useRef<HTMLDivElement>(null);

  // Track the rendered page width so overlay font sizes scale with it.
  useEffect(() => {
    const el = firstPageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setPageW(el.clientWidth || 760));
    ro.observe(el);
    setPageW(el.clientWidth || 760);
    return () => ro.disconnect();
  }, []);

  const groups = useMemo(() => {
    const m = new Map<string, typeof form.fields>();
    for (const f of form.fields) {
      if (!m.has(f.group)) m.set(f.group, []);
      m.get(f.group)!.push(f);
    }
    return [...m.entries()];
  }, [form.fields]);

  function set(key: string, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  const applicantName = values["name"] || values["applicant_name"] || "";
  const applicantPhone = values["mobile"] || values["phone"] || "";
  const applicantEmail = values["email"] || "";

  async function handleSubmit() {
    // Required-field check
    const missing = form.fields.filter(
      (f) => f.required && !(values[f.key] || "").trim(),
    );
    if (missing.length) {
      setStatus("error");
      setErrorMsg(`অনুগ্রহ করে পূরণ করুন: ${missing.map((m) => m.label).join(", ")}`);
      return;
    }
    setStatus("working");
    setErrorMsg("");
    try {
      const { jsPDF } = await import("jspdf");
      // Make sure the Bengali webfont is ready so canvas shapes it
      // identically to the on-screen preview.
      if (document.fonts?.ready) await document.fonts.ready;

      const loadImg = (src: string) =>
        new Promise<HTMLImageElement>((res, rej) => {
          const im = new Image();
          im.crossOrigin = "anonymous";
          im.onload = () => res(im);
          im.onerror = rej;
          im.src = src;
        });

      const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
      const pw = pdf.internal.pageSize.getWidth();
      const ph = pdf.internal.pageSize.getHeight();

      // Draw each official page to a canvas, then paint the typed values
      // with ctx.fillText (browser-shaped Bengali, pixel-precise).
      for (let pi = 0; pi < form.pages.length; pi++) {
        const img = await loadImg(form.pages[pi]);
        const W = img.naturalWidth || 1785;
        const H = img.naturalHeight || 2525;
        const cv = document.createElement("canvas");
        cv.width = W;
        cv.height = H;
        const ctx = cv.getContext("2d")!;
        ctx.drawImage(img, 0, 0, W, H);
        ctx.fillStyle = "#111827";
        ctx.textBaseline = "bottom";
        for (const f of form.fields) {
          if (f.pos.page !== pi + 1) continue;
          const v = (values[f.key] || "").trim();
          if (!v) continue;
          const fontPx = ((f.pos.size ?? 1.4) / 100) * W;
          ctx.font = `${fontPx}px "Hind Siliguri","Noto Sans Bengali",system-ui,sans-serif`;
          const maxW = (f.pos.width / 100) * W;
          const y = (f.pos.top / 100) * H;
          if (f.pos.align === "center") {
            ctx.textAlign = "center";
            ctx.fillText(v, (f.pos.left / 100) * W + maxW / 2, y, maxW);
          } else {
            ctx.textAlign = "left";
            ctx.fillText(v, (f.pos.left / 100) * W, y, maxW);
          }
        }
        const data = cv.toDataURL("image/jpeg", 0.86);
        if (pi > 0) pdf.addPage();
        pdf.addImage(data, "JPEG", 0, 0, pw, ph);
      }
      const base64 = pdf.output("datauristring").split(",")[1];

      const res = await submitForm({
        formName: form.nameBn,
        applicantName,
        applicantPhone,
        applicantEmail: applicantEmail || undefined,
        pdfBase64: base64,
        fileName: `${form.slug}-${Date.now()}.pdf`,
      });
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
        setErrorMsg(res.error || "জমা দেওয়া যায়নি।");
      }
    } catch (e) {
      console.error(e);
      setStatus("error");
      setErrorMsg("ফরম তৈরিতে সমস্যা হয়েছে — আবার চেষ্টা করুন।");
    }
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-md">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h2 className="mt-6 text-2xl font-bold">আপনার আবেদন জমা হয়েছে!</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          সম্পূর্ণ পূরণকৃত <b>{form.nameBn}</b> আমাদের অফিসে পৌঁছে গেছে। আমরা খুব
          শীঘ্রই আপনার সাথে যোগাযোগ করব — ইন শা আল্লাহ।
        </p>
        <button
          onClick={() => {
            setValues({});
            setStatus("idle");
          }}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-brand-blue px-6 py-3 text-sm font-bold text-white shadow-[var(--shadow-brand)] hover:bg-brand-blue-dark transition-colors"
        >
          আরেকটি আবেদন করুন
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-2 gap-8 lg:gap-12">
      {/* ── Data entry ─────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FileText className="h-6 w-6 text-brand-blue" />
          <h1 className="text-2xl sm:text-3xl font-bold">{form.nameBn}</h1>
        </div>
        <p className="text-sm text-fg-muted mb-6">{form.description}</p>

        <div className="space-y-7">
          {groups.map(([group, fields]) => (
            <div key={group}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-blue mb-3">
                {group}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {fields.map((f) => (
                  <label key={f.key} className="block">
                    <span className="text-xs font-medium text-fg-soft">
                      {f.label}
                      {f.required && <span className="text-brand-red"> *</span>}
                    </span>
                    <input
                      type={f.type === "number" ? "text" : f.type}
                      inputMode={f.type === "tel" || f.type === "number" ? "numeric" : undefined}
                      value={values[f.key] || ""}
                      placeholder={f.placeholder}
                      onChange={(e) => set(f.key, e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-fg focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/25"
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {status === "error" && (
          <div className="mt-5 flex items-start gap-2 rounded-xl bg-brand-red/10 border border-brand-red/30 px-4 py-3 text-sm text-brand-red">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={status === "working"}
          className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-brand-blue px-7 py-3.5 text-base font-bold text-white shadow-[var(--shadow-brand)] hover:bg-brand-blue-dark hover:scale-[1.01] transition-all disabled:opacity-70"
        >
          {status === "working" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              জমা হচ্ছে...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              ফরম জমা দিন
            </>
          )}
        </button>
        <p className="mt-3 text-xs text-fg-faint">
          জমা দিলে সম্পূর্ণ পূরণকৃত ফরমটি সরাসরি আমাদের অফিসে ই-মেইলে চলে যাবে।
        </p>
      </div>

      {/* ── Live preview (also the PDF capture target) ─────── */}
      <div className="lg:sticky lg:top-24 self-start">
        <div className="text-xs font-bold uppercase tracking-wider text-fg-faint mb-2">
          সরাসরি প্রিভিউ
        </div>
        <div className="rounded-2xl border border-border bg-white shadow-lg overflow-hidden">
          <div ref={captureRef}>
            {form.pages.map((src, pi) => (
              <div
                key={src}
                data-form-page
                ref={pi === 0 ? firstPageRef : undefined}
                className="relative w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${form.nameBn} — পৃষ্ঠা ${pi + 1}`} className="block w-full" />
                {form.fields
                  .filter((f) => f.pos.page === pi + 1)
                  .map((f) => {
                    const v = values[f.key];
                    if (!v) return null;
                    const fontPx = ((f.pos.size ?? 1.4) / 100) * pageW;
                    return (
                      <span
                        key={f.key}
                        className="absolute whitespace-nowrap overflow-hidden text-fg"
                        style={{
                          top: `${f.pos.top}%`,
                          left: `${f.pos.left}%`,
                          width: `${f.pos.width}%`,
                          fontSize: `${fontPx}px`,
                          lineHeight: 1,
                          transform: "translateY(-100%)",
                          textAlign: f.pos.align ?? "left",
                          letterSpacing: f.pos.align === "center" ? "0.04em" : undefined,
                          fontFamily:
                            "'Hind Siliguri','Noto Sans Bengali',system-ui,sans-serif",
                        }}
                      >
                        {v}
                      </span>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle entrance polish */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden"
      />
    </div>
  );
}
