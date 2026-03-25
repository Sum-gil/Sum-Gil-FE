"use client"

import { Search, Filter, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type CommunityHeaderProps = {
  searchKeyword: string
  onSearchChange: (value: string) => void
  filter: string
  onFilterChange: (value: string) => void
}

export function CommunityHeader({
  searchKeyword,
  onSearchChange,
  filter,
  onFilterChange,
}: CommunityHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">커뮤니티</h1>
          <p className="text-muted-foreground">산책 장소 리뷰를 공유하세요</p>
        </div>
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