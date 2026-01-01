
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
import { supabase } from '@/lib/supabase';
import { Separator } from '@/components/ui/separator';

function StatItem({ icon: Icon, title, value, description, className }: { icon: React.ElementType, title: string, value: string | number, description: string, className?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{title}</span>
      </div>
      <div className={`text-3xl font-bold ${className}`}>{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}


export default async function DashboardPage() {
  if (!supabase) {
    return (
        <Card className="max-w-xl mx-auto mt-10">
            <CardHeader>
                <CardTitle className="text-destructive">Configuration Error</CardTitle>
                <CardDescription>
                    Your Supabase environment variables are missing or invalid.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-4">Please check your <code>.env.local</code> file and ensure that <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> are set correctly.</p>
                <div className="p-4 rounded-md bg-muted text-sm">
                    <p className="font-mono">NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co</p>
                    <p className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key</p>
                </div>
            </CardContent>
        </Card>
    );
  }


  const { data: overviewData, error } = await fetchDashboardOverview();

  if (error || !overviewData || overviewData.length === 0) {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center text-muted-foreground">
                <p>Could not load dashboard data.</p>
                <p className="text-xs">{error?.message || "No data available in 'admin_calls_overview' view."}</p>
            </div>
      </div>
    );
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
       <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatItem 
                  icon={Phone}
                  title="Total Calls (Today)"
                  value={totalCalls}
                  description="Total calls recorded today."
                />
                 <Separator orientation="vertical" className="hidden md:block h-auto"/>
                 <StatItem 
                  icon={Users}
                  title="Ongoing Calls"
                  value={ongoingCalls}
                  description="Active calls right now."
                />
                <Separator orientation="vertical" className="hidden md:block h-auto"/>
                 <StatItem 
                  icon={PhoneOff}
                  title="Dropped Calls (Today)"
                  value={droppedCalls}
                  description="Calls that failed or were dropped."
                  className="text-destructive"
                />
            </div>
          </CardContent>
       </Card>

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
