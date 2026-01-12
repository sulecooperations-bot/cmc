"use client"

import { useState, useEffect } from "react"
import { CityPulseStrip } from "@/components/city-pulse-strip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockData } from "@/lib/mock/seed"
import {
  Wrench,
  AlertTriangle,
  MessageSquare,
  Activity,
  Plus,
  AlertCircle,
  Calendar,
  MapPin,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import Link from "next/link"

export default function DashboardPage() {
  const { workOrders, incidents, complaints, crews, assets } = mockData
  const [mounted, setMounted] = useState(false)

  // Ensure we only calculate dynamic values after client-side mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate all KPI values on client side only to avoid hydration mismatch
  // Mock data generation uses new Date() which can differ between server/client
  const [openWorkOrders, setOpenWorkOrders] = useState(0)
  const [activeIncidents, setActiveIncidents] = useState(0)
  const [assetsAtRisk, setAssetsAtRisk] = useState(0)
  const [complaintsToday, setComplaintsToday] = useState(0)
  const [slaBreaches, setSlaBreaches] = useState(0)

  useEffect(() => {
    if (!mounted) return
    
    setOpenWorkOrders(workOrders.filter(wo => wo.status === "open" || wo.status === "in_progress").length)
    setActiveIncidents(incidents.filter(i => i.status === "open" || i.status === "in_progress").length)
    setAssetsAtRisk(assets.filter(a => a.riskLevel === "critical" || a.riskLevel === "high").length)
    
    const today = new Date()
    const todayString = today.toDateString()
    const complaintsCount = complaints.filter(c => {
      const complaintDate = new Date(c.createdAt)
      return complaintDate.toDateString() === todayString
    }).length
    setComplaintsToday(complaintsCount)
    
    const now = new Date()
    const slaCount = workOrders.filter(wo => {
      const slaDeadline = new Date(wo.slaDeadline)
      return now > slaDeadline
    }).length
    setSlaBreaches(slaCount)
  }, [workOrders, incidents, complaints, assets, mounted])

  const workOrdersByType = [
    { type: "Road", count: workOrders.filter(wo => wo.assetType === "road").length },
    { type: "Drain", count: workOrders.filter(wo => wo.assetType === "drain").length },
    { type: "Light", count: workOrders.filter(wo => wo.assetType === "streetlight").length },
    { type: "Tree", count: workOrders.filter(wo => wo.assetType === "tree").length },
    { type: "Waste", count: workOrders.filter(wo => wo.assetType === "waste").length },
    { type: "Building", count: workOrders.filter(wo => wo.assetType === "building").length },
  ]

  const slaCompliance = [
    { month: "Jan", onTime: 85, atRisk: 10, breached: 5 },
    { month: "Feb", onTime: 88, atRisk: 8, breached: 4 },
    { month: "Mar", onTime: 82, atRisk: 12, breached: 6 },
    { month: "Apr", onTime: 90, atRisk: 7, breached: 3 },
    { month: "May", onTime: 87, atRisk: 9, breached: 4 },
    { month: "Jun", onTime: 89, atRisk: 8, breached: 3 },
  ]

  const complaintsByCategory = [
    { category: "Road", count: complaints.filter(c => c.category.includes("Road")).length },
    { category: "Drain", count: complaints.filter(c => c.category.includes("Drain")).length },
    { category: "Light", count: complaints.filter(c => c.category.includes("Streetlight")).length },
    { category: "Waste", count: complaints.filter(c => c.category.includes("Waste")).length },
    { category: "Other", count: complaints.filter(c => !["Road", "Drain", "Streetlight", "Waste"].some(cat => c.category.includes(cat))).length },
  ]

  // Calculate ward data on client side only to avoid hydration mismatch
  const [recentIncidents, setRecentIncidents] = useState<typeof incidents>([])
  const [activeCrews, setActiveCrews] = useState<typeof crews>([])
  const [wardRisk, setWardRisk] = useState<Array<{ ward: string; risk: string }>>([])

  useEffect(() => {
    if (!mounted) return
    
    const sorted = incidents
      .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime())
      .slice(0, 5)
    setRecentIncidents(sorted)
    
    setActiveCrews(crews.filter(c => c.availability === "on_duty").slice(0, 5))
    
    const wards = Array.from(new Set(assets.map(a => a.ward))).slice(0, 12)
    const riskData = wards.map(ward => {
      const wardAssets = assets.filter(a => a.ward === ward)
      const critical = wardAssets.filter(a => a.riskLevel === "critical").length
      const high = wardAssets.filter(a => a.riskLevel === "high").length
      return {
        ward,
        risk: critical > 5 ? "critical" : high > 10 ? "high" : high > 5 ? "medium" : "low",
      }
    })
    setWardRisk(riskData)
  }, [incidents, crews, assets, mounted])

  return (
    <div className="space-y-6">
      <CityPulseStrip />

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Work Orders</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" suppressHydrationWarning>
              {mounted ? openWorkOrders : "—"}
            </div>
            <p className="text-xs text-muted-foreground">Active tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Breaches</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive" suppressHydrationWarning>
              {mounted ? slaBreaches : "—"}
            </div>
            <p className="text-xs text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" suppressHydrationWarning>
              {mounted ? activeIncidents : "—"}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Complaints Today</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" suppressHydrationWarning>
              {mounted ? complaintsToday : "—"}
            </div>
            <p className="text-xs text-muted-foreground">New requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assets at Risk</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600" suppressHydrationWarning>
              {mounted ? assetsAtRisk : "—"}
            </div>
            <p className="text-xs text-muted-foreground">Critical/High</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Ward Heat Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ward Heat Overview</CardTitle>
            <CardDescription>Risk levels by ward</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {mounted ? wardRisk.map((w, i) => (
                <div
                  key={i}
                  className={`
                    p-3 rounded-lg border text-center text-xs
                    ${w.risk === "critical" ? "bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-800" : ""}
                    ${w.risk === "high" ? "bg-amber-100 dark:bg-amber-900/20 border-amber-300 dark:border-amber-800" : ""}
                    ${w.risk === "medium" ? "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-800" : ""}
                    ${w.risk === "low" ? "bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-800" : ""}
                  `}
                  suppressHydrationWarning
                >
                  <div className="font-medium truncate">{w.ward}</div>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {w.risk}
                  </Badge>
                </div>
              )) : (
                <div className="col-span-4 text-center text-muted-foreground py-4">Loading wards...</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Today's Crew Board */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Crew Board</CardTitle>
            <CardDescription>Active field teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mounted ? activeCrews.map((crew) => (
                <div key={crew.id} className="flex items-center justify-between p-2 rounded-lg border" suppressHydrationWarning>
                  <div>
                    <div className="font-medium text-sm">{crew.name}</div>
                    <div className="text-xs text-muted-foreground">{crew.teamLead}</div>
                  </div>
                  <Badge variant="outline">{crew.shift}</Badge>
                </div>
              )) : (
                <div className="text-center text-muted-foreground py-4">Loading crews...</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Work Orders by Type</CardTitle>
            <CardDescription>Distribution of active work orders</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workOrdersByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SLA Compliance Trend</CardTitle>
            <CardDescription>Monthly performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={slaCompliance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="onTime" stroke="hsl(var(--primary))" name="On Time" />
                <Line type="monotone" dataKey="atRisk" stroke="hsl(var(--amber-500))" name="At Risk" />
                <Line type="monotone" dataKey="breached" stroke="hsl(var(--destructive))" name="Breached" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Complaints by Category</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={complaintsByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Incident Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Incident Timeline</CardTitle>
          <CardDescription>Last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mounted ? recentIncidents.map((incident) => (
              <div key={incident.id} className="flex items-start gap-3 p-3 rounded-lg border" suppressHydrationWarning>
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{incident.title}</div>
                    <Badge variant={incident.severity === "critical" ? "destructive" : "outline"}>
                      {incident.severity}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1" suppressHydrationWarning>
                    {incident.ward} • {new Date(incident.reportedAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center text-muted-foreground py-4">Loading incidents...</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-4">
            <Button asChild>
              <Link href="/work-orders?action=create">
                <Plus className="h-4 w-4 mr-2" />
                Create Work Order
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/incidents?action=create">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Log Incident
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/inspections?action=schedule">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Inspection
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/assets?action=add">
                <MapPin className="h-4 w-4 mr-2" />
                Add Asset
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

