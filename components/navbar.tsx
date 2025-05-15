"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { MembersList } from "@/components/memberslist";
import { SignOutButton } from "@/components/signout";
import { useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Decorative elements */}
      <div className="sticky inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-red-100 opacity-20 transform -skew-y-6"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-blue-100 opacity-20 transform skew-y-6"></div>
      </div>

      {/* Header */}
      <header className="container mx-auto sticky top-0 z-50 bg-white/40 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <nav className="flex items-center justify-between w-full">
              <Link href="/">
                <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                  Bingo
                </h1>
              </Link>
              <div className="hidden md:flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                  asChild
                >
                  <Link href="/leaderboard">Ledetabell</Link>
                </Button>
                <SignOutButton />
              </div>
            </nav>

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
                  <SheetDescription className="sr-only">
                    Navigasjonsmenu.
                  </SheetDescription>
                  <div className="space-y-6">
                    <MembersList onOpenChange={setIsMenuOpen} />
                    <div className="pt-4 mx-4 border-t border-gray-200">
                      <Button
                        asChild
                        variant="link"
                        className="mx-4"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Link href="/leaderboard">Ledetabell</Link>
                      </Button>
                    </div>
                    <div className="pt-4 mx-4 border-t border-gray-200">
                      <SignOutButton />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
