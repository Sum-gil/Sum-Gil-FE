"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { MapView } from "@/components/map/map-view"
import { PlaceListPanel } from "@/components/map/place-list-panel"
import { apiFetch } from "@/lib/api"
import { useCurrentLocation } from "@/hooks/use-current-location" // 훅 경로 확인

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
  const { latitude, longitude, loading: locLoading } = useCurrentLocation()
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
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">현재 위치를 확인 중입니다...</p>
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