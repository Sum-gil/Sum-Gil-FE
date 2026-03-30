"use client"

import { useState } from "react"
import { Bell, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function NotificationPage() {
  const [isOn, setIsOn] = useState(true); 

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Link href="/mypage" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-2">
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm font-medium">뒤로가기</span>
      </Link>

      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <Bell className="w-6 h-6 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">알림 설정</h1>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div 
          className="flex items-center justify-between p-2 cursor-pointer group" 
          onClick={() => setIsOn(!isOn)}
        >
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
              푸시 알림
            </span>
            <span className="text-xs text-slate-400 mt-0.5">
              산책로 업데이트 및 커뮤니티 소식을 알려드립니다.
            </span>
          </div>

          <div className={`
            relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out
            ${isOn ? 'bg-blue-500' : 'bg-slate-300'} 
          `}>
            <div className={`
              absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out
              ${isOn ? 'translate-x-1' : 'translate-x-6'}
            `} />
          </div>
        </div>
      </div>
    </div>
  );
}