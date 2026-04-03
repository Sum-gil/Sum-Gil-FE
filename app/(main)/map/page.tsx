"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { MapView } from "@/components/map/map-view"
import { PlaceListPanel } from "@/components/map/place-list-panel"
import { apiFetch } from "@/lib/api"
import { useCurrentLocation } from "@/hooks/use-current-location" 
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export type PlaceItem = {
  id: number
  placeId?: number
  name: string
  address?: string
  latitude: number
  longitude: number
  healthScore?: number
  safetyScore?: number | string
  reviews?: number
  category?: string
  distance?: string | number
}

type InfrastructureItem = {
  name: string
  type: string
  latitude: number
  longitude: number
  distance?: number
}

export default function MapPage() {
  const { latitude, longitude, loading: locLoading, error: locError } = useCurrentLocation()
  
  const [places, setPlaces] = useState<PlaceItem[]>([])
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null)
  const [infrastructures, setInfrastructures] = useState<InfrastructureItem[]>([])
  const [loading, setLoading] = useState(true)

  const radius = 3000

  const fetchPlaces = useCallback(async (lat: number, lng: number) => {
    try {
      setLoading(true)
      const data = await apiFetch<any[]>(
        `/api/places?latitude=${lat}&longitude=${lng}&radius=${radius}`
      )

      const mapped: PlaceItem[] = data.map((item, index) => ({
        id: item.placeId ?? item.id ?? index + 1,
        placeId: item.placeId ?? item.id ?? index + 1,
        name: item.placeName ?? item.name ?? "이름 없는 장소",
        address: item.address ?? item.roadAddress ?? "",
        latitude: item.latitude,
        longitude: item.longitude,
        healthScore: item.healthScore,
        safetyScore: item.safetyScore,
        reviews: item.reviews,
        category: item.category ?? "산책로",
        distance:
          typeof item.distance === "number"
            ? `${(item.distance / 1000).toFixed(1)}km`
            : item.distance,
      }))

      setPlaces(mapped)

      if (mapped.length > 0 && !selectedPlaceId) {
        setSelectedPlaceId(mapped[0].id)
      }
    } catch (error) {
      console.error("장소 조회 실패:", error)
      setPlaces([])
    } finally {
      setLoading(false)
    }
  }, [selectedPlaceId, radius])

  useEffect(() => {
    if (latitude && longitude) {
      fetchPlaces(latitude, longitude)
    }
  }, [latitude, longitude, fetchPlaces])

  useEffect(() => {
    const fetchInfrastructures = async () => {
      if (!selectedPlaceId) {
        setInfrastructures([])
        return
      }
      try {
        const data = await apiFetch<InfrastructureItem[]>(
          `/api/places/${selectedPlaceId}/infrastructures`
        )
        setInfrastructures(data)
      } catch (error) {
        console.error("주변 편의시설 조회 실패:", error)
        setInfrastructures([])
      }
    }
    fetchInfrastructures()
  }, [selectedPlaceId])

  const selectedPlace = useMemo(
    () => places.find((place) => place.id === selectedPlaceId) ?? null,
    [places, selectedPlaceId]
  )

  if (locLoading && !latitude) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground animate-pulse">사용자의 위치를 파악하고 있습니다...</p>
        </div>
      </div>
    )
  }

  if (locError || (!latitude && !locLoading)) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-background p-6">
        <div className="text-center space-y-4 max-w-sm">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <h2 className="text-xl font-bold">위치 정보를 사용할 수 없습니다</h2>
          <p className="text-muted-foreground text-sm">
            주변 산책로를 찾기 위해 위치 권한이 필요합니다. 브라우저 설정에서 위치 권한을 허용해 주세요.
          </p>
          <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
            다시 시도하기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden">
      <div className="flex h-full flex-col lg:flex-row">
        <PlaceListPanel
          places={places}
          selectedPlaceId={selectedPlaceId}
          onSelectPlace={setSelectedPlaceId}
          loading={loading}
          currentPosition={{ latitude: latitude!, longitude: longitude! }}
        />

        <MapView
          places={places}
          infrastructures={infrastructures}
          selectedPlaceId={selectedPlaceId}
          selectedPlace={selectedPlace}
          currentPosition={{ latitude: latitude!, longitude: longitude! }}
          onSelectPlace={setSelectedPlaceId}
        />
      </div>
    </div>
  )
}