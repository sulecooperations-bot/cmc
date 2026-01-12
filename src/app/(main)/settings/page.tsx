"use client"

import { CityPulseStrip } from "@/components/city-pulse-strip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Palette, Image as ImageIcon, Users, Bell } from "lucide-react"
import Image from "next/image"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <CityPulseStrip />

      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">System configuration and preferences</p>
      </div>

      <Tabs defaultValue="branding" className="space-y-4">
        <TabsList>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Branding
              </CardTitle>
              <CardDescription>Customize logos and colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>CMC Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 border rounded-lg">
                    <Image src="/brand/cmc-mark.svg" alt="CMC" fill className="object-contain p-2" />
                  </div>
                  <Button variant="outline">Upload Logo</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>SULECO Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 border rounded-lg">
                    <Image src="/brand/suleco-mark.svg" alt="SULECO" fill className="object-contain p-2" />
                  </div>
                  <Button variant="outline">Upload Logo</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Primary Color</Label>
                <Input type="color" defaultValue="#0EA5E9" className="w-20 h-10" />
              </div>

              <div className="space-y-2">
                <Label>Secondary Color</Label>
                <Input type="color" defaultValue="#14B8A6" className="w-20 h-10" />
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Roles & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Role management UI - placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Notification settings - placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Integration settings - placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

