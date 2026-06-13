"use server";

/** Blog Server Actions — full CRUD over public.blog_posts.
 *
 *  Every mutation: requireManager() → validate → write via getAdmin()
 *  → logAudit() → revalidate the admin list + the public /blog. Slug
 *  collisions surface as a friendly error rather than a raw DB throw.
 *
 *  `published_at` is stamped with now() the first time a post goes
 *  live and never overwritten afterwards (so the public "published on"
 *  date is stable across edits and un-publish / re-publish cycles). */

import { revalidatePath } from "next/cache";
import {
  getAdmin,
  logAudit,
  requireManager,
  runAction,
  type ActionResult,
} from "@/lib/admin-guard";
import { slugify } from "@/app/admin/blog/slug";

/** Shape the client form submits.  All optional fields may be empty
 *  strings from the form; we normalise to null / defaults below. */
export type BlogPostInput = {
  title: string;
  slug: string;
  excerpt?: string;
  body: string;
  cover_url?: string;
  /** Raw comma-separated string from the form; split server-side. */
  tags?: string;
  author_name?: string;
  published?: boolean;
  title_en?: string;
  excerpt_en?: string;
  body_en?: string;
};

/** "react, next , ,nextjs" → ["react","next","nextjs"] (deduped). */
function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of raw.split(",")) {
    const v = t.trim();
    if (v && !seen.has(v.toLowerCase())) {
      seen.add(v.toLowerCase());
      out.push(v);
    }
  }
  return out;
}

const trimOrNull = (v: string | undefined): string | null => {
  const t = (v ?? "").trim();
  return t.length ? t : null;
};

/** Map the raw form input to a validated DB payload, or throw with a
 *  user-facing message on the first validation failure. */
function buildPayload(input: BlogPostInput) {
  const title = (input.title ?? "").trim();
  if (!title) throw new Error("Title is required.");

  const slug = slugify(input.slug || title);
  if (!slug) throw new Error("Slug is required — add a title or a custom slug.");

  return {
    slug,
    title,
    excerpt: trimOrNull(input.excerpt),
    body: (input.body ?? "").trim(),
    cover_url: trimOrNull(input.cover_url),
    tags: parseTags(input.tags),
    author_name: trimOrNull(input.author_name) ?? "PromisePD",
    published: !!input.published,
    title_en: trimOrNull(input.title_en),
    excerpt_en: trimOrNull(input.excerpt_en),
    body_en: trimOrNull(input.body_en),
  };
}

/** Postgres unique-violation on the slug index. */
function isSlugCollision(err: { code?: string; message?: string } | null): boolean {
  if (!err) return false;
  return err.code === "23505" || /duplicate key|unique/i.test(err.message ?? "");
}

function revalidateBlog() {
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function createPost(input: BlogPostInput): Promise<ActionResult<{ id: string }>> {
  return runAction(async () => {
    await requireManager();
    const admin = getAdmin();
    if (!admin) throw new Error("Database is not configured.");

    const payload = buildPayload(input);

    const { data, error } = await admin
      .from("blog_posts")
      .insert({
        ...payload,
        published_at: payload.published ? new Date().toISOString() : null,
      })
      .select("id")
      .single();

    if (error) {
      if (isSlugCollision(error)) {
        throw new Error(`The slug “${payload.slug}” is already in use — pick another.`);
      }
      throw error;
    }

    await logAudit({
      action: "create",
      entity: "blog_post",
      entityId: data.id,
      detail: `Created post “${payload.title}” (${payload.slug})`,
    });
    revalidateBlog();
    return { data: { id: data.id }, message: "Post created." };
  });
}

export async function updatePost(id: string, input: BlogPostInput): Promise<ActionResult> {
  return runAction(async () => {
    await requireManager();
    if (!id) throw new Error("Missing post id.");
    const admin = getAdmin();
    if (!admin) throw new Error("Database is not configured.");

    const payload = buildPayload(input);

    // Need the existing row to preserve published_at (stamp only on the
    // first publish, never overwrite a real date).
    const { data: existing, error: readErr } = await admin
      .from("blog_posts")
      .select("published_at")
      .eq("id", id)
      .maybeSingle();
    if (readErr) throw readErr;
    if (!existing) throw new Error("That post no longer exists.");

    const published_at =
      payload.published && !existing.published_at
        ? new Date().toISOString()
        : existing.published_at;

    const { error } = await admin
      .from("blog_posts")
      .update({ ...payload, published_at, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      if (isSlugCollision(error)) {
        throw new Error(`The slug “${payload.slug}” is already in use — pick another.`);
      }
      throw error;
    }

    await logAudit({
      action: "update",
      entity: "blog_post",
      entityId: id,
      detail: `Updated post “${payload.title}” (${payload.slug})`,
    });
    revalidateBlog();
    return { message: "Post saved." };
  });
}

export async function setPublished(id: string, published: boolean): Promise<ActionResult> {
  return runAction(async () => {
    await requireManager();
    if (!id) throw new Error("Missing post id.");
    const admin = getAdmin();
    if (!admin) throw new Error("Database is not configured.");

    const { data: existing, error: readErr } = await admin
      .from("blog_posts")
      .select("title, slug, published_at")
      .eq("id", id)
      .maybeSingle();
    if (readErr) throw readErr;
    if (!existing) throw new Error("That post no longer exists.");

    const published_at =
      published && !existing.published_at ? new Date().toISOString() : existing.published_at;

    const { error } = await admin
      .from("blog_posts")
      .update({ published, published_at, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw error;

    await logAudit({
      action: published ? "publish" : "unpublish",
      entity: "blog_post",
      entityId: id,
      detail: `${published ? "Published" : "Unpublished"} “${existing.title}” (${existing.slug})`,
    });
    revalidateBlog();
    return { message: published ? "Post published." : "Post unpublished." };
  });
}

export async function deletePost(id: string): Promise<ActionResult> {
  return runAction(async () => {
    await requireManager();
    if (!id) throw new Error("Missing post id.");
    const admin = getAdmin();
    if (!admin) throw new Error("Database is not configured.");

    const { data: existing } = await admin
      .from("blog_posts")
      .select("title, slug")
      .eq("id", id)
      .maybeSingle();

    const { error } = await admin.from("blog_posts").delete().eq("id", id);
    if (error) throw error;

    await logAudit({
      action: "delete",
      entity: "blog_post",
      entityId: id,
      detail: existing ? `Deleted post “${existing.title}” (${existing.slug})` : `Deleted post ${id}`,
    });
    revalidateBlog();
    return { message: "Post deleted." };
  });
}
