"use client"

import { useEffect, useMemo, useState } from "react"
import { Star, MessageCircle, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  getCommunityReviews,
  updateReview,
  deleteReview,
  type ReviewResponse,
} from "@/lib/api"

type ReviewListProps = {
  searchKeyword: string
  filter: string
  refreshKey: number
  onReviewChanged: () => void
}

function StarRating({
  rating,
  onChange,
  editable = false,
}: {
  rating: number
  onChange?: (value: number) => void
  editable?: boolean
}) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= rating

        if (editable && onChange) {
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-4 h-4 ${
                  active
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30"
                }`}
              />
            </button>
          )
        }

        return (
          <Star
            key={star}
            className={`w-4 h-4 ${
              active
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground/30"
            }`}
          />
        )
      })}
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
  refreshKey,
  onReviewChanged,
}: ReviewListProps) {
  const [reviews, setReviews] = useState<ReviewResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [editingReview, setEditingReview] = useState<ReviewResponse | null>(null)
  const [editRating, setEditRating] = useState(5)
  const [editContent, setEditContent] = useState("")
  const [submitting, setSubmitting] = useState(false)

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
  }, [refreshKey])

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

  const openEditDialog = (review: ReviewResponse) => {
    setEditingReview(review)
    setEditRating(review.rating)
    setEditContent(review.content)
  }

  const handleUpdateReview = async () => {
    if (!editingReview) return

    if (!editContent.trim()) {
      alert("리뷰 내용을 입력해주세요.")
      return
    }

    try {
      setSubmitting(true)

      await updateReview(editingReview.id, {
        walkSpotId: editingReview.walkSpotId,
        rating: editRating,
        content: editContent,
      })

      setEditingReview(null)
      setEditRating(5)
      setEditContent("")
      onReviewChanged()
      alert("리뷰가 수정되었습니다.")
    } catch (error) {
      console.error("리뷰 수정 실패:", error)
      alert("리뷰 수정에 실패했습니다.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteReview = async (reviewId: number) => {
    const ok = window.confirm("정말 이 리뷰를 삭제할까요?")
    if (!ok) return

    try {
      await deleteReview(reviewId)
      onReviewChanged()
      alert("리뷰가 삭제되었습니다.")
    } catch (error) {
      console.error("리뷰 삭제 실패:", error)
      alert("리뷰 삭제에 실패했습니다.")
    }
  }

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
    <>
      <div className="space-y-4 pb-8">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="overflow-hidden border-0 shadow-sm">
            <CardContent className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-sm text-primary">
                      {review.nickname?.[0] ?? "유"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
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

              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {review.content}
              </p>

              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span>리뷰</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => openEditDialog(review)}
                  >
                    <Pencil className="h-4 w-4" />
                    수정
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1 text-red-500 hover:text-red-500"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    삭제
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!editingReview}
        onOpenChange={(open) => {
          if (!open) {
            setEditingReview(null)
            setEditRating(5)
            setEditContent("")
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>리뷰 수정</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div className="rounded-xl bg-secondary/50 p-3 text-sm">
              <p className="font-medium text-foreground">
                장소: {editingReview?.walkSpotName}
              </p>
              <p className="mt-1 text-muted-foreground">
                같은 장소에 대한 리뷰 내용만 수정합니다.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">별점</p>
              <StarRating
                rating={editRating}
                onChange={setEditRating}
                editable
              />
            </div>

            <Textarea
              placeholder="리뷰 내용을 수정해주세요"
              rows={4}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />

            <Button
              className="w-full"
              onClick={handleUpdateReview}
              disabled={submitting}
            >
              {submitting ? "수정 중..." : "수정 완료"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}