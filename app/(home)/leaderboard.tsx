"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Leaderboard() {
  const leaderboard = useQuery(api.leaderboard.getLeaderboard);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (leaderboard && leaderboard[0]?.points === 9) {
      setOpen(true);
    }
  }, [leaderboard]);

  if (!leaderboard) {
    return (
      <div className="space-y-2">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <p className="text-gray-600 text-sm">
        Ingen spillere har begynt å spille ennå.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bingo!</AlertDialogTitle>
            <AlertDialogDescription>
              {leaderboard[0].userName} har vunnet!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Lukk</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {leaderboard.slice(0, 3).map((entry) => (
        <div
          key={entry._id}
          className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              #{entry.position}
            </span>
            <Avatar>
              <AvatarImage src={entry.userImage} />
              <AvatarFallback>
                {entry.userName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
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
