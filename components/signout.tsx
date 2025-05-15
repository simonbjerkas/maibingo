"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export function SignOutButton() {
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
