import { PlaceHeader } from "@/components/place/place-header"
import { PlaceInfo } from "@/components/place/place-info"
import { PlaceActions } from "@/components/place/place-actions"
import { SafetyAnalysisCard } from "@/components/place/safety-analysis-card"
import { HealthScoreCard } from "@/components/place/health-score-card"
import { notFound } from "next/navigation"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

const fallbackImages = [
  "/images/places/place1.jpg",
  "/images/places/place2.jpg",
  "/images/places/place3.jpg",
  "/images/places/place4.jpg",
  "/images/places/place5.jpg",
]

// 장소 id 기준으로 상세페이지용 이미지 3장 고정 배정
function getPlaceImages(id: string) {
  const numericId = Number(id)

  if (Number.isNaN(numericId)) {
    return fallbackImages.slice(0, 3)
  }

  const startIndex = numericId % fallbackImages.length

  return [
    fallbackImages[startIndex],
    fallbackImages[(startIndex + 1) % fallbackImages.length],
    fallbackImages[(startIndex + 2) % fallbackImages.length],
  ]
}

// 병렬로 세 가지 API 데이터를 가져오는 함수
async function getPlaceData(id: string) {
  try {
    const [detail, health, safety] = await Promise.all([
      fetch(`${API_BASE}/api/places/${id}`, { cache: "no-store" }).then((res) =>
        res.ok ? res.json() : null
      ),
      fetch(`${API_BASE}/api/places/${id}/health-score`, { cache: "no-store" }).then((res) =>
        res.ok ? res.json() : null
      ),
      fetch(`${API_BASE}/api/places/${id}/safety`, { cache: "no-store" }).then((res) =>
        res.ok ? res.json() : null
      ),
    ])
    return { detail, health, safety }
  } catch (error) {
    console.error("Data fetching error:", error)
    return { detail: null, health: null, safety: null }
  }
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { detail, health, safety } = await getPlaceData(id)

  if (!detail) notFound()

  const getSafetyStatus = (grade: string) => {
    switch (grade) {
      case "VERY_GOOD":
      case "GOOD":
        return "safe"
      case "NORMAL":
        return "normal"
      default:
        return "caution"
    }
  }

  const placeImages = getPlaceImages(id)

  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto space-y-6">
      <PlaceHeader
        name={detail.name}
        address={detail.address}
        images={placeImages}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {health && (
          <HealthScoreCard
            score={health.healthScore}
            message={health.message}
            factors={{
              airQuality: health.airQualityScore,
              greenRatio: health.greenRatio,
              visitorCount: health.visitorCount,
            }}
          />
        )}

        {safety && (
          <SafetyAnalysisCard
            status={getSafetyStatus(safety.grade)}
            score={safety.safetyScore}
            message={safety.message}
            factors={{
              cctvCount: safety.nearbyCctvCount,
              nightSafe: safety.nightSafe,
              visitorCount: safety.visitorCount,
            }}
          />
        )}
      </div>

      <PlaceInfo description={detail.description} openHours="상시 개방" />
      <PlaceActions placeId={id} />
    </div>
  )
}