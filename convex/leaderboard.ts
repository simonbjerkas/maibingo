import { query } from "./_generated/server";
import { v } from "convex/values";

export const getLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    const leaderboard = await ctx.db
      .query("leaderboard")
      .withIndex("by_points")
      .order("desc")
      .collect();

    const leaderboardWithUsers = await Promise.all(
      leaderboard.map(async (entry, index) => {
        const user = await ctx.db.get(entry.userId);
        return {
          ...entry,
          userName: user?.name || "Unknown",
          position: index + 1,
        };
      }),
    );

    return leaderboardWithUsers;
  },
});

export const getUserLeaderboard = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const allEntries = await ctx.db
      .query("leaderboard")
      .withIndex("by_points")
      .order("desc")
      .collect();

    const userEntry = allEntries.find((entry) => entry.userId === args.userId);
    if (!userEntry) {
      return null;
    }

    const position =
      allEntries.findIndex((entry) => entry.userId === args.userId) + 1;
    const user = await ctx.db.get(args.userId);

    return {
      ...userEntry,
      userName: user?.name || "Unknown",
      position,
    };
  },
});
