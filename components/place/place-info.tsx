import { Clock, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlaceInfoProps {
  description: string
  openHours: string
}

export function PlaceInfo({ description, openHours }: PlaceInfoProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          <CardTitle className="text-base">장소 정보</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">운영시간:</span>
          <span className="font-medium text-foreground">{openHours}</span>
        </div>
      </CardContent>
    </Card>
  )
}
