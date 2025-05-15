import { query } from "./_generated/server";

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const authed = await ctx.auth.getUserIdentity();
    if (!authed) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.query("users").collect();
  },
});

export const getLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});
