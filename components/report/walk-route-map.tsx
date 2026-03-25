"use client"

import { useEffect, useRef, useState } from "react"
import type { WalkPathPointResponse } from "@/lib/api"
import { loadKakaoMapScript } from "@/lib/kakao-map"

type WalkRouteMapProps = {
  pathPoints: WalkPathPointResponse[]
}

export function WalkRouteMap({ pathPoints }: WalkRouteMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    if (!pathPoints || pathPoints.length === 0) {
      setMapError(null)
      return
    }

    let cancelled = false

    const renderMap = async () => {
      try {
        const kakao = await loadKakaoMapScript()

        if (cancelled || !mapRef.current) return

        const sortedPoints = [...pathPoints].sort((a, b) => a.sequence - b.sequence)

        const linePath = sortedPoints.map(
          (point) => new kakao.maps.LatLng(point.latitude, point.longitude)
        )

        const firstPoint = sortedPoints[0]
        const lastPoint = sortedPoints[sortedPoints.length - 1]

        const map = new kakao.maps.Map(mapRef.current, {
          center: new kakao.maps.LatLng(firstPoint.latitude, firstPoint.longitude),
          level: 4,
        })

        const bounds = new kakao.maps.LatLngBounds()
        linePath.forEach((latlng: any) => bounds.extend(latlng))
        map.setBounds(bounds)

        const polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 5,
          strokeColor: "#22c55e",
          strokeOpacity: 0.9,
          strokeStyle: "solid",
        })

        polyline.setMap(map)

        const startMarker = new kakao.maps.Marker({
          map,
          position: new kakao.maps.LatLng(firstPoint.latitude, firstPoint.longitude),
        })

        const endMarker = new kakao.maps.Marker({
          map,
          position: new kakao.maps.LatLng(lastPoint.latitude, lastPoint.longitude),
        })

        setMapError(null)

        return () => {
          polyline.setMap(null)
          startMarker.setMap(null)
          endMarker.setMap(null)
        }
      } catch (error) {
        console.error(error)
        if (!cancelled) {
          setMapError("카카오맵 스크립트를 불러오지 못했습니다.")
        }
      }
    }

    renderMap()

    return () => {
      cancelled = true
    }
  }, [pathPoints])

  if (pathPoints.length === 0) {
    return (
      <div className="h-[320px] rounded-2xl bg-muted flex items-center justify-center text-sm text-muted-foreground">
        저장된 산책 경로가 없습니다.
      </div>
    )
  }

  if (mapError) {
    return (
      <div className="h-[320px] rounded-2xl bg-muted flex items-center justify-center text-sm text-muted-foreground">
        {mapError}
      </div>
    )
  }

  return <div ref={mapRef} className="w-full h-[320px] rounded-2xl overflow-hidden" />
}