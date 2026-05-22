import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileText, ArrowRight, Clock } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { FORMS } from "@/lib/forms";
import { breadcrumbSchema } from "@/lib/schema";
import { getSiteUrl, absoluteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();
const OG_IMAGE = absoluteUrl("/og-image.jpg");

const PAGE_TITLE = "ফর্ম — PromisePD";
const PAGE_DESC =
  "প্রমিস গ্রুপের সকল অফিসিয়াল ফরম অনলাইনেই পূরণ করুন — ফ্ল্যাট বরাদ্দ, বিনিয়োগ, প্রমিস সিটি, ফুজালা টাওয়ার ও কমপ্লেক্স, মার্কেটিং ডিরেক্টর। পূরণ করলেই সরাসরি অফিসে পৌঁছে যায়।";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: "/forms" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/forms`,
    title: PAGE_TITLE,
    description: PAGE_DESC,
    siteName: "PromisePD",
    locale: "bn_BD",
    images: [
      { url: OG_IMAGE, secureUrl: OG_IMAGE, type: "image/jpeg", width: 1200, height: 630, alt: PAGE_TITLE },
    ],
  },
  twitter: { card: "summary_large_image", title: PAGE_TITLE, description: PAGE_DESC, images: [{ url: OG_IMAGE, alt: PAGE_TITLE }] },
};

export default function FormsPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "হোম", url: SITE_URL },
    { name: "ফর্ম", url: `${SITE_URL}/forms` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      <section className="relative pt-32 pb-10 sm:pt-36 sm:pb-12">
        <div className="absolute inset-0 -z-10 mesh-bg-soft" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
            <FileText className="h-3.5 w-3.5 text-brand-blue" />
            <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
              অনলাইন ফর্ম
            </span>
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08]">
            অফিসিয়াল ফরম, <span className="text-grad">অনলাইনেই পূরণ</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-fg-muted leading-relaxed max-w-2xl mx-auto">
            পছন্দের ফরমটি বেছে নিন, তথ্য দিন — পূরণকৃত ফরমটি হুবহু অফিসিয়াল
            ডিজাইনে তৈরি হয়ে সরাসরি আমাদের অফিসে পৌঁছে যাবে।
          </p>
        </div>
      </section>

      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FORMS.map((f) => {
              const Card = (
                <div className="group card overflow-hidden flex flex-col h-full">
                  <div className="relative aspect-[1/1.1] overflow-hidden bg-bg-soft border-b border-border">
                    <Image
                      src={f.pages[0]}
                      alt={f.nameBn}
                      fill
                      sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {!f.ready && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-fg/80 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                        <Clock className="h-3 w-3" />
                        শীঘ্রই
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-fg group-hover:text-brand-blue transition-colors">
                      {f.nameBn}
                    </h3>
                    <p className="mt-2 text-sm text-fg-muted leading-relaxed flex-1">
                      {f.description}
                    </p>
                    <span
                      className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold ${
                        f.ready ? "text-brand-blue" : "text-fg-faint"
                      }`}
                    >
                      {f.ready ? "ফরম পূরণ করুন" : "প্রস্তুত হচ্ছে"}
                      {f.ready && (
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </span>
                  </div>
                </div>
              );
              return f.ready ? (
                <Link key={f.slug} href={`/forms/${f.slug}`} className="block h-full">
                  {Card}
                </Link>
              ) : (
                <div key={f.slug} className="h-full cursor-default opacity-90">
                  {Card}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
