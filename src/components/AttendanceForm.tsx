
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
import { cn } from '@/lib/utils';

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
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <UserCircle className="w-4 h-4 text-primary" />
            Student
          </Label>
          <Select value={selectedStudent} onValueChange={setSelectedStudent}>
            <SelectTrigger className="w-full bg-white border-input hover:bg-gray-50 transition-colors">
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
          <Label className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Status
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {['present', 'absent', 'late'].map((value) => (
              <Button
                key={value}
                type="button"
                variant={status === value ? 'default' : 'outline'}
                className={cn(
                  'capitalize',
                  status === value && 'bg-primary text-white hover:bg-primary/90'
                )}
                onClick={() => setStatus(value as 'present' | 'absent' | 'late')}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-primary" />
            Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-white hover:bg-gray-50 transition-colors"
              >
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
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Pencil className="w-4 h-4 text-primary" />
            Notes (Optional)
          </Label>
          <Input
            placeholder="Add any additional notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-white border-input hover:bg-gray-50 transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
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
