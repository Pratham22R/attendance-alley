
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Student, Branch } from '@/types/student';
import * as XLSX from 'xlsx';

const ALL_BRANCHES = "all_branches";

export function useStudents() {
  const [open, setOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string>(ALL_BRANCHES);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: branches } = useQuery({
    queryKey: ['branches'],
    queryFn: async () => {
      const { data, error } = await supabase.from('branches').select('*');
      if (error) throw error;
      return data as Branch[];
    },
  });

  const { data: students, isLoading, isError } = useQuery({
    queryKey: ['students', selectedBranchId, searchTerm],
    queryFn: async () => {
      let query = supabase.from('students').select('*, branches(name)');
      
      if (selectedBranchId && selectedBranchId !== ALL_BRANCHES) {
        query = query.eq('branch_id', selectedBranchId);
      }
      
      if (searchTerm) {
        query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,student_id.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Student[];
    },
  });

  const addStudent = useMutation({
    mutationFn: async (newStudent: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
      const { error } = await supabase.from('students').insert([newStudent]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setOpen(false);
      toast({
        title: 'Success',
        description: 'Student added successfully',
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const { error } = await supabase
          .from('students')
          .insert(
            jsonData.map((row: any) => ({
              student_id: row.student_id,
              first_name: row.first_name,
              last_name: row.last_name,
              email: row.email,
              branch_id: row.branch_id,
            }))
          );

        if (error) throw error;

        queryClient.invalidateQueries({ queryKey: ['students'] });
        toast({
          title: 'Success',
          description: 'Students imported successfully',
        });
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const exportStudents = () => {
    if (!students) return;

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(
      students.map(student => ({
        'Student ID': student.student_id,
        'First Name': student.first_name,
        'Last Name': student.last_name,
        'Email': student.email,
        'Branch': student.branches?.name,
      }))
    );

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    XLSX.writeFile(workbook, 'students.xlsx');
  };

  return {
    students,
    branches,
    isLoading,
    isError,
    open,
    setOpen,
    selectedBranchId,
    setSelectedBranchId,
    searchTerm,
    setSearchTerm,
    addStudent,
    handleFileUpload,
    exportStudents,
  };
}
