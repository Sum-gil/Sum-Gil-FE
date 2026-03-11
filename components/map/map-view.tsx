"use client"

import { useState } from "react"
import { TreePine, Navigation, Coffee, Building2, Store, Plus, Minus, Locate } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const markers = [
  { id: 1, type: "park", x: 35, y: 25, label: "올림픽공원" },
  { id: 2, type: "trail", x: 55, y: 40, label: "한강 반포공원" },
  { id: 3, type: "trail", x: 70, y: 30, label: "남산 둘레길" },
  { id: 4, type: "park", x: 45, y: 55, label: "서울숲" },
  { id: 5, type: "cafe", x: 60, y: 60, label: "카페" },
  { id: 6, type: "restroom", x: 40, y: 45, label: "화장실" },
  { id: 7, type: "store", x: 25, y: 50, label: "편의점" },
]

const markerIcons: Record<string, typeof TreePine> = {
  park: TreePine,
  trail: Navigation,
  cafe: Coffee,
  restroom: Building2,
  store: Store,
}

const markerColors: Record<string, string> = {
  park: "bg-primary text-primary-foreground",
  trail: "bg-accent text-accent-foreground",
  cafe: "bg-amber-500 text-white",
  restroom: "bg-blue-500 text-white",
  store: "bg-orange-500 text-white",
}

export function MapView() {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null)
  const [zoom, setZoom] = useState(1)

  return (
    <div className="flex-1 relative bg-secondary/30 overflow-hidden">
      {/* Map placeholder with grid pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: `${40 * zoom}px ${40 * zoom}px`,
        }}
      >
        {/* Map background elements */}
        <div className="absolute inset-0">
          {/* River */}
          <div 
            className="absolute bg-accent/20 rounded-full"
            style={{
              left: "20%",
              top: "30%",
              width: "60%",
              height: "8%",
              transform: "rotate(-15deg)",
            }}
          />
          {/* Green areas */}
          <div 
            className="absolute bg-primary/10 rounded-3xl"
            style={{ left: "30%", top: "20%", width: "15%", height: "20%" }}
          />
          <div 
            className="absolute bg-primary/10 rounded-3xl"
            style={{ left: "50%", top: "45%", width: "20%", height: "25%" }}
          />
          <div 
            className="absolute bg-primary/10 rounded-3xl"
            style={{ left: "65%", top: "25%", width: "12%", height: "15%" }}
          />
        </div>

        {/* Markers */}
        {markers.map((marker) => {
          const Icon = markerIcons[marker.type]
          return (
            <button
              key={marker.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                selectedMarker === marker.id ? "scale-125 z-10" : "hover:scale-110"
              }`}
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              onClick={() => setSelectedMarker(selectedMarker === marker.id ? null : marker.id)}
            >
              <div className={`w-10 h-10 rounded-full ${markerColors[marker.type]} shadow-lg flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              {selectedMarker === marker.id && (
                <Card className="absolute left-1/2 -translate-x-1/2 mt-2 p-2 whitespace-nowrap text-sm font-medium shadow-lg">
                  {marker.label}
                </Card>
              )}
            </button>
          )
        })}
      </div>

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="shadow-lg bg-card"
          onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="shadow-lg bg-card"
          onClick={() => setZoom(Math.max(zoom - 0.2, 0.6))}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="icon" className="shadow-lg bg-card">
          <Locate className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card rounded-xl p-3 shadow-lg">
        <p className="text-xs font-medium text-foreground mb-2">범례</p>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span className="text-muted-foreground">공원</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-accent" />
            <span className="text-muted-foreground">산책로</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-amber-500" />
            <span className="text-muted-foreground">카페</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span className="text-muted-foreground">화장실</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-orange-500" />
            <span className="text-muted-foreground">편의점</span>
          </div>
        </div>
      </div>
    </div>
  )
}
