import { MapView } from "@/components/map/map-view"
import { PlaceListPanel } from "@/components/map/place-list-panel"

export default function MapPage() {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
      <PlaceListPanel />
      <MapView />
    </div>
  )
}
