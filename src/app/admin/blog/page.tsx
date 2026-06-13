import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText, Newspaper, Plus } from "lucide-react";
import { getCurrentUser, isManager } from "@/lib/auth";
import { getAdmin } from "@/lib/admin-guard";
import {
  Badge,
  EmptyState,
  PageHeader,
  StatCard,
  TableShell,
  tdCls,
  thCls,
} from "@/components/admin/ui";
import RowActions from "./RowActions";

export const metadata: Metadata = {
  title: "Blog",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type PostRow = {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  author_name: string | null;
};

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const NewButton = (
  <Link
    href="/admin/blog/new"
    className="inline-flex items-center gap-1.5 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-brand)] transition-colors hover:bg-brand-blue-dark"
  >
    <Plus className="h-4 w-4" /> New post
  </Link>
);

export default async function BlogAdminPage() {
  const me = await getCurrentUser();
  if (!me || !isManager(me.role)) redirect("/account");

  const admin = getAdmin();
  if (!admin) {
    return (
      <div className="space-y-6">
        <PageHeader title="Blog" subtitle="Write and manage articles for the public blog." />
        <EmptyState
          icon={Newspaper}
          title="Data unavailable"
          message="Supabase isn’t configured, so blog posts can’t be loaded right now."
        />
      </div>
    );
  }

  const { data, error } = await admin
    .from("blog_posts")
    .select("id, slug, title, published, published_at, created_at, author_name")
    .order("created_at", { ascending: false });

  const posts = (error ? [] : (data ?? [])) as PostRow[];
  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.length - publishedCount;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog"
        subtitle="Write and manage articles for the public blog."
        action={NewButton}
      />

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total posts" value={posts.length} icon={Newspaper} tone="info" />
        <StatCard label="Published" value={publishedCount} icon={FileText} tone="success" />
        <StatCard label="Drafts" value={draftCount} icon={FileText} tone="neutral" />
      </div>

      {posts.length === 0 ? (
        <EmptyState
          icon={Newspaper}
          title="No posts yet"
          message="Create your first article to start publishing to the blog."
          action={NewButton}
        />
      ) : (
        <TableShell>
          <thead>
            <tr>
              <th className={thCls}>Title</th>
              <th className={thCls}>Status</th>
              <th className={thCls}>Date</th>
              <th className={`${thCls} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td className={tdCls}>
                  <Link
                    href={`/admin/blog/${p.id}`}
                    className="font-semibold text-fg hover:text-brand-blue"
                  >
                    {p.title}
                  </Link>
                  <div className="mt-0.5 text-xs text-fg-faint">
                    /blog/{p.slug}
                    {p.author_name ? ` · ${p.author_name}` : ""}
                  </div>
                </td>
                <td className={tdCls}>
                  {p.published ? (
                    <Badge tone="success">Published</Badge>
                  ) : (
                    <Badge tone="neutral">Draft</Badge>
                  )}
                </td>
                <td className={tdCls}>
                  <span className="text-sm text-fg">
                    {p.published && p.published_at ? fmtDate(p.published_at) : fmtDate(p.created_at)}
                  </span>
                  <div className="text-xs text-fg-faint">
                    {p.published && p.published_at ? "published" : "created"}
                  </div>
                </td>
                <td className={tdCls}>
                  <RowActions id={p.id} title={p.title} published={p.published} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}
    </div>
  );
}
