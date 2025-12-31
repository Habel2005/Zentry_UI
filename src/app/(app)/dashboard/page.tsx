import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fetchDashboardOverview } from '@/lib/queries';
import { STTQualityChart, HandlerChart } from './_components/charts';
import { Phone, Users, PhoneOff, Bot } from 'lucide-react';

export default async function DashboardPage() {
  const { data: overviewData, error } = await fetchDashboardOverview();

  if (error || !overviewData || overviewData.length === 0) {
    return <div className="text-center text-muted-foreground">Could not load dashboard data. Please ensure your Supabase connection is configured correctly.</div>;
  }

  const overview = overviewData[0];

  const totalCalls = overview.total_calls ?? 0;
  const ongoingCalls = overview.ongoing_calls ?? 0;
  const droppedCalls = overview.dropped_calls ?? 0;
  const aiCalls = overview.ai_calls ?? 0;
  const humanCalls = overview.human_calls ?? 0;

  const sttQualityData = [
    { name: 'Good', count: overview.stt_good ?? 0 },
    { name: 'Low', count: overview.stt_low ?? 0 },
    { name: 'Failed', count: overview.stt_failed ?? 0 },
  ];

  const handlerData = [
    { name: 'AI Handled', value: aiCalls },
    { name: 'Human Handled', value: humanCalls },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6">
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls (Today)</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCalls}</div>
            <p className="text-xs text-muted-foreground">Total calls recorded today.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ongoing Calls</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ongoingCalls}</div>
            <p className="text-xs text-muted-foreground">Active calls right now.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dropped Calls (Today)</CardTitle>
            <PhoneOff className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{droppedCalls}</div>
             <p className="text-xs text-muted-foreground">Calls that failed or were dropped.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>STT Quality Distribution</CardTitle>
                <CardDescription>Breakdown of Speech-to-Text quality across all calls today.</CardDescription>
            </CardHeader>
            <CardContent>
                <STTQualityChart data={sttQualityData} />
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
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
