"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Heart, Shield, MessageSquare, Filter, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const places = [
  {
    id: 1,
    name: "올림픽공원 평화의광장",
    healthScore: 92,
    safetyScore: "안전",
    reviews: 234,
    category: "공원",
    distance: "1.2km",
  },
  {
    id: 2,
    name: "한강 반포공원",
    healthScore: 88,
    safetyScore: "안전",
    reviews: 512,
    category: "한강",
    distance: "2.5km",
  },
  {
    id: 3,
    name: "남산 둘레길",
    healthScore: 95,
    safetyScore: "보통",
    reviews: 189,
    category: "산책로",
    distance: "3.8km",
  },
  {
    id: 4,
    name: "서울숲",
    healthScore: 90,
    safetyScore: "안전",
    reviews: 421,
    category: "공원",
    distance: "4.1km",
  },
  {
    id: 5,
    name: "청계천",
    healthScore: 85,
    safetyScore: "안전",
    reviews: 678,
    category: "산책로",
    distance: "5.0km",
  },
  {
    id: 6,
    name: "북한산 둘레길",
    healthScore: 97,
    safetyScore: "보통",
    reviews: 156,
    category: "산책로",
    distance: "8.2km",
  },
]

export function PlaceListPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "전체" || place.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="w-full lg:w-96 bg-card border-r border-border flex flex-col h-64 lg:h-full">
      <div className="p-4 border-b border-border space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="장소 검색..."
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="w-4 h-4" />
                {selectedCategory}
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["전체", "공원", "산책로", "한강"].map((category) => (
                <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Badge variant="secondary" className="text-xs">
            {filteredPlaces.length}개 장소
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {filteredPlaces.map((place) => (
            <Link key={place.id} href={`/place/${place.id}`}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs shrink-0">
                          {place.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{place.distance}</span>
                      </div>
                      <h3 className="font-medium text-sm text-foreground truncate">{place.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1 text-primary">
                      <Heart className="w-3 h-3" />
                      <span>{place.healthScore}점</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>{place.safetyScore}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{place.reviews}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
