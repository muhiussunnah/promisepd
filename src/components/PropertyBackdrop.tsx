"use client";

/** Soft architectural-photo backdrop for hero sections.
 *
 *  Goal: give each page a real-estate "luxury city" texture
 *  without overwhelming the brand colours or sacrificing text
 *  readability.  The photo sits at the very back of the stack
 *  (-z-30), behind mesh-bg / blobs / grid-bg, with three layered
 *  treatments on top:
 *
 *   1. Brand-blue diagonal wash       — keeps the canvas anchored
 *      in primary.
 *   2. Top-to-bottom white gradient   — ensures content at the
 *      bottom of the hero sits on a clean base.
 *   3. Optional CSS blur on the photo — adds a premium bokeh
 *      feel.  Off by default so building details stay legible.
 *
 *  Use this in any hero / page-header section where you'd like
 *  the existing mesh-bg + blobs to ride on top of an actual
 *  architectural photo instead of pure white. */

import Image from "next/image";

export type PropertyBackdropProps = {
  /** Path under /public — always a .webp from the optimiser. */
  src: string;
  /** Alt text (visual-only by default — empty, role=presentation). */
  alt?: string;
  /** Photo opacity 0-100.  Default 32 — high enough to read the
   *  architecture, low enough that text on top still sits clean. */
  intensity?: number;
  /** object-position string ("top", "center", "right top", etc.). */
  position?: string;
  /** Whether to blur the photo for the "premium bokeh" look. */
  blur?: boolean;
  /** Blue overlay strength.  Higher = more brand-anchored, lower
   *  = more photographic. */
  bluewash?: "soft" | "medium" | "strong";
};

const BLUE_WASH = {
  soft:
    "bg-[linear-gradient(135deg,rgba(24,71,161,0.15)_0%,rgba(255,255,255,0.05)_50%,rgba(225,25,36,0.08)_100%)]",
  medium:
    "bg-[linear-gradient(135deg,rgba(24,71,161,0.35)_0%,rgba(255,255,255,0.1)_50%,rgba(225,25,36,0.12)_100%)]",
  strong:
    "bg-[linear-gradient(135deg,rgba(24,71,161,0.55)_0%,rgba(24,71,161,0.25)_50%,rgba(225,25,36,0.15)_100%)]",
} as const;

export default function PropertyBackdrop({
  src,
  alt = "",
  intensity = 32,
  position = "center",
  blur = false,
  bluewash = "soft",
}: PropertyBackdropProps) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-30 overflow-hidden pointer-events-none"
    >
      {/* The photo itself.  next/image with priority gives the LCP
          a head start since this is hero-level content.  scale-110
          + slight blur creates a subtle parallax / bokeh feel that
          reads as premium real-estate photography. */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className={`object-cover scale-105 ${blur ? "blur-[2px]" : ""}`}
        style={{
          opacity: Math.max(0, Math.min(100, intensity)) / 100,
          objectPosition: position,
        }}
      />

      {/* Brand-coloured diagonal wash — anchors the photo in our
          colour system so it never reads as "stock photo dropped
          in". */}
      <div className={`absolute inset-0 ${BLUE_WASH[bluewash]}`} />

      {/* Bottom-half white fade — guarantees readable text
          regardless of how busy the photo is at that area. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white" />
    </div>
  );
}
