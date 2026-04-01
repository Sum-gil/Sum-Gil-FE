"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WalkRecordDetailResponse, WalkReportResponse } from "@/lib/api"
import { createReview } from "@/lib/api"
import { WalkRouteMap } from "@/components/report/walk-route-map"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

type WalkReportDetailProps = {
  walkRecordId: number | null
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
  walkRecordId,
  walkReport,
  walkDetail,
  loading = false,
}: WalkReportDetailProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmitReview = async () => {
    if (!walkReport?.walkSpotId) {
      alert("연결된 산책 장소 정보가 없습니다.")
      return
    }

    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.")
      return
    }

    try {
      setSubmitting(true)

      await createReview({
        walkSpotId: walkReport.walkSpotId,
        rating,
        content,
      })

      setRating(5)
      setContent("")
      setIsDialogOpen(false)
      alert("리뷰가 작성되었습니다.")
    } catch (error) {
      console.error("리뷰 작성 실패:", error)
      alert("리뷰 작성에 실패했습니다.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-base">선택한 산책 상세 리포트</CardTitle>

            {walkReport && walkRecordId && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">리뷰 작성</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>이 산책에 대한 리뷰 작성</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 pt-4">
                    <div className="rounded-xl bg-secondary/50 p-3 text-sm">
                      <p className="font-medium text-foreground">
                        장소 ID: {walkReport.walkSpotId}
                      </p>
                      <p className="mt-1 text-muted-foreground">
                        선택한 산책 상세 리포트의 장소가 자동으로 연결됩니다.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">별점</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <Textarea
                      placeholder="리뷰 내용을 작성해주세요"
                      rows={4}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />

                    <Button
                      className="w-full"
                      onClick={handleSubmitReview}
                      disabled={submitting}
                    >
                      {submitting ? "작성 중..." : "작성 완료"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
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
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
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
                <div className="grid gap-2 text-sm md:grid-cols-2">
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
                  <p className="mb-1 text-sm font-medium text-foreground">리포트 한줄 요약</p>
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