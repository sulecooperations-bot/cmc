"use client"

import { useState } from "react"
import { CityPulseStrip } from "@/components/city-pulse-strip"
import { DataTable } from "@/components/data-table"
import { mockData } from "@/lib/mock/seed"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/utils"
import { LayoutGrid, Table2, AlertCircle } from "lucide-react"
import type { WorkOrder } from "@/lib/mock/seed"

const columns: ColumnDef<WorkOrder>[] = [
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
    accessorKey: "slaStatus",
    header: "SLA",
    cell: ({ row }) => {
      const sla = row.getValue("slaStatus") as string
      return (
        <Badge
          variant={
            sla === "breached" ? "destructive" : sla === "at_risk" ? "secondary" : "outline"
          }
        >
          {sla}
        </Badge>
      )
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => formatDate(row.getValue("dueDate")),
  },
  {
    accessorKey: "assignedCrew",
    header: "Crew",
    cell: ({ row }) => {
      const crew = row.getValue("assignedCrew") as string | null
      return crew ? <div className="text-sm">{crew}</div> : <span className="text-muted-foreground">Unassigned</span>
    },
  },
]

export default function WorkOrdersPage() {
  const [view, setView] = useState<"table" | "kanban">("table")

  const open = mockData.workOrders.filter((wo) => wo.status === "open")
  const inProgress = mockData.workOrders.filter((wo) => wo.status === "in_progress")
  const resolved = mockData.workOrders.filter((wo) => wo.status === "resolved" || wo.status === "closed")

  return (
    <div className="space-y-6">
      <CityPulseStrip />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Work Orders</h1>
          <p className="text-muted-foreground">Maintenance and repair orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("table")}
          >
            <Table2 className="h-4 w-4 mr-2" />
            Table
          </Button>
          <Button
            variant={view === "kanban" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("kanban")}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Kanban
          </Button>
          <Button>Create Work Order</Button>
        </div>
      </div>

      {view === "table" ? (
        <DataTable columns={columns} data={mockData.workOrders} searchPlaceholder="Search work orders..." />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Open
                <Badge variant="outline">{open.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {open.slice(0, 10).map((wo) => (
                <div key={wo.id} className="p-3 border rounded-lg space-y-2">
                  <div className="font-medium text-sm">{wo.title}</div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        wo.severity === "critical"
                          ? "destructive"
                          : wo.severity === "high"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {wo.severity}
                    </Badge>
                    <Badge
                      variant={
                        wo.slaStatus === "breached"
                          ? "destructive"
                          : wo.slaStatus === "at_risk"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {wo.slaStatus}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Due: {formatDate(wo.dueDate)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                In Progress
                <Badge variant="outline">{inProgress.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {inProgress.slice(0, 10).map((wo) => (
                <div key={wo.id} className="p-3 border rounded-lg space-y-2">
                  <div className="font-medium text-sm">{wo.title}</div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        wo.severity === "critical"
                          ? "destructive"
                          : wo.severity === "high"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {wo.severity}
                    </Badge>
                    <Badge
                      variant={
                        wo.slaStatus === "breached"
                          ? "destructive"
                          : wo.slaStatus === "at_risk"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {wo.slaStatus}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Crew: {wo.assignedCrew || "Unassigned"}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Resolved
                <Badge variant="outline">{resolved.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {resolved.slice(0, 10).map((wo) => (
                <div key={wo.id} className="p-3 border rounded-lg space-y-2">
                  <div className="font-medium text-sm">{wo.title}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {wo.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Completed: {formatDate(wo.createdAt)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Smart Triage Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Smart Triage Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockData.workOrders
              .filter((wo) => wo.slaStatus === "breached" || wo.slaStatus === "at_risk")
              .slice(0, 5)
              .map((wo) => (
                <div key={wo.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{wo.title}</div>
                    <div className="text-sm text-muted-foreground">
                      SLA {wo.slaStatus === "breached" ? "breached" : "at risk"}
                    </div>
                  </div>
                  <Button size="sm">Assign Crew</Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

