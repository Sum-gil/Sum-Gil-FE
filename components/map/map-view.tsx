"use client"

import { useEffect, useRef } from "react"
import {
  Navigation,
  Store,
  Building2,
  Coffee,
  Plus,
  Minus,
  Locate,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { loadKakaoMapScript } from "@/lib/kakao-map"
import type { PlaceItem } from "@/app/(main)/map/page"

type InfrastructureItem = {
  name: string
  type: string
  latitude: number
  longitude: number
  distance?: number
}

type MapViewProps = {
  places: PlaceItem[]
  infrastructures: InfrastructureItem[]
  selectedPlaceId: number | null
  selectedPlace: PlaceItem | null
  currentPosition: {
    latitude: number
    longitude: number
  }
  onSelectPlace: (placeId: number) => void
}

export function MapView({
  places,
  infrastructures,
  selectedPlaceId,
  selectedPlace,
  currentPosition,
  onSelectPlace,
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const placeMarkersRef = useRef<any[]>([])
  const infraMarkersRef = useRef<any[]>([])
  const currentMarkerRef = useRef<any>(null)
  const infoWindowRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true

    const initMap = async () => {
      try {
        const kakao = await loadKakaoMapScript()

        if (!mounted || !mapContainerRef.current) return

        const center = new kakao.maps.LatLng(
          currentPosition.latitude,
          currentPosition.longitude
        )

        const map = new kakao.maps.Map(mapContainerRef.current, {
          center,
          level: 4,
        })

        mapRef.current = map
        infoWindowRef.current = new kakao.maps.InfoWindow({ zIndex: 10 })

        currentMarkerRef.current = new kakao.maps.Marker({
          map,
          position: center,
        })
      } catch (error) {
        console.error("카카오맵 초기화 실패:", error)
      }
    }

    initMap()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps) return

    const kakao = window.kakao
    const map = mapRef.current

    if (currentMarkerRef.current) {
      currentMarkerRef.current.setMap(null)
    }

    const currentLatLng = new kakao.maps.LatLng(
      currentPosition.latitude,
      currentPosition.longitude
    )

    currentMarkerRef.current = new kakao.maps.Marker({
      map,
      position: currentLatLng,
    })
  }, [currentPosition])

  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps) return

    const kakao = window.kakao
    const map = mapRef.current

    placeMarkersRef.current.forEach((marker) => marker.setMap(null))
    placeMarkersRef.current = []

    places.forEach((place) => {
      const markerPosition = new kakao.maps.LatLng(place.latitude, place.longitude)

      const marker = new kakao.maps.Marker({
        map,
        position: markerPosition,
      })

      kakao.maps.event.addListener(marker, "click", () => {
        onSelectPlace(place.id)

        infoWindowRef.current?.setContent(`
          <div style="padding:8px 12px;font-size:13px;">
            <strong>${place.name}</strong>
          </div>
        `)
        infoWindowRef.current?.open(map, marker)
      })

      placeMarkersRef.current.push(marker)
    })
  }, [places, onSelectPlace])

  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps) return

    const kakao = window.kakao
    const map = mapRef.current

    infraMarkersRef.current.forEach((marker) => marker.setMap(null))
    infraMarkersRef.current = []

    infrastructures.forEach((infra) => {
      const markerPosition = new kakao.maps.LatLng(infra.latitude, infra.longitude)

      const markerImage = new kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
        new kakao.maps.Size(24, 35)
      )

      const marker = new kakao.maps.Marker({
        map,
        position: markerPosition,
        image: markerImage,
      })

      kakao.maps.event.addListener(marker, "click", () => {
        infoWindowRef.current?.setContent(`
          <div style="padding:8px 12px;font-size:13px;">
            <strong>${infra.name}</strong><br/>
            <span>${infra.type}</span>
          </div>
        `)
        infoWindowRef.current?.open(map, marker)
      })

      infraMarkersRef.current.push(marker)
    })
  }, [infrastructures])

  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps || !selectedPlace) return

    const kakao = window.kakao
    const moveLatLng = new kakao.maps.LatLng(
      selectedPlace.latitude,
      selectedPlace.longitude
    )

    mapRef.current.panTo(moveLatLng)
  }, [selectedPlace])

  const handleZoomIn = () => {
    if (!mapRef.current) return
    const level = mapRef.current.getLevel()
    mapRef.current.setLevel(level - 1)
  }

  const handleZoomOut = () => {
    if (!mapRef.current) return
    const level = mapRef.current.getLevel()
    mapRef.current.setLevel(level + 1)
  }

  const handleMoveToCurrentLocation = () => {
    if (!mapRef.current || !window.kakao?.maps) return

    const kakao = window.kakao
    const moveLatLng = new kakao.maps.LatLng(
      currentPosition.latitude,
      currentPosition.longitude
    )

    mapRef.current.panTo(moveLatLng)
  }

  return (
    <div className="flex-1 relative bg-secondary/30 overflow-hidden">
      <div ref={mapContainerRef} className="absolute inset-0" />

      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button
          variant="secondary"
          size="icon"
          className="shadow-lg bg-card"
          onClick={handleZoomIn}
        >
          <Plus className="w-4 h-4" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="shadow-lg bg-card"
          onClick={handleZoomOut}
        >
          <Minus className="w-4 h-4" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="shadow-lg bg-card"
          onClick={handleMoveToCurrentLocation}
        >
          <Locate className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 bg-card rounded-xl p-3 shadow-lg z-10">
        <p className="text-xs font-medium text-foreground mb-2">범례</p>

        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Navigation className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">산책로</span>
          </div>

          <div className="flex items-center gap-1">
            <Store className="w-4 h-4 text-orange-500" />
            <span className="text-muted-foreground">편의점</span>
          </div>

          <div className="flex items-center gap-1">
            <Building2 className="w-4 h-4 text-blue-500" />
            <span className="text-muted-foreground">화장실</span>
          </div>

          <div className="flex items-center gap-1">
            <Coffee className="w-4 h-4 text-amber-500" />
            <span className="text-muted-foreground">카페</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <Card className="rounded-xl p-3 shadow-lg">
          <p className="text-xs font-medium text-foreground mb-1">현재 기준 좌표</p>
          <p className="text-xs text-muted-foreground">
            {currentPosition.latitude.toFixed(4)}, {currentPosition.longitude.toFixed(4)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {selectedPlaceId ? `선택된 장소 ID: ${selectedPlaceId}` : "선택된 장소 없음"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            편의시설 {infrastructures.length}개 표시 중
          </p>
        </Card>
      </div>
    </div>
  )
}