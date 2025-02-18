
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/Navbar';
import { AttendanceForm } from '@/components/AttendanceForm';
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const AttendanceTracker = () => {
  const [date, setDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
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
    queryKey: ['attendance', format(date, 'yyyy-MM-dd')],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('date', format(date, 'yyyy-MM-dd'));
      if (error) throw error;
      return data;
    },
  });

  const addAttendance = useMutation({
    mutationFn: async ({ studentId, status, date }: { 
      studentId: string; 
      status: 'present' | 'absent' | 'late'; 
      date: Date 
    }) => {
      const { error } = await supabase.from('attendance').insert([
        {
          student_id: studentId,
          status,
          date: format(date, 'yyyy-MM-dd'),
        },
      ]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      setShowForm(false);
      toast({
        title: 'Success',
        description: 'Attendance recorded successfully',
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
    return (
      <div>
        <Navbar />
        <div className="p-8">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Attendance Tracker</h1>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Take Attendance
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Take Attendance</DialogTitle>
              </DialogHeader>
              <AttendanceForm 
                students={students}
                onSubmit={(data) => addAttendance.mutate(data)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance?.map((record) => {
              const student = students?.find(s => s.id === record.student_id);
              return (
                <TableRow key={record.id}>
                  <TableCell>{student?.student_id}</TableCell>
                  <TableCell>
                    {student?.first_name} {student?.last_name}
                  </TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>{format(new Date(record.date), 'PP')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AttendanceTracker;
