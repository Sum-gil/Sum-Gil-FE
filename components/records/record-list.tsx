"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, Heart, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type WalkRecord = {
  id?: number
  startedAt?: string
  endedAt?: string
  totalDistance?: number
  durationSeconds?: number
  averageHealthScore?: number
  placeName?: string
  walkSpotName?: string
  location?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

function formatDate(dateString?: string) {
  if (!dateString) return "-"

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return "-"

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}.${month}.${day}`
}

function formatDuration(seconds?: number) {
  if (!seconds || seconds <= 0) return "0분"

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0 && minutes > 0) return `${hours}시간 ${minutes}분`
  if (hours > 0) return `${hours}시간`
  return `${minutes}분`
}

function formatDistance(distance?: number) {
  if (distance == null) return "0.0km"
  return `${distance.toFixed(1)}km`
}

export function RecordList() {
  const [records, setRecords] = useState<WalkRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true)
        setError(null)

        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null

        const res = await fetch(`${API_BASE_URL}/api/walk-records`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store",
        })

        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || `산책 기록 조회 실패: ${res.status}`)
        }

        const data = await res.json()
        console.log("walk records 응답:", data)

        const normalizedRecords = Array.isArray(data)
          ? data
          : Array.isArray(data?.records)
          ? data.records
          : Array.isArray(data?.content)
          ? data.content
          : []

        setRecords(normalizedRecords)
      } catch (e) {
        console.error(e)
        setError("최근 기록을 불러오지 못했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()
  }, [])

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">최근 기록</h2>

      {loading && (
        <div className="text-sm text-muted-foreground">
          최근 기록을 불러오는 중...
        </div>
      )}

      {!loading && error && (
        <div className="text-sm text-red-500">{error}</div>
      )}

      {!loading && !error && records.length === 0 && (
        <div className="text-sm text-muted-foreground">
          아직 산책 기록이 없습니다.
        </div>
      )}

      {!loading && !error && records.length > 0 && (
        <div className="space-y-3">
          {records.map((record, index) => {
            const locationName =
              record.placeName ||
              record.walkSpotName ||
              record.location ||
              "산책 장소"

            const recordKey =
              record.id ?? `${record.startedAt ?? "no-date"}-${index}`

            const reportHref = record.id ? `/report/${record.id}` : "/report"

            return (
              <Link key={recordKey} href={reportHref}>
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {formatDate(record.startedAt)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-medium text-foreground">
                            {locationName}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{formatDistance(record.totalDistance)}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDuration(record.durationSeconds)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="gap-1 bg-primary/10 text-primary"
                        >
                          <Heart className="w-3 h-3" />
                          {record.averageHealthScore ?? 0}점
                        </Badge>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}