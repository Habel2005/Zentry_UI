import { MOCK_CALLERS } from '@/lib/data';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

export default function CallersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Caller Overview</CardTitle>
        <CardDescription>
          Anonymized view of caller behavior patterns and history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Caller ID</TableHead>
              <TableHead>Total Calls</TableHead>
              <TableHead>Common Intent</TableHead>
              <TableHead>First Seen</TableHead>
              <TableHead>Last Seen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_CALLERS.map((caller) => (
              <TableRow key={caller.id}>
                <TableCell className="font-medium">{caller.id}</TableCell>
                <TableCell>{caller.totalCalls}</TableCell>
                <TableCell>{caller.commonIntent}</TableCell>
                <TableCell>
                  {format(new Date(caller.firstSeen), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  {format(new Date(caller.lastSeen), 'MMM d, yyyy')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
