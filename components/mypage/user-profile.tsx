"use client"

import { useState } from "react"
import { Edit2, Check, X, MapPin } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import axios from "axios"

interface UserProfileProps {
  initialData: {
    nickname: string
    interestRegion: string
    email: string
    healthInfo: string
  }
}

export function UserProfile({ initialData }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(initialData)
  const [tempProfile, setTempProfile] = useState(initialData)

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const response = await axios.patch("http://localhost:8080/api/users/me", 
        { 
          nickname: tempProfile.nickname, 
          interestRegion: tempProfile.interestRegion 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setProfile(response.data)
      setIsEditing(false)
    } catch (error) {
      alert("프로필 수정에 실패했습니다.")
    }
  }

  return (
    <Card className="border-0 shadow-sm overflow-hidden bg-white">
      <div className="h-24 bg-gradient-to-r from-emerald-400 to-cyan-400" />
      <CardContent className="relative pt-0 pb-6 px-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-10">
          <Avatar className="w-20 h-20 border-4 border-white shadow-md">
            <AvatarFallback className="bg-emerald-50 text-emerald-600 text-2xl font-bold">
              {profile.nickname[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center sm:text-left pb-1">
            {isEditing ? (
              <div className="space-y-2 mt-2">
                <Input 
                  value={tempProfile.nickname} 
                  onChange={(e) => setTempProfile({...tempProfile, nickname: e.target.value})}
                  className="h-8 w-40 inline-block"
                  placeholder="닉네임"
                />
                <div className="flex items-center gap-1 justify-center sm:justify-start">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <Input 
                    value={tempProfile.interestRegion} 
                    onChange={(e) => setTempProfile({...tempProfile, interestRegion: e.target.value})}
                    className="h-8 w-48 inline-block"
                    placeholder="관심 지역 (예: 서울시 강남구)"
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold text-slate-800">{profile.nickname}</h1>
                <div className="flex items-center gap-1 justify-center sm:justify-start text-slate-500">
                  <MapPin className="w-3 h-3" />
                  <p className="text-sm font-medium">{profile.interestRegion || "관심 지역 미설정"}</p>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="text-slate-400">
                  <X className="w-4 h-4" />
                </Button>
                <Button size="sm" onClick={handleUpdate} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  <Check className="w-4 h-4 mr-1" /> 저장
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-1 border-slate-200 text-slate-600">
                <Edit2 className="w-3.5 h-3.5" /> 편집
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}