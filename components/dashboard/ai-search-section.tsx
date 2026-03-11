"use client"

import { useState } from "react"
import { Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const suggestions = [
  "조용하고 공기 좋은 공원",
  "반려견과 함께할 수 있는 곳",
  "야경이 예쁜 산책로",
  "운동하기 좋은 코스",
]

export function AISearchSection() {
  const [query, setQuery] = useState("")

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">AI 산책 장소 추천</h2>
      </div>
      
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="조용하고 공기 좋은 공원 추천해줘"
          className="pl-12 h-14 text-base rounded-xl border-border bg-card shadow-sm"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            size="sm"
            className="rounded-full text-xs bg-secondary/50 border-0 hover:bg-secondary"
            onClick={() => setQuery(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </section>
  )
}
