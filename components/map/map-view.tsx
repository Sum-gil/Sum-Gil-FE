"use client"

import { useEffect, useRef, useState } from "react"
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

function getMarkerImage(kakao: any, type: string) {
  const value = (type || "").toLowerCase()
  let imageSrc = ""

  if (value.includes("카페") || value.includes("cafe")) {
    imageSrc = "https://cdn-icons-png.flaticon.com/512/751/751621.png"
  } else if (value.includes("편의점") || value.includes("store")) {
    imageSrc = "https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
  } else if (value.includes("화장실") || value.includes("toilet")) {
    imageSrc = "https://cdn-icons-png.flaticon.com/512/684/684908.png"
  } else {
    imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
  }

  return new kakao.maps.MarkerImage(
    imageSrc,
    new kakao.maps.Size(40, 40),
    { offset: new kakao.maps.Point(20, 40) }
  )
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
    return () => { mounted = false }
  }, []) 

  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps) return

    const kakao = window.kakao
    const currentLatLng = new kakao.maps.LatLng(
      currentPosition.latitude,
      currentPosition.longitude
    )

    if (currentMarkerRef.current) {
      currentMarkerRef.current.setPosition(currentLatLng)
    }
  }, [currentPosition])

  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps) return
    const kakao = window.kakao
    const map = mapRef.current

    placeMarkersRef.current.forEach((marker) => marker.setMap(null))
    placeMarkersRef.current = []

    places.forEach((place) => {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(place.latitude, place.longitude),
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
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(infra.latitude, infra.longitude),
        image: getMarkerImage(kakao, infra.type),
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
    const moveLatLng = new window.kakao.maps.LatLng(selectedPlace.latitude, selectedPlace.longitude)
    mapRef.current.panTo(moveLatLng)
  }, [selectedPlace])

  const handleZoomIn = () => {
    if (!mapRef.current) return
    mapRef.current.setLevel(mapRef.current.getLevel() - 1)
  }

  const handleZoomOut = () => {
    if (!mapRef.current) return
    mapRef.current.setLevel(mapRef.current.getLevel() + 1)
  }

  const handleMoveToCurrentLocation = () => {
    if (!mapRef.current || !window.kakao?.maps) return
    const moveLatLng = new window.kakao.maps.LatLng(
      currentPosition.latitude,
      currentPosition.longitude
    )
    mapRef.current.panTo(moveLatLng)
  }

  return (
    <div className="flex-1 relative bg-secondary/30 overflow-hidden">
      <div ref={mapContainerRef} className="absolute inset-0" />

      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button variant="secondary" size="icon" onClick={handleZoomIn}>
          <Plus className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut}>
          <Minus className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleMoveToCurrentLocation}>
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
          <p className="text-xs font-medium text-foreground mb-1">현재 위치</p>
          <p className="text-[10px] text-muted-foreground font-mono">
            {currentPosition.latitude.toFixed(6)}, {currentPosition.longitude.toFixed(6)}
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">
            {selectedPlaceId ? `장소 ID: ${selectedPlaceId}` : "탐색 중..."}
          </p>
        </Card>
      </div>
    </div>
  )
}