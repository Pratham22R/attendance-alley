
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
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="student_id" className="text-right">
          Student ID
        </Label>
        <Input
          id="student_id"
          defaultValue=""
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="first_name" className="text-right">
          First Name
        </Label>
        <Input
          id="first_name"
          defaultValue=""
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="last_name" className="text-right">
          Last Name
        </Label>
        <Input
          id="last_name"
          defaultValue=""
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          defaultValue=""
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="branch" className="text-right">
          Branch
        </Label>
        <div className="col-span-3">
          <Select
            onValueChange={(value) => {
              const input = document.createElement('input');
              input.id = 'branch_id';
              input.value = value;
              input.type = 'hidden';
              document.body.appendChild(input);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              {branches?.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={() => {
        const student_id = (document.getElementById('student_id') as HTMLInputElement).value;
        const first_name = (document.getElementById('first_name') as HTMLInputElement).value;
        const last_name = (document.getElementById('last_name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const branch_id = (document.getElementById('branch_id') as HTMLInputElement).value;
        onSubmit({ student_id, first_name, last_name, email, branch_id });
      }}>Add Student</Button>
    </div>
  );
}
