"use client"

import { CityPulseStrip } from "@/components/city-pulse-strip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HelpCircle, Search, MessageSquare } from "lucide-react"

const helpCategories = [
  { id: "getting-started", name: "Getting Started", count: 5 },
  { id: "assets", name: "Asset Management", count: 12 },
  { id: "work-orders", name: "Work Orders", count: 8 },
  { id: "reports", name: "Reports", count: 6 },
  { id: "settings", name: "Settings", count: 4 },
]

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <CityPulseStrip />

      <div>
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">Knowledge base and support</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Knowledge Base</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for help articles..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {helpCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">{category.count} articles</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Support Ticket
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Enter subject..." />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Describe your issue..."
              />
            </div>
            <Button>Submit Ticket</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

