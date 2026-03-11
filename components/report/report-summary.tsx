import { MapPin, Clock, Flame, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const summaryData = [
  {
    icon: MapPin,
    label: "총 거리",
    value: "15.6km",
    subtext: "이번 주",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Clock,
    label: "총 시간",
    value: "3시간 10분",
    subtext: "이번 주",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Flame,
    label: "소모 칼로리",
    value: "892 kcal",
    subtext: "이번 주",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: Heart,
    label: "평균 건강점수",
    value: "90점",
    subtext: "이번 주",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function ReportSummary() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {summaryData.map((item) => (
        <Card key={item.label} className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${item.bgColor}`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.subtext}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
