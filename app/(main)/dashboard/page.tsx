import { EnvironmentCards } from "@/components/dashboard/environment-cards"
import { AISearchSection } from "@/components/dashboard/ai-search-section"
import { RecommendedPlaces } from "@/components/dashboard/recommended-places"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">안녕하세요!</h1>
        <p className="text-muted-foreground">오늘도 건강한 산책을 시작해볼까요?</p>
      </section>

      <EnvironmentCards />
      
      <AISearchSection />
      
      <RecommendedPlaces />
      
      <QuickActions />
    </div>
  )
}
