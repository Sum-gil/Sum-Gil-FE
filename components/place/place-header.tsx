"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PlaceHeaderProps {
  name: string
  address: string
  images?: string[]
}

export function PlaceHeader({ name, address, images = [] }: PlaceHeaderProps) {
  const [currentImage, setCurrentImage] = useState(0)

  // 기본 이미지 설정 (자연/공원 느낌)
  const defaultImages = [
    "https://images.unsplash.com/photo-1544943962-d261e403d191?w=1200&q=80"
  ];
  const displayImages = images.length > 0 ? images : defaultImages;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % displayImages.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + displayImages.length) % displayImages.length)

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" asChild className="gap-1 -ml-2 text-muted-foreground hover:text-foreground">
        <Link href="/map">
          <ArrowLeft className="w-4 h-4" />
          지도에서 돌아가기
        </Link>
      </Button>

      <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 bg-slate-100 shadow-md">
        <img
          src={displayImages[currentImage]}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {displayImages.length > 1 && (
          <>
            <Button variant="secondary" size="icon" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80" onClick={prevImage}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="secondary" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80" onClick={nextImage}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      <div className="px-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{name}</h1>
        <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{address || "위치 정보 준비 중"}</span>
        </div>
      </div>
    </div>
  )
}