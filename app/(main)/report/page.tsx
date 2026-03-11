import { ReportSummary } from "@/components/report/report-summary"
import { WeeklyChart } from "@/components/report/weekly-chart"
import { ReportStats } from "@/components/report/report-stats"

export default function ReportPage() {
  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">산책 리포트</h1>
        <p className="text-muted-foreground">나의 산책 활동을 분석해보세요</p>
      </section>

      <ReportSummary />
      
      <WeeklyChart />
      
      <ReportStats />
    </div>
  )
}
