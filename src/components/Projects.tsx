"use client";

import { motion } from "framer-motion";
import { MapPin, Ruler, Check, ArrowRight } from "lucide-react";
import AnimatedBlobs from "./AnimatedBlobs";
import { PROJECTS } from "@/lib/site";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <AnimatedBlobs
        blobs={[
          {
            className:
              "left-[-15%] top-[20%] w-[45vw] h-[45vw] bg-[radial-gradient(circle,rgba(225,25,36,0.18),transparent_60%)]",
            parallax: -120,
          },
          {
            className:
              "right-[-10%] bottom-[20%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(24,71,161,0.18),transparent_60%)]",
            parallax: 100,
            delay: 5,
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-1.5 text-xs shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
            <span className="font-semibold uppercase tracking-[0.18em] text-fg-muted">
              চলমান প্রকল্প
            </span>
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
            যেখানে পরিবার{" "}
            <span className="text-grad">পরবর্তী ঠিকানা গড়ছে।</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-fg-muted leading-relaxed">
            বাছাইকৃত সাইট, স্বচ্ছ মূল্য, নমনীয় পরিকল্পনা। নিচের প্রতিটি প্রকল্প
            বাস্তব, চলমান এবং আজই বুকিংযোগ্য।
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => {
            const onLight = project.accent === "ash";
            const headerBg =
              project.accent === "red"
                ? "bg-brand-red"
                : project.accent === "blue"
                  ? "bg-brand-blue"
                  : "bg-brand-ash";
            const headingCls = onLight
              ? "text-fg"
              : "text-white drop-shadow-md";
            const subCls = onLight ? "text-fg-muted" : "text-white/95";
            const statusDot =
              project.accent === "red"
                ? "bg-brand-red"
                : project.accent === "blue"
                  ? "bg-brand-blue"
                  : "bg-brand-ash-dark";
            return (
            <motion.article
              key={`${project.name}-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              className="card group relative h-full overflow-hidden"
            >
              {/* Header band — solid brand color per project */}
              <div className={`relative h-44 overflow-hidden ${headerBg}`}>
                <div className="absolute inset-0 opacity-30 mix-blend-overlay grid-bg" />
                <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-white/20 blur-3xl animate-blob" />
                <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/15 blur-2xl animate-blob-slow" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-semibold tracking-wide text-fg shadow-sm">
                    <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${statusDot}`} />
                    {project.status}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <h3 className={`text-2xl sm:text-3xl font-bold ${headingCls}`}>
                      {project.name}
                    </h3>
                    {project.size && (
                      <span className={`mt-1 inline-flex items-center gap-1 text-xs ${subCls}`}>
                        <Ruler className="h-3 w-3" />
                        {project.size}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-sm text-fg-muted">
                    <MapPin className="h-4 w-4 text-brand-red" />
                    {project.location}
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-fg-faint">
                      শুরু
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-grad-rb">
                      {project.price}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-fg-muted leading-relaxed">
                  {project.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-xs text-fg-soft"
                    >
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-red-tint text-brand-red">
                        <Check className="h-3 w-3" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-grad-rb group/btn"
                >
                  সাইট ভিজিট বুক করুন
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
