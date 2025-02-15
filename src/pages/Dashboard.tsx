import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNotifications } from "@/contexts/NotificationContext";

const Dashboard = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { addNotification } = useNotifications();

  const handleDownloadReport = () => {
    // Simulated download logic
    setTimeout(() => {
      addNotification(
        "Report Downloaded",
        "Your attendance report has been downloaded successfully."
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            {/* Add sidebar navigation items here */}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="border-b p-4 bg-card sticky top-0">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Attendance Dashboard</h1>
              
              {/* Header buttons */}
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={handleDownloadReport}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="w-4 h-4" />
                </Button>
                <NotificationDropdown />
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Filters panel */}
          {showFilters && (
            <div className="p-4 border-b bg-card">
              {/* Add filter controls here */}
              <p>Filters panel</p>
            </div>
          )}

          {/* Main content area */}
          <main className="p-4">
            <div className="grid gap-4">
              {/* Add your dashboard content here */}
              <p>Dashboard content</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
