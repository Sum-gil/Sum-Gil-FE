"use client"

import { useEffect, useMemo, useState } from "react"
import {
  getMonthlyReport,
  getMyWalkRecords,
  getWalkRecordDetail,
  getWalkReport,
  type MonthlyReportResponse,
  type WalkRecordDetailResponse,
  type WalkRecordListResponse,
  type WalkReportResponse,
} from "@/lib/api"
import { ReportSummary } from "@/components/report/report-summary"
import { ReportStats } from "@/components/report/report-stats"
import { WeeklyChart } from "@/components/report/weekly-chart"
import { WalkReportList } from "@/components/report/walk-report-list"
import { WalkReportDetail } from "@/components/report/walk-report-detail"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function isSameYearMonth(dateString: string, year: number, month: number) {
  const date = new Date(dateString)
  return date.getFullYear() === year && date.getMonth() + 1 === month
}

export default function ReportPage() {
  const now = new Date()
  const [year, setYear] = useState(String(now.getFullYear()))
  const [month, setMonth] = useState(String(now.getMonth() + 1))

  const [monthlyReport, setMonthlyReport] = useState<MonthlyReportResponse | null>(null)
  const [walkRecords, setWalkRecords] = useState<WalkRecordListResponse[]>([])
  const [selectedWalkId, setSelectedWalkId] = useState<number | null>(null)
  const [selectedWalkReport, setSelectedWalkReport] = useState<WalkReportResponse | null>(null)
  const [selectedWalkDetail, setSelectedWalkDetail] = useState<WalkRecordDetailResponse | null>(null)

  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const numericYear = Number(year)
  const numericMonth = Number(month)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const [monthly, records] = await Promise.all([
          getMonthlyReport(numericYear, numericMonth),
          getMyWalkRecords(),
        ])

        if (!active) return

        const filteredRecords = records.filter((record) =>
          isSameYearMonth(record.startedAt, numericYear, numericMonth)
        )

        setMonthlyReport(monthly)
        setWalkRecords(filteredRecords)

        if (filteredRecords.length > 0) {
          setSelectedWalkId(filteredRecords[0].walkRecordId)
        } else {
          setSelectedWalkId(null)
          setSelectedWalkReport(null)
          setSelectedWalkDetail(null)
        }
      } catch (e) {
        console.error(e)
        if (!active) return
        setError("리포트를 불러오지 못했습니다.")
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      active = false
    }
  }, [numericYear, numericMonth])

  useEffect(() => {
    if (selectedWalkId === null) {
      setSelectedWalkReport(null)
      setSelectedWalkDetail(null)
      return
    }

    const walkId = selectedWalkId

    let active = true

    async function loadDetail() {
      try {
        setDetailLoading(true)
        setError(null)

        const [report, detail] = await Promise.all([
          getWalkReport(walkId),
          getWalkRecordDetail(walkId),
        ])

        if (!active) return

        setSelectedWalkReport(report)
        setSelectedWalkDetail(detail)
      } catch (e) {
        console.error(e)
        if (!active) return
        setError("선택한 산책 상세 정보를 불러오지 못했습니다.")
      } finally {
        if (active) {
          setDetailLoading(false)
        }
      }
    }

    loadDetail()

    return () => {
      active = false
    }
  }, [selectedWalkId])

  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return [currentYear - 1, currentYear, currentYear + 1]
  }, [])

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <div className="container px-4 py-6 max-w-6xl mx-auto space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">산책 리포트</h1>
        <p className="text-muted-foreground">
          월별 통계와 개별 산책 리포트를 함께 확인하세요
        </p>
      </section>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-foreground">조회 기간 선택</p>
            <p className="text-sm text-muted-foreground">
              월별 요약과 해당 월 산책 기록을 보여줍니다
            </p>
          </div>

          <div className="flex gap-3">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="연도 선택" />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((item) => (
                  <SelectItem key={item} value={String(item)}>
                    {item}년
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="월 선택" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((item) => (
                  <SelectItem key={item} value={String(item)}>
                    {item}월
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border border-red-200 shadow-sm">
          <CardContent className="p-4 text-sm text-red-500">{error}</CardContent>
        </Card>
      )}

      <ReportSummary monthlyReport={monthlyReport} loading={loading} />

      <div className="space-y-6">
        <WeeklyChart walkRecords={walkRecords} loading={loading} />

        <ReportStats
          monthlyReport={monthlyReport}
          walkRecords={walkRecords}
          loading={loading}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <WalkReportList
          walkRecords={walkRecords}
          selectedWalkId={selectedWalkId}
          onSelectWalk={(walkId) => setSelectedWalkId(walkId)}
          loading={loading}
        />

        <WalkReportDetail
          walkReport={selectedWalkReport}
          walkDetail={selectedWalkDetail}
          loading={detailLoading}
        />
      </div>
    </div>
  )
}