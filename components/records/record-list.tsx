import Link from "next/link"
import { Calendar, Clock, MapPin, Heart, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const records = [
  {
    id: 1,
    date: "2024.03.15",
    location: "올림픽공원",
    distance: "3.2km",
    duration: "45분",
    healthScore: 92,
  },
  {
    id: 2,
    date: "2024.03.14",
    location: "한강 반포공원",
    distance: "5.1km",
    duration: "1시간 12분",
    healthScore: 88,
  },
  {
    id: 3,
    date: "2024.03.12",
    location: "남산 둘레길",
    distance: "4.5km",
    duration: "58분",
    healthScore: 95,
  },
  {
    id: 4,
    date: "2024.03.10",
    location: "서울숲",
    distance: "2.8km",
    duration: "35분",
    healthScore: 85,
  },
]

export function RecordList() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">최근 기록</h2>
      <div className="space-y-3">
        {records.map((record) => (
          <Link key={record.id} href={`/report`}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{record.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">{record.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{record.distance}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {record.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
                      <Heart className="w-3 h-3" />
                      {record.healthScore}점
                    </Badge>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
