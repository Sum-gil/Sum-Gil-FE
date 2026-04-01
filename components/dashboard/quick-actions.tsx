import Link from "next/link"
import { Play, Map, BarChart3, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const actions = [
  {
    icon: Play,
    label: "산책 시작",
    description: "새로운 산책을 기록해요",
    href: "/records",
    color: "bg-primary text-primary-foreground",
  },
  {
    icon: Map,
    label: "지도 탐색",
    description: "주변 산책 장소 찾기",
    href: "/map",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: BarChart3,
    label: "산책 리포트",
    description: "나의 산책 통계 확인",
    href: "/report",
    color: "bg-chart-3 text-primary-foreground",
  },
  {
    icon: Users,
    label: "커뮤니티",
    description: "다른 산책러들과 소통",
    href: "/community",
    color: "bg-chart-4 text-foreground",
  },
]

export function QuickActions() {
  return (
    <section className="space-y-4 pb-8">
      <h2 className="text-lg font-semibold text-foreground">빠른 실행</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action) => (
          <Link key={action.label} href={action.href}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
