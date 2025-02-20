
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Download, Filter, Search, MoreHorizontal, UserCircle, Calendar, Clock, AlertCircle } from 'lucide-react';
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNotifications } from "@/contexts/NotificationContext";
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const handleDownloadReport = () => {
    setTimeout(() => {
      addNotification(
        "Report Downloaded",
        "Your attendance report has been downloaded successfully."
      );
    }, 1000);
  };

  const stats = [
    { label: "Total Attendance", value: "13 Days", color: "bg-blue-500", icon: <UserCircle className="w-5 h-5" /> },
    { label: "Late Attendance", value: "7 Days", color: "bg-green-500", icon: <Clock className="w-5 h-5" /> },
    { label: "Leave Days", value: "1 Days", color: "bg-orange-500", icon: <Calendar className="w-5 h-5" /> },
    { label: "Total Absent", value: "2 Days", color: "bg-red-500", icon: <AlertCircle className="w-5 h-5" /> },
  ];

  const topStudents = [
    { rank: "01", name: "Daxton Farmer", id: "2020-4535", progress: 91 },
    { rank: "02", name: "Todd Eye", id: "2017-4718", progress: 87 },
    { rank: "03", name: "Julie White", id: "2017-4733", progress: 85 },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-8">Oakridge</h2>
            <div className="space-y-4">
              <p className="text-xs text-gray-500 font-medium">MAIN MENU</p>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-primary"
                onClick={() => navigate('/dashboard')}
              >
                <UserCircle className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-600"
                onClick={() => navigate('/students')}
              >
                <UserCircle className="w-4 h-4 mr-2" />
                Students
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-600"
                onClick={() => navigate('/attendance')}
              >
                <Clock className="w-4 h-4 mr-2" />
                Attendance
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
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
                <Button variant="outline" size="icon" onClick={handleDownloadReport}>
                  <Download className="w-4 h-4" />
                </Button>
                <ThemeToggle />
                <NotificationDropdown />
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </header>

          {/* Main content area */}
          <main className="p-6">
            <div className="space-y-6">
              {/* Student Details Card */}
              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Student Details</CardTitle>
                  <div className="flex items-center gap-3">
                    <select className="px-3 py-1 rounded border">
                      <option>Monthly</option>
                      <option>Weekly</option>
                      <option>Daily</option>
                    </select>
                    <Button size="sm" variant="default">
                      Download Info
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="p-4 rounded-lg bg-white border">
                        <div className={`w-8 h-8 ${stat.color} rounded-full flex items-center justify-center text-white mb-3`}>
                          {stat.icon}
                        </div>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                        <p className="text-xl font-semibold mt-1">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Rate Card */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Attendance Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-4">56%</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>January</span>
                        <span>57%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '57%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Top Attendance Students</CardTitle>
                    <Button variant="outline" size="icon">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>ID</TableHead>
                          <TableHead>Progress</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.rank}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full" 
                                    style={{ width: `${student.progress}%` }}
                                  ></div>
                                </div>
                                <span>{student.progress}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
