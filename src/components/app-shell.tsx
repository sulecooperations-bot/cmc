"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useAppStore } from "@/lib/store"
import {
  LayoutDashboard,
  Package,
  Wrench,
  FileText,
  AlertTriangle,
  MessageSquare,
  Users,
  Box,
  FileCheck,
  DollarSign,
  BarChart3,
  Settings,
  HelpCircle,
  Menu,
  X,
  Search,
  Bell,
  User,
  Sun,
  Moon,
  Monitor,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Command,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Assets", href: "/assets", icon: Package, children: [
    { name: "Roads", href: "/assets/roads" },
    { name: "Drains", href: "/assets/drains" },
    { name: "Streetlights", href: "/assets/streetlights" },
    { name: "Trees", href: "/assets/trees" },
    { name: "Waste", href: "/assets/waste" },
    { name: "Buildings", href: "/assets/buildings" },
  ]},
  { name: "Inspections", href: "/inspections", icon: FileCheck },
  { name: "Work Orders", href: "/work-orders", icon: Wrench },
  { name: "Incidents", href: "/incidents", icon: AlertTriangle },
  { name: "Complaints", href: "/complaints", icon: MessageSquare },
  { name: "Crews", href: "/crews", icon: Users },
  { name: "Inventory", href: "/inventory", icon: Box },
  { name: "Contracts", href: "/contracts", icon: FileText },
  { name: "Budgets", href: "/budgets", icon: DollarSign },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { density, reducedMotion, sidebarCollapsed, setDensity, setReducedMotion, setSidebarCollapsed } = useAppStore()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/")

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "border-r bg-card transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64",
          "hidden md:flex flex-col"
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-3 border-b px-4">
          {!sidebarCollapsed && (
            <>
              <div className="relative h-8 w-8 flex-shrink-0">
                <Image src="/brand/cmc-mark.svg" alt="CMC" fill className="object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-sm font-semibold truncate">CMC Infrastructure</h1>
                <p className="text-xs text-muted-foreground truncate">Command</p>
              </div>
            </>
          )}
          {sidebarCollapsed && (
            <div className="relative h-8 w-8 mx-auto">
              <Image src="/brand/cmc-mark.svg" alt="CMC" fill className="object-contain" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    sidebarCollapsed && "justify-center"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </Link>
              </div>
            )
          })}
        </nav>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="border-t p-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="relative h-4 w-4">
                <Image src="/brand/suleco-mark.svg" alt="SULECO" fill className="object-contain" />
              </div>
              <span>Powered by SULECO</span>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b bg-background flex items-center gap-4 px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
          </Button>

          {/* Breadcrumbs */}
          <div className="flex-1 text-sm text-muted-foreground">
            {pathname?.split("/").filter(Boolean).map((segment, i, arr) => (
              <span key={i}>
                {i > 0 && " / "}
                <span className={i === arr.length - 1 ? "text-foreground font-medium" : ""}>
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </span>
              </span>
            ))}
          </div>

          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute top-1 right-1 h-2 w-2 p-0 bg-destructive" />
          </Button>

          {/* Theme toggle */}
          <div className="flex items-center gap-2">
            {mounted ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            ) : (
              <Button variant="ghost" size="icon" disabled>
                <Sun className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Density toggle */}
          <div className="hidden lg:flex items-center gap-2 px-2">
            <span className="text-xs text-muted-foreground">Compact</span>
            <Switch
              checked={density === "compact"}
              onCheckedChange={(checked) => setDensity(checked ? "compact" : "comfortable")}
            />
          </div>

          {/* Reduced motion */}
          <div className="hidden lg:flex items-center gap-2 px-2">
            {reducedMotion ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
            <Switch
              checked={reducedMotion}
              onCheckedChange={setReducedMotion}
            />
          </div>

          {/* Profile */}
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </header>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b bg-card">
            <nav className="p-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        )}

        {/* Page content */}
        <main className={cn(
          "flex-1 overflow-y-auto",
          density === "compact" ? "p-2" : "p-4"
        )}>
          {children}
        </main>

        {/* Footer */}
        <footer className="h-12 border-t flex items-center justify-between px-4 text-xs text-muted-foreground">
          <div>© 2024 CMC Infrastructure Command</div>
          <div className="flex items-center gap-2">
            <div className="relative h-3 w-3">
              <Image src="/brand/suleco-mark.svg" alt="SULECO" fill className="object-contain" />
            </div>
            <span>Powered by SULECO</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

