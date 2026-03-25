"use client"

import { useState, useEffect } from "react"
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

  useEffect(() => {
    setProfile(initialData)
    setTempProfile(initialData)
  }, [initialData])

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
          {/* 아바타 */}
          <Avatar className="w-20 h-20 border-4 border-white shadow-md bg-white">
            <AvatarFallback className="bg-emerald-50 text-emerald-600 text-2xl font-bold">
              {profile.nickname ? profile.nickname[0] : "이"}
            </AvatarFallback>
          </Avatar>
          
          {/* 유저 정보 영역 */}
          <div className="flex-1 text-center sm:text-left">
            {isEditing ? (
              /* 💡 편집 모드: pt-12를 주어 그라데이션 영역 아래로 확실히 내렸습니다. */
              <div className="pt-12 sm:pt-10 space-y-3 pb-2">
                <Input 
                  value={tempProfile.nickname} 
                  onChange={(e) => setTempProfile({...tempProfile, nickname: e.target.value})}
                  className="h-9 w-full sm:w-56 bg-slate-50 border-slate-200 focus:ring-emerald-400"
                  placeholder="새 닉네임 입력"
                />
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
                  <Input 
                    value={tempProfile.interestRegion} 
                    onChange={(e) => setTempProfile({...tempProfile, interestRegion: e.target.value})}
                    className="h-9 w-full sm:w-64 pl-9 bg-slate-50 border-slate-200 focus:ring-emerald-400"
                    placeholder="관심 지역 (예: 덕양구)"
                  />
                </div>
              </div>
            ) : (
              /* 보기 모드: 이메일은 표시하지 않습니다. */
              <div className="pb-1">
                <h1 className="text-xl font-bold text-slate-800 leading-tight">
                  {profile.nickname}
                </h1>
                <div className="flex items-center gap-1 justify-center sm:justify-start text-slate-500 mt-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <p className="text-sm font-medium">
                    {profile.interestRegion || "관심 지역 미설정"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-2 pb-1">
            {isEditing ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="text-slate-400 hover:bg-slate-100">
                  <X className="w-4 h-4 mr-1" /> 취소
                </Button>
                <Button size="sm" onClick={handleUpdate} className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm px-4">
                  <Check className="w-4 h-4 mr-1" /> 저장
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-1.5 border-slate-200 text-slate-600 hover:bg-slate-50 px-4 shadow-sm">
                <Edit2 className="w-3.5 h-3.5 text-slate-400" /> 편집
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}