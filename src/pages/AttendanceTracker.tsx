
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { AttendanceForm } from '@/components/AttendanceForm';
import { AttendanceTable } from '@/components/AttendanceTable';
import { useAttendance } from '@/hooks/useAttendance';
import { PlusCircle, Calendar as CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

const AttendanceTracker = () => {
  const {
    date,
    setDate,
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
        <div className="p-8 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Attendance Tracker</h1>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10 pl-3 text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
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
                onCancel={() => setShowForm(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border bg-card">
          <AttendanceTable attendance={attendance} students={students} />
        </div>
      </div>
    </Layout>
  );
};

export default AttendanceTracker;
