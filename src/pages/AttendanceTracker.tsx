
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { AttendanceForm } from '@/components/AttendanceForm';
import { AttendanceTable } from '@/components/AttendanceTable';
import { useAttendance } from '@/hooks/useAttendance';
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const AttendanceTracker = () => {
  const {
    showForm,
    setShowForm,
    students,
    attendance,
    isLoading,
    addAttendance,
  } = useAttendance();

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
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

        <AttendanceTable attendance={attendance} students={students} />
      </div>
    </Layout>
  );
};

export default AttendanceTracker;
