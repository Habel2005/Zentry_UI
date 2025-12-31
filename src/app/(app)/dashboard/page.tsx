import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MOCK_CALLS } from '@/lib/data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
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

export default function DashboardPage() {
  const totalCalls = MOCK_CALLS.length;
  const ongoingCalls = MOCK_CALLS.filter(
    (call) => call.status === 'Ongoing'
  ).length;
  const droppedCalls = MOCK_CALLS.filter(
    (call) => call.status === 'Dropped'
  ).length;
  const handledByAI = MOCK_CALLS.filter(
    (call) => call.handler === 'AI'
  ).length;
  const handledByHuman = MOCK_CALLS.filter(
    (call) => call.handler === 'Human'
  ).length;

  const sttQualityData = [
    { name: 'High', count: MOCK_CALLS.filter((c) => c.sttQuality === 'High').length },
    { name: 'Medium', count: MOCK_CALLS.filter((c) => c.sttQuality === 'Medium').length },
    { name: 'Low', count: MOCK_CALLS.filter((c) => c.sttQuality === 'Low').length },
    { name: 'Failed', count: MOCK_CALLS.filter((c) => c.sttQuality === 'Failed').length },
  ];

  const handlerData = [
    { name: 'AI Handled', value: handledByAI },
    { name: 'Human Handled', value: handledByHuman },
  ];

  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
  ];

  const recentCalls = MOCK_CALLS.slice(0, 5);

  return (
    <div className="flex flex-1 flex-col">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCalls}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
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
            <p className="text-xs text-muted-foreground">-2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Call Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">04:32</div>
            <p className="text-xs text-muted-foreground">+5s from yesterday</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-8">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Call History</CardTitle>
            <CardDescription>An overview of the last 5 calls.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Call ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell className="font-medium">
                      <Link href={`/calls/${call.id}`} className="hover:underline">
                        {call.id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={call.status === 'Dropped' ? 'destructive' : 'outline'}>{call.status}</Badge>
                    </TableCell>
                    <TableCell>{call.language}</TableCell>
                    <TableCell className="text-right">{call.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardHeader>
             <div className="text-sm text-muted-foreground">
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="/calls">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI vs. Human Handling</CardTitle>
            <CardDescription>Distribution of calls handled by AI vs. Human agents.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={handlerData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {handlerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
       <div className="grid gap-4 md:gap-8 mt-8">
        <Card>
            <CardHeader>
                <CardTitle>STT Quality Distribution</CardTitle>
                <CardDescription>Breakdown of Speech-to-Text quality across all calls.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sttQualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
       </div>
    </div>
  );
}
