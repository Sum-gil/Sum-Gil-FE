"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart, ChevronRight, MapPin, Loader2, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from "axios"

interface FavoriteResponse {
  id: number;        
  walkSpotId: number;
  name: string;      
  address: string;    
}

export function FavoritePlaces() {
  const [favorites, setFavorites] = useState<FavoriteResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get<FavoriteResponse[]>("http://localhost:8080/api/favorites", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(response.data);
    } catch (error) {
      console.error("즐겨찾기 목록 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleDelete = async (e: React.MouseEvent, favoriteId: number) => {
    e.preventDefault(); 
    if (!confirm("즐겨찾기에서 삭제하시겠습니까?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8080/api/favorites/${favoriteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(favorites.filter(f => f.id !== favoriteId));
    } catch (error) {
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-3 px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
          <CardTitle className="text-base font-bold text-slate-800">즐겨찾기 장소</CardTitle>
          <span className="text-xs font-medium text-slate-400 ml-1">{favorites.length}</span>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-10 rounded-2xl border-2 border-dashed border-slate-50">
            <p className="text-sm text-slate-400">아직 즐겨찾기한 장소가 없어요.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {favorites.map((place) => (
              <div key={place.id} className="group relative">
                <Link href={`/place/${place.walkSpotId}`}>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <MapPin className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 text-sm">{place.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{place.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-300 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => handleDelete(e, place.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}