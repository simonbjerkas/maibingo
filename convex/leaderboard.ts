import { query } from "./_generated/server";

export const getLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    const leaderboard = await ctx.db
      .query("leaderboard")
      .withIndex("by_points")
      .order("desc")
      .collect();

    const leaderboardWithUsers = await Promise.all(
      leaderboard.map(async (entry) => {
        const user = await ctx.db.get(entry.userId);
        return {
          ...entry,
          userName: user?.name || "Unknown",
        };
      }),
    );

    return leaderboardWithUsers;
  },
});
