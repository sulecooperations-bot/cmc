"use client"

import { CityPulseStrip } from "@/components/city-pulse-strip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"

const contracts = [
  {
    id: "cont-001",
    vendor: "ABC Construction Ltd",
    type: "Road Maintenance",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    value: 5000000,
  },
  {
    id: "cont-002",
    vendor: "XYZ Electrical",
    type: "Streetlight Maintenance",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    value: 2000000,
  },
  {
    id: "cont-003",
    vendor: "Green Solutions",
    type: "Tree Maintenance",
    status: "pending",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    value: 1500000,
  },
]

export default function ContractsPage() {
  return (
    <div className="space-y-6">
      <CityPulseStrip />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contracts</h1>
          <p className="text-muted-foreground">Vendor contracts and SLAs</p>
        </div>
        <Button>New Contract</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contracts.map((contract) => (
          <Card key={contract.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {contract.vendor}
                </div>
                <Badge variant={contract.status === "active" ? "default" : "outline"}>
                  {contract.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="font-medium">{contract.type}</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Start</div>
                  <div>{formatDate(contract.startDate)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">End</div>
                  <div>{formatDate(contract.endDate)}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Contract Value</div>
                <div className="text-lg font-bold">LKR {contract.value.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

