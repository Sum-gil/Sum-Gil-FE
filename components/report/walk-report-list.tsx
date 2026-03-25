"use client"

import { CalendarDays, Footprints, Heart, ChevronRight, MapPinned } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WalkRecordListResponse } from "@/lib/api"

type WalkReportListProps = {
  walkRecords: WalkRecordListResponse[]
  selectedWalkId: number | null
  onSelectWalk: (walkId: number) => void
  loading?: boolean
}

function formatDateTime(dateString: string) {
  const date = new Date(dateString)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate()
  ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`
}

function formatDuration(seconds: number | null) {
  if (!seconds) return "0초"

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) return `${hours}시간 ${minutes}분`
  if (minutes > 0) return `${minutes}분 ${secs}초`
  return `${secs}초`
}

export function WalkReportList({
  walkRecords,
  selectedWalkId,
  onSelectWalk,
  loading = false,
}: WalkReportListProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">산책별 리포트 목록</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading ? (
          <div className="text-sm text-muted-foreground">목록을 불러오는 중입니다...</div>
        ) : walkRecords.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            선택한 월에 산책 기록이 없습니다.
          </div>
        ) : (
          walkRecords.map((record) => {
            const isSelected = selectedWalkId === record.walkRecordId

            return (
              <button
                key={record.walkRecordId}
                type="button"
                onClick={() => onSelectWalk(record.walkRecordId)}
                className={`w-full text-left rounded-2xl border p-4 transition ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 w-full">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <MapPinned className="w-4 h-4 text-primary" />
                      <span>{record.walkSpotName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="w-4 h-4" />
                      <span>{formatDateTime(record.startedAt)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <Footprints className="w-4 h-4 text-primary" />
                        <span>{(record.totalDistance ?? 0).toFixed(2)} km</span>
                      </div>

                      <div className="flex items-center gap-2 text-foreground">
                        <Heart className="w-4 h-4 text-primary" />
                        <span>{record.averageHealthScore ?? 0} 점</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      소요 시간: {formatDuration(record.durationSeconds)}
                    </p>

                    <p className="text-xs text-muted-foreground">상태: {record.status}</p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </button>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}