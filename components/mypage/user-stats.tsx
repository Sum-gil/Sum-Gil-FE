"use client"

import { MapPin, Heart, Calendar, Clock, Flame } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserStatsProps {
  data: {
    totalDistanceKm: number
    totalWalkCount: number
    averageHealthScore: number
    totalDurationText: string
    totalCalories: number
  }
}

export function UserStats({ data }: UserStatsProps) {
  const stats = [
    {
      icon: MapPin,
      label: "총 거리",
      value: `${data.totalDistanceKm}km`,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Heart,
      label: "평균 건강점수",
      value: `${data.averageHealthScore}점`,
      color: "text-rose-500",
      bgColor: "bg-rose-50",
    },
    {
      icon: Calendar,
      label: "산책 횟수",
      value: `${data.totalWalkCount}회`,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Flame,
      label: "소모 칼로리",
      value: `${data.totalCalories}kcal`,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold text-slate-800">나의 산책 통계</CardTitle>
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">
            <Clock className="w-3 h-3" />
            총 {data.totalDurationText}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
              <div className={`w-10 h-10 rounded-full mb-3 flex items-center justify-center ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-lg font-black text-slate-800 tracking-tight">{stat.value}</p>
              <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}