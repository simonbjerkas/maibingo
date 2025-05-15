import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { MembersList } from "@/components/memberslist";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bingo",
  description: "17. mai 2025",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="no-NO">
        <body
          className={cn(
            `${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-red-50 to-blue-50 flex flex-col`,
          )}
        >
          <ConvexClientProvider>
            <Navbar />
            <main className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
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
                <div className="md:col-span-3">{children}</div>
              </div>
            </main>
            <Footer />
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
