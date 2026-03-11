import { Wind, Thermometer, Droplets, Sun } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const environmentData = [
  {
    icon: Wind,
    label: "미세먼지",
    value: "보통",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    icon: Thermometer,
    label: "기온",
    value: "21°C",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Droplets,
    label: "습도",
    value: "45%",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Sun,
    label: "산책 추천",
    value: "좋음",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function EnvironmentCards() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">현재 산책 환경</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {environmentData.map((item) => (
          <Card key={item.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bgColor}`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className={`text-lg font-semibold ${item.color}`}>{item.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
