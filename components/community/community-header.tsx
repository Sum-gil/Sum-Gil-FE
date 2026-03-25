"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown, Plus, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { createReview } from "@/lib/api"

type CommunityHeaderProps = {
  searchKeyword: string
  onSearchChange: (value: string) => void
  filter: string
  onFilterChange: (value: string) => void
  onReviewCreated: () => void
}

export function CommunityHeader({
  searchKeyword,
  onSearchChange,
  filter,
  onFilterChange,
  onReviewCreated,
}: CommunityHeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [walkSpotId, setWalkSpotId] = useState("")
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!walkSpotId.trim()) {
      alert("walkSpotId를 입력해주세요.")
      return
    }

    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.")
      return
    }

    try {
      setSubmitting(true)

      await createReview({
        walkSpotId: Number(walkSpotId),
        rating,
        content,
      })

      setWalkSpotId("")
      setRating(5)
      setContent("")
      setIsDialogOpen(false)
      onReviewCreated()
    } catch (error) {
      console.error("리뷰 작성 실패:", error)
      alert("리뷰 작성에 실패했습니다.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">커뮤니티</h1>
          <p className="text-muted-foreground">산책 장소 리뷰를 공유하세요</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              리뷰 작성
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>리뷰 작성</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-4">
              <Input
                placeholder="walkSpotId를 입력하세요"
                value={walkSpotId}
                onChange={(e) => setWalkSpotId(e.target.value)}
              />

              <div className="space-y-2">
                <p className="text-sm font-medium">별점</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                placeholder="리뷰 내용을 작성해주세요"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "작성 중..." : "작성 완료"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="장소 또는 리뷰 검색..."
            className="pl-10"
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1 shrink-0">
              <Filter className="w-4 h-4" />
              {filter}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {["최신순", "별점순"].map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => onFilterChange(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}