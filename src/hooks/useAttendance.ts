
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export function useAttendance() {
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

  return {
    date,
    setDate,
    showForm,
    setShowForm,
    students,
    attendance,
    isLoading: isStudentsLoading || isAttendanceLoading,
    addAttendance,
  };
}
