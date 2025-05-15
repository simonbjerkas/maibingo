"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserPage() {
  const { userId } = useParams();
  const bingo = useQuery(api.bingo.getBingo, {
    userId: userId as Id<"users">,
  });
  const leaderboard = useQuery(api.leaderboard.getUserLeaderboard, {
    userId: userId as Id<"users">,
  });

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{"Nåværende Posisjon"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200">
              {leaderboard ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                      #{leaderboard.position}
                    </span>
                    <span className="text-sm font-medium">
                      {leaderboard.userName}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-red-600">
                    {leaderboard.points} poeng
                  </span>
                </>
              ) : leaderboard === undefined ? (
                <>
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="w-44 h-4" />
                  </div>
                  <Skeleton className="w-20 h-4" />
                </>
              ) : (
                <p className="text-gray-600 text-sm">
                  Absolutt siste plass. Milevis bak alle andre.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bingo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
              {bingo ? (
                bingo.items.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "aspect-square rounded-lg border-2 p-2 flex items-center justify-center text-center transition-all duration-200 cursor-pointer",
                      item.status
                        ? "bg-red-50 border-red-200 text-red-600"
                        : "bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:bg-red-50/50",
                    )}
                  >
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                ))
              ) : bingo === undefined ? (
                Array.from({ length: 9 }, (_, i) => i + 1).map((_, index) => (
                  <Skeleton
                    key={index}
                    className={cn(
                      "aspect-square rounded-lg border-2 p-2 flex items-center justify-center",
                    )}
                  />
                ))
              ) : (
                <p className="text-gray-600 text-sm col-span-3">
                  Er det mulig? Har ikke en gang laget bingobrett ennå.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
