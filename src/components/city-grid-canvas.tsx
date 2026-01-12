"use client"

import { useState } from "react"
import { mockData } from "@/lib/mock/seed"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Layers, MapPin, Ruler } from "lucide-react"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues
const LeafletMap = dynamic(() => import("./leaflet-map").then((mod) => mod.LeafletMap), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-muted-foreground">
      Loading map...
    </div>
  ),
})

interface CityGridCanvasProps {
  selectedWard?: string
  onWardSelect?: (ward: string) => void
  selectedLayers?: string[]
  onLayerToggle?: (layer: string) => void
}

export function CityGridCanvas({
  selectedWard,
  onWardSelect,
  selectedLayers = ["roads", "drains", "streetlights", "trees", "waste", "buildings"],
  onLayerToggle,
}: CityGridCanvasProps) {
  const { wards, assets } = mockData
  const [hoveredWard, setHoveredWard] = useState<string | null>(null)

  // Colombo center coordinates
  const colomboCenter: [number, number] = [6.9271, 79.8612]

  const getWardRisk = (ward: string) => {
    const wardAssets = assets.filter(a => a.ward === ward)
    const critical = wardAssets.filter(a => a.riskLevel === "critical").length
    const high = wardAssets.filter(a => a.riskLevel === "high").length
    if (critical > 5) return "critical"
    if (high > 10) return "high"
    if (high > 5) return "medium"
    return "low"
  }

  const getWardColor = (ward: string) => {
    const risk = getWardRisk(ward)
    if (risk === "critical") return "red"
    if (risk === "high") return "orange"
    if (risk === "medium") return "yellow"
    return "green"
  }

  // Get ward center coordinates (mock - in real app, these would come from geodata)
  const getWardCoordinates = (ward: string): [number, number] => {
    // Simple hash-based positioning around Colombo
    const index = wards.indexOf(ward)
    const latOffset = ((index % 5) - 2) * 0.05
    const lonOffset = (Math.floor(index / 5) - 2) * 0.05
    return [colomboCenter[0] + latOffset, colomboCenter[1] + lonOffset]
  }

  // Get sample assets for visualization
  const getSampleAssets = () => {
    if (!selectedLayers.length) return []
    return assets
      .filter(a => selectedLayers.includes(`${a.type}s`))
      .slice(0, 50) // Limit to 50 for performance
  }

  const layers = [
    { id: "roads", label: "Roads", color: "text-slate-600" },
    { id: "drains", label: "Drains", color: "text-blue-600" },
    { id: "streetlights", label: "Lights", color: "text-yellow-600" },
    { id: "trees", label: "Trees", color: "text-green-600" },
    { id: "waste", label: "Waste", color: "text-orange-600" },
    { id: "buildings", label: "Buildings", color: "text-purple-600" },
  ]

  return (
    <div className="border rounded-lg bg-muted/20 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">City Grid Canvas</h3>
        </div>
        <Badge variant="outline" className="text-xs">
          <Ruler className="h-3 w-3 mr-1" />
          Scale: 1:5000
        </Badge>
      </div>

      {/* Layer Toggles */}
      <div className="flex flex-wrap gap-2">
        {layers.map((layer) => (
          <Button
            key={layer.id}
            variant={selectedLayers.includes(layer.id) ? "default" : "outline"}
            size="sm"
            onClick={() => onLayerToggle?.(layer.id)}
            className="text-xs"
          >
            <Layers className="h-3 w-3 mr-1" />
            {layer.label}
          </Button>
        ))}
      </div>

      {/* Leaflet Map */}
      <div className="relative border rounded-lg bg-white dark:bg-slate-900 overflow-hidden" style={{ height: "600px", minHeight: "400px" }}>
        <LeafletMap
          center={colomboCenter}
          zoom={12}
          wards={wards.map((ward) => ({
            ward,
            coordinates: getWardCoordinates(ward),
            risk: getWardRisk(ward),
            isSelected: selectedWard === ward,
          }))}
          assets={getSampleAssets()}
          onWardSelect={onWardSelect}
          onWardHover={setHoveredWard}
        />
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-yellow-500" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-amber-500" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span>Critical</span>
          </div>
        </div>
        {selectedWard && (
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span className="font-medium">{selectedWard}</span>
            <Badge variant="outline" className="text-xs">
              {getWardRisk(selectedWard)}
            </Badge>
          </div>
        )}
      </div>

      {/* Coordinates */}
      {selectedWard && (() => {
        const coords = getWardCoordinates(selectedWard)
        return (
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
            <div>Lat: {coords[0].toFixed(4)}°</div>
            <div>Lon: {coords[1].toFixed(4)}°</div>
            <div>Ward: {selectedWard}</div>
          </div>
        )
      })()}
    </div>
  )
}

