"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { WalkRecordListResponse } from "@/lib/api"

type WeeklyChartProps = {
  walkRecords: WalkRecordListResponse[]
  loading?: boolean
}

const dayLabels = ["일", "월", "화", "수", "목", "금", "토"]

export function WeeklyChart({
  walkRecords,
  loading = false,
}: WeeklyChartProps) {
  const weeklyData = dayLabels.map((label, index) => {
    const recordsForDay = walkRecords.filter((record) => {
      const date = new Date(record.startedAt)
      return date.getDay() === index
    })

    const distance = recordsForDay.reduce(
      (sum, record) => sum + (record.totalDistance ?? 0),
      0
    )

    const healthScoreAverage =
      recordsForDay.length === 0
        ? 0
        : recordsForDay.reduce(
            (sum, record) => sum + (record.averageHealthScore ?? 0),
            0
          ) / recordsForDay.length

    return {
      day: label,
      distance: Number(distance.toFixed(2)),
      healthScore: Number(healthScoreAverage.toFixed(1)),
    }
  })

  const chartConfig = {
    distance: {
      label: "거리 (km)",
      color: "var(--primary)",
    },
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <CardTitle className="text-base">요일별 산책 거리</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
            차트를 불러오는 중입니다...
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
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
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="distance"
                  fill="var(--color-distance)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}