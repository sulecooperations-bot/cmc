"use client"

import { CityPulseStrip } from "@/components/city-pulse-strip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

const reportTemplates = [
  {
    id: "monthly-ward",
    name: "Monthly Ward Report",
    description: "Comprehensive report for a specific ward",
    category: "Ward Reports",
  },
  {
    id: "sla-compliance",
    name: "SLA Compliance Report",
    description: "Work order SLA performance metrics",
    category: "Performance",
  },
  {
    id: "flood-hotspots",
    name: "Flood/Drainage Hotspots",
    description: "Analysis of flood-prone areas",
    category: "Analysis",
  },
  {
    id: "streetlight-outages",
    name: "Streetlight Outages Summary",
    description: "Map and summary of lighting issues",
    category: "Infrastructure",
  },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <CityPulseStrip />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Analytics and report generation</p>
        </div>
        <Button>Generate Report</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reportTemplates.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {report.name}
              </CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">{report.category}</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

