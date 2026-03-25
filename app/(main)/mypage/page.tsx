"use client" // 이 줄이 반드시 맨 위에 있어야 합니다.

import { useEffect, useState } from "react"
import { UserProfile } from "@/components/mypage/user-profile"
import { UserStats } from "@/components/mypage/user-stats"
import { FavoritePlaces } from "@/components/mypage/favorite-places"
import { UserSettings } from "@/components/mypage/user-settings"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function MyPage() {
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        
        if (!token) {
          setLoading(false)
          return
        }

        const res = await fetch("http://localhost:8080/api/mypage/summary", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        if (res.ok) {
          const data = await res.json()
          setSummary(data)
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMyPageData()
  }, [])

  // 1. 로딩 중일 때 UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">정보를 불러오는 중입니다...</p>
      </div>
    )
  }

  // 2. 로그인이 안 되어 있거나 데이터가 없을 때 UI
  if (!summary) {
    return (
      <div className="container px-4 py-20 text-center space-y-4">
        <p className="text-muted-foreground">로그인이 필요한 서비스입니다.</p>
        <Link href="/login" className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium">
          로그인하러 가기
        </Link>
      </div>
    )
  }

  // 3. 정상 데이터 로드 시 UI
  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto space-y-6">
      <UserProfile 
        initialData={{
          nickname: summary.nickname,
          email: summary.email,
          interestRegion: summary.interestRegion,
          healthInfo: summary.healthInfo
        }} 
      />
      
      <UserStats 
        data={{
          totalDistanceKm: summary.totalDistanceKm,
          totalWalkCount: summary.totalWalkCount,
          averageHealthScore: summary.averageHealthScore,
          totalDurationText: summary.totalDurationText,
          totalCalories: summary.totalCalories
        }} 
      />
      
      <FavoritePlaces />
      <UserSettings />
    </div>
  )
}