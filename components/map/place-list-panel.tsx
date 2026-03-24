"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  Search,
  Heart,
  Shield,
  MessageSquare,
  Filter,
  ChevronDown,
  MapPin,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Navigation } from "lucide-react"
import { buildKakaoDirectionsUrl } from "@/lib/kakao-navigation"
import type { PlaceItem } from "@/app/(main)/map/page"

type PlaceListPanelProps = {
  places: PlaceItem[]
  selectedPlaceId: number | null
  onSelectPlace: (placeId: number) => void
  loading?: boolean
  currentPosition: {
    latitude: number
    longitude: number
  }
}

export function PlaceListPanel({
  places,
  selectedPlaceId,
  onSelectPlace,
  loading = false,
  currentPosition,
}: PlaceListPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const categories = useMemo(() => {
    const values = places
      .map((place) => place.category)
      .filter(Boolean) as string[]

    return ["전체", ...Array.from(new Set(values))]
  }, [places])

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesSearch = place.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === "전체" || place.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [places, searchQuery, selectedCategory])

  return (
    <div className="w-full lg:w-96 bg-card border-r border-border flex flex-col h-64 lg:h-full">
      <div className="p-4 border-b border-border space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="장소 검색..."
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="w-4 h-4" />
                {selectedCategory}
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Badge variant="secondary" className="text-xs">
            {filteredPlaces.length}개 장소
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {loading && (
            <div className="text-sm text-muted-foreground px-2 py-4">
              장소를 불러오는 중...
            </div>
          )}

          {!loading && filteredPlaces.length === 0 && (
            <div className="text-sm text-muted-foreground px-2 py-4">
              표시할 장소가 없습니다.
            </div>
          )}

          {!loading &&
            filteredPlaces.map((place) => {
              const isSelected = selectedPlaceId === place.id

              return (
                <div key={place.id} className="space-y-2">
                  <Card
                    className={`shadow-sm hover:shadow-md transition-all cursor-pointer ${
                      isSelected
                        ? "ring-2 ring-primary border-primary"
                        : "border-border"
                    }`}
                    onClick={() => onSelectPlace(place.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            {place.category && (
                              <Badge variant="outline" className="text-xs shrink-0">
                                {place.category}
                              </Badge>
                            )}

                            {place.distance && (
                              <span className="text-xs text-muted-foreground">
                                {place.distance}
                              </span>
                            )}
                          </div>

                          <h3 className="font-medium text-sm text-foreground truncate">
                            {place.name}
                          </h3>

                          {place.address && (
                            <p className="text-xs text-muted-foreground mt-1 truncate">
                              {place.address}
                            </p>
                          )}

                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>
                              {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        {place.healthScore !== undefined && (
                          <div className="flex items-center gap-1 text-primary">
                            <Heart className="w-3 h-3" />
                            <span>{place.healthScore}점</span>
                          </div>
                        )}

                        {place.safetyScore !== undefined && (
                          <div className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            <span>{String(place.safetyScore)}</span>
                          </div>
                        )}

                        {place.reviews !== undefined && (
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{place.reviews}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation()

                            const url = buildKakaoDirectionsUrl({
                              originName: "현재 위치",
                              originLat: currentPosition.latitude,
                              originLng: currentPosition.longitude,
                              destName: place.name,
                              destLat: place.latitude,
                              destLng: place.longitude,
                              mode: "walk",
                            })

                            window.open(url, "_blank")
                          }}
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          길안내
                        </Button>

                        <Link
                          href={`/place/${place.placeId ?? place.id}`}
                          className="inline-flex items-center justify-center rounded-md border px-3 text-xs hover:bg-accent"
                          onClick={(e) => e.stopPropagation()}
                        >
                          상세보기
                        </Link>
                      </div>
                    </CardContent>
                  </Card>

                  <Link
                    href={`/place/${place.placeId ?? place.id}`}
                    className="inline-block text-xs text-primary hover:underline px-1"
                  >
                    상세 페이지 보기
                  </Link>
                </div>
              )
            })}
        </div>
      </ScrollArea>
    </div>
  )
}