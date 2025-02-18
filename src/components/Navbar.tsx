
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NotificationDropdown } from '@/components/NotificationDropdown';
import { Users, GraduationCap, Clock, PieChart, Home } from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/students', label: 'Students', icon: Users },
    { path: '/branches', label: 'Branches', icon: GraduationCap },
    { path: '/attendance', label: 'Attendance', icon: Clock },
    { path: '/reports', label: 'Reports', icon: PieChart },
  ];

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold mr-8">AttendanceTracker</h1>
            <div className="hidden md:flex space-x-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={location.pathname === item.path ? "secondary" : "ghost"}
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationDropdown />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
