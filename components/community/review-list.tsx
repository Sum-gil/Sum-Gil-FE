"use client"

import { useEffect, useMemo, useState } from "react"
import { Star, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getCommunityReviews, type ReviewResponse } from "@/lib/api"

type ReviewListProps = {
  searchKeyword: string
  filter: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return "-"

  const now = new Date()
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffSeconds < 60) return "방금 전"
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}분 전`
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}시간 전`
  if (diffSeconds < 604800) return `${Math.floor(diffSeconds / 86400)}일 전`

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}.${month}.${day}`
}

export function ReviewList({
  searchKeyword,
  filter,
}: ReviewListProps) {
  const [reviews, setReviews] = useState<ReviewResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        setError("")
        const data = await getCommunityReviews()
        setReviews(data)
      } catch (err) {
        console.error("커뮤니티 리뷰 조회 실패:", err)
        setError("리뷰를 불러오지 못했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const filteredReviews = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase()
    let next = [...reviews]

    if (keyword) {
      next = next.filter((review) => {
        const place = review.walkSpotName?.toLowerCase() ?? ""
        const content = review.content?.toLowerCase() ?? ""
        const nickname = review.nickname?.toLowerCase() ?? ""

        return (
          place.includes(keyword) ||
          content.includes(keyword) ||
          nickname.includes(keyword)
        )
      })
    }

    if (filter === "별점순") {
      next.sort((a, b) => b.rating - a.rating)
    } else {
      next.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }

    return next
  }, [reviews, searchKeyword, filter])

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        리뷰를 불러오는 중...
      </div>
    )
  }

  if (error) {
    return <div className="py-12 text-center text-sm text-red-500">{error}</div>
  }

  if (filteredReviews.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        리뷰가 없습니다.
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-8">
      {filteredReviews.map((review) => (
        <Card key={review.id} className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {review.nickname?.[0] ?? "유"}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {review.nickname}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatRelativeTime(review.createdAt)}
                  </p>
                </div>
              </div>

              <StarRating rating={review.rating} />
            </div>

            <Badge variant="secondary" className="gap-1 text-xs">
              {review.walkSpotName}
            </Badge>

            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {review.content}
            </p>

            <div className="flex items-center gap-1 pt-1 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>리뷰</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}