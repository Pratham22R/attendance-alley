
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
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';

interface AttendanceFormProps {
  onSubmit: (data: { 
    studentId: string; 
    status: 'present' | 'absent' | 'late'; 
    date: Date;
    notes?: string;
  }) => void;
  students?: Array<{ id: string; first_name: string; last_name: string; student_id: string }>;
  onCancel?: () => void;
}

export function AttendanceForm({ onSubmit, students, onCancel }: AttendanceFormProps) {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [status, setStatus] = useState<'present' | 'absent' | 'late'>('present');
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!selectedStudent) {
      toast({
        title: "Error",
        description: "Please select a student",
        variant: "destructive",
      });
      return;
    }

    if (!status) {
      toast({
        title: "Error",
        description: "Please select an attendance status",
        variant: "destructive",
      });
      return;
    }

    onSubmit({ 
      studentId: selectedStudent, 
      status, 
      date,
      notes: notes.trim() || undefined
    });
  };

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Student</Label>
        <Select value={selectedStudent} onValueChange={setSelectedStudent}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select student" />
          </SelectTrigger>
          <SelectContent>
            {students?.map((student) => (
              <SelectItem key={student.id} value={student.id}>
                {student.student_id} - {student.first_name} {student.last_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Status</Label>
        <Select value={status} onValueChange={(value: 'present' | 'absent' | 'late') => setStatus(value)}>
          <SelectTrigger className="w-full">
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
        <Label className="text-sm font-medium">Date</Label>
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

      <div className="space-y-2">
        <Label className="text-sm font-medium">Notes (Optional)</Label>
        <Input
          placeholder="Add any additional notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button 
          className="flex-1"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          className="flex-1"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
