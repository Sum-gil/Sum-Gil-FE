"use client"

import { useState } from "react"
import { HelpCircle, ChevronLeft, ChevronDown, MessageCircle, FileText } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils" // Shadcn UI 기본 유틸 함수

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "숨길 서비스는 어떤 서비스인가요?",
      answer: "숨길은 도심 속 숨겨진 산책로와 공원을 추천하고, 사용자들이 직접 다녀온 후기와 사진을 공유하는 커뮤니티형 산책 플랫폼입니다."
    },
    {
      question: "산책로 리뷰는 어떻게 작성하나요?",
      answer: "지도 탭에서 원하는 장소를 선택하거나, 하단의 '기록' 메뉴를 통해 본인이 걸었던 경로와 함께 사진, 후기를 남기실 수 있습니다."
    },
    {
      question: "위치 정보가 정확하지 않아요.",
      answer: "GPS 신호가 약한 실내나 고층 빌딩 숲에서는 오차가 발생할 수 있습니다. 설정에서 위치 권한이 '항상 허용'으로 되어 있는지 확인해 주세요."
    },
    {
      question: "계정을 삭제하고 싶어요.",
      answer: "설정 > 개인정보 보호 메뉴 하단의 '계정 탈퇴' 버튼을 통해 진행하실 수 있습니다. 탈퇴 시 작성하신 모든 기록은 즉시 삭제됩니다."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* 상단 네비게이션 */}
      <Link href="/mypage" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm font-medium">뒤로가기</span>
      </Link>

      {/* 헤더 섹션 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-emerald-500" />
          <h1 className="text-2xl font-bold text-slate-800">도움말</h1>
        </div>
        <p className="text-slate-500 text-sm">궁금하신 내용을 빠르게 찾아보세요.</p>
      </div>

      {/* FAQ 아코디언 리스트 */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-400 px-1 uppercase tracking-wider">자주 묻는 질문</h2>
        <div className="grid gap-2">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={cn(
                "group bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-200",
                openIndex === i ? "ring-1 ring-emerald-500 border-emerald-500 shadow-md shadow-emerald-500/5" : "hover:border-slate-200"
              )}
            >
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full flex items-center justify-between p-5 text-left outline-none"
              >
                <span className={cn(
                  "font-semibold text-[15px] transition-colors",
                  openIndex === i ? "text-emerald-600" : "text-slate-700"
                )}>
                  {faq.question}
                </span>
                <ChevronDown className={cn(
                  "w-4 h-4 text-slate-400 transition-transform duration-300",
                  openIndex === i && "rotate-180 text-emerald-500"
                )} />
              </button>
              
              {/* 답변 영역 (애니메이션 효과) */}
              <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              )}>
                <div className="px-5 pb-5 pt-1 text-sm text-slate-500 leading-relaxed border-t border-slate-50 mt-1">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 추가 문의 섹션 */}
      <div className="bg-emerald-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-bold text-emerald-900 text-sm">해결되지 않았나요?</h3>
          <p className="text-emerald-700/70 text-xs">운영진이 직접 답변해 드립니다.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-sm shadow-emerald-200">
          <MessageCircle className="w-4 h-4" />
          1:1 문의하기
        </button>
      </div>
    </div>
  )
}