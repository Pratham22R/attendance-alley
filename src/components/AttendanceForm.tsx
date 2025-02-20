
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
import { CalendarIcon, UserCircle, Clock, Pencil } from 'lucide-react';
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

    onSubmit({ 
      studentId: selectedStudent, 
      status, 
      date,
      notes: notes.trim() || undefined
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2 text-gray-700">
            <UserCircle className="w-4 h-4 text-primary" />
            Student
          </Label>
          <Select value={selectedStudent} onValueChange={setSelectedStudent}>
            <SelectTrigger className="w-full bg-white border-gray-200 focus:border-primary focus:ring-primary h-10">
              <SelectValue placeholder="Select a student" />
            </SelectTrigger>
            <SelectContent>
              {students?.map((student) => (
                <SelectItem 
                  key={student.id} 
                  value={student.id}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  {student.student_id} - {student.first_name} {student.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2 text-gray-700">
            <Clock className="w-4 h-4 text-primary" />
            Status
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {['present', 'absent', 'late'].map((value) => (
              <Button
                key={value}
                type="button"
                variant={status === value ? 'default' : 'outline'}
                className={`capitalize ${
                  status === value ? 'bg-primary hover:bg-primary/90 text-white' : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setStatus(value as 'present' | 'absent' | 'late')}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2 text-gray-700">
            <CalendarIcon className="w-4 h-4 text-primary" />
            Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-50 h-10"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2 text-gray-700">
            <Pencil className="w-4 h-4 text-primary" />
            Notes (Optional)
          </Label>
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional notes"
            className="bg-white border-gray-200 focus:border-primary focus:ring-primary h-10"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button 
          variant="outline"
          className="flex-1 border-gray-200 hover:bg-gray-50"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          className="flex-1 bg-primary hover:bg-primary/90"
          onClick={handleSubmit}
        >
          Take Attendance
        </Button>
      </div>
    </div>
  );
}
