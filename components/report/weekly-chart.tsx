"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const weeklyData = [
  { day: "월", distance: 2.5, healthScore: 88 },
  { day: "화", distance: 3.2, healthScore: 92 },
  { day: "수", distance: 0, healthScore: 0 },
  { day: "목", distance: 4.5, healthScore: 95 },
  { day: "금", distance: 2.8, healthScore: 85 },
  { day: "토", distance: 5.1, healthScore: 90 },
  { day: "일", distance: 0, healthScore: 0 },
]

const chartConfig = {
  distance: {
    label: "거리 (km)",
    color: "var(--primary)",
  },
  healthScore: {
    label: "건강점수",
    color: "var(--accent)",
  },
}

export function WeeklyChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <CardTitle className="text-base">주간 산책 거리</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="day" 
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}km`}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Bar 
              dataKey="distance" 
              fill="var(--color-distance)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
