"use client"

import { useEffect, useState, useCallback } from "react"
import { EnvironmentCards } from "@/components/dashboard/environment-cards"
import { AISearchSection } from "@/components/dashboard/ai-search-section"
import { RecommendedPlaces } from "@/components/dashboard/recommended-places"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { apiFetch } from "@/lib/api"
import { fetchAiRecommendations, type RecommendedPlace } from "@/lib/ai-recommend"
import { useCurrentLocation } from "@/hooks/use-current-location" 

type DefaultPlace = {
  placeId?: number
  id?: number
  placeName?: string
  name?: string
  address?: string
  description?: string
  distance?: number
  healthScore?: number
  safetyScore?: number | string
  image?: string
}

const fallbackImages = [
  "/images/places/place1.jpg",
  "/images/places/place2.jpg",
  "/images/places/place3.jpg",
  "/images/places/place4.jpg",
  "/images/places/place5.jpg",
]

function shuffleArray<T>(array: T[]) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

function assignRandomImages(places: any[]) {
  const shuffled = shuffleArray(fallbackImages)
  return places.map((place, index) => {
    if (place.image && place.image.trim() !== "") return place
    return {
      ...place,
      image: shuffled[index % shuffled.length],
    }
  })
}

export default function DashboardPage() {
  const { latitude, longitude, loading: locLoading, error: locError } = useCurrentLocation()
  
  const [query, setQuery] = useState("")
  const [places, setPlaces] = useState<(DefaultPlace | RecommendedPlace)[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [summary, setSummary] = useState("")
  const [isAiMode, setIsAiMode] = useState(false)

  const radius = 3000 

  const fetchDefaultPlaces = useCallback(async (lat: number, lng: number) => {
    try {
      setLoading(true)
      setError("")
      setSummary("")
      setIsAiMode(false)

      const data = await apiFetch<DefaultPlace[]>(
        `/api/places?latitude=${lat}&longitude=${lng}&radius=${radius}`
      )

      setPlaces(assignRandomImages(data))
    } catch (err: any) {
      setError(err.message || "추천 장소를 불러오지 못했습니다.")
      setPlaces([])
    } finally {
      setLoading(false)
    }
  }, [radius])

  const handleSearch = async () => {
    if (!latitude || !longitude) return;

    if (!query.trim()) {
      fetchDefaultPlaces(latitude, longitude)
      return
    }

    try {
      setLoading(true)
      setError("")

      const response = await fetchAiRecommendations(
        query,
        latitude,
        longitude,
        radius
      )

      setPlaces(assignRandomImages(response.recommendations))
      setSummary(response.summary)
      setIsAiMode(true)
    } catch (err: any) {
      setError(err.message || "AI 추천 결과를 불러오지 못했습니다.")
      setPlaces([])
      setSummary("")
      setIsAiMode(true)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    setQuery("")
    if (latitude && longitude) await fetchDefaultPlaces(latitude, longitude)
  }

  useEffect(() => {
    if (latitude && longitude) {
      fetchDefaultPlaces(latitude, longitude)
    }
  }, [latitude, longitude, fetchDefaultPlaces])

  if (locLoading && !latitude) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-pulse">위치 정보를 확인하고 있습니다...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">안녕하세요!</h1>
        <p className="text-muted-foreground">오늘도 건강한 산책을 시작해볼까요?</p>
        {locError && <p className="text-xs text-red-400">{locError} (기본 위치 기반으로 표시됩니다)</p>}
      </section>

      <EnvironmentCards lat={latitude} lng={longitude} />

      <AISearchSection
        query={query}
        onChangeQuery={setQuery}
        onSearch={handleSearch}
        onReset={handleReset}
        loading={loading}
        isAiMode={isAiMode}
      />

      <RecommendedPlaces
        places={places}
        loading={loading}
        error={error}
        summary={summary}
        isAiMode={isAiMode}
      />

      <QuickActions />
    </div>
  )
}