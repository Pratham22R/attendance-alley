
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Students", href: "/students" },
    { name: "Branches", href: "/branches" },
    { name: "Attendance", href: "/attendance" },
    { name: "Reports", href: "/reports" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold">
                AttendanceTracker
              </Link>
              <div className="ml-10 hidden space-x-8 md:block">
                {navigation.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Sign Out
            </button>
          </div>
          <div className="flex space-x-4 py-4 md:hidden">
            {navigation.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>

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
