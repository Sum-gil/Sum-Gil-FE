import { TreePine, MapPin, Heart } from "lucide-react"

export function LoginHero() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 to-accent/80 p-12 flex-col justify-between text-primary-foreground">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
          <TreePine className="w-6 h-6" />
        </div>
        <span className="text-xl font-semibold">숨길</span>
      </div>
      
      <div className="space-y-8">
        <h1 className="text-4xl font-bold leading-tight text-balance">
          당신의 건강한 산책 생활,
          <br />
          AI가 함께합니다
        </h1>
        <p className="text-lg text-primary-foreground/80 max-w-md leading-relaxed">
          환경 데이터를 기반으로 최적의 산책 장소를 추천받고, 
          산책 활동을 기록하며 건강한 일상을 만들어가세요.
        </p>
        
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-xl p-4">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">1,200+</p>
              <p className="text-sm text-primary-foreground/70">등록된 산책 장소</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-xl p-4">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">50,000+</p>
              <p className="text-sm text-primary-foreground/70">행복한 산책러</p>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-primary-foreground/60">
        숨길(Sum-Gil) - AI 스마트 산책 플랫폼
      </p>
    </div>
  )
}
