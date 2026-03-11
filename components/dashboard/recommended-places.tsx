import Link from "next/link"
import { Heart, Shield, Star, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const places = [
  {
    id: 1,
    name: "올림픽공원 평화의광장",
    healthScore: 92,
    safetyScore: "안전",
    description: "넓은 잔디밭과 다양한 조형물이 있는 도심 속 휴식 공간",
    tags: ["공원", "야외"],
    image: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "한강 반포공원",
    healthScore: 88,
    safetyScore: "안전",
    description: "서울의 대표 한강 공원, 자전거 도로와 산책로 완비",
    tags: ["한강", "야경"],
    image: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "남산 둘레길",
    healthScore: 95,
    safetyScore: "보통",
    description: "서울 도심을 한눈에 볼 수 있는 자연 친화적 산책로",
    tags: ["산책로", "자연"],
    image: "https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=400&h=300&fit=crop",
  },
]

export function RecommendedPlaces() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">추천 산책 장소</h2>
        <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
          <Link href="/map">
            더보기 <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => (
          <Link key={place.id} href={`/place/${place.id}`}>
            <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {place.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-foreground">{place.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{place.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-primary">
                    <Heart className="w-4 h-4" />
                    <span className="font-medium">{place.healthScore}점</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">{place.safetyScore}</span>
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
