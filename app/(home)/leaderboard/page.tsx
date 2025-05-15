"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";

export default function LeaderboardPage() {
  const leaderboard = useQuery(api.leaderboard.getLeaderboard);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ledetabell</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {leaderboard ? (
            leaderboard.length === 0 ? (
              <p className="text-gray-600 text-sm">
                Ingen spillere har begynt å spille ennå.
              </p>
            ) : (
              leaderboard.map((entry) => (
                <Link
                  href={`/user/${entry.userId}`}
                  key={entry._id}
                  className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                      #{entry.position}
                    </span>
                    <span className="text-sm font-medium">
                      {entry.userName}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-red-600">
                    {entry.points} poeng
                  </span>
                </Link>
              ))
            )
          ) : (
            Array.from({ length: 8 }, (_, i) => i + 1).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="w-44 h-4" />
                </div>
                <Skeleton className="w-20 h-4" />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
