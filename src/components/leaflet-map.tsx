"use client"

import { useEffect, useState, useRef } from "react"

interface LeafletMapProps {
  center: [number, number]
  zoom: number
  wards: Array<{ ward: string; coordinates: [number, number]; risk: string; isSelected: boolean }>
  assets: Array<{ id: string; coordinates: { lat: number; lon: number }; name: string; type: string; ward: string; riskLevel: string }>
  onWardSelect?: (ward: string) => void
  onWardHover?: (ward: string | null) => void
}

export function LeafletMap({
  center,
  zoom,
  wards,
  assets,
  onWardSelect,
  onWardHover,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (mounted || !mapContainerRef.current) return

    // Load Leaflet from CDN
    const loadLeaflet = () => {
      return new Promise<void>((resolve) => {
        // Check if Leaflet is already loaded
        if ((window as any).L) {
          resolve()
          return
        }

        // Load CSS
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          link.crossOrigin = "anonymous"
          document.head.appendChild(link)
        }

        // Load Leaflet JS
        if (!document.querySelector('script[src*="leaflet"]')) {
          const script = document.createElement("script")
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          script.crossOrigin = "anonymous"
          script.onload = () => {
            // Fix for default marker icon
            const L = (window as any).L
            delete (L.Icon.Default.prototype as any)._getIconUrl
            L.Icon.Default.mergeOptions({
              iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
              iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
              shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            })
            resolve()
          }
          script.onerror = () => resolve() // Resolve anyway to prevent hanging
          document.head.appendChild(script)
        } else {
          resolve()
        }
      })
    }

    loadLeaflet().then(() => {
      const L = (window as any).L
      if (!L || !mapContainerRef.current) return

      // Initialize map
      const map = L.map(mapContainerRef.current).setView(center, zoom)

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Add ward circles
      const colorMap: Record<string, string> = {
        critical: "red",
        high: "orange",
        medium: "yellow",
        low: "green",
      }

      wards.forEach(({ ward, coordinates, risk, isSelected }) => {
        const color = colorMap[risk] || "gray"
        const circle = L.circle(coordinates, {
          radius: 800,
          color: isSelected ? "#3b82f6" : color,
          fillColor: color,
          fillOpacity: isSelected ? 0.4 : 0.2,
          weight: isSelected ? 3 : 2,
        }).addTo(map)

        circle.bindPopup(`
          <div style="padding: 8px;">
            <div style="font-weight: 600; margin-bottom: 4px;">${ward}</div>
            <div style="font-size: 12px; color: #666;">Risk: ${risk}</div>
          </div>
        `)

        circle.on("click", () => onWardSelect?.(ward))
        circle.on("mouseover", () => onWardHover?.(ward))
        circle.on("mouseout", () => onWardHover?.(null))
      })

      // Add asset markers
      assets.forEach((asset) => {
        const marker = L.marker([asset.coordinates.lat, asset.coordinates.lon]).addTo(map)
        marker.bindPopup(`
          <div style="padding: 8px;">
            <div style="font-weight: 600; font-size: 12px; margin-bottom: 4px;">${asset.name}</div>
            <div style="font-size: 12px; color: #666;">${asset.type} • ${asset.ward}</div>
            <div style="font-size: 12px; margin-top: 4px;">Risk: ${asset.riskLevel}</div>
          </div>
        `)
        marker.on("click", () => onWardSelect?.(asset.ward))
      })

      mapRef.current = map
      setMounted(true)
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [center, zoom, wards, assets, onWardSelect, onWardHover, mounted])

  return (
    <div
      ref={mapContainerRef}
      style={{ height: "100%", width: "100%", minHeight: "400px" }}
      className="rounded-lg"
    />
  )
}
