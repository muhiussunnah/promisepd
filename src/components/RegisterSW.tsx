"use client";

/** Service-worker registration with a few quality-of-life extras
 *  the old version was missing:
 *
 *   - `registration.update()` on every page load so a freshly-deployed
 *     SW is detected within seconds instead of the browser's default
 *     24-hour passive check.
 *
 *   - `controllerchange` listener that force-reloads the page the
 *     moment a new SW takes over.  Without this, PWA users were
 *     stuck on a stale cached HTML referencing chunks the new build
 *     had already deleted (the "frozen on splash" bug).
 *
 *   - `/?nopwa=1` escape hatch.  Visit that URL once to unregister
 *     the SW and nuke every cache — useful as a one-link fix for
 *     anyone whose PWA is in a bad state.
 *
 *   - `?source=pwa` (the manifest's start_url) automatically pings
 *     update() on launch so the installed PWA opens against the
 *     freshest possible SW.
 */

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    let cancelled = false;
    let reloadedOnce = false;

    // ── Escape hatch — visit /?nopwa=1 to nuke + leave PWA ────────
    const search = new URLSearchParams(window.location.search);
    if (search.get("nopwa") === "1") {
      (async () => {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
        if (typeof caches !== "undefined") {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }
        // Strip the query param and reload so the page renders fresh.
        const clean = window.location.pathname + window.location.hash;
        window.location.replace(clean);
      })();
      return;
    }

    // When the active SW changes (because a freshly-installed v3 just
    // called clients.claim), reload so the page picks up an HTML
    // shell that matches the new build's chunk hashes.  Without this,
    // PWA users stayed on the old HTML and broke.
    const onControllerChange = () => {
      if (reloadedOnce) return;
      reloadedOnce = true;
      window.location.reload();
    };

    const onLoad = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        if (cancelled) return;

        // Force a freshness check on every page load.
        reg.update().catch(() => null);

        // If a new SW is installing right now, push it to active
        // immediately by asking it to skipWaiting.
        const tellWaiting = () => {
          reg.waiting?.postMessage("SKIP_WAITING");
        };

        if (reg.waiting) tellWaiting();
        reg.addEventListener("updatefound", () => {
          const installing = reg.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (installing.state === "installed" && reg.waiting) tellWaiting();
          });
        });
      } catch (err) {
        console.warn("[SW] registration failed", err);
      }
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      onControllerChange,
    );
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        onControllerChange,
      );
    };
  }, []);

  return null;
}
