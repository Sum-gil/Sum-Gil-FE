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

  const handleFavoriteToggle = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      if (!token) return alert("로그인이 필요합니다.")

      if (isFavorite && favoriteId) {
        await axios.delete(`http://localhost:8080/api/favorites/${favoriteId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setIsFavorite(false)
        setFavoriteId(null)
      } else {
        const res = await axios.post("http://localhost:8080/api/favorites", 
          { walkSpotId: Number(placeId) },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setIsFavorite(true)
        setFavoriteId(res.data) 
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
        className={`h-12 w-12 ${isFavorite ? "bg-rose-50 border-rose-100" : ""}`} 
        onClick={handleFavoriteToggle} 
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