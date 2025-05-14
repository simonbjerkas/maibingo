"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useAuthActions } from "@convex-dev/auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-red-100 opacity-20 transform -skew-y-6"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-blue-100 opacity-20 transform skew-y-6"></div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Velkommen!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Logg inn for å fortsette din reise
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              variant="outline"
              size="lg"
              className="w-full bg-white hover:bg-red-50 border-2 border-red-500 text-red-600 hover:text-red-700 transition-all duration-300 flex items-center justify-center gap-3 py-6 text-lg font-medium"
              onClick={() =>
                void signIn("google")
                  .catch((error) => setError(error.message))
                  .then(() => redirect("/"))
              }
              type="submit"
            >
              <GoogleIcon className="size-6" />
              Logg inn med Google
            </Button>

            {error && (
              <p className="text-red-500 text-center text-sm mt-4">{error}</p>
            )}
          </CardContent>

          <CardFooter className="flex justify-center">
            {/* Decorative Norwegian flag colors */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <div className="w-3 h-3 rounded-full bg-white border border-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

const GoogleIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);
