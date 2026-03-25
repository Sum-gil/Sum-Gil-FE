"use client"

import { Shield, Camera, Lightbulb, Users, Circle, CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SafetyAnalysisCardProps {
  status: "safe" | "normal" | "caution"
  score: number // 실제 합산 점수
  message: string // 백엔드 getSafetyMessage 반영
  factors: {
    cctvCount: number // 주변 CCTV 개수
    nightSafe: boolean // 야간 안심 여부
    visitorCount: number // 실시간 유동인구
  }
}

const statusConfig = {
  safe: {
    label: "안전",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    dotColor: "text-emerald-500",
  },
  normal: {
    label: "보통",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    dotColor: "text-amber-500",
  },
  caution: {
    label: "야간 주의",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    dotColor: "text-destructive",
  },
}

export function SafetyAnalysisCard({ status, score, message, factors }: SafetyAnalysisCardProps) {
  const config = statusConfig[status]

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary fill-current" />
          <CardTitle className="text-base font-bold">종합 안전도 분석</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center pt-2">
          <div className={`px-8 py-5 rounded-3xl ${config.bgColor} flex flex-col items-center gap-1 shadow-inner w-full`}>
            <div className="flex items-center gap-2">
              <Circle className={`w-3 h-3 fill-current ${config.dotColor} animate-pulse`} />
              <span className={`text-2xl font-black ${config.color}`}>{config.label}</span>
            </div>
            <span className="text-sm font-bold text-slate-500">안전 지수: {score}점</span>
          </div>
          <p className="mt-4 text-sm text-slate-500 text-center leading-relaxed">
            {message}
          </p>
        </div>

        <div className="grid gap-3">
          {/* CCTV 정보 */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2.5 text-slate-600 font-medium">
              <Camera className="w-4 h-4 text-slate-400" />
              <span className="text-[13px]">주변 CCTV</span>
            </div>
            <span className="text-sm font-bold text-primary">{factors.cctvCount}개 확인</span>
          </div>

          {/* 야간 안전 정보 */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2.5 text-slate-600 font-medium">
              <Lightbulb className="w-4 h-4 text-slate-400" />
              <span className="text-[13px]">야간 안심 산책로</span>
            </div>
            <div className="flex items-center gap-1">
              {factors.nightSafe ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-bold text-emerald-600">인증됨</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-slate-300" />
                  <span className="text-sm font-bold text-slate-400">정보 없음</span>
                </>
              )}
            </div>
          </div>

          {/* 유동 인구 정보 */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2.5 text-slate-600 font-medium">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="text-[13px]">현재 주변 유동인구</span>
            </div>
            <span className="text-sm font-bold text-slate-700">
              {factors.visitorCount > 150 ? "북적임" : factors.visitorCount > 50 ? "적당함" : "한산함"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}