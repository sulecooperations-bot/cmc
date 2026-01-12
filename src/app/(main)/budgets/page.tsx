"use client"

import { CityPulseStrip } from "@/components/city-pulse-strip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts"

const budgetData = [
  { category: "Roads", allocated: 50000000, spent: 35000000, remaining: 15000000 },
  { category: "Drains", allocated: 30000000, spent: 22000000, remaining: 8000000 },
  { category: "Streetlights", allocated: 20000000, spent: 15000000, remaining: 5000000 },
  { category: "Trees", allocated: 10000000, spent: 7000000, remaining: 3000000 },
  { category: "Waste", allocated: 25000000, spent: 18000000, remaining: 7000000 },
  { category: "Buildings", allocated: 15000000, spent: 10000000, remaining: 5000000 },
]

export default function BudgetsPage() {
  const totalAllocated = budgetData.reduce((sum, item) => sum + item.allocated, 0)
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0)
  const totalRemaining = totalAllocated - totalSpent

  return (
    <div className="space-y-6">
      <CityPulseStrip />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Budgets</h1>
          <p className="text-muted-foreground">CAPEX and OPEX tracking</p>
        </div>
        <Button>Add Budget</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Allocated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAllocated)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
            <p className="text-xs text-muted-foreground">
              {((totalSpent / totalAllocated) * 100).toFixed(1)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRemaining)}</div>
            <p className="text-xs text-muted-foreground">
              {((totalRemaining / totalAllocated) * 100).toFixed(1)}% remaining
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="allocated" fill="hsl(var(--primary))" name="Allocated" />
              <Bar dataKey="spent" fill="hsl(var(--destructive))" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgetData.map((item) => (
          <Card key={item.category}>
            <CardHeader>
              <CardTitle>{item.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <div className="text-sm text-muted-foreground">Allocated</div>
                <div className="font-medium">{formatCurrency(item.allocated)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Spent</div>
                <div className="font-medium">{formatCurrency(item.spent)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Remaining</div>
                <div className="font-medium">{formatCurrency(item.remaining)}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

