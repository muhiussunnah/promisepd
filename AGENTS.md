<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project rules (MUST follow)

## 🖼️ Every uploaded image goes through the WebP pipeline

**Hard rule, no exceptions.** Any image accepted from a user — admin
panel upload, contact-form attachment, team-page headshot, blog
cover, project gallery — MUST be:

1. Resized to a sensible max dimension (default 1920px longer edge).
2. Re-encoded as WebP (~78 quality is the established sweet spot).
3. Stripped of EXIF / orientation metadata (privacy + size).

Then and only then can the bytes be persisted to Supabase Storage,
`/public`, or anywhere else.

### How to comply

Use the helpers in [`src/lib/image.ts`](src/lib/image.ts):

```ts
import { toOptimizedWebp, optimizeUploadedFile } from "@/lib/image";

// Raw bytes:
const { buffer } = await toOptimizedWebp(rawBuffer);

// File object from a form:
const { buffer, filename } = await optimizeUploadedFile(file);
```

The end-to-end path (optimise + upload to Supabase) is already wired
in [`src/app/actions/upload-image.ts`](src/app/actions/upload-image.ts).
Any new admin form should call that Server Action rather than
re-implementing the pipeline.

### Why this is non-negotiable

- Real-estate photos straight off a phone are 4–12 MB. Shipping that
  to Dhaka visitors over 4G is unforgivable.
- WebP is ~25–35 % smaller than equivalent-quality JPEG and ~50 %
  smaller than PNG, with universal browser support.
- Keeps the Supabase Storage bill predictable as hundreds of project
  photos accumulate.

### What about images already in `/public`?

Static, repo-committed images (logo, hero stills, etc.) are exempt
because they're versioned with the code and reviewed at commit time.
But anything new added to `/public` should still be WebP if at all
possible — run the source through the pipeline locally before
committing.
