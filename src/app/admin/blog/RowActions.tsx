"use client";

/** Per-row interactive controls for the blog list: a publish toggle,
 *  an edit link, and a delete with confirmation. */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { deletePost, setPublished } from "@/app/actions/admin-blog";

export default function RowActions({
  id,
  title,
  published,
}: {
  id: string;
  title: string;
  published: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function togglePublish() {
    setError(null);
    startTransition(async () => {
      const res = await setPublished(id, !published);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.refresh();
    });
  }

  function remove() {
    setError(null);
    startTransition(async () => {
      const res = await deletePost(id);
      if (!res.ok) {
        setError(res.error);
        setConfirming(false);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="flex items-center justify-end gap-1.5">
      {error && <span className="mr-1 text-xs font-medium text-brand-red">{error}</span>}

      <button
        type="button"
        onClick={togglePublish}
        disabled={pending}
        className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-fg-muted transition-colors hover:border-brand-blue/40 hover:text-brand-blue disabled:opacity-60"
        title={published ? "Unpublish" : "Publish"}
      >
        {published ? "Unpublish" : "Publish"}
      </button>

      <Link
        href={`/admin/blog/${id}`}
        className="grid h-8 w-8 place-items-center rounded-lg border border-border text-fg-muted transition-colors hover:border-brand-blue/40 hover:text-brand-blue"
        title="Edit"
        aria-label={`Edit ${title}`}
      >
        <Pencil className="h-4 w-4" />
      </Link>

      {confirming ? (
        <span className="inline-flex items-center gap-1">
          <button
            type="button"
            onClick={remove}
            disabled={pending}
            className="inline-flex items-center gap-1 rounded-lg bg-brand-red px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-60"
          >
            {pending && <Loader2 className="h-3 w-3 animate-spin" />} Confirm
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            disabled={pending}
            className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-fg-muted hover:text-fg disabled:opacity-60"
          >
            Cancel
          </button>
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          disabled={pending}
          className="grid h-8 w-8 place-items-center rounded-lg border border-border text-fg-muted transition-colors hover:border-brand-red/40 hover:text-brand-red disabled:opacity-60"
          title="Delete"
          aria-label={`Delete ${title}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
