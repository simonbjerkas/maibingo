import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getBingo = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const bingo = await ctx.db
      .query("bingos")
      .filter((q) => q.eq(q.field("userId"), args.userId || userId))
      .first();

    if (!bingo) {
      return null;
    }

    // Get all item details
    const itemsWithDetails = await Promise.all(
      bingo.items.map(async (item) => {
        const itemDetails = await ctx.db.get(item.item);
        return {
          ...item,
          name: itemDetails?.item || "Unknown",
        };
      }),
    );

    return {
      ...bingo,
      items: itemsWithDetails,
    };
  },
});

export const createBingo = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const allItems = await ctx.db.query("bingoItems").collect();
    const shuffledItems = allItems.sort(() => Math.random() - 0.5);
    const selectedItems = shuffledItems.slice(0, 9).map((item) => ({
      item: item._id,
      status: false,
    }));

    await ctx.db.insert("bingos", {
      userId,
      items: selectedItems,
    });
  },
});

export const addItem = mutation({
  args: { item: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.insert("bingoItems", {
      item: args.item,
    });
  },
});

export const updateItem = mutation({
  args: {
    bingoId: v.id("bingos"),
    itemId: v.id("bingoItems"),
    status: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const [bingo, leaderboard] = await Promise.all([
      ctx.db.get(args.bingoId),
      ctx.db
        .query("leaderboard")
        .filter((q) => q.eq(q.field("userId"), userId))
        .first(),
    ]);
    if (!bingo) {
      throw new Error("Bingo not found");
    }

    const updatedItems = bingo.items.map((item) =>
      item.item === args.itemId ? { ...item, status: args.status } : item,
    );
    const points = updatedItems.filter((item) => item.status).length;

    await Promise.all([
      ctx.db.patch(args.bingoId, {
        items: updatedItems,
      }),
      leaderboard
        ? ctx.db.patch(leaderboard._id, {
            points,
          })
        : ctx.db.insert("leaderboard", {
            userId,
            points,
          }),
    ]);
  },
});
