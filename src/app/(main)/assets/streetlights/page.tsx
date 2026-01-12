"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CityPulseStrip } from "@/components/city-pulse-strip"
import { CityGridCanvas } from "@/components/city-grid-canvas"
import { DataTable } from "@/components/data-table"
import { mockData } from "@/lib/mock/seed"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Asset } from "@/lib/mock/seed"

const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-mono text-xs">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Light ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  { accessorKey: "ward", header: "Ward" },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => {
      const condition = row.getValue("condition") as string
      return (
        <Badge
          variant={
            condition === "excellent" || condition === "good"
              ? "default"
              : condition === "fair"
              ? "secondary"
              : "destructive"
          }
        >
          {condition}
        </Badge>
      )
    },
  },
  { accessorKey: "conditionScore", header: "Score" },
  {
    accessorKey: "riskLevel",
    header: "Risk",
    cell: ({ row }) => {
      const risk = row.getValue("riskLevel") as string
      return (
        <Badge
          variant={
            risk === "critical" ? "destructive" : risk === "high" ? "secondary" : "outline"
          }
        >
          {risk}
        </Badge>
      )
    },
  },
  {
    accessorKey: "lastInspected",
    header: "Last Inspected",
    cell: ({ row }) => formatDate(row.getValue("lastInspected")),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button variant="ghost" size="icon">
        <Eye className="h-4 w-4" />
      </Button>
    ),
  },
]

export default function StreetlightsPage() {
  const router = useRouter()
  const [selectedWard, setSelectedWard] = useState<string | undefined>()
  const [selectedLayers, setSelectedLayers] = useState<string[]>(["streetlights"])

  let filteredAssets = mockData.assets.filter((a) => a.type === "streetlight")
  if (selectedWard) {
    filteredAssets = filteredAssets.filter((a) => a.ward === selectedWard)
  }

  const handleRowClick = (asset: Asset) => {
    router.push(`/assets/streetlight/${asset.id}`)
  }

  const handleLayerToggle = (layer: string) => {
    setSelectedLayers((prev) =>
      prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]
    )
  }

  return (
    <div className="space-y-6">
      <CityPulseStrip />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Streetlights</h1>
          <p className="text-muted-foreground">Street lighting infrastructure</p>
        </div>
        <Button>Add Streetlight</Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DataTable
            columns={columns}
            data={filteredAssets}
            searchPlaceholder="Search streetlights..."
            onRowClick={handleRowClick}
          />
        </div>
        <div>
          <CityGridCanvas
            selectedWard={selectedWard}
            onWardSelect={setSelectedWard}
            selectedLayers={selectedLayers}
            onLayerToggle={handleLayerToggle}
          />
        </div>
      </div>
    </div>
  )
}

