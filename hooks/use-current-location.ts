"use client"

import { useEffect, useState } from "react"

export type LocationState = {
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
        error: "이 브라우저는 위치 정보를 지원하지 않습니다.",
      }))
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
          loading: false,
          isFallback: false,
          error: "",
        })
      },
      (error) => {
        let errorMessage = "위치 정보를 가져올 수 없습니다.";
        if (error.code === 1) errorMessage = "위치 권한이 거부되었습니다.";
        
        setLocation((prev) => ({
          ...prev,
          loading: false,
          isFallback: true,
          error: errorMessage,
        }))
      },
      {
        enableHighAccuracy: true, 
        maximumAge: 0,            
        timeout: 10000,           
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return location
}