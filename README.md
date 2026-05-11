# Promise Proper Development Ltd. — Website

ঢাকার বিশ্বস্ত আবাসন অংশীদারের জন্য একটি modern, fully responsive PWA। সম্পূর্ণ বাংলায়, light theme, lal + nil gradient।

**Live company URL:** https://promisepd.com

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript
- **Tailwind CSS v4** (CSS-first config)
- **Framer Motion** — parallax blobs, animated counters, marquee
- **Convex** — contact form + newsletter backend
- **Hind Siliguri** — Bengali web font
- **PWA** — installable, offline-capable service worker

## Project structure

```
.
├── .claude/
│   └── launch.json          # Dev server configs for Claude Preview
├── web/                     # Next.js app
│   ├── convex/              # Convex schema + mutations
│   ├── src/
│   │   ├── app/             # App Router pages + actions + manifest
│   │   ├── components/      # All UI sections
│   │   └── lib/             # site data + helpers
│   └── public/              # logo.png, promo.mp4, sw.js
├── promiselogo.png          # source logo
└── promovideo.mp4           # source promo video
```

## Run locally

```bash
cd web
npm install
npm run dev        # http://localhost:3000
```

Or from project root via Claude Preview:

```bash
npm --prefix web run dev
```

## Convex backend (optional)

The contact form gracefully falls back to a console log if Convex isn't configured. To wire it up:

```bash
cd web
npx convex dev     # interactive — needs a Convex account
```

This generates `.env.local` with `NEXT_PUBLIC_CONVEX_URL`. After that, submissions persist to the `contactSubmissions` and `newsletter` tables.

## Build

```bash
cd web
npm run build
npm run start      # production server on :3000
```
