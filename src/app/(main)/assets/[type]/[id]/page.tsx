"use client"

import { useParams } from "next/navigation"
import { CityPulseStrip } from "@/components/city-pulse-strip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockData } from "@/lib/mock/seed"
import { formatDate, formatCurrency } from "@/lib/utils"
import {
  MapPin,
  Calendar,
  FileText,
  DollarSign,
  History,
  Wrench,
  Eye,
} from "lucide-react"
import { CityGridCanvas } from "@/components/city-grid-canvas"

export default function AssetDetailPage() {
  const params = useParams()
  const assetId = params.id as string
  const assetType = params.type as string

  const asset = mockData.assets.find((a) => a.id === assetId)

  if (!asset) {
    return <div>Asset not found</div>
  }

  const relatedWorkOrders = mockData.workOrders.filter((wo) => wo.assetId === asset.id)
  const relatedComplaints = mockData.complaints.filter((c) => c.assetId === asset.id)

  return (
    <div className="space-y-6">
      <CityPulseStrip />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{asset.name}</h1>
          <p className="text-muted-foreground">{asset.ward} • {asset.segment}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              asset.condition === "excellent" || asset.condition === "good"
                ? "default"
                : asset.condition === "fair"
                ? "secondary"
                : "destructive"
            }
          >
            {asset.condition}
          </Badge>
          <Badge
            variant={
              asset.riskLevel === "critical"
                ? "destructive"
                : asset.riskLevel === "high"
                ? "secondary"
                : "outline"
            }
          >
            {asset.riskLevel} risk
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="work-orders">Work Orders</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="costing">Costing</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Asset Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Asset ID</div>
                  <div className="font-mono text-sm">{asset.id}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Type</div>
                  <div className="font-medium">{asset.type}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Ward</div>
                  <div className="font-medium">{asset.ward}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Segment</div>
                  <div className="font-medium">{asset.segment}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Condition Score</div>
                  <div className="text-2xl font-bold">{asset.conditionScore}/100</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status & Risk</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Condition</div>
                  <Badge
                    variant={
                      asset.condition === "excellent" || asset.condition === "good"
                        ? "default"
                        : asset.condition === "fair"
                        ? "secondary"
                        : "destructive"
                    }
                    className="mt-1"
                  >
                    {asset.condition}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Risk Level</div>
                  <Badge
                    variant={
                      asset.riskLevel === "critical"
                        ? "destructive"
                        : asset.riskLevel === "high"
                        ? "secondary"
                        : "outline"
                    }
                    className="mt-1"
                  >
                    {asset.riskLevel}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Last Inspected</div>
                  <div className="font-medium">{formatDate(asset.lastInspected)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Next Inspection</div>
                  <div className="font-medium">{formatDate(asset.nextInspection)}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {Object.keys(asset.metadata).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {Object.entries(asset.metadata).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="font-medium">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Geographic information and nearby assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm text-muted-foreground">Coordinates</div>
                  <div className="font-mono text-sm">
                    {asset.coordinates.lat.toFixed(6)}°, {asset.coordinates.lon.toFixed(6)}°
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Ward</div>
                  <div className="font-medium">{asset.ward}</div>
                </div>
              </div>
              <CityGridCanvas selectedWard={asset.ward} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inspection History</CardTitle>
              <CardDescription>Past and scheduled inspections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Scheduled Inspection</div>
                    <div className="text-sm text-muted-foreground">
                      Due: {formatDate(asset.nextInspection)}
                    </div>
                  </div>
                  <Button>Schedule</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Last inspection: {formatDate(asset.lastInspected)}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work-orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Work Orders</CardTitle>
              <CardDescription>Maintenance and repair orders for this asset</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {relatedWorkOrders.slice(0, 10).map((wo) => (
                  <div key={wo.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{wo.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {wo.status} • {formatDate(wo.createdAt)}
                      </div>
                    </div>
                    <Badge
                      variant={
                        wo.slaStatus === "breached"
                          ? "destructive"
                          : wo.slaStatus === "at_risk"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {wo.slaStatus}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Attached files and records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No documents attached
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Costing</CardTitle>
              <CardDescription>Lifecycle costs and recent spend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Total Spent</div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(
                        relatedWorkOrders.reduce((sum, wo) => sum + wo.cost, 0)
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Work Orders</div>
                    <div className="text-2xl font-bold">{relatedWorkOrders.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg. Cost</div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(
                        relatedWorkOrders.length > 0
                          ? relatedWorkOrders.reduce((sum, wo) => sum + wo.cost, 0) /
                            relatedWorkOrders.length
                          : 0
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>Change history and activity log</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <History className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm">Asset created</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(asset.lastInspected)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

