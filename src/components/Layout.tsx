
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { NotificationDropdown } from "./NotificationDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { UserCircle, Clock, FileText, School, LogOut, Search } from "lucide-react";
import { Input } from "./ui/input";
import { useNavigate, useLocation } from "react-router-dom";

export function Layout({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: UserCircle },
    { path: '/students', label: 'Students', icon: School },
    { path: '/attendance', label: 'Attendance', icon: Clock },
    { path: '/reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="min-h-screen flex bg-[#F8F9FA]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r fixed h-full">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-8">Oakridge</h2>
          <div className="space-y-4">
            <p className="text-xs text-gray-500 font-medium">MAIN MENU</p>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`w-full justify-start ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/5"
                      : "text-gray-600"
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white p-4 sticky top-0 z-10 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search features..."
                  className="pl-10 bg-gray-50 border-0"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <NotificationDropdown />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  signOut();
                  navigate('/auth');
                }}
              >
                <LogOut className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
