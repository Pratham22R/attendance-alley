
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
import { Download, RefreshCw, Search, Upload, UserPlus } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const ALL_BRANCHES = "all_branches";

const Students = () => {
  const queryClient = useQueryClient();
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
    searchTerm,
    setSearchTerm,
    exportStudents,
  } = useStudents();

  if (isLoading) return (
    <Layout>
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 w-full bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </Layout>
  );

  if (isError) return (
    <Layout>
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600">Error loading students</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Students</h1>
          <div className="flex gap-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
                icon={<Search className="w-4 h-4" />}
              />
              <Select
                value={selectedBranchId}
                onValueChange={setSelectedBranchId}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_BRANCHES}>All Branches</SelectItem>
                  {branches?.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => queryClient.invalidateQueries({ queryKey: ['students'] })}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                onClick={exportStudents}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <div className="relative">
                <Input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Student
                  </Button>
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
        </div>

        <StudentsTable students={students} />
      </div>
    </Layout>
  );
};

export default Students;
