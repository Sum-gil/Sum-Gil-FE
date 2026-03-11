"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface PlaceHeaderProps {
  name: string
  address: string
  images: string[]
}

export function PlaceHeader({ name, address, images }: PlaceHeaderProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" asChild className="gap-1 -ml-2">
        <Link href="/map">
          <ArrowLeft className="w-4 h-4" />
          돌아가기
        </Link>
      </Button>

      <div className="relative rounded-2xl overflow-hidden h-64 md:h-80">
        <img
          src={images[currentImage]}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentImage ? "bg-primary-foreground" : "bg-primary-foreground/50"
                  }`}
                  onClick={() => setCurrentImage(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground">{name}</h1>
        <div className="flex items-center gap-1 mt-1 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{address}</span>
        </div>
      </div>
    </div>
  )
}
