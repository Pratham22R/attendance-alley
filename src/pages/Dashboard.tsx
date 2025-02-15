
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Menu,
  Users,
  Settings,
  PieChart,
  LogOut,
  Search,
  Bell,
  Download,
  Filter
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const students = [
  { id: 1, name: "John Doe", present: true, attendance: 85 },
  { id: 2, name: "Jane Smith", present: false, attendance: 92 },
  { id: 3, name: "Alice Johnson", present: true, attendance: 78 },
  { id: 4, name: "Bob Wilson", present: true, attendance: 95 },
  { id: 5, name: "Eva Brown", present: false, attendance: 88 },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "attendance">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleDownloadReport = () => {
    // Generate CSV data
    const csvContent = students.map(student => 
      `${student.name},${student.present ? "Present" : "Absent"},${student.attendance}%`
    ).join("\n");
    
    // Create blob and download
    const blob = new Blob([`Name,Status,Attendance\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'attendance_report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast({
      title: "Success",
      description: "Report downloaded successfully!",
    });
  };

  const filteredStudents = students
    .filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc" 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === "asc"
          ? a.attendance - b.attendance
          : b.attendance - a.attendance;
      }
    });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="h-full bg-white">
            <div className="p-6">
              <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <nav className="space-y-2 px-4">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart className="w-5 h-5" />
                Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="w-5 h-5" />
                Students
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <PieChart className="w-5 h-5" />
                Reports
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Sidebar for larger screens */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-neutral-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <nav className="flex-1 space-y-2 px-4">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <BarChart className="w-5 h-5" />
                Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="w-5 h-5" />
                Students
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <PieChart className="w-5 h-5" />
                Reports
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="sticky top-0 z-40 lg:ml-64 bg-white border-b border-neutral-200">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center flex-1">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={handleDownloadReport}>
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {/* Filter options */}
          {showFilters && (
            <div className="p-4 border-t border-neutral-200 bg-white">
              <div className="flex items-center gap-4">
                <div>
                  <label className="text-sm font-medium">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "name" | "attendance")}
                    className="ml-2 p-1 border rounded"
                  >
                    <option value="name">Name</option>
                    <option value="attendance">Attendance</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Order:</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                    className="ml-2 p-1 border rounded"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <main className="p-4">
          <div className="grid gap-4">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-500">Total Students</h3>
                <p className="text-2xl font-bold mt-2">150</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-500">Present Today</h3>
                <p className="text-2xl font-bold mt-2">132</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-500">Average Attendance</h3>
                <p className="text-2xl font-bold mt-2">88%</p>
              </div>
            </div>

            {/* Students table */}
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="text-left p-4 font-medium">Name</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-neutral-200">
                        <td className="p-4">{student.name}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            student.present
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {student.present ? 'Present' : 'Absent'}
                          </span>
                        </td>
                        <td className="p-4">{student.attendance}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
