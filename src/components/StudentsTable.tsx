
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmailNotificationSettings } from '@/components/EmailNotificationSettings';
import type { Student } from '@/types/student';

interface StudentsTableProps {
  students: Student[] | null | undefined;
}

export function StudentsTable({ students }: StudentsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student ID</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Branch</TableHead>
          <TableHead>Email Notifications</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students?.map((student) => (
          <TableRow key={student.id}>
            <TableCell>{student.student_id}</TableCell>
            <TableCell>{student.first_name}</TableCell>
            <TableCell>{student.last_name}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.branches?.name}</TableCell>
            <TableCell>
              <EmailNotificationSettings studentId={student.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
