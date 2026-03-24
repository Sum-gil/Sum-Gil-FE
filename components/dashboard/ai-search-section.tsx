"use client"

import { Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const suggestions = [
  "조용하고 공기 좋은 공원",
  "반려견과 함께할 수 있는 곳",
  "야경이 예쁜 산책로",
  "운동하기 좋은 코스",
]

interface AISearchSectionProps {
  query: string
  onChangeQuery: (value: string) => void
  onSearch: () => void
  onReset: () => void
  loading?: boolean
  isAiMode?: boolean
}

export function AISearchSection({
  query,
  onChangeQuery,
  onSearch,
  onReset,
  loading = false,
  isAiMode = false,
}: AISearchSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">AI 산책 장소 추천</h2>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => onChangeQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch()
              }
            }}
            placeholder="조용하고 공기 좋은 공원 추천해줘"
            className="pl-12 h-14 text-base rounded-xl border-border bg-card shadow-sm"
          />
        </div>

        <Button
          onClick={onSearch}
          disabled={loading || !query.trim()}
          className="h-14 rounded-xl px-6"
        >
          {loading ? "검색 중..." : "검색"}
        </Button>

        {isAiMode && (
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            disabled={loading}
            className="h-14 rounded-xl px-4"
          >
            초기화
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            size="sm"
            className="rounded-full text-xs bg-secondary/50 border-0 hover:bg-secondary"
            onClick={() => onChangeQuery(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </section>
  )
}