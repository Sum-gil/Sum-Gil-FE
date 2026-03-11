import { UserProfile } from "@/components/mypage/user-profile"
import { UserStats } from "@/components/mypage/user-stats"
import { FavoritePlaces } from "@/components/mypage/favorite-places"
import { UserSettings } from "@/components/mypage/user-settings"

export default function MyPage() {
  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto space-y-6">
      <UserProfile />
      <UserStats />
      <FavoritePlaces />
      <UserSettings />
    </div>
  )
}
