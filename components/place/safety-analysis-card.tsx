import { Shield, Camera, Lightbulb, Users, Circle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SafetyAnalysisCardProps {
  status: "safe" | "normal" | "caution"
  factors: {
    cctv: boolean
    streetLight: boolean
    pedestrianLevel: string
  }
}

const statusConfig = {
  safe: {
    label: "안전",
    color: "text-primary",
    bgColor: "bg-primary/10",
    dotColor: "text-primary",
  },
  normal: {
    label: "보통",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    dotColor: "text-amber-500",
  },
  caution: {
    label: "야간 비추천",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    dotColor: "text-destructive",
  },
}

export function SafetyAnalysisCard({ status, factors }: SafetyAnalysisCardProps) {
  const config = statusConfig[status]

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <CardTitle className="text-base">안전도 분석</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center">
          <div className={`px-6 py-4 rounded-2xl ${config.bgColor} flex items-center gap-3`}>
            <Circle className={`w-4 h-4 fill-current ${config.dotColor}`} />
            <span className={`text-xl font-bold ${config.color}`}>{config.label}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Camera className="w-4 h-4" />
              <span className="text-sm">CCTV 설치</span>
            </div>
            <span className={`text-sm font-medium ${factors.cctv ? "text-primary" : "text-destructive"}`}>
              {factors.cctv ? "있음" : "없음"}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lightbulb className="w-4 h-4" />
              <span className="text-sm">가로등 설치</span>
            </div>
            <span className={`text-sm font-medium ${factors.streetLight ? "text-primary" : "text-destructive"}`}>
              {factors.streetLight ? "있음" : "없음"}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">유동 인구</span>
            </div>
            <span className="text-sm font-medium text-foreground">{factors.pedestrianLevel}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
