import { MapPin, Heart, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UserStats() {
  const stats = [
    {
      icon: MapPin,
      label: "총 산책 거리",
      value: "68.4 km",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Heart,
      label: "평균 건강점수",
      value: "89점",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Calendar,
      label: "총 산책 횟수",
      value: "23회",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">산책 통계</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
