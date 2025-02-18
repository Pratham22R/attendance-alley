
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface AttendanceFormProps {
  onSubmit: (data: { studentId: string; status: 'present' | 'absent' | 'late'; date: Date }) => void;
  students?: Array<{ id: string; first_name: string; last_name: string }>;
}

export function AttendanceForm({ onSubmit, students }: AttendanceFormProps) {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [status, setStatus] = useState<'present' | 'absent' | 'late'>('present');
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="space-y-2">
        <Label>Student</Label>
        <Select value={selectedStudent} onValueChange={setSelectedStudent}>
          <SelectTrigger>
            <SelectValue placeholder="Select student" />
          </SelectTrigger>
          <SelectContent>
            {students?.map((student) => (
              <SelectItem key={student.id} value={student.id}>
                {student.first_name} {student.last_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={status} onValueChange={(value: 'present' | 'absent' | 'late') => setStatus(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
            <SelectItem value="late">Late</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button 
        className="w-full"
        onClick={() => {
          if (selectedStudent && status && date) {
            onSubmit({ studentId: selectedStudent, status, date });
          }
        }}
      >
        Submit Attendance
      </Button>
    </div>
  );
}
