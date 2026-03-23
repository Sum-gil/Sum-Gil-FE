"use client"

import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { kakaoSocialLogin } from "@/lib/api"

function KakaoCallbackInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get("code")

    if (!code) {
      alert("카카오 인가 코드가 없습니다.")
      router.replace("/login")
      return
    }

    const login = async () => {
      try {
        const data = await kakaoSocialLogin(code)

        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)

        if (data.userId !== undefined && data.userId !== null) {
          localStorage.setItem("userId", String(data.userId))
        }

        router.replace("/dashboard")
      } catch (error) {
        console.error("카카오 로그인 실패:", error)
        alert("카카오 로그인에 실패했습니다.")
        router.replace("/login")
      }
    }

    login()
  }, [router, searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-base text-muted-foreground">카카오 로그인 처리 중...</p>
    </div>
  )
}

export default function KakaoCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <p className="text-base text-muted-foreground">로그인 준비 중...</p>
        </div>
      }
    >
      <KakaoCallbackInner />
    </Suspense>
  )
}