
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { UserCircle, Calendar, Clock, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
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
    <Layout>
      <div className="space-y-6">
        {/* Student Details Card */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Student Details</CardTitle>
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
            <CardHeader>
              <CardTitle>Top Attendance Students</CardTitle>
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
    </Layout>
  );
};

export default Dashboard;
