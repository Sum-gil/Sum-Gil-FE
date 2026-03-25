"use client"

import { Heart, Wind, TreePine, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface HealthScoreCardProps {
  score: number
  message: string // 백엔드 getHealthMessage 반영
  factors: {
    airQuality: number
    greenRatio: number
    visitorCount: number // 실시간 유동인구 수치
  }
}

export function HealthScoreCard({ score, message, factors }: HealthScoreCardProps) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-primary"
    if (s >= 60) return "text-amber-500"
    return "text-destructive"
  }

  // 혼잡도 점수 계산 (백엔드 로직: visitorCount가 많을수록 점수가 낮아짐)
  // 여기서는 단순히 시각화를 위해 visitorCount를 그대로 표시하거나 100점 만점으로 환산합니다.
  const factorItems = [
    { icon: Wind, label: "공기질 점수", value: factors.airQuality },
    { icon: TreePine, label: "녹지 비율", value: factors.greenRatio },
    { icon: Users, label: "실시간 인구", value: Math.min(factors.visitorCount, 100) }, // 프로그레스바용
  ]

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary fill-current" />
          <CardTitle className="text-base font-bold">건강 산책 점수</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-secondary"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                strokeLinecap="round"
                className="text-primary transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-extrabold ${getScoreColor(score)}`}>{score}</span>
              <span className="text-xs text-muted-foreground font-medium">점</span>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-slate-600 bg-slate-50 px-4 py-2 rounded-full">
            {message}
          </p>
        </div>

        <div className="space-y-4">
          {factorItems.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <span className="font-bold text-slate-700">
                  {item.label === "실시간 인구" ? `${factors.visitorCount}명` : `${item.value}점`}
                </span>
              </div>
              <Progress value={item.value} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}