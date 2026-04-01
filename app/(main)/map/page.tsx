"use client"

import { useEffect, useMemo, useState } from "react"
import { MapView } from "@/components/map/map-view"
import { PlaceListPanel } from "@/components/map/place-list-panel"
import { apiFetch } from "@/lib/api"

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
  const [places, setPlaces] = useState<PlaceItem[]>([])
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null)
  const [infrastructures, setInfrastructures] = useState<InfrastructureItem[]>([])
  const [loading, setLoading] = useState(true)

  const latitude = 37.5665
  const longitude = 126.978
  const radius = 3000

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true)

        const data = await apiFetch<any[]>(
          `/api/places?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
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

        if (mapped.length > 0) {
          setSelectedPlaceId(mapped[0].id)
        }
      } catch (error) {
        console.error("장소 조회 실패:", error)
        setPlaces([])
      } finally {
        setLoading(false)
      }
    }

    fetchPlaces()
  }, [])

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

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden">
      <div className="flex h-full flex-col lg:flex-row">
        <PlaceListPanel
          places={places}
          selectedPlaceId={selectedPlaceId}
          onSelectPlace={setSelectedPlaceId}
          loading={loading}
          currentPosition={{ latitude, longitude }}
        />

        <MapView
          places={places}
          infrastructures={infrastructures}
          selectedPlaceId={selectedPlaceId}
          selectedPlace={selectedPlace}
          currentPosition={{ latitude, longitude }}
          onSelectPlace={setSelectedPlaceId}
        />
      </div>
    </div>
  )
}