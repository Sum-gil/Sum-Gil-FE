import { apiFetch } from "@/lib/api"

export type RecommendedPlace = {
  placeId: number
  name: string
  address: string
  latitude: number
  longitude: number
  distance: number
  healthScore: number
  safetyScore: number
  nightSafe: boolean
  reason: string
  recommendationScore: number
}

export type AiRecommendationResponse = {
  userInput: string
  summary: string
  parsedCondition: {
    preferSafe: boolean
    preferCleanAir: boolean
    preferLowCrowd: boolean
    preferGreen: boolean
    preferNightWalk: boolean
    needCafe: boolean
    needToilet: boolean
    regionKeyword: string | null
    requestedCount: number
    radiusMeters: number
  }
  recommendations: RecommendedPlace[]
}

export async function fetchAiRecommendations(
  userInput: string,
  latitude: number,
  longitude: number,
  radius: number
) {
  return apiFetch<AiRecommendationResponse>("/api/ai/recommendations", {
    method: "POST",
    body: JSON.stringify({
      userInput,
      latitude,
      longitude,
      radius,
    }),
  })
}