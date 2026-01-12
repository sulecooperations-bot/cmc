"use client"

import { CityPulseStrip } from "@/components/city-pulse-strip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, LayoutDashboard, Package, MessageSquare, AlertTriangle } from "lucide-react"

const showcaseScreens = [
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Command center with KPIs, charts, and quick actions",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "assets",
    name: "Asset Registry",
    description: "Split view with virtualized table and City Grid Canvas",
    href: "/assets",
    icon: Package,
  },
  {
    id: "complaints",
    name: "Complaints Triage",
    description: "Inbox-style triage with sentiment indicators",
    href: "/complaints",
    icon: MessageSquare,
  },
  {
    id: "incidents",
    name: "Incident Management",
    description: "Rapid incident logging and tracking",
    href: "/incidents",
    icon: AlertTriangle,
  },
]

export default function ShowcasePage() {
  return (
    <div className="space-y-6">
      <CityPulseStrip />

      <div>
        <h1 className="text-3xl font-bold">Showcase</h1>
        <p className="text-muted-foreground">Gallery of key screens and features</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {showcaseScreens.map((screen) => {
          const Icon = screen.icon
          return (
            <Card key={screen.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  {screen.name}
                </CardTitle>
                <CardDescription>{screen.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href={screen.href}>
                    View Screen
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc list-inside">
            <li>City Pulse Strip - Real-time indicators at the top of key pages</li>
            <li>City Grid Canvas - Interactive SVG-based ward map with layer toggles</li>
            <li>Virtualized Data Tables - High-performance tables for large datasets</li>
            <li>Smart Triage Mode - AI-assisted work order prioritization</li>
            <li>Complaint Sentiment Analysis - Visual indicators for citizen feedback</li>
            <li>Theme & Density Controls - Light/Dark mode and Compact/Comfortable density</li>
            <li>Reduced Motion Support - Accessibility-first animations</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

