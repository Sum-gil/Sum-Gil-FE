"use client"

import { useEffect, useState } from "react"
import { EnvironmentCards } from "@/components/dashboard/environment-cards"
import { AISearchSection } from "@/components/dashboard/ai-search-section"
import { RecommendedPlaces } from "@/components/dashboard/recommended-places"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { apiFetch } from "@/lib/api"
import { fetchAiRecommendations, type RecommendedPlace } from "@/lib/ai-recommend"

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

export default function DashboardPage() {
  const [query, setQuery] = useState("")
  const [places, setPlaces] = useState<(DefaultPlace | RecommendedPlace)[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [summary, setSummary] = useState("")
  const [isAiMode, setIsAiMode] = useState(false)

  const latitude = 37.5665
  const longitude = 126.9780
  const radius = 3000

  const fetchDefaultPlaces = async () => {
    try {
      setLoading(true)
      setError("")
      setSummary("")
      setIsAiMode(false)

      const data = await apiFetch<DefaultPlace[]>(
        `/api/places?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
      )

      setPlaces(data)
    } catch (err: any) {
      setError(err.message || "추천 장소를 불러오지 못했습니다.")
      setPlaces([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!query.trim()) {
      fetchDefaultPlaces()
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

      setPlaces(response.recommendations)
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
    await fetchDefaultPlaces()
  }

  useEffect(() => {
    fetchDefaultPlaces()
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">안녕하세요!</h1>
        <p className="text-muted-foreground">오늘도 건강한 산책을 시작해볼까요?</p>
      </section>

      <EnvironmentCards />

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