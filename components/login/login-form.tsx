"use client"

import Link from "next/link"
import { TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const KAKAO_CLIENT_ID = "7b143741650a60e74f1769f26c8dc01f"
const KAKAO_REDIRECT_URI = "https://sumgil.shop/login/callback"

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  KAKAO_REDIRECT_URI
)}&response_type=code`

export function LoginForm() {
  return (
    <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <TreePine className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">숨길</span>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center pb-2">
            <CardTitle className="text-2xl font-bold">로그인</CardTitle>
            <CardDescription className="text-muted-foreground">
              소셜 계정으로 간편하게 시작하세요
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <Button
              variant="outline"
              className="w-full h-12 text-base font-medium bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#000000] border-0"
              asChild
            >
              <a href={KAKAO_AUTH_URL}>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-5.52 0-10 3.59-10 8 0 2.84 1.83 5.33 4.58 6.72-.15.56-.93 3.5-.96 3.73 0 0-.02.14.07.2.1.06.22.02.22.02.29-.04 3.4-2.23 3.92-2.61.7.1 1.43.14 2.17.14 5.52 0 10-3.59 10-8s-4.48-8-10-8" />
                </svg>
                카카오로 시작하기
              </a>
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 text-base font-medium border-border hover:bg-secondary"
              asChild
            >
              <Link href="/dashboard">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google로 시작하기
              </Link>
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">또는</span>
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full h-12 text-base text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link href="/dashboard">둘러보기</Link>
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          로그인 시{" "}
          <Link href="#" className="text-primary hover:underline">
            이용약관
          </Link>{" "}
          및{" "}
          <Link href="#" className="text-primary hover:underline">
            개인정보처리방침
          </Link>
          에 동의하게 됩니다.
        </p>
      </div>
    </div>
  )
}