'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { powerChartData } from '@/lib/data'

const chartConfig = {
  stockPower: {
    label: 'Oryginalna moc (HP)',
    color: 'hsl(var(--muted-foreground))',
  },
  tunedPower: {
    label: 'Moc po tuningu (HP)',
    color: 'hsl(var(--primary))',
  },
  stockTorque: {
    label: 'Oryginalny moment (Nm)',
    color: 'hsl(var(--chart-2))',
  },
  tunedTorque: {
    label: 'Moment po tuningu (Nm)',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig

export function PowerChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart data={powerChartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="fillStockPower" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillTunedPower" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="rpm"
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}`}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip
          content={<ChartTooltipContent indicator="dot" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          type="monotone"
          dataKey="stockPower"
          stroke="hsl(var(--muted-foreground))"
          fill="url(#fillStockPower)"
          strokeWidth={2}
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="tunedPower"
          stroke="hsl(var(--primary))"
          fill="url(#fillTunedPower)"
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  )
}
