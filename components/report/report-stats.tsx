import { TrendingUp, Award, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ReportStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">주간 목표 달성</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">거리 목표</span>
              <span className="font-medium text-foreground">15.6 / 20 km</span>
            </div>
            <Progress value={78} className="h-3" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">산책 횟수</span>
              <span className="font-medium text-foreground">5 / 7 회</span>
            </div>
            <Progress value={71} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">달성 배지</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "첫 산책", emoji: "1" },
              { label: "10km 달성", emoji: "10" },
              { label: "연속 3일", emoji: "3" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-primary/10"
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {badge.emoji}
                </div>
                <span className="text-xs text-center text-muted-foreground">{badge.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm md:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">통계 요약</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-xl bg-secondary/50">
              <p className="text-2xl font-bold text-foreground">23</p>
              <p className="text-xs text-muted-foreground">총 산책 횟수</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-secondary/50">
              <p className="text-2xl font-bold text-foreground">68.4km</p>
              <p className="text-xs text-muted-foreground">누적 거리</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-secondary/50">
              <p className="text-2xl font-bold text-foreground">89</p>
              <p className="text-xs text-muted-foreground">평균 건강점수</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-secondary/50">
              <p className="text-2xl font-bold text-foreground">5일</p>
              <p className="text-xs text-muted-foreground">최장 연속 기록</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
