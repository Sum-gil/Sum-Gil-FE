import Link from "next/link"
import { Heart, ChevronRight, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const favorites = [
  {
    id: 1,
    name: "올림픽공원 평화의광장",
    healthScore: 92,
    visits: 8,
  },
  {
    id: 2,
    name: "한강 반포공원",
    healthScore: 88,
    visits: 5,
  },
  {
    id: 3,
    name: "서울숲",
    healthScore: 90,
    visits: 3,
  },
]

export function FavoritePlaces() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          <CardTitle className="text-base">즐겨찾기 장소</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {favorites.map((place) => (
          <Link key={place.id} href={`/place/${place.id}`}>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{place.name}</p>
                  <p className="text-xs text-muted-foreground">
                    건강점수 {place.healthScore}점 · {place.visits}회 방문
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
