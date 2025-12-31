import { MOCK_ADMISSION_BASELINES } from '@/lib/data';
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
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';


export default function AdmissionBaselinePage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Admission Baseline View</CardTitle>
          <CardDescription>
            Read-only display of program availability and confidence levels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program</TableHead>
                <TableHead>Quota Type</TableHead>
                <TableHead>Estimated Availability (%)</TableHead>
                <TableHead>Confidence Level</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_ADMISSION_BASELINES.map((baseline) => (
                <TableRow key={baseline.id}>
                  <TableCell className="font-medium">{baseline.program}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{baseline.quotaType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <span>{baseline.estimatedAvailability}%</span>
                        <Progress value={baseline.estimatedAvailability} className="w-32" />
                    </div>
                  </TableCell>
                  <TableCell>{baseline.confidence}%</TableCell>
                  <TableCell>
                    {format(new Date(baseline.lastUpdated), 'MMM d, yyyy, h:mm a')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  