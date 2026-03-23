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