"use client"

import { useEffect, useState } from "react"

type LocationState = {
  latitude: number
  longitude: number
  loading: boolean
  isFallback: boolean
  error: string
}

const FALLBACK_LOCATION = {
  latitude: 37.5665,
  longitude: 126.9780,
}

export function useCurrentLocation() {
  const [location, setLocation] = useState<LocationState>({
    latitude: FALLBACK_LOCATION.latitude,
    longitude: FALLBACK_LOCATION.longitude,
    loading: true,
    isFallback: true,
    error: "",
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        isFallback: true,
        error: "브라우저에서 위치 정보를 지원하지 않습니다.",
      }))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
          isFallback: false,
          error: "",
        })
      },
      () => {
        setLocation((prev) => ({
          ...prev,
          loading: false,
          isFallback: true,
          error: "위치 권한이 거부되어 기본 좌표를 사용합니다.",
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000 * 60 * 5,
      }
    )
  }, [])

  return location
}