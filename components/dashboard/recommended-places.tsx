"use client"

import Link from "next/link"
import { Heart, Shield, ChevronRight, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type BasePlace = {
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
  reason?: string
  recommendationScore?: number
  nightSafe?: boolean
}

interface RecommendedPlacesProps {
  places: BasePlace[]
  loading: boolean
  error: string
  summary?: string
  isAiMode?: boolean
}

export function RecommendedPlaces({
  places,
  loading,
  error,
  summary = "",
  isAiMode = false,
}: RecommendedPlacesProps) {
  if (loading) {
    return <div>추천 장소를 불러오는 중...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">
            {isAiMode ? "AI 추천 산책 장소" : "추천 산책 장소"}
          </h2>

          {isAiMode && summary && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span>{summary}</span>
            </div>
          )}
        </div>

        <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
          <Link href="/map">
            더보기 <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>

      {places.length === 0 ? (
        <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
          {isAiMode
            ? "조건에 맞는 추천 결과가 없습니다."
            : "표시할 추천 장소가 없습니다."}
        </div>
      ) : (
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-4 min-w-max">
            {places.map((place, index) => {
              const placeId = place.placeId ?? place.id ?? index
              const placeName = place.name ?? place.placeName ?? "이름 없음"

              return (
                <Link
                  key={placeId}
                  href={`/place/${placeId}`}
                  className="w-[260px] flex-shrink-0"
                >
                  <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={place.image || "/placeholder.jpg"}
                        alt={placeName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {isAiMode && (
                        <div className="absolute top-3 right-3">
                          <Badge
                            variant="secondary"
                            className="bg-background/80 backdrop-blur text-xs"
                          >
                            AI 추천
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-semibold text-foreground">{placeName}</h3>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {place.address || place.description || "설명 없음"}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        {place.healthScore !== undefined && (
                          <div className="flex items-center gap-1 text-primary">
                            <Heart className="w-4 h-4" />
                            <span className="font-medium">
                              {place.healthScore}점
                            </span>
                          </div>
                        )}

                        {place.safetyScore !== undefined && (
                          <div className="flex items-center gap-1 text-primary">
                            <Shield className="w-4 h-4" />
                            <span className="font-medium">
                              {place.safetyScore}
                            </span>
                          </div>
                        )}
                      </div>

                      {place.distance !== undefined && (
                        <p className="text-xs text-muted-foreground">
                          거리: {Math.round(place.distance)}m
                        </p>
                      )}

                      {isAiMode && place.reason && (
                        <p className="text-sm text-foreground line-clamp-3">
                          {place.reason}
                        </p>
                      )}

                      {isAiMode &&
                        place.recommendationScore !== undefined && (
                          <p className="text-xs text-muted-foreground">
                            추천 점수: {place.recommendationScore}
                          </p>
                        )}
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}