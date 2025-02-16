
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download, Calendar as CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format, subDays } from 'date-fns';
import * as XLSX from 'xlsx';

const Reports = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  // Fetch attendance statistics
  const { data: statistics } = useQuery({
    queryKey: ['attendance-statistics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attendance_statistics')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  // Fetch attendance by date range
  const { data: attendanceByDate } = useQuery({
    queryKey: ['attendance-by-date', dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_attendance_by_date_range', {
          start_date: format(dateRange.from, 'yyyy-MM-dd'),
          end_date: format(dateRange.to, 'yyyy-MM-dd'),
        });
      if (error) throw error;
      return data;
    },
  });

  const exportToExcel = () => {
    if (!statistics) return;

    const ws = XLSX.utils.json_to_sheet(statistics);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Statistics');
    XLSX.writeFile(wb, 'attendance_report.xlsx');
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance Reports</h1>
        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(dateRange.from, 'PP')} - {format(dateRange.to, 'PP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange(range);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button onClick={exportToExcel}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Overall Attendance</CardTitle>
            <CardDescription>Average attendance rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {statistics?.[0]?.attendance_percentage ?? 0}%
            </div>
          </CardContent>
        </Card>
        {/* Add more summary cards as needed */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="present_count" 
                  stroke="#4ade80" 
                  name="Present"
                />
                <Line 
                  type="monotone" 
                  dataKey="absent_count" 
                  stroke="#f87171" 
                  name="Absent"
                />
                <Line 
                  type="monotone" 
                  dataKey="late_count" 
                  stroke="#fbbf24" 
                  name="Late"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Present</TableHead>
                <TableHead>Absent</TableHead>
                <TableHead>Late</TableHead>
                <TableHead>Attendance %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statistics?.map((stat) => (
                <TableRow key={stat.student_id}>
                  <TableCell>{stat.student_number}</TableCell>
                  <TableCell>
                    {stat.first_name} {stat.last_name}
                  </TableCell>
                  <TableCell>{stat.present_count}</TableCell>
                  <TableCell>{stat.absent_count}</TableCell>
                  <TableCell>{stat.late_count}</TableCell>
                  <TableCell>{stat.attendance_percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
