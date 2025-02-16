
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudentForm } from '@/components/StudentForm';
import { StudentsTable } from '@/components/StudentsTable';
import { useStudents } from '@/hooks/useStudents';

const Students = () => {
  const {
    students,
    branches,
    isLoading,
    isError,
    open,
    setOpen,
    selectedBranchId,
    setSelectedBranchId,
    addStudent,
    handleFileUpload,
  } = useStudents();

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
                <StudentForm 
                  branches={branches}
                  onSubmit={(data) => addStudent.mutate(data)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <StudentsTable students={students} />
      </div>
    </Layout>
  );
};

export default Students;
