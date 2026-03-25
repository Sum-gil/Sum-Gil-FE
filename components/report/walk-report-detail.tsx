"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WalkRecordDetailResponse, WalkReportResponse } from "@/lib/api"
import { WalkRouteMap } from "@/components/report/walk-route-map"

type WalkReportDetailProps = {
  walkReport: WalkReportResponse | null
  walkDetail: WalkRecordDetailResponse | null
  loading?: boolean
}

function formatDateTime(dateString?: string | null) {
  if (!dateString) return "-"
  const date = new Date(dateString)

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate()
  ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`
}

export function WalkReportDetail({
  walkReport,
  walkDetail,
  loading = false,
}: WalkReportDetailProps) {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">선택한 산책 상세 리포트</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-sm text-muted-foreground">
              상세 정보를 불러오는 중입니다...
            </div>
          ) : !walkReport ? (
            <div className="text-sm text-muted-foreground">
              왼쪽 목록에서 산책 기록을 선택하세요.
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-2xl bg-secondary/50 p-4">
                  <p className="text-xs text-muted-foreground">거리</p>
                  <p className="text-xl font-bold text-foreground">
                    {walkReport.totalDistanceKm.toFixed(2)} km
                  </p>
                </div>

                <div className="rounded-2xl bg-secondary/50 p-4">
                  <p className="text-xs text-muted-foreground">소요 시간</p>
                  <p className="text-xl font-bold text-foreground">
                    {walkReport.totalDurationText}
                  </p>
                </div>

                <div className="rounded-2xl bg-secondary/50 p-4">
                  <p className="text-xs text-muted-foreground">평균 속도</p>
                  <p className="text-xl font-bold text-foreground">
                    {walkReport.averageSpeedKmh.toFixed(2)} km/h
                  </p>
                </div>

                <div className="rounded-2xl bg-secondary/50 p-4">
                  <p className="text-xs text-muted-foreground">건강 점수</p>
                  <p className="text-xl font-bold text-foreground">
                    {walkReport.averageHealthScore} 점
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border p-4 space-y-3">
                <div className="grid gap-2 md:grid-cols-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">시작 시간: </span>
                    <span className="text-foreground">{formatDateTime(walkReport.startedAt)}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">종료 시간: </span>
                    <span className="text-foreground">{formatDateTime(walkReport.endedAt)}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">칼로리: </span>
                    <span className="text-foreground">{walkReport.calories.toFixed(1)} kcal</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">산책 장소 ID: </span>
                    <span className="text-foreground">{walkReport.walkSpotId}</span>
                  </p>
                </div>

                <div className="rounded-xl bg-primary/5 p-4">
                  <p className="text-sm font-medium text-foreground mb-1">리포트 한줄 요약</p>
                  <p className="text-sm text-muted-foreground">{walkReport.reportMessage}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">산책 경로 지도</CardTitle>
        </CardHeader>

        <CardContent>
          <WalkRouteMap pathPoints={walkDetail?.pathPoints ?? []} />
        </CardContent>
      </Card>
    </div>
  )
}