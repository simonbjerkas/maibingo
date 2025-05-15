import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function Leaderboard() {
  const leaderboard = useQuery(api.leaderboard.getLeaderboard);
  if (!leaderboard) {
    return <div className="text-gray-500">Laster...</div>;
  }

  return (
    <div className="space-y-2">
      {leaderboard.slice(0, 3).map((entry, index) => (
        <div
          key={entry._id}
          className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              #{index + 1}
            </span>
            <span className="text-sm font-medium">{entry.userName}</span>
          </div>
          <span className="text-sm font-medium text-red-600">
            {entry.points} poeng
          </span>
        </div>
      ))}
    </div>
  );
}
