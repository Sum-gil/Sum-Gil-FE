"use client"

import { Shield, ChevronLeft, Lock, EyeOff } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Link href="/mypage" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-2">
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm font-medium">뒤로가기</span>
      </Link>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Shield className="w-6 h-6 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">개인정보 보호</h1>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed px-1">
          숨길은 사용자의 위치 정보와 개인 데이터를 안전하게 보호하며, <br className="hidden md:block" />
          투명한 운영을 약속드립니다.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-8">
        <section className="flex gap-4">
          <div className="mt-1">
            <Lock className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-slate-800 text-lg">위치 정보 이용</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              사용자 주변의 최적화된 산책로 추천 및 정확한 경로 안내를 위해 위치 데이터를 활용합니다. 
              수집된 데이터는 서비스 이용 중에만 활성화되며, 별도로 저장되지 않습니다.
            </p>
          </div>
        </section>

        <div className="h-px bg-slate-50" />

        <section className="flex gap-4">
          <div className="mt-1">
            <EyeOff className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-slate-800 text-lg">제3자 정보 제공</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              숨길은 사용자의 명시적인 동의 없이 개인정보를 외부에 판매하거나 제공하지 않습니다. 
              공공 데이터 API 활용 시에도 익명화된 정보만을 사용합니다.
            </p>
          </div>
        </section>
      </div>

      <p className="text-center text-xs text-slate-400 pt-4">
        최종 수정일: 2026년 3월 29일
      </p>
    </div>
  )
}