"use client"

import { CityPulseStrip } from "@/components/city-pulse-strip"
import { DataTable } from "@/components/data-table"
import { mockData } from "@/lib/mock/seed"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { AlertTriangle, MapPin } from "lucide-react"
import type { Incident } from "@/lib/mock/seed"

const columns: ColumnDef<Incident>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-mono text-xs">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return <Badge variant="outline">{type.replace("_", " ")}</Badge>
    },
  },
  {
    accessorKey: "ward",
    header: "Ward",
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const severity = row.getValue("severity") as string
      return (
        <Badge
          variant={
            severity === "critical"
              ? "destructive"
              : severity === "high"
              ? "secondary"
              : "outline"
          }
        >
          {severity}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <Badge variant="outline">{status}</Badge>
    },
  },
  {
    accessorKey: "reportedAt",
    header: "Reported",
    cell: ({ row }) => formatDate(row.getValue("reportedAt")),
  },
]

export default function IncidentsPage() {
  const active = mockData.incidents.filter((i) => i.status === "open" || i.status === "in_progress")

  return (
    <div className="space-y-6">
      <CityPulseStrip />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Incidents</h1>
          <p className="text-muted-foreground">Emergency events and hazards</p>
        </div>
        <Button>Log Incident</Button>
      </div>

      {/* Active incidents */}
      {active.length > 0 && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Active Incidents ({active.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {active.map((incident) => (
                <div key={incident.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{incident.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {incident.ward} • Impact radius: {incident.impactRadius}m
                      </div>
                    </div>
                    <Badge
                      variant={
                        incident.severity === "critical"
                          ? "destructive"
                          : incident.severity === "high"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {incident.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {incident.coordinates.lat.toFixed(4)}, {incident.coordinates.lon.toFixed(4)}
                    </div>
                    <div>Reported: {formatDate(incident.reportedAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All incidents table */}
      <Card>
        <CardHeader>
          <CardTitle>All Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={mockData.incidents}
            searchPlaceholder="Search incidents..."
          />
        </CardContent>
      </Card>
    </div>
  )
}

