
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  LayoutDashboard, 
  LineChart, 
  Users, 
  Settings, 
  HelpCircle, 
  Search, 
  Moon, 
  Bell, 
  Download,
  ChevronDown
} from 'lucide-react';
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';

const mockStudentData = {
  name: "Caleb White",
  id: "2021-0201",
  phone: "(555) 123-4567",
  email: "caleb.white@gmail.com",
  address: "123 Elm Street",
  attendance: {
    total: 23,
    breakdown: [
      { type: 'Present', days: 13, color: '#3B82F6' },
      { type: 'Late', days: 7, color: '#22C55E' },
      { type: 'Excused', days: 1, color: '#F59E0B' },
      { type: 'Absent', days: 2, color: '#EF4444' }
    ]
  }
};

const monthlyData = [
  { month: 'January', rate: 57 },
  { month: 'February', rate: 65 },
  { month: 'March', rate: 55 },
];

const topStudents = [
  { rank: 1, name: "Daxton Farmer", id: "2020-4525", progress: 91 },
  { rank: 2, name: "Todd Dye", id: "2017-4718", progress: 87 },
  { rank: 3, name: "Julia White", id: "2017-4733", progress: 85 },
];

const SidebarLink = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${active ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}>
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </div>
);

const StatusCard = ({ days, label, color }: { days: number, label: string, color: string }) => (
  <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-neutral-100">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${color}20`, color: color }}>
      {days}
    </div>
    <div>
      <p className="text-sm text-neutral-600">{label}</p>
      <p className="font-medium">{days} Days</p>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-100 bg-white p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <img src="/lovable-uploads/70676d85-8529-4641-812d-145a6899c95a.png" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-xl">Oakridge</span>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-neutral-400 px-4 mb-2">MAIN MENU</p>
          <SidebarLink icon={LayoutDashboard} label="Dashboard" active />
          <SidebarLink icon={LineChart} label="Analytics" />
          <SidebarLink icon={Users} label="Student" />
        </div>

        <div className="mt-8 space-y-1">
          <p className="text-xs font-medium text-neutral-400 px-4 mb-2">SETTINGS</p>
          <SidebarLink icon={Settings} label="Settings" />
          <SidebarLink icon={HelpCircle} label="Help & Support" />
        </div>

        <div className="mt-auto">
          <div className="bg-primary/5 p-4 rounded-xl">
            <h3 className="font-semibold mb-1">Upgrade to Pro</h3>
            <p className="text-sm text-neutral-600 mb-4">Get 1 month free and unlock all features</p>
            <button 
              onClick={() => navigate('/plans')}
              className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Upgrade
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-neutral-100">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search framework..."
                className="pl-10 pr-4 py-2 bg-neutral-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-neutral-100 rounded-lg">
                <Moon className="w-5 h-5 text-neutral-600" />
              </button>
              <button className="p-2 hover:bg-neutral-100 rounded-lg">
                <Bell className="w-5 h-5 text-neutral-600" />
              </button>
              <Avatar />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Student Details</h1>
            <div className="flex items-center gap-4">
              <select className="px-4 py-2 bg-white border border-neutral-100 rounded-lg">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
              <button className="button-primary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Info
              </button>
            </div>
          </div>

          {/* Student Info */}
          <div className="bg-white rounded-xl p-6 mb-8">
            <div className="flex items-start gap-6">
              <Avatar className="w-16 h-16" />
              <div className="flex-1 grid grid-cols-4 gap-8">
                <div>
                  <p className="text-sm text-neutral-600">ID</p>
                  <p className="font-medium">{mockStudentData.id}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Number</p>
                  <p className="font-medium">{mockStudentData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Email</p>
                  <p className="font-medium">{mockStudentData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Address</p>
                  <p className="font-medium">{mockStudentData.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {mockStudentData.attendance.breakdown.map((status, index) => (
              <StatusCard
                key={index}
                days={status.days}
                label={status.type}
                color={status.color}
              />
            ))}
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Class Days</h3>
                  <p className="text-sm text-neutral-600">Class days for Monthly</p>
                </div>
                <div className="text-3xl font-bold">{mockStudentData.attendance.total} Days</div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Top Attendance Students</h3>
                <button className="text-sm text-neutral-600 hover:text-primary flex items-center gap-1">
                  Filter
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-neutral-600">
                    <th className="text-left font-medium py-2">Rank</th>
                    <th className="text-left font-medium py-2">Name</th>
                    <th className="text-left font-medium py-2">ID</th>
                    <th className="text-left font-medium py-2">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {topStudents.map((student) => (
                    <tr key={student.id} className="border-t border-neutral-100">
                      <td className="py-3">{student.rank}</td>
                      <td className="py-3">{student.name}</td>
                      <td className="py-3">{student.id}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-neutral-100 rounded-full">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm">{student.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
