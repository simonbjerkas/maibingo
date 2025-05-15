"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BingoBoard } from "./bingo-board";
import { Leaderboard } from "./leaderboard";

export default function Home() {
  return (
    <div className="md:col-span-3 flex flex-col gap-4">
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Ledetabell</CardTitle>
        </CardHeader>
        <CardContent>
          <Leaderboard />
        </CardContent>
      </Card>
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Bingobrettet ditt!</CardTitle>
        </CardHeader>
        <CardContent>
          <BingoBoard />
        </CardContent>
      </Card>
    </div>
  );
}
