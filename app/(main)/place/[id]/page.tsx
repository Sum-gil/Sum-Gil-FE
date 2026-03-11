import { PlaceHeader } from "@/components/place/place-header"
import { HealthScoreCard } from "@/components/place/health-score-card"
import { SafetyAnalysisCard } from "@/components/place/safety-analysis-card"
import { PlaceInfo } from "@/components/place/place-info"
import { PlaceActions } from "@/components/place/place-actions"

// 더미 데이터
const placeData = {
  id: 1,
  name: "올림픽공원 평화의광장",
  description: "서울 송파구에 위치한 올림픽공원은 1988년 서울 올림픽을 기념하여 조성된 대규모 도시공원입니다. 평화의광장은 공원 내에서 가장 넓은 잔디밭으로, 다양한 문화 행사와 시민들의 휴식 공간으로 사랑받고 있습니다.",
  address: "서울 송파구 올림픽로 424",
  openHours: "상시 개방",
  images: [
    "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
  ],
  healthScore: 92,
  healthFactors: {
    airQuality: 88,
    greenRatio: 95,
    crowdLevel: 75,
  },
  safetyStatus: "safe" as const,
  safetyFactors: {
    cctv: true,
    streetLight: true,
    pedestrianLevel: "높음",
  },
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto space-y-6">
      <PlaceHeader
        name={placeData.name}
        address={placeData.address}
        images={placeData.images}
      />
      
      <PlaceInfo
        description={placeData.description}
        openHours={placeData.openHours}
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <HealthScoreCard
          score={placeData.healthScore}
          factors={placeData.healthFactors}
        />
        <SafetyAnalysisCard
          status={placeData.safetyStatus}
          factors={placeData.safetyFactors}
        />
      </div>
      
      <PlaceActions placeId={id} />
    </div>
  )
}
