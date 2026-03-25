"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, Navigation, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { startWalk } from "@/lib/api"

interface PlaceActionsProps {
  placeId: string
}

export function PlaceActions({ placeId }: PlaceActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const router = useRouter()

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
        className="h-12 w-12"
        onClick={() => setIsFavorite(!isFavorite)}
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