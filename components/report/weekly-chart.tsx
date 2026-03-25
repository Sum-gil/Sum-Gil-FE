"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import type { WalkRecordListResponse } from "@/lib/api"

type WeeklyChartProps = {
  walkRecords: WalkRecordListResponse[]
  loading?: boolean
}

const dayLabels = ["일", "월", "화", "수", "목", "금", "토"]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return "-"

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}.${month}.${day}`
}

type CustomTooltipProps = {
  active?: boolean
  payload?: Array<{
    value: number
    payload: {
      day: string
      distance: number
      healthScore: number
      dates: string[]
    }
  }>
}

function WeeklyChartTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  const data = payload[0].payload

  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-md">
      <p className="text-sm font-semibold text-slate-800">{data.day}요일</p>

      <div className="mt-2 space-y-1 text-xs text-slate-600">
        <p>
          날짜:{" "}
          <span className="font-medium">
            {data.dates.length > 0 ? data.dates.join(", ") : "-"}
          </span>
        </p>
        <p>
          거리: <span className="font-medium">{data.distance}km</span>
        </p>
        <p>
          평균 건강점수: <span className="font-medium">{data.healthScore}점</span>
        </p>
      </div>
    </div>
  )
}

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

    const dates = Array.from(
      new Set(
        recordsForDay.map((record) => formatDate(record.startedAt))
      )
    )

    return {
      day: label,
      distance: Number(distance.toFixed(2)),
      healthScore: Number(healthScoreAverage.toFixed(1)),
      dates,
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
              <BarChart
                data={weeklyData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
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
                <ChartTooltip content={<WeeklyChartTooltip />} />
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