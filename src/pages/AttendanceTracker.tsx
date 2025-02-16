import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';

const AttendanceTracker = () => {
  const [date, setDate] = useState(new Date());
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: students, isLoading: isStudentsLoading } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const { data, error } = await supabase.from('students').select('*');
      if (error) throw error;
      return data;
    },
  });

  const { data: attendance, isLoading: isAttendanceLoading } = useQuery({
    queryKey: ['attendance', date],
    queryFn: async () => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('date', formattedDate);

      if (error) throw error;
      return data;
    },
  });

  const sendAbsentNotification = useMutation({
    mutationFn: async ({ studentId, date }: { studentId: string; date: string }) => {
      const { data, error } = await supabase.functions.invoke('send-attendance-notification', {
        body: { studentId, date },
      });
      if (error) throw error;
      return data;
    },
  });

  const updateAttendance = useMutation({
    mutationFn: async ({
      studentId,
      status,
    }: {
      studentId: string;
      status: 'present' | 'absent' | 'late';
    }) => {
      const attendanceDate = format(date, 'yyyy-MM-dd');
      const existingRecord = attendance?.find(
        (record) => record.student_id === studentId
      );

      if (existingRecord) {
        const { error } = await supabase
          .from('attendance')
          .update({ status })
          .eq('id', existingRecord.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('attendance').insert([
          {
            student_id: studentId,
            date: attendanceDate,
            status,
          },
        ]);

        if (error) throw error;
      }

      // Send notification if student is marked as absent
      if (status === 'absent') {
        sendAbsentNotification.mutate({
          studentId,
          date: attendanceDate,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance', date] });
      toast({
        title: 'Success',
        description: 'Attendance updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const isLoading = isStudentsLoading || isAttendanceLoading;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attendance Tracker</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, 'PP')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students?.map((student) => {
            const attendanceRecord = attendance?.find(
              (record) => record.student_id === student.id
            );
            const status = attendanceRecord ? attendanceRecord.status : 'present';

            return (
              <TableRow key={student.id}>
                <TableCell>{student.student_id}</TableCell>
                <TableCell>
                  {student.first_name} {student.last_name}
                </TableCell>
                <TableCell>
                  <Button
                    variant={status === 'present' ? 'secondary' : 'outline'}
                    onClick={() =>
                      updateAttendance.mutate({
                        studentId: student.id,
                        status: 'present',
                      })
                    }
                  >
                    Present
                  </Button>
                  <Button
                    variant={status === 'absent' ? 'secondary' : 'outline'}
                    onClick={() =>
                      updateAttendance.mutate({
                        studentId: student.id,
                        status: 'absent',
                      })
                    }
                  >
                    Absent
                  </Button>
                  <Button
                    variant={status === 'late' ? 'secondary' : 'outline'}
                    onClick={() =>
                      updateAttendance.mutate({
                        studentId: student.id,
                        status: 'late',
                      })
                    }
                  >
                    Late
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTracker;
