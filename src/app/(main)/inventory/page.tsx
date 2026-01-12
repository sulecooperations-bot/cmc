"use client"

import { CityPulseStrip } from "@/components/city-pulse-strip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, AlertCircle } from "lucide-react"

const inventoryItems = [
  { id: "asphalt", name: "Asphalt", stock: 150, unit: "tons", threshold: 50, status: "ok" },
  { id: "pipes", name: "Concrete Pipes", stock: 30, unit: "units", threshold: 20, status: "low" },
  { id: "bulbs", name: "LED Bulbs", stock: 200, unit: "units", threshold: 100, status: "ok" },
  { id: "tools", name: "Maintenance Tools", stock: 45, unit: "sets", threshold: 30, status: "ok" },
  { id: "sealant", name: "Road Sealant", stock: 25, unit: "drums", threshold: 30, status: "low" },
]

export default function InventoryPage() {
  const lowStock = inventoryItems.filter((item) => item.stock < item.threshold)

  return (
    <div className="space-y-6">
      <CityPulseStrip />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="text-muted-foreground">Materials and equipment stock</p>
        </div>
        <Button>Add Item</Button>
      </div>

      {lowStock.length > 0 && (
        <Card className="border-amber-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-5 w-5" />
              Low Stock Items ({lowStock.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStock.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Stock: {item.stock} {item.unit} (Threshold: {item.threshold})
                    </div>
                  </div>
                  <Button size="sm">Reorder</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {inventoryItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {item.name}
                </div>
                <Badge
                  variant={item.status === "low" ? "destructive" : "outline"}
                >
                  {item.status === "low" ? "Low" : "OK"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-muted-foreground">Current Stock</div>
                  <div className="text-2xl font-bold">
                    {item.stock} {item.unit}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Reorder Threshold</div>
                  <div className="text-sm">{item.threshold} {item.unit}</div>
                </div>
                {item.stock < item.threshold && (
                  <Button size="sm" className="w-full" variant="destructive">
                    Reorder Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

