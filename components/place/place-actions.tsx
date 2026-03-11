"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Navigation, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlaceActionsProps {
  placeId: string
}

export function PlaceActions({ placeId }: PlaceActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="flex gap-3 pb-6">
      <Button className="flex-1 h-12 gap-2" asChild>
        <Link href="/records">
          <Navigation className="w-5 h-5" />
          여기서 산책 시작
        </Link>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12"
        onClick={() => setIsFavorite(!isFavorite)}
      >
        <Heart className={`w-5 h-5 ${isFavorite ? "fill-destructive text-destructive" : ""}`} />
      </Button>
      <Button variant="outline" size="icon" className="h-12 w-12">
        <Share2 className="w-5 h-5" />
      </Button>
    </div>
  )
}
