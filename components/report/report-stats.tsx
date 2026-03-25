import { TrendingUp, Award, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { MonthlyReportResponse, WalkRecordListResponse } from "@/lib/api"

type ReportStatsProps = {
  monthlyReport: MonthlyReportResponse | null
  walkRecords: WalkRecordListResponse[]
  loading?: boolean
}

export function ReportStats({
  monthlyReport,
  walkRecords,
  loading = false,
}: ReportStatsProps) {
  const distanceGoal = 20
  const countGoal = 8

  const totalDistance = monthlyReport?.totalDistanceKm ?? 0
  const totalCount = monthlyReport?.totalWalkCount ?? 0
  const averageHealthScore = monthlyReport?.averageHealthScore ?? 0

  const distanceProgress = Math.min((totalDistance / distanceGoal) * 100, 100)
  const countProgress = Math.min((totalCount / countGoal) * 100, 100)

  const badges = [
    {
      label: "첫 산책",
      active: totalCount >= 1,
      emoji: "1",
    },
    {
      label: "10km 달성",
      active: totalDistance >= 10,
      emoji: "10",
    },
    {
      label: "5회 달성",
      active: totalCount >= 5,
      emoji: "5",
    },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">월간 목표 달성</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-end justify-between gap-3 text-sm">
              <span className="text-muted-foreground">거리 목표</span>
              <span className="font-semibold text-foreground whitespace-nowrap">
                {loading ? "불러오는 중..." : `${totalDistance.toFixed(2)} / ${distanceGoal} km`}
              </span>
            </div>
            <Progress value={distanceProgress} className="h-3" />
          </div>

          <div className="space-y-2">
            <div className="flex items-end justify-between gap-3 text-sm">
              <span className="text-muted-foreground">산책 횟수</span>
              <span className="font-semibold text-foreground whitespace-nowrap">
                {loading ? "불러오는 중..." : `${totalCount} / ${countGoal} 회`}
              </span>
            </div>
            <Progress value={countProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">달성 배지</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className={`rounded-2xl p-4 flex flex-col items-center justify-center text-center min-h-[120px] ${
                  badge.active ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-3 ${
                    badge.active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted-foreground/20 text-muted-foreground"
                  }`}
                >
                  {badge.emoji}
                </div>
                <p className="text-xs leading-tight text-muted-foreground break-keep">
                  {badge.label}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">통계 요약</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-secondary/50 p-4 text-center min-h-[96px] flex flex-col justify-center">
              <p className="text-2xl font-bold text-foreground">
                {loading ? "-" : totalCount}
              </p>
              <p className="text-xs text-muted-foreground mt-1 break-keep">
                총 산책 횟수
              </p>
            </div>

            <div className="rounded-2xl bg-secondary/50 p-4 text-center min-h-[96px] flex flex-col justify-center">
              <p className="text-2xl font-bold text-foreground">
                {loading ? "-" : `${totalDistance.toFixed(2)}km`}
              </p>
              <p className="text-xs text-muted-foreground mt-1 break-keep">
                누적 거리
              </p>
            </div>

            <div className="rounded-2xl bg-secondary/50 p-4 text-center min-h-[96px] flex flex-col justify-center">
              <p className="text-2xl font-bold text-foreground">
                {loading ? "-" : averageHealthScore.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground mt-1 break-keep">
                평균 건강점수
              </p>
            </div>

            <div className="rounded-2xl bg-secondary/50 p-4 text-center min-h-[96px] flex flex-col justify-center">
              <p className="text-2xl font-bold text-foreground">
                {loading ? "-" : walkRecords.length}
              </p>
              <p className="text-xs text-muted-foreground mt-1 break-keep">
                선택 월 기록 수
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}