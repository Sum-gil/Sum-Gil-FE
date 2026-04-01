import { Info, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlaceInfoProps {
  description: string
  openHours: string
}

export function PlaceInfo({ description, openHours }: PlaceInfoProps) {
  return (
    <Card className="border-0 shadow-sm bg-slate-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Info className="w-4 h-4 text-primary" />
          </div>
          <CardTitle className="text-base font-bold">장소 안내</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-[15px] text-slate-700 leading-7 whitespace-pre-line">
          {description || "상세한 정보가 아직 등록되지 않은 장소입니다."}
        </p>
        
        <div className="flex items-center gap-3 pt-4 border-t border-slate-200 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>이용 시간:</span>
          </div>
          <span className="font-semibold text-foreground">{openHours}</span>
        </div>
      </CardContent>
    </Card>
  )
}