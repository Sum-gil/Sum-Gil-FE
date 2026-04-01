import { PlaceHeader } from "@/components/place/place-header"
import { PlaceInfo } from "@/components/place/place-info"
import { PlaceActions } from "@/components/place/place-actions"
import { SafetyAnalysisCard } from "@/components/place/safety-analysis-card"
import { HealthScoreCard } from "@/components/place/health-score-card"
import { notFound } from "next/navigation"

const API_BASE = "http://localhost:8080/api/places"

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
      fetch(`${API_BASE}/${id}`, { cache: "no-store" }).then((res) =>
        res.ok ? res.json() : null
      ),
      fetch(`${API_BASE}/${id}/health-score`, { cache: "no-store" }).then((res) =>
        res.ok ? res.json() : null
      ),
      fetch(`${API_BASE}/${id}/safety`, { cache: "no-store" }).then((res) =>
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

  // 기본 정보(detail)가 없으면 404
  if (!detail) notFound()

  // 백엔드 Grade(VERY_GOOD, GOOD 등)를 컴포넌트 status(safe, normal, caution)로 변환
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
      {/* 1. 상단 헤더: 이름, 주소 */}
      <PlaceHeader
        name={detail.name}
        address={detail.address}
        images={placeImages}
      />

      {/* 2. 점수 섹션: 건강과 안전 카드 나란히 배치 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 건강 점수 카드 매핑 */}
        {health && (
          <HealthScoreCard
            score={health.healthScore}
            message={health.message}
            factors={{
              airQuality: health.airQualityScore,
              greenRatio: health.greenRatio,
              visitorCount: health.visitorCount, // 실제 인구수 전달
            }}
          />
        )}

        {/* 안전 점수 카드 매핑 */}
        {safety && (
          <SafetyAnalysisCard
            status={getSafetyStatus(safety.grade)}
            score={safety.safetyScore}
            message={safety.message}
            factors={{
              cctvCount: safety.nearbyCctvCount,
              nightSafe: safety.nightSafe, // Boolean 값 전달
              visitorCount: safety.visitorCount,
            }}
          />
        )}
      </div>

      {/* 3. 장소 상세 정보 (설명글) */}
      <PlaceInfo description={detail.description} openHours="상시 개방" />

      {/* 4. 하단 액션 버튼 (즐겨찾기 등) */}
      <PlaceActions placeId={id} />

      {/* 디버그용 (필요 시 주석 해제하여 데이터 확인) */}
      {/* <pre className="text-[10px] opacity-20">{JSON.stringify({ health, safety }, null, 2)}</pre> */}
    </div>
  )
}