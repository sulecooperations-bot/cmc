"use client"

import { CityPulseStrip } from "@/components/city-pulse-strip"
import { DataTable } from "@/components/data-table"
import { mockData } from "@/lib/mock/seed"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin } from "lucide-react"
import type { Crew } from "@/lib/mock/seed"

const columns: ColumnDef<Crew>[] = [
  {
    accessorKey: "name",
    header: "Crew Name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "teamLead",
    header: "Team Lead",
  },
  {
    accessorKey: "members",
    header: "Members",
    cell: ({ row }) => {
      const members = row.getValue("members") as string[]
      return <div className="text-sm">{members.length} members</div>
    },
  },
  {
    accessorKey: "availability",
    header: "Status",
    cell: ({ row }) => {
      const availability = row.getValue("availability") as string
      return (
        <Badge
          variant={
            availability === "available"
              ? "default"
              : availability === "on_duty"
              ? "secondary"
              : "outline"
          }
        >
          {availability.replace("_", " ")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "shift",
    header: "Shift",
    cell: ({ row }) => {
      const shift = row.getValue("shift") as string
      return <Badge variant="outline">{shift}</Badge>
    },
  },
  {
    accessorKey: "currentLocation",
    header: "Location",
    cell: ({ row }) => {
      const location = row.getValue("currentLocation") as string | null
      return location ? (
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="h-3 w-3" />
          {location}
        </div>
      ) : (
        <span className="text-muted-foreground">-</span>
      )
    },
  },
]

export default function CrewsPage() {
  const available = mockData.crews.filter((c) => c.availability === "available")
  const onDuty = mockData.crews.filter((c) => c.availability === "on_duty")

  return (
    <div className="space-y-6">
      <CityPulseStrip />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Crews</h1>
          <p className="text-muted-foreground">Field teams and equipment</p>
        </div>
        <Button>Add Crew</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Available ({available.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {available.slice(0, 5).map((crew) => (
                <div key={crew.id} className="p-3 border rounded-lg">
                  <div className="font-medium">{crew.name}</div>
                  <div className="text-sm text-muted-foreground">{crew.teamLead}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>On Duty ({onDuty.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {onDuty.slice(0, 5).map((crew) => (
                <div key={crew.id} className="p-3 border rounded-lg">
                  <div className="font-medium">{crew.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {crew.currentLocation || "Location unknown"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shift Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Shift calendar view
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Crews</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={mockData.crews} searchPlaceholder="Search crews..." />
        </CardContent>
      </Card>
    </div>
  )
}

