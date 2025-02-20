
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { AttendanceForm } from '@/components/AttendanceForm';
import { AttendanceTable } from '@/components/AttendanceTable';
import { Button } from '@/components/ui/button';
import { useAttendance } from '@/hooks/useAttendance';
import { Plus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AttendanceTracker = () => {
  const [showForm, setShowForm] = useState(false);
  const { students, attendance, isLoading, addAttendance } = useAttendance();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Attendance Tracker</h1>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Take Attendance
          </Button>
        </div>

        {showForm ? (
          <Card>
            <CardHeader>
              <CardTitle>Record Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceForm
                students={students}
                onSubmit={(data) => {
                  addAttendance.mutate(data);
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceTable
                attendance={attendance || []}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default AttendanceTracker;
