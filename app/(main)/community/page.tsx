"use client"

import { useState } from "react"
import { CommunityHeader } from "@/components/community/community-header"
import { ReviewList } from "@/components/community/review-list"

export default function CommunityPage() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [filter, setFilter] = useState("최신순")
  const [refreshKey, setRefreshKey] = useState(0)

  const handleReviewChanged = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto space-y-6">
      <CommunityHeader
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        filter={filter}
        onFilterChange={setFilter}
      />

      <ReviewList
        searchKeyword={searchKeyword}
        filter={filter}
        refreshKey={refreshKey}
        onReviewChanged={handleReviewChanged}
      />
    </div>
  )
}