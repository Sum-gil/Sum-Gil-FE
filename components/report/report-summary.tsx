import { MapPin, Clock, Flame, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { MonthlyReportResponse } from "@/lib/api"

type ReportSummaryProps = {
  monthlyReport: MonthlyReportResponse | null
  loading?: boolean
}

export function ReportSummary({
  monthlyReport,
  loading = false,
}: ReportSummaryProps) {
  const summaryData = [
    {
      icon: MapPin,
      label: "총 거리",
      value: loading
        ? "불러오는 중..."
        : `${monthlyReport?.totalDistanceKm?.toFixed(2) ?? "0.00"} km`,
      subtext: monthlyReport ? `${monthlyReport.year}년 ${monthlyReport.month}월` : "선택 월",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Clock,
      label: "총 시간",
      value: loading ? "불러오는 중..." : monthlyReport?.totalDurationText ?? "0초",
      subtext: "월 누적",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Flame,
      label: "소모 칼로리",
      value: loading
        ? "불러오는 중..."
        : `${monthlyReport?.totalCalories?.toFixed(1) ?? "0.0"} kcal`,
      subtext: "월 누적",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-500/10",
    },
    {
      icon: Heart,
      label: "평균 건강점수",
      value: loading
        ? "불러오는 중..."
        : `${monthlyReport?.averageHealthScore?.toFixed(1) ?? "0.0"}점`,
      subtext: "월 평균",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {summaryData.map((item) => (
        <Card key={item.label} className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${item.bgColor}`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.subtext}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}