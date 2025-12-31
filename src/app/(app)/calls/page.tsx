import { fetchCallList } from '@/lib/queries';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default async function CallsPage() {
  // For now, we'll fetch the first 50 calls. Pagination can be added later.
  const { data: calls, error } = await fetchCallList(0, 49);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Could not fetch call data: {error.message}
        </AlertDescription>
      </Alert>
    );
  }
  
  // The view returns columns with snake_case, but the app expects camelCase.
  // We need to map the data.
  const formattedData = calls.map(call => ({
    id: call.call_id,
    callerId: '', // Not in this view
    timestamp: call.call_start_time,
    duration: `${call.duration_seconds}s`,
    status: call.call_status.charAt(0).toUpperCase() + call.call_status.slice(1),
    handler: 'N/A', // Not in this view
    language: call.language_detected,
    sttQuality: call.stt_quality?.charAt(0).toUpperCase() + call.stt_quality.slice(1) || 'N/A',
    transcript: [],
    timeline: [],
    guardrailTriggers: [],
    isRepeatCaller: call.is_repeat_caller,
  }));


  return (
    <Card>
      <CardHeader>
        <CardTitle>Call History</CardTitle>
        <CardDescription>
          Browse and filter through all recorded calls.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={formattedData} />
      </CardContent>
    </Card>
  );
}
