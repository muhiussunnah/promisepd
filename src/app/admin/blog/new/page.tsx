import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser, isManager } from "@/lib/auth";
import BlogForm from "../BlogForm";

export const metadata: Metadata = {
  title: "New post",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  const me = await getCurrentUser();
  if (!me || !isManager(me.role)) redirect("/account");

  return <BlogForm />;
}
