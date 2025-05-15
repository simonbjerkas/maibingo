import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MembersList } from "@/components/memberslist";
import { Users } from "lucide-react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="container relative w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
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
    </>
  );
}
