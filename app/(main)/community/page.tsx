import { CommunityHeader } from "@/components/community/community-header"
import { ReviewList } from "@/components/community/review-list"

export default function CommunityPage() {
  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto space-y-6">
      <CommunityHeader />
      <ReviewList />
    </div>
  )
}
