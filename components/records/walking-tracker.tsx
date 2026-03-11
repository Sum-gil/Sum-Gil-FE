"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Square, Pause, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function WalkingTracker() {
  const [isTracking, setIsTracking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [time, setTime] = useState(0)
  const [distance, setDistance] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isTracking && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1)
        setDistance((prev) => prev + 0.005 + Math.random() * 0.003)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isTracking, isPaused])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => {
    setIsTracking(true)
    setIsPaused(false)
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const handleStop = () => {
    setIsTracking(false)
    setIsPaused(false)
    setTime(0)
    setDistance(0)
  }

  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5" />
          <span className="font-medium">
            {isTracking ? (isPaused ? "일시 정지됨" : "산책 중...") : "산책을 시작해보세요"}
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
      </div>
      
      <CardContent className="p-4">
        <div className="flex gap-3">
          {!isTracking ? (
            <Button className="flex-1 h-12 gap-2" onClick={handleStart}>
              <Play className="w-5 h-5" />
              산책 시작
            </Button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
