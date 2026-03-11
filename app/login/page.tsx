"use client"

import { LoginForm } from "@/components/login/login-form"
import { LoginHero } from "@/components/login/login-hero"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <LoginHero />
      <LoginForm />
    </div>
  )
}
