"use client"

import { CityPulseStrip } from "@/components/city-pulse-strip"
import { DataTable } from "@/components/data-table"
import { mockData } from "@/lib/mock/seed"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { MessageSquare, Smile, Meh, Frown, Merge } from "lucide-react"
import type { Complaint } from "@/lib/mock/seed"

const columns: ColumnDef<Complaint>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-mono text-xs">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "citizenName",
    header: "Citizen",
    cell: ({ row }) => <div className="font-medium">{row.getValue("citizenName")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "ward",
    header: "Ward",
  },
  {
    accessorKey: "sentiment",
    header: "Sentiment",
    cell: ({ row }) => {
      const sentiment = row.getValue("sentiment") as string
      const Icon =
        sentiment === "positive" ? Smile : sentiment === "negative" ? Frown : Meh
      return (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span className="capitalize">{sentiment}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string
      return (
        <Badge
          variant={
            priority === "critical"
              ? "destructive"
              : priority === "high"
              ? "secondary"
              : "outline"
          }
        >
          {priority}
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
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
]

export default function ComplaintsPage() {
  const open = mockData.complaints.filter((c) => c.status === "open")
  const inProgress = mockData.complaints.filter((c) => c.status === "in_progress")
  const resolved = mockData.complaints.filter((c) => c.status === "resolved" || c.status === "closed")

  return (
    <div className="space-y-6">
      <CityPulseStrip />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Complaints</h1>
          <p className="text-muted-foreground">Citizen requests and feedback</p>
        </div>
        <Button>New Complaint</Button>
      </div>

      {/* Inbox-style triage */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <MessageSquare className="h-5 w-5" />
              Open
              <Badge variant="outline">{open.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {open.slice(0, 10).map((complaint) => (
              <div
                key={complaint.id}
                className="p-3 border rounded-lg hover:bg-accent cursor-pointer space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{complaint.citizenName}</div>
                    <div className="text-xs text-muted-foreground">{complaint.category}</div>
                  </div>
                  {complaint.sentiment === "negative" && (
                    <Frown className="h-4 w-4 text-amber-500" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {complaint.description}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {complaint.priority}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{complaint.ward}</span>
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
            {inProgress.slice(0, 10).map((complaint) => (
              <div
                key={complaint.id}
                className="p-3 border rounded-lg hover:bg-accent cursor-pointer space-y-2"
              >
                <div className="font-medium text-sm">{complaint.citizenName}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {complaint.description}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {complaint.status}
                  </Badge>
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
            {resolved.slice(0, 10).map((complaint) => (
              <div
                key={complaint.id}
                className="p-3 border rounded-lg hover:bg-accent cursor-pointer space-y-2"
              >
                <div className="font-medium text-sm">{complaint.citizenName}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {complaint.description}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(complaint.createdAt)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Full table view */}
      <Card>
        <CardHeader>
          <CardTitle>All Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={mockData.complaints}
            searchPlaceholder="Search complaints..."
          />
        </CardContent>
      </Card>
    </div>
  )
}

