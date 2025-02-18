
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "./Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">{children}</main>
      <footer className="bg-background border-t py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AttendanceTracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
