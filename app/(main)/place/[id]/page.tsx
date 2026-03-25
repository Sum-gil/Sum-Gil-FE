import { PlaceHeader } from "@/components/place/place-header"
import { PlaceInfo } from "@/components/place/place-info"
import { PlaceActions } from "@/components/place/place-actions"
import { notFound } from "next/navigation"

// 서버사이드 데이터 페칭 함수
async function getPlaceDetail(id: string) {
  try {
    const res = await fetch(`http://localhost:8080/api/places/${id}`, {
      cache: 'no-store', // 실시간 데이터 반영
    });

    if (!res.ok) {
      console.error(`Fetch failed: ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Backend connection error:", error);
    return null;
  }
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const place = await getPlaceDetail(id);

  // 데이터가 없으면 404 페이지로 보냄
  if (!place) {
    notFound();
  }

  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto space-y-6">
      {/* 1. 상단 헤더 (이름, 주소, 이미지) */}
      <PlaceHeader
        name={place.name}
        address={place.address}
        // DB에 이미지가 없으므로 빈 배열 전달 (컴포넌트에서 기본값 처리)
        images={[]} 
      />
      
      {/* 2. 장소 정보 (설명) */}
      <PlaceInfo
        description={place.description}
        openHours="상시 개방"
      />
      
      {/* 3. 액션 버튼 (즐겨찾기 등) */}
      <PlaceActions placeId={id} />

    </div>
  )
}