"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";

export default function LeaderboardPage() {
  const leaderboard = useQuery(api.leaderboard.getLeaderboard);

  if (!leaderboard) {
    return <div>Laster...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ledetabell</CardTitle>
      </CardHeader>
      <CardContent>
        {leaderboard.map((entry) => (
          <Link
            href={`/user/${entry.userId}`}
            key={entry._id}
            className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                #{entry.position}
              </span>
              <span className="text-sm font-medium">{entry.userName}</span>
            </div>
            <span className="text-sm font-medium text-red-600">
              {entry.points} poeng
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
