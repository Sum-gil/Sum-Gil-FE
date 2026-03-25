"use client"

import { Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"

export function UserSettings() {
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("로그아웃 하시겠습니까?")) return;

    const token = localStorage.getItem("accessToken");
    
    try {
      await axios.post("http://localhost:8080/api/auth/logout", {}, {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });
    } catch (error) {

    } finally {
      localStorage.clear();
      sessionStorage.clear();
      
      alert("로그아웃 되었습니다.");
      window.location.href = "/login";
    }
  };

  return (
    <Card className="border-0 shadow-sm pb-4 bg-white">
      <CardHeader className="pb-2 px-6">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-500" />
          <CardTitle className="text-base font-bold text-slate-800">설정</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-1 px-6">
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
           <div className="flex items-center gap-3">
             <Bell className="w-5 h-5 text-slate-400" />
             <span className="text-sm text-slate-600 font-medium">알림 설정</span>
           </div>
           <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>

        <button 
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-rose-50 transition-colors mt-4 group border border-transparent hover:border-rose-100 outline-none"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-rose-100 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-rose-500 group-hover:text-rose-600">로그아웃</span>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-200 group-hover:text-rose-400" />
        </button>
      </CardContent>
    </Card>
  )
}