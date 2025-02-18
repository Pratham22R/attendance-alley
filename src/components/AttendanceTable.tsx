
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AttendanceTableProps {
  attendance: any[];
  students: any[];
}

export function AttendanceTable({ attendance, students }: AttendanceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendance?.map((record) => {
          const student = students?.find(s => s.id === record.student_id);
          return (
            <TableRow key={record.id}>
              <TableCell>{student?.student_id}</TableCell>
              <TableCell>
                {student?.first_name} {student?.last_name}
              </TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>{format(new Date(record.date), 'PP')}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
