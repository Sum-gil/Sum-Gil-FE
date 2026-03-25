const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.")
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `요청 실패: ${res.status}`)
  }

  const contentType = res.headers.get("content-type")
  if (contentType?.includes("application/json")) {
    return res.json()
  }

  return res.text() as Promise<T>
}

export type TokenResponse = {
  accessToken: string
  refreshToken: string
  userId?: number
  nickname?: string
}

export async function kakaoSocialLogin(code: string): Promise<TokenResponse> {
  return apiFetch<TokenResponse>("/api/auth/social-login", {
    method: "POST",
    body: JSON.stringify({ code }),
  })
}

export async function logout(): Promise<string> {
  return apiFetch<string>("/api/auth/logout", {
    method: "POST",
  })
}

/* =========================
   walk record
========================= */

export type WalkStartRequest = {
  walkSpotId: number
}

export type WalkStartResponse = {
  walkRecordId: number
  startedAt: string
  status: string
}

export type WalkPointItem = {
  latitude: number
  longitude: number
  sequence: number
  recordedAt: string
}

export type WalkPointRequest = {
  points: WalkPointItem[]
}

export type WalkEndRequest = {
  totalDistance: number
  durationSeconds: number
  calories: number
  averageHealthScore: number
}

export type WalkRecordListResponse = {
  walkRecordId: number
  walkSpotId: number
  walkSpotName: string
  startedAt: string
  endedAt: string | null
  totalDistance: number | null
  durationSeconds: number | null
  calories: number | null
  averageHealthScore: number | null
  status: string
}

export type WalkPathPointResponse = {
  latitude: number
  longitude: number
  sequence: number
  recordedAt: string
}

export type WalkRecordDetailResponse = {
  walkRecordId: number
  walkSpotId: number
  startedAt: string
  endedAt: string | null
  totalDistance: number | null
  durationSeconds: number | null
  calories: number | null
  averageHealthScore: number | null
  status: string
  pathPoints: WalkPathPointResponse[]
}

export async function startWalk(
  data: WalkStartRequest
): Promise<WalkStartResponse> {
  return apiFetch<WalkStartResponse>("/api/walk-records/start", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function saveWalkPoints(
  walkRecordId: number,
  data: WalkPointRequest
): Promise<void> {
  return apiFetch<void>(`/api/walk-records/${walkRecordId}/points`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function endWalk(
  walkRecordId: number,
  data: WalkEndRequest
): Promise<void> {
  return apiFetch<void>(`/api/walk-records/${walkRecordId}/end`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function getMyWalkRecords(): Promise<WalkRecordListResponse[]> {
  return apiFetch<WalkRecordListResponse[]>("/api/walk-records")
}

export async function getWalkRecordDetail(
  walkRecordId: number
): Promise<WalkRecordDetailResponse> {
  return apiFetch<WalkRecordDetailResponse>(`/api/walk-records/${walkRecordId}`)
}

/* =========================
   report
========================= */

export type MonthlyReportResponse = {
  year: number
  month: number
  totalWalkCount: number
  totalDistanceKm: number
  totalDurationSeconds: number
  totalDurationText: string
  averageDurationSeconds: number
  averageDurationText: string
  averageHealthScore: number
  totalCalories: number
}

export type WalkReportResponse = {
  walkRecordId: number
  walkSpotId: number
  startedAt: string
  endedAt: string | null
  totalDurationSeconds: number
  totalDurationText: string
  totalDistanceKm: number
  averageSpeedKmh: number
  calories: number
  averageHealthScore: number
  reportMessage: string
}

export async function getMonthlyReport(
  year: number,
  month: number
): Promise<MonthlyReportResponse> {
  return apiFetch<MonthlyReportResponse>(
    `/api/reports/monthly?year=${year}&month=${month}`
  )
}

export async function getWalkReport(
  walkRecordId: number
): Promise<WalkReportResponse> {
  return apiFetch<WalkReportResponse>(`/api/reports/walks/${walkRecordId}`)
}

/* =========================
   review / community
========================= */

export type ReviewResponse = {
  id: number
  walkSpotId: number
  walkSpotName: string
  rating: number
  content: string
  createdAt: string
  nickname: string
}

export type ReviewRequest = {
  walkSpotId: number
  rating: number
  content: string
}

export type WalkSpotSummary = {
  id: number
  name: string
  latitude: number
  longitude: number
}

export async function getCommunityReviews(): Promise<ReviewResponse[]> {
  return apiFetch<ReviewResponse[]>("/api/community/reviews")
}

export async function getReviewsByWalkSpot(
  walkSpotId: number
): Promise<ReviewResponse[]> {
  return apiFetch<ReviewResponse[]>(`/api/reviews?walkSpotId=${walkSpotId}`)
}

export async function createReview(data: ReviewRequest): Promise<number> {
  return apiFetch<number>("/api/reviews", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateReview(
  reviewId: number,
  data: ReviewRequest
): Promise<void> {
  return apiFetch<void>(`/api/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function deleteReview(reviewId: number): Promise<void> {
  return apiFetch<void>(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  })
}

export async function getPopularPlaces(): Promise<WalkSpotSummary[]> {
  return apiFetch<WalkSpotSummary[]>("/api/community/popular-places")
}



