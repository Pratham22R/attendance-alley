
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { InfoIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AttendanceTableProps {
  attendance: any[];
  students: any[];
}

export function AttendanceTable({ attendance, students }: AttendanceTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-500">Present</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'late':
        return <Badge variant="default" className="bg-yellow-500">Late</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendance?.map((record) => {
            const student = students?.find(s => s.id === record.student_id);
            return (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{student?.student_id}</TableCell>
                <TableCell>
                  {student?.first_name} {student?.last_name}
                </TableCell>
                <TableCell>{getStatusBadge(record.status)}</TableCell>
                <TableCell>{format(new Date(record.date), 'PP')}</TableCell>
                <TableCell>
                  {record.notes ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{record.notes}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : null}
                </TableCell>
              </TableRow>
            );
          })}
          {attendance?.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No attendance records found for this date
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
