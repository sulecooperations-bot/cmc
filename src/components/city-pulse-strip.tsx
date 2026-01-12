"use client"

import { useState, useEffect } from "react"
import { mockData } from "@/lib/mock/seed"
import { AlertTriangle, Droplets, Users, Clock, Activity, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function CityPulseStrip() {
  const { workOrders, incidents, complaints, crews } = mockData
  const [mounted, setMounted] = useState(false)

  // Ensure we only calculate dynamic values after client-side mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const openWorkOrders = workOrders.filter(wo => wo.status === "open" || wo.status === "in_progress").length
  const activeIncidents = incidents.filter(i => i.status === "open" || i.status === "in_progress").length
  
  // Calculate complaintsToday on client side only to avoid hydration mismatch
  const [complaintsToday, setComplaintsToday] = useState(0)
  useEffect(() => {
    if (!mounted) return
    const today = new Date()
    const todayString = today.toDateString()
    const count = complaints.filter(c => {
      const complaintDate = new Date(c.createdAt)
      return complaintDate.toDateString() === todayString
    }).length
    setComplaintsToday(count)
  }, [complaints, mounted])
  
  // Calculate slaBreaches on client side only to avoid hydration mismatch
  // slaStatus in mock data is calculated using new Date() which can differ between server/client
  const [slaBreaches, setSlaBreaches] = useState(0)
  useEffect(() => {
    if (!mounted) return
    const now = new Date()
    const count = workOrders.filter(wo => {
      const slaDeadline = new Date(wo.slaDeadline)
      return now > slaDeadline
    }).length
    setSlaBreaches(count)
  }, [workOrders, mounted])
  
  const activeCrews = crews.filter(c => c.availability === "on_duty").length
  const criticalAssets = 47 // Mock value

  // Calculate indicators - only show SLA Breaches value after mount to avoid hydration mismatch
  const indicators = [
    { label: "Rain Risk", value: "Low", icon: Droplets, color: "text-blue-500", level: 1, isDateDependent: false },
    { label: "Traffic Disruption", value: "2", icon: AlertCircle, color: "text-amber-500", level: 2, isDateDependent: false },
    { label: "Open Incidents", value: activeIncidents.toString(), icon: AlertTriangle, color: "text-red-500", level: activeIncidents > 10 ? 3 : activeIncidents > 5 ? 2 : 1, isDateDependent: false },
    { label: "Crews Active", value: activeCrews.toString(), icon: Users, color: "text-green-500", level: 1, isDateDependent: false },
    { label: "SLA Breaches", value: slaBreaches.toString(), icon: Clock, color: slaBreaches > 5 ? "text-red-500" : "text-amber-500", level: slaBreaches > 5 ? 3 : slaBreaches > 0 ? 2 : 1, isDateDependent: true },
    { label: "Critical Assets", value: criticalAssets.toString(), icon: Activity, color: "text-red-500", level: criticalAssets > 30 ? 3 : criticalAssets > 15 ? 2 : 1, isDateDependent: false },
  ]

  return (
    <div className="border-b bg-muted/30 px-4 py-2">
      <div className="flex items-center gap-6 overflow-x-auto">
        {indicators.map((indicator, i) => {
          const Icon = indicator.icon
          const bars = Array.from({ length: 5 }, (_, j) => (
            <div
              key={j}
              className={cn(
                "h-3 w-1 rounded-full transition-colors",
                j < indicator.level ? indicator.color.replace("text-", "bg-") : "bg-muted"
              )}
            />
          ))

          return (
            <TooltipProvider key={i}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 cursor-help">
                    <Icon className={cn("h-4 w-4", indicator.color)} />
                    <div className="flex items-end gap-0.5">{bars}</div>
                    <div className="text-xs font-medium whitespace-nowrap" suppressHydrationWarning>
                      {indicator.label}: {indicator.value}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p suppressHydrationWarning>{indicator.label}: {indicator.value}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </div>
    </div>
  )
}

