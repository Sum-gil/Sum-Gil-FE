import { WalkingTracker } from "@/components/records/walking-tracker"
import { RecordList } from "@/components/records/record-list"

export default function RecordsPage() {
  return (
    <div className="container px-4 py-6 max-w-4xl mx-auto space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">산책 기록</h1>
        <p className="text-muted-foreground">산책 활동을 기록하고 관리하세요</p>
      </section>

      <WalkingTracker />
      
      <RecordList />
    </div>
  )
}
