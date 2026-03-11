import { Settings, Edit2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function UserProfile() {
  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-primary to-accent" />
      <CardContent className="relative pt-0 pb-6 px-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-10">
          <Avatar className="w-20 h-20 border-4 border-card">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              김
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left pb-2">
            <h1 className="text-xl font-bold text-foreground">김산책</h1>
            <p className="text-sm text-muted-foreground">건강한 산책을 즐기는 중</p>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Edit2 className="w-4 h-4" />
            프로필 편집
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
