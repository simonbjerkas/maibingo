import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const authed = await ctx.auth.getUserIdentity();
    if (!authed) {
      return [];
    }
    return await ctx.db.query("users").collect();
  },
});

export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});
