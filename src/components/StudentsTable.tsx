
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmailNotificationSettings } from '@/components/EmailNotificationSettings';
import { Badge } from '@/components/ui/badge';
import type { Student } from '@/types/student';

interface StudentsTableProps {
  students: Student[] | null | undefined;
}

export function StudentsTable({ students }: StudentsTableProps) {
  if (!students?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No students found
      </div>
    );
  }

  return (
    <div className="rounded-md border">
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
              <TableCell className="font-medium">{student.student_id}</TableCell>
              <TableCell>{student.first_name}</TableCell>
              <TableCell>{student.last_name}</TableCell>
              <TableCell>
                {student.email ? (
                  <span className="text-muted-foreground">{student.email}</span>
                ) : (
                  <Badge variant="secondary">No email</Badge>
                )}
              </TableCell>
              <TableCell>
                {student.branches?.name ? (
                  <Badge variant="outline">{student.branches.name}</Badge>
                ) : (
                  <Badge variant="secondary">No branch</Badge>
                )}
              </TableCell>
              <TableCell>
                <EmailNotificationSettings studentId={student.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
