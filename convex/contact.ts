import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    interest: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactSubmissions", {
      ...args,
      createdAt: Date.now(),
    });
    return { id, ok: true };
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_createdAt")
      .order("desc")
      .take(50);
  },
});

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("newsletter")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (existing) return { ok: true, alreadySubscribed: true };
    await ctx.db.insert("newsletter", {
      email: args.email,
      createdAt: Date.now(),
    });
    return { ok: true };
  },
});
