"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Heart, Shield, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { apiFetch } from "@/lib/api"

type PlaceApiResponse = {
  placeId?: number
  id?: number
  placeName?: string
  name?: string
  address?: string
  description?: string
  distance?: number
  healthScore?: number
  safetyScore?: string
  tags?: string[]
  image?: string
}

export function RecommendedPlaces() {
  const [places, setPlaces] = useState<PlaceApiResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {

    // 🔥 공통 API 호출 함수
    const fetchPlaces = async (latitude: number, longitude: number) => {
      try {
        const data = await apiFetch<PlaceApiResponse[]>(
          `/api/places?latitude=${latitude}&longitude=${longitude}&radius=3000`
        )
        setPlaces(data)
      } catch (err: any) {
        setError(err.message || "추천 장소를 불러오지 못했습니다.")
      } finally {
        setLoading(false)
      }
    }

    // ===========================
    //현재 위치 사용하는 코드 (나중에 사용)
    // ===========================
    /*
    if (!navigator.geolocation) {
      setError("이 브라우저에서는 위치 정보를 지원하지 않습니다.")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        fetchPlaces(latitude, longitude)
      },
      () => {
        setError("위치 정보를 가져올 수 없습니다. 위치 권한을 허용해주세요.")
        setLoading(false)
      }
    )
    */

    // ===========================
    // 서울 고정 좌표 
    // ===========================
    const latitude = 37.5665   // 서울 시청
    const longitude = 126.9780
    fetchPlaces(latitude, longitude)

  }, [])

  if (loading) {
    return <div>추천 장소를 불러오는 중...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">추천 산책 장소</h2>
        <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
          <Link href="/map">
            더보기 <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place, index) => {
          const placeId = place.placeId ?? place.id ?? index
          const placeName = place.placeName ?? place.name ?? "이름 없음"

          return (
            <Link key={placeId} href={`/place/${placeId}`}>
              <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={place.image || "/placeholder.jpg"}
                    alt={placeName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {place.tags && place.tags.length > 0 && (
                    <div className="absolute top-3 right-3 flex gap-2">
                      {place.tags.map((tag, tagIndex) => (
                        <Badge
                          key={`${placeId}-${tag}-${tagIndex}`}
                          variant="secondary"
                          className="bg-background/80 backdrop-blur text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold text-foreground">{placeName}</h3>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {place.description || place.address || "설명 없음"}
                  </p>

                  <div className="flex items-center gap-4 text-sm">
                    {place.healthScore !== undefined && (
                      <div className="flex items-center gap-1 text-primary">
                        <Heart className="w-4 h-4" />
                        <span className="font-medium">{place.healthScore}점</span>
                      </div>
                    )}

                    {place.safetyScore !== undefined && (
                      <div className="flex items-center gap-1 text-primary">
                        <Shield className="w-4 h-4" />
                        <span className="font-medium">{place.safetyScore}</span>
                      </div>
                    )}
                  </div>

                  {place.distance !== undefined && (
                    <p className="text-xs text-muted-foreground">
                      거리: {Math.round(place.distance)}m
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}