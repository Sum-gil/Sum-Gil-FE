"use client"

import { useEffect, useRef, useState } from "react"
import { Square, Pause, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { saveWalkPoints, endWalk } from "@/lib/api"

type PositionPoint = {
  latitude: number
  longitude: number
  recordedAt: string
}

interface WalkingTrackerProps {
  walkRecordId: number | null
  placeId: number | null
}

export function WalkingTracker({
  walkRecordId,
  placeId,
}: WalkingTrackerProps) {
  const [isTracking, setIsTracking] = useState(Boolean(walkRecordId))
  const [isPaused, setIsPaused] = useState(false)
  const [time, setTime] = useState(0)
  const [distance, setDistance] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const watchIdRef = useRef<number | null>(null)
  const pointSequenceRef = useRef(1)
  const pendingPointsRef = useRef<
    { latitude: number; longitude: number; sequence: number; recordedAt: string }[]
  >([])
  const lastPositionRef = useRef<PositionPoint | null>(null)

  useEffect(() => {
    if (!walkRecordId) {
      setIsTracking(false)
      return
    }

    setIsTracking(true)
    setIsPaused(false)
  }, [walkRecordId])

  useEffect(() => {
    if (isTracking && !isPaused) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isTracking, isPaused])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toRadians = (deg: number) => (deg * Math.PI) / 180

  const calculateDistanceKm = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const R = 6371
    const dLat = toRadians(lat2 - lat1)
    const dLng = toRadians(lng2 - lng1)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const flushPoints = async () => {
    if (!walkRecordId || pendingPointsRef.current.length === 0) return

    const pointsToSend = [...pendingPointsRef.current]
    pendingPointsRef.current = []

    try {
      await saveWalkPoints(walkRecordId, {
        points: pointsToSend,
      })
    } catch (e) {
      console.error("좌표 저장 실패", e)
      pendingPointsRef.current = [...pointsToSend, ...pendingPointsRef.current]
    }
  }

  const startGeoTracking = () => {
    if (!navigator.geolocation) {
      setError("이 브라우저에서는 위치 추적을 지원하지 않습니다.")
      return
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const currentPoint: PositionPoint = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          recordedAt: new Date().toISOString(),
        }

        const lastPoint = lastPositionRef.current

        if (lastPoint) {
          const movedKm = calculateDistanceKm(
            lastPoint.latitude,
            lastPoint.longitude,
            currentPoint.latitude,
            currentPoint.longitude
          )

          if (movedKm > 0.001) {
            setDistance((prev) => prev + movedKm)
          }
        }

        pendingPointsRef.current.push({
          latitude: currentPoint.latitude,
          longitude: currentPoint.longitude,
          sequence: pointSequenceRef.current++,
          recordedAt: currentPoint.recordedAt,
        })

        lastPositionRef.current = currentPoint

        if (pendingPointsRef.current.length >= 5) {
          flushPoints()
        }
      },
      (geoError) => {
        console.error(geoError)
        setError("위치 정보를 가져오지 못했습니다. 위치 권한을 확인해주세요.")
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    )
  }

  const stopGeoTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
  }

  useEffect(() => {
    if (!walkRecordId || !isTracking || isPaused) {
      stopGeoTracking()
      return
    }

    startGeoTracking()

    return () => {
      stopGeoTracking()
    }
  }, [walkRecordId, isTracking, isPaused])

  const handlePause = async () => {
    if (!isTracking) return

    if (isPaused) {
      setIsPaused(false)
    } else {
      setIsPaused(true)
      stopGeoTracking()
      await flushPoints()
    }
  }

  const handleStop = async () => {
    try {
      stopGeoTracking()
      await flushPoints()

      if (walkRecordId) {
        await endWalk(walkRecordId, {
          totalDistance: Number(distance.toFixed(3)),
          durationSeconds: time,
          calories: Number((distance * 60).toFixed(1)),
          averageHealthScore: 80,
        })
      }

      setIsTracking(false)
      setIsPaused(false)
      setTime(0)
      setDistance(0)
      pointSequenceRef.current = 1
      pendingPointsRef.current = []
      lastPositionRef.current = null

      alert("산책이 종료되었습니다.")
    } catch (e) {
      console.error(e)
      setError("산책 종료에 실패했습니다.")
    }
  }

  useEffect(() => {
    return () => {
      stopGeoTracking()
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5" />
          <span className="font-medium">
            {walkRecordId
              ? isPaused
                ? "산책 일시 정지됨"
                : "산책 중..."
              : "장소 상세에서 산책을 시작해주세요"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-3xl font-bold">{formatTime(time)}</p>
            <p className="text-sm text-primary-foreground/70 mt-1">시간</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{distance.toFixed(2)} km</p>
            <p className="text-sm text-primary-foreground/70 mt-1">거리</p>
          </div>
        </div>

        {placeId && (
          <p className="text-xs text-primary-foreground/80 mt-4">
            placeId: {placeId}
          </p>
        )}

        {walkRecordId && (
          <p className="text-xs text-primary-foreground/80 mt-1">
            walkRecordId: {walkRecordId}
          </p>
        )}
      </div>

      <CardContent className="p-4">
        {!walkRecordId ? (
          <div className="text-sm text-muted-foreground">
            장소 상세 페이지에서 "여기서 산책 시작" 버튼을 눌러주세요.
          </div>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12 gap-2"
              onClick={handlePause}
            >
              <Pause className="w-5 h-5" />
              {isPaused ? "계속하기" : "일시 정지"}
            </Button>

            <Button
              variant="destructive"
              className="flex-1 h-12 gap-2"
              onClick={handleStop}
            >
              <Square className="w-5 h-5" />
              종료
            </Button>
          </div>
        )}

        {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
      </CardContent>
    </Card>
  )
}