import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HandlerChart, STTQualityChart } from './_components/charts';
import { fetchDashboardOverview } from '@/lib/queries';

export default async function DashboardPage() {
  const { data: overviewData, error } = await fetchDashboardOverview();

  if (error || !overviewData || overviewData.length === 0) {
    return <div>Error loading dashboard data.</div>;
  }

  const overview = overviewData[0];

  const totalCalls = overview.total_calls ?? 0;
  const ongoingCalls = overview.ongoing_calls ?? 0;
  const droppedCalls = overview.dropped_calls ?? 0;
  const handledByAI = overview.ai_handled_calls ?? 0;
  const handledByHuman = totalCalls - handledByAI;

  const sttQualityData = [
    { name: 'High', count: overview.stt_high_quality ?? 0 },
    { name: 'Medium', count: overview.stt_medium_quality ?? 0 },
    { name: 'Low', count: overview.stt_low_quality ?? 0 },
    { name: 'Failed', count: overview.stt_failed ?? 0 },
  ];

  const handlerData = [
    { name: 'AI Handled', value: handledByAI },
    { name: 'Human Handled', value: handledByHuman },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCalls}</div>
            <p className="text-xs text-muted-foreground">in last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ongoing Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ongoingCalls}</div>
            <p className="text-xs text-muted-foreground">Live now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dropped Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{droppedCalls}</div>
            <p className="text-xs text-muted-foreground">in last 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Call Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.average_duration_seconds ? `${Math.round(overview.average_duration_seconds / 60)}m ${overview.average_duration_seconds % 60}s` : 'N/A'}</div>
            <p className="text-xs text-muted-foreground">from all calls</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-8">
        <div className="xl:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>STT Quality Distribution</CardTitle>
                    <CardDescription>Breakdown of Speech-to-Text quality across all calls.</CardDescription>
                </CardHeader>
                <CardContent>
                    <STTQualityChart data={sttQualityData} />
                </CardContent>
            </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>AI vs. Human Handling</CardTitle>
            <CardDescription>Distribution of calls handled by AI vs. Human agents.</CardDescription>
          </CardHeader>
          <CardContent>
            <HandlerChart data={handlerData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
