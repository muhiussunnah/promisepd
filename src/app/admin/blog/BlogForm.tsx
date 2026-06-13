"use client";

/** Create / edit form for a blog post.  One component drives both
 *  flows — pass an existing post to edit, omit it to create. Slug
 *  auto-suggests from the title until the user types a custom slug
 *  (after which we stop clobbering their edits). */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Loader2, Save } from "lucide-react";
import { createPost, updatePost, type BlogPostInput } from "@/app/actions/admin-blog";
import { slugify } from "./slug";

export type BlogFormPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  cover_url: string | null;
  tags: string[] | null;
  author_name: string | null;
  published: boolean;
  title_en: string | null;
  excerpt_en: string | null;
  body_en: string | null;
};

const inputCls =
  "w-full rounded-xl border border-border bg-bg-soft px-3 py-2.5 text-sm outline-none focus:border-brand-blue/50";
const labelCls = "mb-1.5 block text-[13px] font-semibold text-fg";

export default function BlogForm({ post }: { post?: BlogFormPost }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  // Once a post exists or the user hand-edits the slug, stop auto-syncing.
  const [slugTouched, setSlugTouched] = useState(!!post);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [coverUrl, setCoverUrl] = useState(post?.cover_url ?? "");
  const [tags, setTags] = useState((post?.tags ?? []).join(", "));
  const [authorName, setAuthorName] = useState(post?.author_name ?? "PromisePD");
  const [published, setPublished] = useState(post?.published ?? false);

  const [showEn, setShowEn] = useState(
    !!(post?.title_en || post?.excerpt_en || post?.body_en),
  );
  const [titleEn, setTitleEn] = useState(post?.title_en ?? "");
  const [excerptEn, setExcerptEn] = useState(post?.excerpt_en ?? "");
  const [bodyEn, setBodyEn] = useState(post?.body_en ?? "");

  function onTitleChange(v: string) {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const input: BlogPostInput = {
      title,
      slug,
      excerpt,
      body,
      cover_url: coverUrl,
      tags,
      author_name: authorName,
      published,
      title_en: titleEn,
      excerpt_en: excerptEn,
      body_en: bodyEn,
    };

    startTransition(async () => {
      const res = post ? await updatePost(post.id, input) : await createPost(input);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.push("/admin/blog");
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link
            href="/admin/blog"
            className="mb-2 inline-flex items-center gap-1 text-[13px] font-semibold text-fg-muted hover:text-brand-blue"
          >
            <ArrowLeft className="h-4 w-4" /> Back to posts
          </Link>
          <h1 className="text-xl font-bold text-fg sm:text-2xl">
            {post ? "Edit post" : "New post"}
          </h1>
          <p className="mt-0.5 text-sm text-fg-muted">
            {post ? "Update this article." : "Write a new article for the blog."}
          </p>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition-colors hover:bg-brand-blue-dark disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {post ? "Save changes" : "Create post"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-brand-red/30 bg-brand-red-tint px-4 py-3 text-sm font-medium text-brand-red-dark">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-bg p-5">
            <div>
              <label htmlFor="title" className={labelCls}>
                Title <span className="text-brand-red">*</span>
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                required
                placeholder="An informative, scannable headline"
                className={inputCls}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="slug" className={labelCls}>
                Slug <span className="text-brand-red">*</span>
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-soft px-3 focus-within:border-brand-blue/50">
                <span className="text-sm text-fg-faint">/blog/</span>
                <input
                  id="slug"
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setSlug(e.target.value);
                  }}
                  onBlur={() => setSlug((s) => slugify(s))}
                  required
                  placeholder="auto-generated-from-title"
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>
              <p className="mt-1 text-xs text-fg-faint">
                Lowercase, words separated by hyphens. Must be unique.
              </p>
            </div>

            <div className="mt-4">
              <label htmlFor="excerpt" className={labelCls}>
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                placeholder="A one or two sentence summary shown on the blog listing."
                className={inputCls}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="body" className={labelCls}>
                Body
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={16}
                placeholder={"Write in plain text.\n\nLeave a blank line between paragraphs."}
                className={`${inputCls} font-mono leading-relaxed`}
              />
              <p className="mt-1 text-xs text-fg-faint">
                Plain text. A blank line starts a new paragraph.
              </p>
            </div>
          </div>

          {/* English (optional) */}
          <div className="rounded-2xl border border-border bg-bg">
            <button
              type="button"
              onClick={() => setShowEn((s) => !s)}
              className="flex w-full items-center justify-between gap-2 px-5 py-4 text-left"
            >
              <span>
                <span className="text-sm font-bold text-fg">English version</span>
                <span className="ml-2 text-xs text-fg-muted">optional</span>
              </span>
              <ChevronDown
                className={`h-4 w-4 text-fg-muted transition-transform ${showEn ? "rotate-180" : ""}`}
              />
            </button>
            {showEn && (
              <div className="space-y-4 border-t border-border px-5 pb-5 pt-4">
                <div>
                  <label htmlFor="title_en" className={labelCls}>
                    Title (English)
                  </label>
                  <input
                    id="title_en"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="excerpt_en" className={labelCls}>
                    Excerpt (English)
                  </label>
                  <textarea
                    id="excerpt_en"
                    value={excerptEn}
                    onChange={(e) => setExcerptEn(e.target.value)}
                    rows={2}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="body_en" className={labelCls}>
                    Body (English)
                  </label>
                  <textarea
                    id="body_en"
                    value={bodyEn}
                    onChange={(e) => setBodyEn(e.target.value)}
                    rows={12}
                    className={`${inputCls} font-mono leading-relaxed`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-bg p-5">
            <h2 className="text-sm font-bold text-fg">Publishing</h2>
            <label className="mt-4 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border text-brand-blue accent-brand-blue"
              />
              <span>
                <span className="block text-[13px] font-semibold text-fg">Published</span>
                <span className="block text-xs text-fg-muted">
                  Visible on the public blog. The publish date is set the first time it goes live.
                </span>
              </span>
            </label>
          </div>

          <div className="rounded-2xl border border-border bg-bg p-5">
            <h2 className="text-sm font-bold text-fg">Details</h2>

            <div className="mt-4">
              <label htmlFor="author_name" className={labelCls}>
                Author
              </label>
              <input
                id="author_name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="PromisePD"
                className={inputCls}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="tags" className={labelCls}>
                Tags
              </label>
              <input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="real estate, dhaka, investment"
                className={inputCls}
              />
              <p className="mt-1 text-xs text-fg-faint">Separate tags with commas.</p>
            </div>

            <div className="mt-4">
              <label htmlFor="cover_url" className={labelCls}>
                Cover image URL
              </label>
              <input
                id="cover_url"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="https://…"
                className={inputCls}
              />
              {coverUrl.trim() && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={coverUrl}
                  alt=""
                  className="mt-3 aspect-video w-full rounded-xl border border-border object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
