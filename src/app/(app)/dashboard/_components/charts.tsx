"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
  
import {
    ChartContainer,
    ChartTooltipContent,
} from '@/components/ui/chart';
  

const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
];

interface STTQualityChartProps {
    data: { name: string; count: number }[];
}

export function STTQualityChart({ data }: STTQualityChartProps) {
    return (
        <ChartContainer config={{}} className="min-h-[200px] w-full h-full">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={4}/>
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}

interface HandlerChartProps {
    data: { name: string; value: number }[];
}

export function HandlerChart({ data }: HandlerChartProps) {
    return (
        <ChartContainer config={{}} className="min-h-[200px] w-full h-full">
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
