"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type Blob = {
  className: string;
  parallax: number;
  delay?: number;
};

const DEFAULT_BLOBS: Blob[] = [
  {
    className:
      "left-[-10%] top-[10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_30%_30%,rgba(225,29,46,0.22),transparent_60%)]",
    parallax: -120,
  },
  {
    className:
      "right-[-15%] top-[30%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_70%_30%,rgba(29,79,216,0.22),transparent_60%)]",
    parallax: 80,
    delay: 4,
  },
  {
    className:
      "left-[20%] bottom-[-20%] w-[55vw] h-[55vw] bg-[radial-gradient(circle_at_50%_70%,rgba(225,29,46,0.16),transparent_60%)]",
    parallax: -60,
    delay: 8,
  },
  {
    className:
      "right-[10%] bottom-[5%] w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_70%_70%,rgba(29,79,216,0.18),transparent_55%)]",
    parallax: 140,
    delay: 12,
  },
];

export default function AnimatedBlobs({
  blobs = DEFAULT_BLOBS,
  containerClass = "",
}: {
  blobs?: Blob[];
  containerClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${containerClass}`}
    >
      {blobs.map((blob, i) => (
        <ParallaxBlob
          key={i}
          blob={blob}
          progress={scrollYProgress}
          reduce={!!reduce}
        />
      ))}
    </div>
  );
}

function ParallaxBlob({
  blob,
  progress,
  reduce,
}: {
  blob: Blob;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
}) {
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : blob.parallax]);
  return (
    <motion.div
      style={{ y, animationDelay: `${blob.delay ?? 0}s` }}
      className={`absolute rounded-full blur-3xl will-change-transform animate-blob ${blob.className}`}
    />
  );
}
