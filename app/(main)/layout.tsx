import { Header } from "@/components/shared/header"
import { FcmForegroundListener } from "@/components/records/fcm-foreground-listener"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <FcmForegroundListener />

      <main>{children}</main>
    </div>
  )
}