"use client";

import {
    Bar,
    BarChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Cell,
    XAxis,
    YAxis,
} from 'recharts';
  
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart';
  

const BAR_CHART_COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
];

const PIE_CHART_COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
];

interface STTQualityChartProps {
    data: { name: string; count: number }[];
}

export function STTQualityChart({ data }: STTQualityChartProps) {
    if (!data || data.every(d => d.count === 0)) {
        return <div className="flex h-[250px] w-full items-center justify-center text-sm text-muted-foreground">No STT data available.</div>;
    }

    return (
        <ChartContainer config={{ count: { label: "Calls" } }} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={data}>
                <XAxis
                    dataKey="name"
                    stroke="hsl(var(--border))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="hsl(var(--border))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="count" radius={4}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={BAR_CHART_COLORS[index % BAR_CHART_COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ChartContainer>
    );
}

interface HandlerChartProps {
    data: { name: string; value: number }[];
}

export function HandlerChart({ data }: HandlerChartProps) {
    if (!data || data.every(d => d.value === 0)) {
        return <div className="flex h-[250px] w-full items-center justify-center text-sm text-muted-foreground">No handler data available.</div>;
    }
    
    return (
        <ChartContainer config={{}} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} strokeWidth={2}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                        ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
