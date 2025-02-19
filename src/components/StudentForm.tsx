
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserCircle, Mail, School, IdCard } from 'lucide-react';
import type { Branch } from '@/types/student';

interface StudentFormProps {
  branches: Branch[] | undefined;
  onSubmit: (data: {
    student_id: string;
    first_name: string;
    last_name: string;
    email: string;
    branch_id: string;
  }) => void;
}

export function StudentForm({ branches, onSubmit }: StudentFormProps) {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="student_id" className="text-sm font-medium flex items-center gap-2">
            <IdCard className="w-4 h-4 text-primary" />
            Student ID
          </Label>
          <Input
            id="student_id"
            placeholder="Enter student ID"
            className="bg-white border-input hover:bg-gray-50 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="first_name" className="text-sm font-medium flex items-center gap-2">
            <UserCircle className="w-4 h-4 text-primary" />
            First Name
          </Label>
          <Input
            id="first_name"
            placeholder="Enter first name"
            className="bg-white border-input hover:bg-gray-50 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name" className="text-sm font-medium flex items-center gap-2">
            <UserCircle className="w-4 h-4 text-primary" />
            Last Name
          </Label>
          <Input
            id="last_name"
            placeholder="Enter last name"
            className="bg-white border-input hover:bg-gray-50 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter email address"
            className="bg-white border-input hover:bg-gray-50 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="branch" className="text-sm font-medium flex items-center gap-2">
            <School className="w-4 h-4 text-primary" />
            Branch
          </Label>
          <Select
            onValueChange={(value) => {
              const input = document.createElement('input');
              input.id = 'branch_id';
              input.value = value;
              input.type = 'hidden';
              document.body.appendChild(input);
            }}
          >
            <SelectTrigger className="w-full bg-white border-input hover:bg-gray-50 transition-colors">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              {branches?.map((branch) => (
                <SelectItem 
                  key={branch.id} 
                  value={branch.id}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => {
            // Clear form
            const form = document.querySelector('form');
            if (form) form.reset();
          }}
        >
          Clear
        </Button>
        <Button 
          className="flex-1"
          onClick={() => {
            const student_id = (document.getElementById('student_id') as HTMLInputElement).value;
            const first_name = (document.getElementById('first_name') as HTMLInputElement).value;
            const last_name = (document.getElementById('last_name') as HTMLInputElement).value;
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const branch_id = (document.getElementById('branch_id') as HTMLInputElement).value;
            onSubmit({ student_id, first_name, last_name, email, branch_id });
          }}
        >
          Add Student
        </Button>
      </div>
    </div>
  );
}
