"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Heart, Navigation, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { startWalk } from "@/lib/api"
import axios from "axios"

interface PlaceActionsProps {
  placeId: string
}

export function PlaceActions({ placeId }: PlaceActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [favoriteId, setFavoriteId] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        if (!token) return

        const res = await axios.get("http://localhost:8080/api/favorites", {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        // 내 목록 중 현재 장소가 있는지 확인
        const existing = res.data.find((f: any) => f.walkSpotId === Number(placeId))
        if (existing) {
          setIsFavorite(true)
          setFavoriteId(existing.id)
        }
      } catch (error) {
        console.error("Favorite status check failed:", error)
      }
    }
    checkFavorite()
  }, [placeId])

  // [추가] 즐겨찾기 토글 핸들러
  const handleFavoriteToggle = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      if (!token) return alert("로그인이 필요합니다.")

      if (isFavorite && favoriteId) {
        // 이미 등록된 경우 -> 삭제
        await axios.delete(`http://localhost:8080/api/favorites/${favoriteId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setIsFavorite(false)
        setFavoriteId(null)
      } else {
        // 등록되지 않은 경우 -> 추가
        const res = await axios.post("http://localhost:8080/api/favorites", 
          { walkSpotId: Number(placeId) },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setIsFavorite(true)
        setFavoriteId(res.data) // 백엔드에서 반환한 ID(Long) 저장
      }
    } catch (error) {
      console.error(error)
      alert("즐겨찾기 처리 실패")
    }
  }

  const handleStartWalk = async () => {
    try {
      setIsStarting(true)

      const response = await startWalk({
        walkSpotId: Number(placeId),
      })

      router.push(
        `/records?walkRecordId=${response.walkRecordId}&placeId=${placeId}`
      )
    } catch (error) {
      console.error(error)
      alert("산책 시작에 실패했습니다.")
    } finally {
      setIsStarting(false)
    }
  }

  return (
    <div className="flex gap-3 pb-6">
      <Button
        className="flex-1 h-12 gap-2"
        onClick={handleStartWalk}
        disabled={isStarting}
      >
        <Navigation className="w-5 h-5" />
        {isStarting ? "시작 중..." : "여기서 산책 시작"}
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={`h-12 w-12 ${isFavorite ? "bg-rose-50 border-rose-100" : ""}`} // [수정] 활성화 시 배경색 변화
        onClick={handleFavoriteToggle} // [수정] 핸들러 연결
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? "fill-destructive text-destructive" : ""
          }`}
        />
      </Button>

      <Button variant="outline" size="icon" className="h-12 w-12">
        <Share2 className="w-5 h-5" />
      </Button>
    </div>
  )
}