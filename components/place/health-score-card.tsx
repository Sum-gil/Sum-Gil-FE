"use client"

import { Heart, Wind, TreePine, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface HealthScoreCardProps {
  score: number
  factors: {
    airQuality: number
    greenRatio: number
    crowdLevel: number
  }
}

export function HealthScoreCard({ score, factors }: HealthScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary"
    if (score >= 60) return "text-amber-500"
    return "text-destructive"
  }

  const factorItems = [
    { icon: Wind, label: "공기질", value: factors.airQuality },
    { icon: TreePine, label: "녹지 비율", value: factors.greenRatio },
    { icon: Users, label: "혼잡도", value: factors.crowdLevel },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          <CardTitle className="text-base">건강 산책 점수</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center">
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
                className="text-primary transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
              <span className="text-xs text-muted-foreground">점</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {factorItems.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <span className="font-medium text-foreground">{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
