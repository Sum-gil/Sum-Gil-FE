import Link from "next/link"
import { Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const settingsItems = [
  { icon: Bell, label: "알림 설정", href: "#" },
  { icon: Shield, label: "개인정보 보호", href: "#" },
  { icon: HelpCircle, label: "도움말", href: "#" },
]

export function UserSettings() {
  return (
    <Card className="border-0 shadow-sm pb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          <CardTitle className="text-base">설정</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {settingsItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>
        ))}
        <Link href="/login">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer mt-4">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-destructive" />
              <span className="text-sm text-destructive">로그아웃</span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
