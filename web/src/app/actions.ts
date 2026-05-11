"use server";

import { ConvexHttpClient } from "convex/browser";
import { anyApi } from "convex/server";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  message: string;
};

export async function submitContact(
  payload: ContactPayload,
): Promise<{ ok: boolean; error?: string }> {
  if (!payload.name?.trim() || !payload.email?.trim() || !payload.message?.trim()) {
    return { ok: false, error: "Please fill in name, email and message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { ok: false, error: "Please enter a valid email." };
  }

  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (convexUrl) {
    try {
      const client = new ConvexHttpClient(convexUrl);
      await client.mutation(anyApi.contact.submit, payload);
      return { ok: true };
    } catch (err) {
      console.error("[contact] convex failed:", err);
    }
  }

  console.log("[contact] received (no Convex configured):", payload);
  return { ok: true };
}

export async function subscribeNewsletter(
  email: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email." };
  }
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (convexUrl) {
    try {
      const client = new ConvexHttpClient(convexUrl);
      await client.mutation(anyApi.contact.subscribe, { email });
      return { ok: true };
    } catch (err) {
      console.error("[newsletter] convex failed:", err);
    }
  }
  console.log("[newsletter] received (no Convex configured):", email);
  return { ok: true };
}
