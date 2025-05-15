"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BingoBoard } from "./bingo-board";
import { Leaderboard } from "./leaderboard";
import { Menu, Users, LogOut } from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-b from-red-50 to-blue-50 transition-all duration-300",
        isMenuOpen && "blur-xs",
      )}
    >
      {/* Decorative elements */}
      <div className="sticky inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-red-100 opacity-20 transform -skew-y-6"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-blue-100 opacity-20 transform skew-y-6"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                Bingo
              </h1>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[280px] bg-white/95 backdrop-blur-xl"
                >
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                      Konkurrenter
                    </SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6">
                    <MembersList />
                    <div className="pt-4 border-t border-gray-200">
                      <SignOutButton />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar - hidden on mobile, shown on desktop */}
          <aside className="hidden md:block">
            <Card className="sticky top-24 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Konkurrenter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MembersList />
              </CardContent>
            </Card>
          </aside>

          {/* Main content */}
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
        </div>
      </main>
    </div>
  );
}

function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  return (
    <>
      {isAuthenticated && (
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
          onClick={() =>
            void signOut().then(() => {
              redirect("/signin");
            })
          }
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logg ut
        </Button>
      )}
    </>
  );
}

function MembersList() {
  const members = useQuery(api.users.getAllUsers);

  if (members === undefined || members === null) {
    return <div className="text-sm text-gray-500">Laster...</div>;
  }

  return (
    <ul className="space-y-1 mx-4">
      {members.map((member) => (
        <li key={member._id}>
          <Button variant="outline" className="w-full">
            <Link href={`/user/${member._id}`}>{member.name}</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
