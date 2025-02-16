
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/Layout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { EmailNotificationSettings } from '@/components/EmailNotificationSettings';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as XLSX from 'xlsx';

interface Student {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string | null;
  student_id: string;
  branch_id: string;
  updated_at: string;
}

interface Branch {
  id: string;
  name: string;
}

const Students = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");

  const { data: branches } = useQuery({
    queryKey: ['branches'],
    queryFn: async () => {
      const { data, error } = await supabase.from('branches').select('*');
      if (error) throw error;
      return data as Branch[];
    },
  });

  const { data: students, isLoading, isError } = useQuery({
    queryKey: ['students', selectedBranchId],
    queryFn: async () => {
      let query = supabase.from('students').select('*, branches(name)');
      
      if (selectedBranchId) {
        query = query.eq('branch_id', selectedBranchId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
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

  if (isLoading) return <Layout><p>Loading...</p></Layout>;
  if (isError) return <Layout><p>Error fetching students</p></Layout>;

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Students</h1>
          <div className="flex gap-4">
            <Select
              value={selectedBranchId}
              onValueChange={setSelectedBranchId}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Branches</SelectItem>
                {branches?.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="max-w-xs"
            />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Add Student</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a new student</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="student_id" className="text-right">
                      Student ID
                    </Label>
                    <Input
                      id="student_id"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="first_name" className="text-right">
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="last_name" className="text-right">
                      Last Name
                    </Label>
                    <Input
                      id="last_name"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="branch" className="text-right">
                      Branch
                    </Label>
                    <Select
                      id="branch"
                      onValueChange={(value) => {
                        const input = document.createElement('input');
                        input.id = 'branch_id';
                        input.value = value;
                        input.type = 'hidden';
                        document.body.appendChild(input);
                      }}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches?.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={() => {
                  const student_id = (document.getElementById('student_id') as HTMLInputElement).value;
                  const first_name = (document.getElementById('first_name') as HTMLInputElement).value;
                  const last_name = (document.getElementById('last_name') as HTMLInputElement).value;
                  const email = (document.getElementById('email') as HTMLInputElement).value;
                  const branch_id = (document.getElementById('branch_id') as HTMLInputElement).value;
                  addStudent.mutate({ student_id, first_name, last_name, email, branch_id });
                }}>Add Student</Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Email Notifications</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.student_id}</TableCell>
                <TableCell>{student.first_name}</TableCell>
                <TableCell>{student.last_name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.branches?.name}</TableCell>
                <TableCell>
                  <EmailNotificationSettings studentId={student.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Students;
