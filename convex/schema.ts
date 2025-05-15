import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  bingos: defineTable({
    userId: v.id("users"),
    items: v.array(
      v.object({
        item: v.id("bingoItems"),
        status: v.boolean(),
      }),
    ),
  }).index("by_user", ["userId"]),
  bingoItems: defineTable({
    item: v.string(),
  }),
  winners: defineTable({
    userId: v.id("users"),
    bingoId: v.id("bingos"),
  }).index("by_user", ["userId"]),
  leaderboard: defineTable({
    userId: v.id("users"),
    points: v.number(),
  }).index("by_points", ["points"]),
});
