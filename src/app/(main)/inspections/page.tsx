"use client"

import { CityPulseStrip } from "@/components/city-pulse-strip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, List, FileText } from "lucide-react"
import { useState } from "react"

export default function InspectionsPage() {
  const [view, setView] = useState<"calendar" | "list">("list")

  return (
    <div className="space-y-6">
      <CityPulseStrip />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inspections</h1>
          <p className="text-muted-foreground">Asset inspection schedule and forms</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
          <Button
            variant={view === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("calendar")}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </Button>
          <Button>Schedule Inspection</Button>
        </div>
      </div>

      {view === "calendar" ? (
        <Card>
          <CardHeader>
            <CardTitle>Inspection Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              Calendar view - UI placeholder
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Road Inspections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Road Inspection - Segment {i}</div>
                      <div className="text-sm text-muted-foreground">Due: Tomorrow</div>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Drain Inspections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Drain Inspection - Segment {i}</div>
                      <div className="text-sm text-muted-foreground">Due: Next week</div>
                    </div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Inspection Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <div className="font-medium">Road Inspection</div>
              <div className="text-sm text-muted-foreground mt-1">Surface, markings, drainage</div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <div className="font-medium">Drain Inspection</div>
              <div className="text-sm text-muted-foreground mt-1">Blockage, damage, flow</div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <div className="font-medium">Light Pole Inspection</div>
              <div className="text-sm text-muted-foreground mt-1">Bulb, wiring, pole condition</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

