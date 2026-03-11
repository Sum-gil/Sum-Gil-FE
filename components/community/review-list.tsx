import { Star, Heart, MessageCircle, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const reviews = [
  {
    id: 1,
    author: "산책러123",
    avatar: "S",
    location: "올림픽공원 평화의광장",
    rating: 5,
    content: "넓은 잔디밭에서 여유롭게 산책하기 좋아요. 주말에는 사람이 많지만 평일 저녁에는 한산해서 좋습니다. 반려견 산책하기에도 최고!",
    likes: 24,
    comments: 5,
    date: "2시간 전",
    image: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    author: "건강한하루",
    avatar: "건",
    location: "한강 반포공원",
    rating: 4,
    content: "야경이 정말 예쁜 곳이에요. 특히 반포대교 달빛무지개분수가 가동되는 시간에 가면 좋습니다. 자전거 타는 사람이 많아서 조금 주의해야 해요.",
    likes: 18,
    comments: 3,
    date: "5시간 전",
    image: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    author: "서울탐험가",
    avatar: "서",
    location: "남산 둘레길",
    rating: 5,
    content: "서울 도심에서 자연을 느낄 수 있는 최고의 장소입니다. 경사가 있어서 운동 효과도 좋고, 공기가 맑아서 건강에도 좋아요.",
    likes: 32,
    comments: 8,
    date: "1일 전",
    image: null,
  },
  {
    id: 4,
    author: "아침산책",
    avatar: "아",
    location: "서울숲",
    rating: 4,
    content: "사슴도 볼 수 있고, 넓은 공원에서 피크닉하기 좋습니다. 다만 주말에는 너무 붐벼서 평일 방문을 추천드립니다.",
    likes: 15,
    comments: 2,
    date: "2일 전",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

export function ReviewList() {
  return (
    <div className="space-y-4 pb-8">
      {reviews.map((review) => (
        <Card key={review.id} className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {review.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground text-sm">{review.author}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>

            <Badge variant="secondary" className="gap-1 text-xs">
              {review.location}
            </Badge>

            <p className="text-sm text-foreground leading-relaxed">{review.content}</p>

            {review.image && (
              <div className="rounded-xl overflow-hidden">
                <img
                  src={review.image}
                  alt={review.location}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <Heart className="w-4 h-4" />
                <span>{review.likes}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>{review.comments}</span>
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
