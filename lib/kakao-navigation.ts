type NavigationParams = {
  originName: string
  originLat: number
  originLng: number
  destName: string
  destLat: number
  destLng: number
  mode?: "car" | "traffic" | "walk" | "bicycle"
}

export function buildKakaoDirectionsUrl({
  originName,
  originLat,
  originLng,
  destName,
  destLat,
  destLng,
  mode = "walk",
}: NavigationParams) {
  const baseUrl = "https://map.kakao.com/link/to"

  // 카카오맵 길찾기 바로가기 형식
  // /link/to/목적지명,위도,경도/from/출발지명,위도,경도
  // 여기에 ?mode=walk 같은 식으로 붙여 사용
  const path = `${baseUrl}/${encodeURIComponent(destName)},${destLat},${destLng}/from/${encodeURIComponent(originName)},${originLat},${originLng}`

  return `${path}?mode=${mode}`
}