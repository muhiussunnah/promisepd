import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser, isManager } from "@/lib/auth";
import { PageHeader } from "@/components/admin/ui";
import { loadFinance } from "@/lib/finance";
import BankCash from "../BankCash";
import FinanceTabs from "../FinanceTabs";

export const metadata: Metadata = { title: "Finance · Bank & Cash", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function BankCashPage() {
  const me = await getCurrentUser();
  if (!me || !isManager(me.role)) redirect("/account");
  const data = await loadFinance();
  return (
    <div className="space-y-6">
      <PageHeader title="Finance · Bank & Cash" subtitle="ক্যাশ ড্রয়ার, ব্যাংক, বিকাশ/নগদ — every account with its live balance." action={<FinanceTabs active="bank" />} />
      <BankCash data={data} canEdit={me.role === "admin"} />
    </div>
  );
}
